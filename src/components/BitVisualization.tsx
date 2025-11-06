import { motion } from 'motion/react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';

interface BitVisualizationProps {
  bits: string[];
  parityPositions: number[];
  errorPosition?: number;
  darkMode: boolean;
  showCorrected?: boolean;
  reorderFirstToLast?: boolean; // legacy support
  reverseOrder?: boolean;
}

export function BitVisualization({ bits, parityPositions, errorPosition, darkMode, showCorrected, reorderFirstToLast, reverseOrder }: BitVisualizationProps) {
  const n = bits.length;
  // Determine transformation mode: reverse has priority over rotate
  const useReverse = !!reverseOrder;
  const useRotate = !useReverse && !!reorderFirstToLast;

  // Compute displayed bits
  const displayBits = useReverse
    ? [...bits].reverse()
    : useRotate && n > 0
    ? [...bits.slice(1), bits[0]]
    : bits;

  // Map 1-based parity positions
  const displayParityPositions = useReverse
    ? parityPositions.map(p => n - p + 1)
    : useRotate
    ? parityPositions.map(p => (p === 1 ? n : p - 1))
    : parityPositions;

  // Map 0-based error index
  const displayErrorIndex = (() => {
    if (errorPosition === undefined) return undefined;
    if (useReverse) return n - 1 - errorPosition;
    if (useRotate) return errorPosition === 0 ? n - 1 : errorPosition - 1;
    return errorPosition;
  })();

  const isParity = (index: number) => displayParityPositions.includes(index + 1);
  const isError = (index: number) => displayErrorIndex !== undefined && displayErrorIndex === index;

  const originalPositionFromDisplayIndex = (displayIndex: number) => {
    if (useReverse) return n - displayIndex;
    if (useRotate) return displayIndex === n - 1 ? 1 : displayIndex + 2; // rotate left by 1
    return displayIndex + 1;
  };

  return (
    <TooltipProvider>
      <div className="flex flex-wrap gap-2">
        {displayBits.map((bit, index) => {
          const parity = isParity(index);
          const error = isError(index);

          return (
            <Tooltip key={index}>
              <TooltipTrigger asChild>
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className={`
                    relative w-12 h-14 rounded-lg flex flex-col items-center justify-center
                    font-mono cursor-pointer transition-all duration-200 hover:scale-110 shadow-md
                    ${error && !showCorrected
                      ? darkMode
                        ? 'bg-red-900/50 border-2 border-red-600 text-red-100'
                        : 'bg-red-100 border-2 border-red-500 text-red-900'
                      : error && showCorrected
                      ? darkMode
                        ? 'bg-[#FFB300]/30 border-2 border-[#FFB300] text-[#FFB300]'
                        : 'bg-[#FFB300]/30 border-2 border-[#FFB300] text-[#24292F]'
                      : parity
                      ? darkMode
                        ? 'bg-[#FFB300] border-2 border-[#FFB300] text-white'
                        : 'bg-[#FFB300] border-2 border-[#FFB300] text-white'
                      : darkMode
                      ? 'bg-[#2a2a2a] border-2 border-gray-700 text-[#FFB300]'
                      : 'bg-[#FFFFFF] border-2 border-[#E7E6F8] text-[#24292F]'
                    }
                  `}
                >
                  <span className="text-xs opacity-70 mb-1">{originalPositionFromDisplayIndex(index)}</span>
                  <span className="text-lg">{bit}</span>
                  {error && !showCorrected && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"
                    />
                  )}
                  {error && showCorrected && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 w-3 h-3 bg-[#FFB300] rounded-full"
                    />
                  )}
                </motion.div>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">
                  Position {originalPositionFromDisplayIndex(index)}: {parity ? 'Parity Bit' : 'Data Bit'}
                  {error && !showCorrected && ' (Error)'}
                  {error && showCorrected && ' (Corrected)'}
                </p>
              </TooltipContent>
            </Tooltip>
          );
        })}
      </div>
    </TooltipProvider>
  );
}
