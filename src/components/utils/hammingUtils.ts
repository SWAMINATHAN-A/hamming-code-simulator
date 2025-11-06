// Utility functions for Hamming Code encoding and decoding

import { DetailedStep } from '../DetailedStepLog';

export function convertInputToBinary(input: string, format: string): { binary: string; message: string } {
  let binary = '';
  let message = '';

  try {
    switch (format) {
      case 'binary':
        binary = input.replace(/[^01]/g, '');
        message = 'Input is already in binary format';
        break;
      
      case 'decimal':
        const decimal = parseInt(input, 10);
        if (isNaN(decimal)) {
          return { binary: '', message: 'Invalid decimal number' };
        }
        binary = decimal.toString(2);
        message = `Decimal ${decimal} converted to binary`;
        break;
      
      case 'hexadecimal':
        const hex = input.replace(/^0x/i, '');
        const hexNum = parseInt(hex, 16);
        if (isNaN(hexNum)) {
          return { binary: '', message: 'Invalid hexadecimal number' };
        }
        binary = hexNum.toString(2);
        message = `Hexadecimal 0x${hex} converted to binary`;
        break;
      
      case 'ascii':
        binary = input
          .split('')
          .map(char => char.charCodeAt(0).toString(2).padStart(8, '0'))
          .join('');
        message = `ASCII text converted to binary (${input.length} characters)`;
        break;
      
      case 'text':
        binary = input
          .split('')
          .map(char => char.charCodeAt(0).toString(2).padStart(8, '0'))
          .join('');
        message = `Plain text converted to binary (${input.length} characters)`;
        break;
      
      default:
        binary = input.replace(/[^01]/g, '');
        message = 'Treated as binary input';
    }
  } catch (error) {
    return { binary: '', message: 'Conversion error' };
  }

  return { binary, message };
}

