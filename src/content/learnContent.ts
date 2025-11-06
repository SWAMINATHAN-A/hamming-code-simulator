// Content for the Learn component - edit this file to update the tutorial content

export const learnContent = {
  introduction: 'The Hamming code is one of the most fundamental and widely used error detection and correction coding techniques in the field of digital communication, computer memory systems, and information theory. Developed by Richard Wesley Hamming in the early 1950s, the code was introduced as a solution to the frequent undetected data errors that occurred in early computing machines. The Hamming code has since become one of the most well-known linear block codes, providing an efficient method for detecting and correcting single-bit errors that may occur during data transmission or storage.\n\nIn digital communication, transmitted data is highly prone to corruption due to noise, interference, or signal degradation. Such errors can lead to incorrect data interpretation at the receiver side. To mitigate this, additional redundant information can be added to the transmitted data, enabling the receiver to detect and even correct some of the errors without retransmission. The Hamming code is a prime example of this concept. It introduces redundancy in a systematic way that allows both detection and correction of single-bit errors, making it an excellent balance between efficiency, simplicity, and reliability.',

  hammingDistance: {
    text: `The foundation of Hamming code lies in the concept of the Hamming distance. The Hamming distance between two binary words of equal length is defined as the number of bit positions in which the two words differ. For instance, the Hamming distance between 101101 and 100001 is two, as the bits differ in the second and fourth positions. This concept is central to the design of error-detecting and error-correcting codes. The greater the minimum Hamming distance between codewords in a code, the stronger the error detection and correction capabilities of that code.

The minimum Hamming distance, denoted as $d_{min}$, is the smallest Hamming distance between any two valid codewords in a given code. For a code to be capable of detecting up to $s$ errors, the minimum distance between codewords must be at least $s + 1$. Similarly, for a code to be capable of correcting up to $t$ errors, the minimum distance must satisfy $d_{min} \\geq 2t + 1$. For standard Hamming codes, the minimum Hamming distance is 3. This allows the detection of up to two-bit errors and correction of one-bit errors in any given codeword.`,
    formula: `For Hamming codes, $d_{min} = 3$, allowing correction of single-bit errors and detection of double-bit errors.`,
    latexFormulas: [
      { label: 'Minimum Distance for Error Detection', formula: '$d_{min} \\geq s + 1$' },
      { label: 'Minimum Distance for Error Correction', formula: '$d_{min} \\geq 2t + 1$' },
      { label: 'Hamming Code Minimum Distance', formula: '$d_{min} = 3$' }
    ]
  },

  structure: {
    items: [
      { symbol: 'n', description: 'total bits in the codeword', latex: '$n$' },
      { symbol: 'k', description: 'data bits', latex: '$k$' },
      { symbol: 'r', description: 'parity bits', latex: '$r$' }
    ],
    note: 'Parity bits are placed at positions that are powers of two.',
    formulas: [
      { label: 'Code Length', formula: '$n = 2^r - 1$' },
      { label: 'Data Bits', formula: '$k = n - r = 2^r - r - 1$' },
      { label: 'Code Rate', formula: '$R = \\frac{k}{n} = \\frac{2^r - r - 1}{2^r - 1}$' }
    ]
  },

  parityExample: {
    label: 'Example: Hamming (7,4)',
    description: 'In Hamming (7,4) code: $n=7$, $k=4$, $r=3$',
    code: `Data: [D4 D3 D2 D1] = [1 0 1 1]
Positions: | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
Bit Type:  |P1 |P2 |D1 |P4 |D2 |D3 |D4|
Values:    | ? | ? | 1 | ? | 0 | 1 | 1 |

P1 = D1 ⊕ D2 ⊕ D4 = 0
P2 = D1 ⊕ D3 ⊕ D4 = 1
P4 = D2 ⊕ D3 ⊕ D4 = 0

Codeword: [P1 P2 D1 P4 D2 D3 D4] = 0 1 1 0 0 1 1 (0110011)`,
    parityFormulas: [
      { position: 1, formula: '$P_1 = D_1 \\oplus D_2 \\oplus D_4$' },
      { position: 2, formula: '$P_2 = D_1 \\oplus D_3 \\oplus D_4$' },
      { position: 4, formula: '$P_4 = D_2 \\oplus D_3 \\oplus D_4$' }
    ]
  },

  errorDetection: {
    code: `Received: 0111011
Syndrome bits locate the wrong bit (here, position 4).
Flip the erroneous bit to correct the data.`,
    syndromeFormula: '$S = S_1 S_2 S_4$',
    latexExplanation: 'The syndrome $S$ is calculated by checking parity bits. If $S \\neq 0$, an error exists at position $S$.'
  },

  mathematicalBackground: {
    title: 'Mathematical Foundation',
    concepts: [
      {
        name: 'Generator Matrix',
        description: 'The generator matrix $G$ for Hamming (7,4) code:',
        latex: '$G = \\begin{bmatrix} 1 & 0 & 0 & 0 & 1 & 1 & 0 \\\\ 0 & 1 & 0 & 0 & 1 & 0 & 1 \\\\ 0 & 0 & 1 & 0 & 0 & 1 & 1 \\\\ 0 & 0 & 0 & 1 & 1 & 1 & 1 \\end{bmatrix}$'
      },
      {
        name: 'Parity Check Matrix',
        description: 'The parity check matrix $H$ for Hamming (7,4) code:',
        latex: '$H = \\begin{bmatrix} 1 & 1 & 0 & 1 & 1 & 0 & 0 \\\\ 1 & 0 & 1 & 1 & 0 & 1 & 0 \\\\ 0 & 1 & 1 & 1 & 0 & 0 & 1 \\end{bmatrix}$'
      },
      {
        name: 'Encoding',
        description: 'Codeword generation:',
        latex: '$\\mathbf{c} = \\mathbf{d} \\cdot G$'
      },
      {
        name: 'Syndrome Calculation',
        description: 'Error detection:',
        latex: '$\\mathbf{s} = \\mathbf{r} \\cdot H^T$'
      }
    ]
  },

  video: {
    url: 'https://www.youtube.com/embed/X8jsijhllIA',
    title: 'Hamming Code Explanation'
  },

  references: [
    '"Digital Logic and Computer Design" by M. Morris Mano.',
    'Online Hamming code tutorials.',
    'Course lecture notes.',
    'R. W. Hamming, "Error Detecting and Error Correcting Codes," Bell System Technical Journal, 1950.'
  ]
};

