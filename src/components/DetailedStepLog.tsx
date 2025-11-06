import { Card } from './ui/card';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import { Download, RotateCcw, ChevronDown, ChevronUp, Info } from 'lucide-react';
import { FormulaDisplay } from './FormulaDisplay';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export interface DetailedStep {
  id: string;
  title: string;
  description: string;
  formula?: string;
  calculation?: string;
  result?: string;
  details?: string[];
  bits?: { position: number; value: string; highlight?: boolean }[];
  visualGrid?: boolean;
  type?: 'info' | 'formula' | 'calculation' | 'result' | 'visual';
}

interface DetailedStepLogProps {
  steps: DetailedStep[];
  darkMode: boolean;
}

export function DetailedStepLog({ steps, darkMode }: DetailedStepLogProps) {
  const [expandedSteps, setExpandedSteps] = useState<Set<string>>(new Set());

  const toggleStep = (stepId: string) => {
    const newExpanded = new Set(expandedSteps);
    if (newExpanded.has(stepId)) {
      newExpanded.delete(stepId);
    } else {
      newExpanded.add(stepId);
    }
    setExpandedSteps(newExpanded);
  };

  const handleExport = () => {
    const content = steps.map((step, idx) => {
      let text = `Step ${idx + 1}: ${step.title}\n${step.description}\n`;
      if (step.formula) text += `Formula: ${step.formula}\n`;
      if (step.calculation) text += `Calculation: ${step.calculation}\n`;
      if (step.result) text += `Result: ${step.result}\n`;
      if (step.details) text += step.details.map(d => `  • ${d}`).join('\n') + '\n';
      return text;
    }).join('\n' + '='.repeat(60) + '\n\n');
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'hamming-code-steps.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    window.location.reload();
  };


  const getStepColor = (type?: string) => {
    switch (type) {
      case 'formula':
        return darkMode 
          ? 'border-l-[#FFB300] bg-[#2a2a2a]' 
          : 'border-l-[#FFB300] bg-[#FFFFFF]';
      case 'calculation':
        return darkMode 
          ? 'border-l-[#FFB300] bg-[#2a2a2a]' 
          : 'border-l-[#FFB300] bg-[#FFFFFF]';
      case 'result':
        return darkMode 
          ? 'border-l-[#FFB300] bg-[#2a2a2a]' 
          : 'border-l-[#FFB300] bg-[#FFB300]/5';
      default:
        return darkMode 
          ? 'border-l-[#7C70C8] bg-[#2a2a2a]' 
          : 'border-l-[#E7E6F8] bg-[#FFFFFF]';
    }
  };

  return (
    <Card className={`p-6 sticky top-24 shadow-lg w-full max-w-[600px] ${darkMode ? 'bg-[#2a2a2a] border-2 border-[#7C70C8]' : 'bg-[#FFFFFF] border-2 border-[#E7E6F8]'}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h3 className={`${darkMode ? 'text-[#FFB300]' : 'text-[#24292F]'}`}>
            Step-by-Step Process
          </h3>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className={`w-4 h-4 ${darkMode ? 'text-[#FFB300]' : 'text-[#24292F]'}`} />
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs max-w-xs">
                  Detailed calculations and formulas for each step. Expand cards to see complete breakdowns.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleExport}
            disabled={steps.length === 0}
            className={`border-2 ${darkMode ? 'border-[#FFB300] text-[#FFB300] hover:bg-[#FFB300]/10' : 'border-[#FFB300] text-[#FFB300] hover:bg-[#FFB300]/10'}`}
          >
            <Download className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleReset}
            className={`border-2 ${darkMode ? 'border-[#FFB300] text-[#FFB300] hover:bg-[#FFB300]/10' : 'border-[#FFB300] text-[#FFB300] hover:bg-[#FFB300]/10'}`}
          >
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <p className={`text-xs mb-4 ${darkMode ? 'text-[#FFB300]/70' : 'text-[#24292F]/70'}`}>
        Detailed Calculations & Formulas
      </p>

      <ScrollArea className="h-[600px] w-full overflow-auto pr-4">
        {steps.length === 0 ? (
          <div className={`text-sm text-center py-12 ${darkMode ? 'text-[#FFB300]' : 'text-[#24292F]/50'}`}>
            <div className="mb-3 text-2xl">📚</div>
            <p className="mb-1">No steps logged yet.</p>
            <p className="text-xs">Start encoding or decoding to see detailed calculations.</p>
          </div>
        ) : (
          <div className="space-y-4 min-w-[500px]">
            {steps.map((step, index) => {
              const isExpanded = expandedSteps.has(step.id);
              const hasExpandableContent = (step.details && step.details.length > 0) || step.bits;

              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                >
                  <Collapsible open={isExpanded} onOpenChange={() => hasExpandableContent && toggleStep(step.id)}>
                    <div
                      className={`rounded-lg border-l-4 shadow-sm transition-all overflow-hidden ${getStepColor(step.type)} ${
                        darkMode ? 'border-r-2 border-t-2 border-b-2 border-[#7C70C8]' : 'border-r-2 border-t-2 border-b-2 border-[#E7E6F8]'
                      }`}
                    >
                      {/* Main Step Content */}
                      <div className="p-4">
                        <div className="flex items-start gap-3">
                          {/* Step Number */}
                          <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                            darkMode ? 'bg-[#FFB300]/30 text-[#FFB300]' : 'bg-[#FFB300]/20 text-[#24292F]'
                          }`}>
                            <span className="text-sm">{index + 1}</span>
                          </div>

                          {/* Step Content */}
                          <div className="flex-1 min-w-0">
                            {/* Title */}
                            <h4 className={`mb-2 break-words max-w-full ${darkMode ? 'text-[#FFB300]' : 'text-[#24292F]'}`}>
                              {step.title}
                            </h4>

                            {/* Description */}
                            <p className={`text-sm mb-3 ${darkMode ? 'text-[#FFB300]/80' : 'text-[#24292F]/80'}`}>
                              {step.description}
                            </p>

                            {/* Formula Section */}
                            {step.formula && (
                              <div className={`mb-3 p-3 rounded-lg border-2 ${
                                darkMode ? 'bg-[#2a2a2a] border-[#7C70C8]' : 'bg-[#FFB300]/5 border-[#E7E6F8]'
                              }`}>
                                <div className={`text-xs mb-2 ${darkMode ? 'text-[#FFB300]' : 'text-[#24292F]'}`}>
                                  • Formula:
                                </div>
                                <div className="overflow-x-auto">
                                  <FormulaDisplay 
                                    formula={step.formula} 
                                    darkMode={darkMode} 
                                    className="text-base py-1" 
                                  />
                                </div>
                              </div>
                            )}

                            {/* Calculation/Substitution Section */}
                            {step.calculation && (
                              <div className={`mb-3 p-3 rounded-lg border-2 ${
                                darkMode ? 'bg-[#2a2a2a] border-[#7C70C8]' : 'bg-[#FFFFFF] border-[#E7E6F8]'
                              }`}>
                                <div className={`text-xs mb-2 ${darkMode ? 'text-[#FFB300]/70' : 'text-[#24292F]/70'}`}>
                                  • Substitute values:
                                </div>
                                <div className="overflow-x-auto">
                                  <code className={`text-sm whitespace-nowrap ${darkMode ? 'text-[#FFB300]' : 'text-[#24292F]'}`}>
                                    {step.calculation}
                                  </code>
                                </div>
                              </div>
                            )}

                            {/* Result Section */}
                            {step.result && (
                              <div className={`p-3 rounded-lg flex items-start gap-2 border ${
                                darkMode ? 'bg-[#FFB300]/10 border-[#FFB300]' : 'bg-[#FFB300]/10 border-[#FFB300]'
                              }`}>
                                <span className="text-base">✓</span>
                                <span className={`text-sm flex-1 ${darkMode ? 'text-[#FFB300]' : 'text-[#24292F]'}`}>
                                  {step.result}
                                </span>
                              </div>
                            )}
                          </div>

                          {/* Expand/Collapse Button */}
                          {hasExpandableContent && (
                            <CollapsibleTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className={`flex-shrink-0 h-8 w-8 p-0 ${
                                  darkMode ? 'hover:bg-[#FFB300]/10 text-[#FFB300]' : 'hover:bg-[#FFB300]/10 text-[#24292F]'
                                }`}
                              >
                                {isExpanded ? (
                                  <ChevronUp className="h-4 w-4" />
                                ) : (
                                  <ChevronDown className="h-4 w-4" />
                                )}
                              </Button>
                            </CollapsibleTrigger>
                          )}
                        </div>

                        {/* Expandable Details */}
                        <AnimatePresence>
                          {isExpanded && hasExpandableContent && (
                            <CollapsibleContent>
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.2 }}
                                className="mt-4 pt-4 border-t"
                                style={{ borderColor: darkMode ? '#1B2A44' : '#BDC3C7' }}
                              >
                                {/* Detailed Breakdown */}
                                {step.details && step.details.length > 0 && (
                                  <div className="mb-4">
                                    <div className={`text-xs mb-2 ${darkMode ? 'text-[#FFB300]/70' : 'text-[#24292F]/70'}`}>
                                      Detailed breakdown:
                                    </div>
                                    <div className="space-y-2">
                                      {step.details.map((detail, idx) => (
                                        <div
                                          key={idx}
                                          className={`text-sm pl-4 border-l-2 py-1.5 ${
                                            darkMode 
                                              ? 'border-[#FFB300]/30 text-[#FFB300]' 
                                              : 'border-[#FFB300]/30 text-[#24292F]'
                                          }`}
                                        >
                                          <div className="break-words overflow-x-auto">
                                            <code className="text-xs">{detail}</code>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}

                                {/* Bit Visualization Grid */}
                                {step.bits && (
                                  <div>
                                    <div className={`text-xs mb-3 ${darkMode ? 'text-[#FFB300]/70' : 'text-[#24292F]/70'}`}>
                                      Bit positions involved:
                                    </div>
                                    <div className="overflow-x-auto pb-2">
                                      <div className="flex flex-wrap gap-2 min-w-max">
                                        {step.bits.map((bit, idx) => (
                                          <div
                                            key={idx}
                                            className={`w-11 h-11 rounded flex flex-col items-center justify-center text-xs shadow-sm border-2 ${
                                              bit.highlight
                                                ? darkMode
                                                  ? 'bg-[#FFB300] text-white border-[#FFB300]'
                                                  : 'bg-[#FFB300] text-white border-[#FFB300]'
                                                : darkMode
                                                ? 'bg-[#2a2a2a] border-[#7C70C8] text-[#FFB300]'
                                                : 'bg-[#FFFFFF] border-[#E7E6F8] text-[#24292F]'
                                            }`}
                                          >
                                            <span className={`text-xs ${bit.highlight ? 'opacity-80' : 'opacity-60'}`}>
                                              {bit.position}
                                            </span>
                                            <span className="font-mono">{bit.value}</span>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </motion.div>
                            </CollapsibleContent>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </Collapsible>
                </motion.div>
              );
            })}
          </div>
        )}
      </ScrollArea>

      {/* Horizontal scrollbar is enabled; removed step navigation slider per request */}
    </Card>
  );
}