export function generateHammingCode(dataBits: string) {
  const data = dataBits.split('');
  const m = data.length;
  
  const detailedSteps: DetailedStep[] = [];
  
  // Step 1: Input data
  detailedSteps.push({
    id: 'input',
    title: 'Input Data Bits',
    description: `Received ${m} data bits to encode`,
    result: `Data: ${dataBits}`,
    type: 'info',
    details: [
      `Binary representation: ${dataBits}`,
      `Total data bits (m): ${m}`
    ]
  });
  
  // Calculate number of parity bits needed
  let r = 0;
  const calculations: string[] = [];
  while (Math.pow(2, r) < m + r + 1) {
    calculations.push(`2^${r} = ${Math.pow(2, r)} < ${m} + ${r} + 1 = ${m + r + 1}`);
    r++;
  }
  calculations.push(`2^${r} = ${Math.pow(2, r)} ≥ ${m} + ${r} + 1 = ${m + r + 1} ✓`);
  
  // Step 2: Calculate parity bits
  detailedSteps.push({
    id: 'parity-calc',
    title: 'Calculate Required Parity Bits',
    description: 'Using the formula to determine how many parity bits are needed for error detection and correction',
    formula: '2^{r} ≥ m + r + 1',
    calculation: `m = ${m}, testing r = 0, 1, 2, ... until condition is satisfied`,
    result: `r = ${r} parity bits needed`,
    type: 'formula',
    details: calculations
  });
  
  const n = m + r; // Total bits
  const codeword: string[] = new Array(n).fill('0');
  const parityPositions: number[] = [];
  
  // Identify parity positions (powers of 2)
  for (let i = 0; i < r; i++) {
    parityPositions.push(Math.pow(2, i));
  }
  
  // Step 3: Parity positions
  detailedSteps.push({
    id: 'parity-pos',
    title: 'Identify Parity Bit Positions',
    description: 'Parity bits are placed at positions that are powers of 2',
    result: `Positions: ${parityPositions.join(', ')}`,
    type: 'info',
    details: parityPositions.map((pos, idx) => `P${idx + 1} at position ${pos} (2^${idx})`)
  });
  
  // Place data bits in non-parity positions
  let dataIndex = 0;
  const dataPositions: number[] = [];
  for (let i = 1; i <= n; i++) {
    if (!parityPositions.includes(i)) {
      codeword[i - 1] = data[dataIndex];
      dataPositions.push(i);
      dataIndex++;
    }
  }
  
  // Step 4: Initial layout
  const layoutBits = codeword.map((bit, idx) => ({
    position: idx + 1,
    value: parityPositions.includes(idx + 1) ? 'P' : bit,
    highlight: !parityPositions.includes(idx + 1)
  }));
  
  detailedSteps.push({
    id: 'layout',
    title: 'Initial Codeword Layout',
    description: 'Data bits placed at non-parity positions, parity bits marked as P',
    result: `Total codeword length: ${n} bits (${m} data + ${r} parity)`,
    type: 'visual',
    bits: layoutBits,
    details: [
      `Data bit positions: ${dataPositions.join(', ')}`,
      `Parity bit positions: ${parityPositions.join(', ')}`
    ]
  });
  
  // Calculate parity bits
  const parityCalculations: any[] = [];
  for (const parityPos of parityPositions) {
    let parity = 0;
    const checksPositions: number[] = [];
    const bitValues: string[] = [];
    
    for (let i = 1; i <= n; i++) {
      // Check if this position should be included in this parity bit's calculation
      if ((i & parityPos) === parityPos) {
        checksPositions.push(i);
        bitValues.push(codeword[i - 1] === '1' ? '1' : '0');
        if (codeword[i - 1] === '1') {
          parity ^= 1;
        }
      }
    }
    
    codeword[parityPos - 1] = parity.toString();
    parityCalculations.push({
      position: parityPos,
      checks: checksPositions,
      value: parity.toString(),
      bitValues
    });
    
    // Step for each parity bit calculation
    const parityBits = checksPositions.map((pos, idx) => ({
      position: pos,
      value: bitValues[idx],
      highlight: pos === parityPos
    }));
    
    const xorCalc = bitValues.join(' ⊕ ') + ` = ${parity}`;
    
    detailedSteps.push({
      id: `parity-${parityPos}`,
      title: `Calculate Parity Bit P_{${parityPos}}`,
      description: `Position ${parityPos} checks all positions where bit ${parityPos} is set in their binary representation`,
      formula: `P_{${parityPos}} = bit_{${checksPositions.join('} ⊕ bit_{')}}`,
      calculation: `${bitValues.join(' ⊕ ')} = ${parity}`,
      result: `P_{${parityPos}} = ${parity}`,
      type: 'calculation',
      bits: parityBits,
      details: [
        `Checking positions: ${checksPositions.join(', ')}`,
        `Bit values at those positions: ${bitValues.join(', ')}`,
        `XOR calculation (even parity): ${xorCalc}`,
        `Result: Parity bit P${parityPos} is set to ${parity}`
      ]
    });
  }
  
  // Step: Final codeword
  const finalBits = codeword.map((bit, idx) => ({
    position: idx + 1,
    value: bit,
    highlight: parityPositions.includes(idx + 1)
  }));
  
  detailedSteps.push({
    id: 'final',
    title: 'Final Encoded Codeword',
    description: 'Complete Hamming code with all parity bits calculated',
    result: `Encoded: ${codeword.join('')}`,
    type: 'result',
    bits: finalBits,
    details: [
      `Total bits: ${n}`,
      `Data bits: ${m}`,
      `Parity bits: ${r}`,
      `Codeword: ${codeword.join('')}`
    ]
  });
  
  return {
    codeword,
    parityPositions,
    parityCalculations,
    dataBits: data,
    detailedSteps
  };
}

/**
 * Simulates a random single-bit error in the codeword
 * @param codeword The original codeword
 * @returns Object containing the modified codeword and the error position
 */
