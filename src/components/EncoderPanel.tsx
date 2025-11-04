import { useState, useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { AlertCircle, ArrowRight, Zap } from 'lucide-react';
import { BitVisualization } from './BitVisualization';
import { DetailedStepLog, DetailedStep } from './DetailedStepLog';
import { motion, AnimatePresence } from 'motion/react';
import { generateHammingCode, convertInputToBinary, simulateError } from './utils/hammingUtils';
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
        <Card className={`p-6 shadow-lg ${darkMode ? 'bg-[#2C2766] border-2 border-[#7C70C8]' : 'bg-[#FFFFFF] border-2 border-[#E7E6F8]'}`}>
          <div className="space-y-4">
            <div>
              <Label className={darkMode ? 'text-[#FFB300]' : 'text-[#24292F]'}>Input Format</Label>
              <Select value={inputFormat} onValueChange={setInputFormat}>
                <SelectTrigger className={`mt-2 ${darkMode ? 'bg-[#2C2766] border-2 border-[#7C70C8] text-[#FFB300]' : 'bg-[#FFFFFF] border-2 border-[#E7E6F8] text-[#24292F]'}`}>
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
                className={`mt-2 ${darkMode ? 'bg-[#2C2766] border-2 border-[#7C70C8] text-[#FFB300] placeholder:text-[#FFB300]/50' : 'bg-[#FFFFFF] border-2 border-[#E7E6F8] text-[#24292F] placeholder:text-[#24292F]/50'}`}
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
                <div className={`p-4 rounded-lg font-mono text-sm break-all overflow-x-auto border-2 ${darkMode ? 'bg-[#2C2766] border-[#7C70C8] text-[#FFB300]' : 'bg-[#FFFFFF] border-[#E7E6F8] text-[#24292F]'}`}>
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
              <Card className={`p-6 shadow-lg ${darkMode ? 'bg-[#2C2766] border-2 border-[#7C70C8]' : 'bg-[#FFFFFF] border-2 border-[#E7E6F8]'}`}>
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
                    <Badge key={pos} className={`${darkMode ? 'bg-[#FFB300]/20 text-[#FFB300] border-[#7C70C8]' : 'bg-[#FFB300]/20 text-[#24292F] border-[#E7E6F8]'}`}>
                      Position {pos}
                    </Badge>
                  ))}
                </div>
              </Card>

              <Card className={`p-6 shadow-lg ${darkMode ? 'bg-[#2C2766] border-2 border-[#7C70C8]' : 'bg-[#FFFFFF] border-2 border-[#E7E6F8]'}`}>
                <div className="flex items-center gap-2 mb-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${darkMode ? 'bg-[#FFB300]/20' : 'bg-[#FFB300]/20'}`}>
                    <span className={`${darkMode ? 'text-[#FFB300]' : 'text-[#24292F]'}`}>2</span>
                  </div>
                  <h3 className={darkMode ? 'text-[#FFB300]' : 'text-[#24292F]'}>Parity Calculations</h3>
                </div>
                <div className="space-y-3">
                  {hammingResult.parityCalculations.map((calc: any, idx: number) => (
                    <div key={idx} className={`p-3 rounded-lg border ${darkMode ? 'bg-[#2C2766] border-[#7C70C8]' : 'bg-[#FFFFFF] border-[#E7E6F8]'}`}>
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

              <Card className={`p-6 shadow-lg ${darkMode ? 'bg-[#2C2766] border-2 border-[#7C70C8]' : 'bg-[#FFFFFF] border-2 border-[#E7E6F8]'}`}>
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
                <Button
                  onClick={handleSimulateError}
                  variant="outline"
                  className={`mt-4 w-full shadow-md border-2 ${darkMode ? 'border-[#FFB300] text-[#FFB300] hover:bg-[#FFB300]/10' : 'border-[#FFB300] text-[#FFB300] hover:bg-[#FFB300]/10'}`}
                  disabled={errorSimulated}
                >
                  <Zap className="w-4 h-4 mr-2" />
                  {errorSimulated ? 'Error Simulated' : 'Simulate Transmission Error'}
                </Button>
                {errorSimulated && (
                  <div className={`mt-3 p-3 rounded-lg flex items-start gap-2 border-2 ${darkMode ? 'bg-[#FFB300]/10 border-[#FFB300]' : 'bg-[#FFB300]/10 border-[#FFB300]'}`}>
                    <AlertCircle className={`w-5 h-5 flex-shrink-0 mt-0.5 ${darkMode ? 'text-[#FFB300]' : 'text-[#24292F]'}`} />
                    <p className={`text-sm ${darkMode ? 'text-[#FFB300]' : 'text-[#24292F]'}`}>
                      A single-bit error has been introduced at position {hammingResult.errorPosition + 1}. Use the Decode tab to detect and correct it!
                    </p>
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
