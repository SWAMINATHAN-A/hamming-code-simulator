import { Card } from './ui/card';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import { Download, RotateCcw } from 'lucide-react';

interface StepLogProps {
  steps: string[];
  darkMode: boolean;
}

export function StepLog({ steps, darkMode }: StepLogProps) {
  const handleExport = () => {
    const content = steps.join('\n');
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'hamming-code-log.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    window.location.reload();
  };

  return (
    <Card className={`p-6 sticky top-24 ${darkMode ? 'bg-gray-750 border-gray-700' : 'bg-white border-gray-200'}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className={darkMode ? 'text-white' : 'text-gray-900'}>Step Log</h3>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleExport}
            disabled={steps.length === 0}
            className={darkMode ? 'border-gray-600 hover:bg-gray-700' : ''}
          >
            <Download className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleReset}
            className={darkMode ? 'border-gray-600 hover:bg-gray-700' : ''}
          >
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <ScrollArea className="h-[500px] pr-4">
        {steps.length === 0 ? (
          <div className={`text-sm text-center py-8 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
            No steps logged yet. Start encoding or decoding to see the process.
          </div>
        ) : (
          <div className="space-y-3">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg text-sm ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-50 text-gray-700'}`}
              >
                <div className="flex gap-2">
                  <span className={`flex-shrink-0 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                    {index + 1}.
                  </span>
                  <span className="break-words">{step}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </ScrollArea>
    </Card>
  );
}