export function simulateError(codeword: string[]) {
  const errorPosition = Math.floor(Math.random() * codeword.length);
  const newCodeword = [...codeword];
  newCodeword[errorPosition] = newCodeword[errorPosition] === '0' ? '1' : '0';
  
  return {
    codeword: newCodeword,
    errorPosition
  };
}

/**
 * Simulates a manual single-bit error at a specified position in the codeword
 * @param codeword The original codeword
 * @param position The position to flip (0-indexed)
 * @returns Object containing the modified codeword and the error position, or null if position is invalid
 */
export function simulateManualError(codeword: string[], position: number) {
  // Validate position
  if (position < 0 || position >= codeword.length) {
    return null;
  }

  const newCodeword = [...codeword];
  newCodeword[position] = newCodeword[position] === '0' ? '1' : '0';

  return {
    codeword: newCodeword,
    errorPosition: position
  };
}

export function decodeHammingCode(codeword: string[]) {
  const n = codeword.length;
  const detailedSteps: DetailedStep[] = [];
  
  // Step 1: Received codeword
  const receivedBits = codeword.map((bit, idx) => ({
    position: idx + 1,
    value: bit,
    highlight: false
  }));
  
  detailedSteps.push({
    id: 'received',
    title: 'Received Codeword',
    description: `Analyzing received ${n}-bit codeword for errors`,
    result: `Received: ${codeword.join('')}`,
    type: 'info',
    bits: receivedBits,
    details: [`Codeword length: ${n} bits`]
  });
  
  // Determine parity positions
  const parityPositions: number[] = [];
  let r = 0;
  while (Math.pow(2, r) <= n) {
    parityPositions.push(Math.pow(2, r));
    r++;
  }
  
  detailedSteps.push({
    id: 'parity-detect',
    title: 'Identify Parity Positions',
    description: 'Parity bits are at power-of-2 positions',
    result: `Found ${r} parity bits at positions: ${parityPositions.join(', ')}`,
    type: 'info',
    details: parityPositions.map((pos, idx) => `P${pos} at position ${pos} (2^${idx})`)
  });
  
  // Perform parity checks
  const parityChecks: any[] = [];
  let syndrome = 0;
  const syndromeComponents: string[] = [];
  
  for (const parityPos of parityPositions) {
    let parity = 0;
    const checksPositions: number[] = [];
    const bitValues: string[] = [];
    
    for (let i = 1; i <= n; i++) {
      if ((i & parityPos) === parityPos) {
        checksPositions.push(i);
        bitValues.push(codeword[i - 1]);
        if (codeword[i - 1] === '1') {
          parity ^= 1;
        }
      }
    }
    
    parityChecks.push({
      position: parityPos,
      checks: checksPositions,
      result: parity,
      bitValues
    });
    
    if (parity !== 0) {
      syndrome += parityPos;
      syndromeComponents.push(`${parityPos}`);
    }
    
    const checkBits = checksPositions.map((pos, idx) => ({
      position: pos,
      value: bitValues[idx],
      highlight: pos === parityPos
    }));
    
    const xorCalc = bitValues.join(' ⊕ ') + ` = ${parity}`;
    
    detailedSteps.push({
      id: `check-${parityPos}`,
      title: `Parity Check P_{${parityPos}}`,
      description: `Verifying even parity at position ${parityPos} by checking all positions it covers`,
      formula: `P_{${parityPos}} = bit_{${checksPositions.join('} ⊕ bit_{')}}`,
      calculation: `${bitValues.join(' ⊕ ')} = ${parity}`,
      result: parity === 0 ? `✓ PASS (parity = 0)` : `✗ FAIL (parity = 1)`,
      type: 'calculation',
      bits: checkBits,
      details: [
        `Positions checked: ${checksPositions.join(', ')}`,
        `Bit values at those positions: ${bitValues.join(', ')}`,
        `XOR result: ${xorCalc}`,
        parity === 0 
          ? 'Even parity maintained ✓ (no error in this group)' 
          : 'Odd parity detected ✗ (indicates error in this group)'
      ]
    });
  }
  
  // Syndrome calculation
  detailedSteps.push({
    id: 'syndrome',
    title: 'Calculate Error Syndrome',
    description: 'The syndrome indicates the position of the error by summing failed parity check positions',
    formula: 'Syndrome = Σ(failed parity bit positions)',
    calculation: syndromeComponents.length > 0 
      ? `${syndromeComponents.join(' + ')} = ${syndrome}` 
      : '0 (no failures)',
    result: `Syndrome = ${syndrome}${syndrome !== 0 ? ` → Error at position ${syndrome}` : ' → No error'}`,
    type: 'formula',
    details: [
      `Failed parity checks: ${syndromeComponents.length > 0 ? syndromeComponents.join(', ') : 'None'}`,
      `Syndrome calculation: ${syndromeComponents.length > 0 ? syndromeComponents.join(' + ') : '0'}`,
      `Syndrome value: ${syndrome} (decimal) = ${syndrome.toString(2).padStart(4, '0')} (binary)`,
      syndrome === 0 
        ? 'Syndrome = 0 means no error detected ✓' 
        : `Syndrome = ${syndrome} directly gives the error position`
    ]
  });
  
  // Correct error if found
  const correctedCodeword = [...codeword];
  let originalBit = '';
  let correctedBit = '';
  
  if (syndrome !== 0) {
    originalBit = correctedCodeword[syndrome - 1];
    correctedCodeword[syndrome - 1] = correctedCodeword[syndrome - 1] === '0' ? '1' : '0';
    correctedBit = correctedCodeword[syndrome - 1];
    
    const errorBits = correctedCodeword.map((bit, idx) => ({
      position: idx + 1,
      value: bit,
      highlight: idx === syndrome - 1
    }));
    
    detailedSteps.push({
      id: 'correction',
      title: 'Error Correction Applied',
      description: `Single-bit error detected at position ${syndrome} and automatically corrected`,
      formula: `bit_{${syndrome}} = NOT(bit_{${syndrome}})`,
      calculation: `Flip bit at position ${syndrome}: ${originalBit} → ${correctedBit}`,
      result: `Error corrected successfully at position ${syndrome}`,
      type: 'result',
      bits: errorBits,
      details: [
        `Error location: Position ${syndrome}`,
        `Original (erroneous) bit value: ${originalBit}`,
        `Corrected bit value: ${correctedBit}`,
        `Corrected codeword: ${correctedCodeword.join('')}`
      ]
    });
  } else {
    detailedSteps.push({
      id: 'no-error',
      title: 'No Error Detected',
      description: 'All parity checks passed - codeword is correct',
      result: '✓ Transmission successful',
      type: 'result',
      details: ['Syndrome = 0', 'No correction needed']
    });
  }
  
  // Extract data bits (non-parity positions)
  const dataBits: string[] = [];
  const dataPositions: number[] = [];
  for (let i = 1; i <= n; i++) {
    if (!parityPositions.includes(i)) {
      dataBits.push(correctedCodeword[i - 1]);
      dataPositions.push(i);
    }
  }
  
  detailedSteps.push({
    id: 'extract',
    title: 'Extract Data Bits',
    description: 'Remove parity bits to recover original data',
    result: `Data: ${dataBits.join('')}`,
    type: 'result',
    details: [
      `Data bit positions: ${dataPositions.join(', ')}`,
      `Extracted ${dataBits.length} data bits`,
      `Original data: ${dataBits.join('')}`
    ]
  });
  
  return {
    parityChecks,
    syndrome,
    errorPosition: syndrome,
    correctedCodeword,
    dataBits,
    parityPositions,
    originalBit,
    correctedBit,
    detailedSteps
  };
}
