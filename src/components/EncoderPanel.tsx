import { useState, useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { AlertCircle, ArrowRight, Zap, Copy, Check } from 'lucide-react';
import { BitVisualization } from './BitVisualization';
import { DetailedStepLog, DetailedStep } from './DetailedStepLog';
import { motion, AnimatePresence } from 'motion/react';
import { generateHammingCode, convertInputToBinary, simulateError, simulateManualError } from './utils/hammingUtils';
// removed resizable split per request

interface EncoderPanelProps {
  darkMode: boolean;
}

export function EncoderPanel({ darkMode }: EncoderPanelProps) {
  const [inputFormat, setInputFormat] = useState('binary');
  const [inputData, setInputData] = useState('');
  const [binaryStream, setBinaryStream] = useState('');
  const [hammingResult, setHammingResult] = useState<any>(null);
  const [errorSimulated, setErrorSimulated] = useState(false);
  const [detailedSteps, setDetailedSteps] = useState<DetailedStep[]>([]);
  const [manualBitPosition, setManualBitPosition] = useState<string>('');
  const [copiedToClipboard, setCopiedToClipboard] = useState(false);

  const handleConvertToBinary = () => {
    const result = convertInputToBinary(inputData, inputFormat);
    setBinaryStream(result.binary);
    
    const conversionStep: DetailedStep = {
      id: 'conversion',
      title: 'Input Conversion',
      description: result.message,
      result: `Binary: ${result.binary}`,
      type: 'info',
      details: [
        `Input format: ${inputFormat}`,
        `Input value: ${inputData}`,
        `Binary output: ${result.binary}`,
        `Length: ${result.binary.length} bits`
      ]
    };
    
    setDetailedSteps([conversionStep]);
    setHammingResult(null);
    setErrorSimulated(false);
  };

  const handleEncode = () => {
    if (!binaryStream) return;
    
    const result = generateHammingCode(binaryStream);
    setHammingResult(result);
    setErrorSimulated(false);
    
    // Use the detailed steps from the encoding result
    setDetailedSteps(prev => [...prev, ...(result.detailedSteps || [])]);
  };

  const handleSimulateError = () => {
    if (!hammingResult) return;
    
    const errorResult = simulateError(hammingResult.codeword);
    setHammingResult({ ...hammingResult, codeword: errorResult.codeword, errorPosition: errorResult.errorPosition });
    setErrorSimulated(true);
    
    const errorStep: DetailedStep = {
      id: 'error-simulation',
      title: 'Error Simulation',
      description: 'A single-bit transmission error has been introduced',
      result: `Error at position ${errorResult.errorPosition + 1}`,
      type: 'info',
      details: [
        `Error introduced at bit position: ${errorResult.errorPosition + 1}`,
        `Bit flipped from ${hammingResult.codeword[errorResult.errorPosition]} to ${errorResult.codeword[errorResult.errorPosition]}`,
        'Use the Decode tab to detect and correct this error'
      ]
    };
    
    setDetailedSteps(prev => [...prev, errorStep]);
  };

  /**
   * Handles manual bit flip at user-specified position
   * Validates input and provides detailed feedback
   */
  const handleManualBitFlip = () => {
    if (!hammingResult) return;

    const position = parseInt(manualBitPosition, 10);

    // Validate position input
    if (isNaN(position)) {
      alert('Please enter a valid number for the bit position.');
      return;
    }

    // Convert to 0-indexed (user sees 1-indexed positions)
    const zeroIndexedPosition = position - 1;

    // Validate position range
    if (zeroIndexedPosition < 0 || zeroIndexedPosition >= hammingResult.codeword.length) {
      alert(`Please enter a position between 1 and ${hammingResult.codeword.length}.`);
      return;
    }

    const errorResult = simulateManualError(hammingResult.codeword, zeroIndexedPosition);

    if (!errorResult) {
      alert('Failed to simulate error. Please try again.');
      return;
    }

    setHammingResult({ ...hammingResult, codeword: errorResult.codeword, errorPosition: errorResult.errorPosition });
    setErrorSimulated(true);

    const errorStep: DetailedStep = {
      id: 'manual-error-simulation',
      title: 'Manual Error Simulation',
      description: `A single-bit transmission error has been manually introduced at position ${position}`,
      result: `Error at position ${position}`,
      type: 'info',
      details: [
        `Error manually introduced at bit position: ${position}`,
        `Bit flipped from ${hammingResult.codeword[errorResult.errorPosition]} to ${errorResult.codeword[errorResult.errorPosition]}`,
        'Use the Decode tab to detect and correct this error'
      ]
    };

    setDetailedSteps(prev => [...prev, errorStep]);

    // Clear the input field after successful flip
    setManualBitPosition('');
  };

  /**
   * Copies the error-containing codeword to clipboard
   * Provides visual feedback on success/failure
   */
  const handleCopyCodeword = async () => {
    if (!hammingResult || !errorSimulated) return;

    try {
      // Convert codeword array to string
      const codewordString = hammingResult.codeword.join('');

      // Use modern Clipboard API
      await navigator.clipboard.writeText(codewordString);

      // Show success feedback
      setCopiedToClipboard(true);

      // Reset feedback after 2 seconds
      setTimeout(() => {
        setCopiedToClipboard(false);
      }, 2000);
    } catch (error) {
      // Fallback for older browsers or when clipboard access denied
      console.error('Failed to copy to clipboard:', error);
      alert('Failed to copy to clipboard. Please try manually selecting and copying the codeword.');
    }
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
    lines.push('Hamming Code - Encode Report');
    lines.push(new Date().toISOString());
    lines.push('');
    lines.push(`User Input: ${inputData || '(empty)'}`);
    lines.push(`Input Format: ${inputFormat}`);
    if (binaryStream) lines.push(`Binary Stream: ${binaryStream}`);
    if (hammingResult?.codeword) {
      lines.push(`Encoded Codeword: ${hammingResult.codeword.join ? hammingResult.codeword.join('') : hammingResult.codeword}`);
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
      downloadText('hamming-encode-report.txt', content);
    };
    window.addEventListener('app-download-request', handler);
    return () => window.removeEventListener('app-download-request', handler);
  }, [inputData, inputFormat, binaryStream, hammingResult, detailedSteps]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="space-y-6">
        <Card className={`p-6 shadow-lg ${darkMode ? 'bg-[#2a2a2a] border-2 border-gray-700' : 'bg-[#FFFFFF] border-2 border-gray-300'}`}>
          <div className="space-y-4">
            <div>
              <Label className={darkMode ? 'text-[#FFB300]' : 'text-[#24292F]'}>Input Format</Label>
              <Select value={inputFormat} onValueChange={setInputFormat}>
                <SelectTrigger className={`mt-2 ${darkMode ? 'bg-[#2a2a2a] border-2 border-gray-700 text-[#FFB300]' : 'bg-[#FFFFFF] border-2 border-gray-300 text-[#24292F]'}`}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="binary">Binary</SelectItem>
                  <SelectItem value="decimal">Decimal</SelectItem>
                  <SelectItem value="hexadecimal">Hexadecimal</SelectItem>
                  <SelectItem value="ascii">ASCII</SelectItem>
                  <SelectItem value="text">Plain Text</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className={darkMode ? 'text-[#FFB300]' : 'text-[#24292F]'}>Enter Your Data</Label>
              <Input
                placeholder="Enter your data here..."
                value={inputData}
                onChange={(e) => setInputData(e.target.value)}
                className={`mt-2 ${darkMode ? 'bg-[#2a2a2a] border-2 border-gray-700 text-[#FFB300] placeholder:text-[#FFB300]/50' : 'bg-[#FFFFFF] border-2 border-gray-300 text-[#24292F] placeholder:text-[#24292F]/50'}`}
              />
            </div>

            <Button onClick={handleConvertToBinary} className="w-full bg-[#FFB300] hover:bg-[#FFB300]/90 text-white shadow-md">
              <ArrowRight className="w-4 h-4 mr-2" />
              Convert to Binary
            </Button>

            {binaryStream && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="space-y-2"
              >
                <Label className={darkMode ? 'text-[#FFB300]' : 'text-[#24292F]'}>Binary Stream</Label>
                <div className={`p-4 rounded-lg font-mono text-sm break-all overflow-x-auto border-2 ${darkMode ? 'bg-[#2a2a2a] border-gray-700 text-[#FFB300]' : 'bg-[#FFFFFF] border-gray-300 text-[#24292F]'}`}>
                  {binaryStream}
                </div>
                <Button onClick={handleEncode} className="w-full bg-gradient-to-r from-[#FFB300] to-[#FFB300]/80 hover:from-[#FFB300]/90 hover:to-[#FFB300]/70 text-white shadow-md">
                  Generate Hamming Code
                </Button>
              </motion.div>
            )}
          </div>
        </Card>

        <AnimatePresence>
          {hammingResult && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <Card className={`p-6 shadow-lg ${darkMode ? 'bg-[#2a2a2a] border-2 border-gray-700' : 'bg-[#FFFFFF] border-2 border-gray-300'}`}>
                <div className="flex items-center gap-2 mb-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${darkMode ? 'bg-[#FFB300]/20' : 'bg-[#FFB300]/20'}`}>
                    <span className={`${darkMode ? 'text-[#FFB300]' : 'text-[#24292F]'}`}>1</span>
                  </div>
                  <h3 className={darkMode ? 'text-[#FFB300]' : 'text-[#24292F]'}>Parity Bit Placement</h3>
                </div>
                <p className={`text-sm mb-4 ${darkMode ? 'text-[#FFB300]/80' : 'text-[#24292F]/80'}`}>
                  Parity bits are placed at positions that are powers of 2 (1, 2, 4, 8, ...)
                </p>
                <div className="flex flex-wrap gap-2">
                  {hammingResult.parityPositions.map((pos: number) => (
                    <Badge key={pos} className={`${darkMode ? 'bg-[#FFB300]/20 text-[#FFB300] border-gray-700' : 'bg-[#FFB300]/20 text-[#24292F] border-gray-300'}`}>
                      Position {pos}
                    </Badge>
                  ))}
                </div>
              </Card>

              <Card className={`p-6 shadow-lg ${darkMode ? 'bg-[#2a2a2a] border-2 border-gray-700' : 'bg-[#FFFFFF] border-2 border-gray-300'}`}>
                <div className="flex items-center gap-2 mb-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${darkMode ? 'bg-[#FFB300]/20' : 'bg-[#FFB300]/20'}`}>
                    <span className={`${darkMode ? 'text-[#FFB300]' : 'text-[#24292F]'}`}>2</span>
                  </div>
                  <h3 className={darkMode ? 'text-[#FFB300]' : 'text-[#24292F]'}>Parity Calculations</h3>
                </div>
                <div className="space-y-3">
                  {hammingResult.parityCalculations.map((calc: any, idx: number) => (
                    <div key={idx} className={`p-3 rounded-lg border ${darkMode ? 'bg-[#2a2a2a] border-gray-700' : 'bg-[#FFFFFF] border-gray-300'}`}>
                      <div className="flex justify-between items-center">
                        <span className={`text-sm ${darkMode ? 'text-[#FFB300]' : 'text-[#24292F]'}`}>
                          P{calc.position} checks positions: {calc.checks.join(', ')}
                        </span>
                        <Badge variant="outline" className={calc.value === '1' ? 'border-[#FFB300] text-[#FFB300]' : darkMode ? 'border-[#FFB300] text-[#FFB300]' : 'border-[#24292F] text-[#24292F]'}>
                          {calc.value}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className={`p-6 shadow-lg ${darkMode ? 'bg-[#2a2a2a] border-2 border-gray-700' : 'bg-[#FFFFFF] border-2 border-gray-300'}`}>
                <div className="flex items-center gap-2 mb-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${darkMode ? 'bg-[#FFB300]/20' : 'bg-[#FFB300]/20'}`}>
                    <span className={`${darkMode ? 'text-[#FFB300]' : 'text-[#24292F]'}`}>3</span>
                  </div>
                  <h3 className={darkMode ? 'text-[#FFB300]' : 'text-[#24292F]'}>Final Codeword</h3>
                </div>
                <BitVisualization
                  bits={hammingResult.codeword}
                  parityPositions={hammingResult.parityPositions}
                  errorPosition={errorSimulated ? hammingResult.errorPosition : undefined}
                  darkMode={darkMode}
                  reverseOrder
                />

                {/* Error Simulation Controls */}
                <div className="mt-4 space-y-3">
                  <div className="flex flex-col sm:flex-row gap-3">
                    {/* Random Bit Flip Button */}
                    <Button
                      onClick={handleSimulateError}
                      variant="outline"
                      className={`flex-1 shadow-md border-2 ${darkMode ? 'border-[#FFB300] text-[#FFB300] hover:bg-[#FFB300]/10' : 'border-[#FFB300] text-[#FFB300] hover:bg-[#FFB300]/10'}`}
                      disabled={errorSimulated}
                      aria-label="Simulate random transmission error"
                    >
                      <Zap className="w-4 h-4 mr-2" />
                      {errorSimulated ? 'Error Simulated' : 'Random Bit Flip'}
                    </Button>

                    {/* Manual Bit Flip Controls */}
                    <div className="flex-1 flex gap-2">
                      <Input
                        type="number"
                        min="1"
                        max={hammingResult.codeword.length}
                        placeholder={`1-${hammingResult.codeword.length}`}
                        value={manualBitPosition}
                        onChange={(e) => setManualBitPosition(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !errorSimulated) {
                            handleManualBitFlip();
                          }
                        }}
                        className={`w-20 ${darkMode ? 'bg-[#2a2a2a] border-2 border-gray-700 text-[#FFB300] placeholder:text-[#FFB300]/50' : 'bg-[#FFFFFF] border-2 border-gray-300 text-[#24292F] placeholder:text-[#24292F]/50'}`}
                        disabled={errorSimulated}
                        aria-label="Enter bit position to flip (1-indexed)"
                      />
                      <Button
                        onClick={handleManualBitFlip}
                        variant="outline"
                        className={`flex-1 shadow-md border-2 ${darkMode ? 'border-[#FFB300] text-[#FFB300] hover:bg-[#FFB300]/10' : 'border-[#FFB300] text-[#FFB300] hover:bg-[#FFB300]/10'}`}
                        disabled={errorSimulated || !manualBitPosition}
                        aria-label="Flip bit at specified position"
                      >
                        Manual Bit Flip
                      </Button>
                    </div>
                  </div>

                  {/* Helper text for manual input */}
                  {!errorSimulated && (
                    <p className={`text-xs ${darkMode ? 'text-[#FFB300]/70' : 'text-[#24292F]/70'}`}>
                      💡 Choose "Random Bit Flip" for automatic error or enter a position (1-{hammingResult.codeword.length}) for manual control
                    </p>
                  )}
                </div>

                {errorSimulated && (
                  <div className="space-y-2">
                    <div className={`mt-3 p-3 rounded-lg flex items-start gap-2 border-2 ${darkMode ? 'bg-[#FFB300]/10 border-[#FFB300]' : 'bg-[#FFB300]/10 border-[#FFB300]'}`}>
                      <AlertCircle className={`w-5 h-5 flex-shrink-0 mt-0.5 ${darkMode ? 'text-[#FFB300]' : 'text-[#24292F]'}`} />
                      <p className={`text-sm ${darkMode ? 'text-[#FFB300]' : 'text-[#24292F]'}`}>
                        A single-bit error has been introduced at position {hammingResult.errorPosition + 1}. Use the Decode tab to detect and correct it!
                      </p>
                    </div>

                    {/* Copy Codeword Button */}
                    <div className="flex items-center justify-between gap-3">
                      <div className={`flex-1 p-2 rounded-lg font-mono text-sm break-all border ${darkMode ? 'bg-[#1a1a1a] border-gray-700 text-white' : 'bg-gray-50 border-gray-300 text-[#24292F]'}`}>
                        <span className={`text-xs ${darkMode ? 'text-white/70' : 'text-[#24292F]/70'}`}>Codeword with error: </span>
                        <span className="font-semibold">{hammingResult.codeword.join('')}</span>
                      </div>
                      <Button
                        onClick={handleCopyCodeword}
                        variant="outline"
                        size="sm"
                        className={`shadow-md border-2 whitespace-nowrap ${darkMode ? 'border-[#FFB300] text-[#FFB300] hover:bg-[#FFB300]/10' : 'border-[#FFB300] text-[#FFB300] hover:bg-[#FFB300]/10'}`}
                        aria-label={copiedToClipboard ? 'Codeword copied to clipboard' : 'Copy codeword with error to clipboard'}
                      >
                        {copiedToClipboard ? (
                          <>
                            <Check className="w-4 h-4 mr-2" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4 mr-2" />
                            Copy
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                )}
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
