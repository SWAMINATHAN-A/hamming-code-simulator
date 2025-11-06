import { useState, useEffect } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';
import { BitVisualization } from './BitVisualization';
import { DetailedStepLog, DetailedStep } from './DetailedStepLog';
import { motion, AnimatePresence } from 'motion/react';
import { decodeHammingCode } from './utils/hammingUtils';
// removed resizable split per request

interface DecoderPanelProps {
  darkMode: boolean;
}

export function DecoderPanel({ darkMode }: DecoderPanelProps) {
  const [receivedCodeword, setReceivedCodeword] = useState('');
  const [decodedResult, setDecodedResult] = useState<any>(null);
  const [detailedSteps, setDetailedSteps] = useState<DetailedStep[]>([]);

  const handleDecode = () => {
    if (!receivedCodeword) return;

    const codewordArray = receivedCodeword.split('').map(bit => bit.trim()).filter(bit => bit === '0' || bit === '1');
    
    if (codewordArray.length === 0) {
      const errorStep: DetailedStep = {
        id: 'error',
        title: 'Input Error',
        description: 'Please enter a valid binary codeword',
        type: 'info'
      };
      setDetailedSteps([errorStep]);
      return;
    }

    const result = decodeHammingCode(codewordArray);
    setDecodedResult(result);

    // Use the detailed steps from the decoding result
    setDetailedSteps(result.detailedSteps || []);
  };

  const downloadText = (filename: string, content: string) => {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const composeExport = (): string => {
    const lines: string[] = [];
    lines.push('Hamming Code - Decode Report');
    lines.push(new Date().toISOString());
    lines.push('');
    lines.push(`Received Codeword: ${receivedCodeword || '(empty)'}`);
    if (decodedResult) {
      lines.push(`Syndrome: ${decodedResult.syndrome}`);
      lines.push(`Error Position: ${decodedResult.errorPosition === 0 ? 'None' : decodedResult.errorPosition}`);
      if (decodedResult.correctedCodeword) {
        const cw = Array.isArray(decodedResult.correctedCodeword) ? decodedResult.correctedCodeword.join('') : decodedResult.correctedCodeword;
        lines.push(`Corrected Codeword: ${cw}`);
      }
      if (decodedResult.dataBits) lines.push(`Extracted Data Bits: ${decodedResult.dataBits.join('')}`);
    }
    lines.push('');
    detailedSteps.forEach((step, idx) => {
      lines.push(`Step ${idx + 1}: ${step.title}`);
      if (step.description) lines.push(step.description);
      if (step.formula) lines.push(`Formula: ${step.formula}`);
      if (step.calculation) lines.push(`Calculation: ${step.calculation}`);
      if (step.result) lines.push(`Result: ${step.result}`);
      if (step.details && step.details.length) {
        step.details.forEach(d => lines.push(`• ${d}`));
      }
      lines.push('='.repeat(60));
    });
    return lines.join('\n');
  };

  useEffect(() => {
    const handler = () => {
      const content = composeExport();
      downloadText('hamming-decode-report.txt', content);
    };
    window.addEventListener('app-download-request', handler);
    return () => window.removeEventListener('app-download-request', handler);
  }, [receivedCodeword, decodedResult, detailedSteps]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="space-y-6">
        <Card className={`p-6 shadow-lg ${darkMode ? 'bg-[#2a2a2a] border-2 border-gray-700' : 'bg-[#FFFFFF] border-2 border-gray-300'}`}>
          <div className="space-y-4">
            <div>
              <Label className={darkMode ? 'text-[#FFB300]' : 'text-[#24292F]'}>Received Codeword</Label>
              <Input
                placeholder="Enter received Hamming codeword (e.g., 1011010)"
                value={receivedCodeword}
                onChange={(e) => setReceivedCodeword(e.target.value)}
                className={`mt-2 font-mono border-2 ${darkMode ? 'bg-[#2a2a2a] border-gray-700 text-[#FFB300] placeholder:text-[#FFB300]/50' : 'bg-[#FFFFFF] border-gray-300 text-[#24292F] placeholder:text-[#24292F]/50'}`}
              />
              <p className={`text-xs mt-2 ${darkMode ? 'text-[#FFB300]/70' : 'text-[#24292F]/70'}`}>
                Enter the binary codeword received from transmission
              </p>
            </div>

            <Button onClick={handleDecode} className="w-full bg-gradient-to-r from-[#FFB300] to-[#FFB300]/80 hover:from-[#FFB300]/90 hover:to-[#FFB300]/70 text-white shadow-md">
              <ArrowRight className="w-4 h-4 mr-2" />
              Decode & Verify
            </Button>
          </div>
        </Card>

        <AnimatePresence>
          {decodedResult && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <Card className={`p-6 shadow-lg ${darkMode ? 'bg-[#2a2a2a] border-2 border-gray-700' : 'bg-[#FFFFFF] border-2 border-gray-300'}`}>
                <div className="flex items-center gap-2 mb-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${darkMode ? 'bg-[#FFB300]/20' : 'bg-[#FFB300]/20'}`}>
                    <span className={darkMode ? 'text-[#FFB300]' : 'text-[#24292F]'}>1</span>
                  </div>
                  <h3 className={darkMode ? 'text-[#FFB300]' : 'text-[#24292F]'}>Parity Checks</h3>
                </div>
                <div className="space-y-3">
                  {decodedResult.parityChecks.map((check: any, idx: number) => (
                    <div key={idx} className={`p-3 rounded-lg border ${darkMode ? 'bg-[#2a2a2a] border-gray-700' : 'bg-[#FFFFFF] border-gray-300'}`}>
                      <div className="flex justify-between items-center">
                        <span className={`text-sm ${darkMode ? 'text-[#FFB300]' : 'text-[#24292F]'}`}>
                          P{check.position} (positions {check.checks.join(', ')})
                        </span>
                        <Badge className={check.result === 0 ? 'bg-green-100 text-green-700 border-green-300' : 'bg-red-100 text-red-700 border-red-300'}>
                          {check.result === 0 ? 'PASS' : 'FAIL'}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className={`p-6 shadow-lg ${darkMode ? 'bg-[#2a2a2a] border-2 border-gray-700' : 'bg-[#FFFFFF] border-2 border-gray-300'}`}>
                <div className="flex items-center gap-2 mb-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${darkMode ? 'bg-[#FFB300]/20' : 'bg-[#FFB300]/20'}`}>
                    <span className={darkMode ? 'text-[#FFB300]' : 'text-[#24292F]'}>2</span>
                  </div>
                  <h3 className={darkMode ? 'text-[#FFB300]' : 'text-[#24292F]'}>Syndrome Analysis</h3>
                </div>
                <div className={`p-4 rounded-lg border-2 ${darkMode ? 'bg-[#2a2a2a] border-gray-700' : 'bg-[#FFFFFF] border-gray-300'}`}>
                  <div className="flex justify-between items-center mb-2">
                    <span className={`text-sm ${darkMode ? 'text-[#FFB300]/80' : 'text-[#24292F]/80'}`}>Syndrome Value:</span>
                    <span className={`font-mono ${darkMode ? 'text-[#FFB300]' : 'text-[#24292F]'}`}>
                      {decodedResult.syndrome} (0b{decodedResult.syndrome.toString(2).padStart(4, '0')})
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className={`text-sm ${darkMode ? 'text-[#FFB300]/80' : 'text-[#24292F]/80'}`}>Error Position:</span>
                    <span className={`font-mono ${darkMode ? 'text-[#FFB300]' : 'text-[#24292F]'}`}>
                      {decodedResult.errorPosition === 0 ? 'None' : decodedResult.errorPosition}
                    </span>
                  </div>
                </div>
                {decodedResult.errorPosition === 0 ? (
                  <div className={`mt-4 p-3 rounded-lg flex items-start gap-2 border-2 ${darkMode ? 'bg-green-950/30 border-green-600' : 'bg-green-50 border-green-300'}`}>
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <p className={`text-sm ${darkMode ? 'text-green-300' : 'text-green-800'}`}>
                      No errors detected! The codeword was transmitted correctly.
                    </p>
                  </div>
                ) : (
                  <div className={`mt-4 p-3 rounded-lg flex items-start gap-2 border-2 ${darkMode ? 'bg-[#FFB300]/10 border-[#FFB300]' : 'bg-[#FFB300]/10 border-[#FFB300]'}`}>
                    <AlertTriangle className={`w-5 h-5 flex-shrink-0 mt-0.5 ${darkMode ? 'text-[#FFB300]' : 'text-[#24292F]'}`} />
                    <p className={`text-sm ${darkMode ? 'text-[#FFB300]' : 'text-[#24292F]'}`}>
                      Single-bit error detected at position {decodedResult.errorPosition}. The error has been automatically corrected!
                    </p>
                  </div>
                )}
              </Card>

              <Card className={`p-6 shadow-lg ${darkMode ? 'bg-[#2a2a2a] border-2 border-gray-700' : 'bg-[#FFFFFF] border-2 border-gray-300'}`}>
                <div className="flex items-center gap-2 mb-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${darkMode ? 'bg-[#FFB300]/20' : 'bg-[#FFB300]/20'}`}>
                    <span className={darkMode ? 'text-[#FFB300]' : 'text-[#24292F]'}>3</span>
                  </div>
                  <h3 className={darkMode ? 'text-[#FFB300]' : 'text-[#24292F]'}>Corrected Codeword</h3>
                </div>
                <BitVisualization
                  bits={decodedResult.correctedCodeword}
                  parityPositions={decodedResult.parityPositions}
                  errorPosition={decodedResult.errorPosition > 0 ? decodedResult.errorPosition - 1 : undefined}
                  darkMode={darkMode}
                  showCorrected={true}
                  reverseOrder
                />
              </Card>

              <Card className={`p-6 shadow-lg ${darkMode ? 'bg-[#2a2a2a] border-2 border-gray-700' : 'bg-[#FFFFFF] border-2 border-gray-300'}`}>
                <div className="flex items-center gap-2 mb-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${darkMode ? 'bg-[#FFB300]/20' : 'bg-[#FFB300]/20'}`}>
                    <span className={darkMode ? 'text-[#FFB300]' : 'text-[#24292F]'}>4</span>
                  </div>
                  <h3 className={darkMode ? 'text-[#FFB300]' : 'text-[#24292F]'}>Extracted Data</h3>
                </div>
                <div className={`p-4 rounded-lg font-mono text-lg border-2 ${darkMode ? 'bg-[#2a2a2a] border-gray-700 text-[#FFB300]' : 'bg-[#FFFFFF] border-gray-300 text-[#24292F]'}`}>
                  {decodedResult.dataBits.join('')}
                </div>
                <p className={`text-sm mt-2 ${darkMode ? 'text-[#FFB300]/70' : 'text-[#24292F]/70'}`}>
                  Original data recovered by removing parity bits
                </p>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div>
        <DetailedStepLog steps={detailedSteps} darkMode={darkMode} />
      </div>
    </div>
  );
}
