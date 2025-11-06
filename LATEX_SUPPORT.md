# LaTeX Support Added to Learn Component

## Changes Made

### 1. Enhanced Content File (`src/content/learnContent.ts`)
Added comprehensive LaTeX support with mathematical formulas:

- **Hamming Distance Section**:
  - Added `latexFormulas` array with formulas for error detection and correction
  - Formulas include: $d_{min} \geq s + 1$, $d_{min} \geq 2t + 1$, $d_{min} = 3$

- **Structure Section**:
  - Added `latex` property for each item (n, k, r)
  - Added `formulas` array with code length, data bits, and code rate formulas

- **Parity Example Section**:
  - Added `description` with LaTeX formatting
  - Added `parityFormulas` array with formulas for each parity bit position

- **Error Detection Section**:
  - Added `syndromeFormula`: $S = S_1 S_2 S_4$
  - Added `latexExplanation` with LaTeX math notation

- **New Mathematical Background Section**:
  - Generator Matrix $G$ for Hamming (7,4) code
  - Parity Check Matrix $H$ for Hamming (7,4) code
  - Encoding formula: $\mathbf{c} = \mathbf{d} \cdot G$
  - Syndrome calculation: $\mathbf{s} = \mathbf{r} \cdot H^T$

### 2. Created LaTeX Component (`src/components/LaTeX.tsx`)
- `LaTeX` component for rendering inline or block LaTeX
- `LaTeXText` component for rendering text with inline LaTeX formulas
- Automatically handles $ delimiters
- Uses KaTeX for fast rendering

### 3. Updated Learn Component (`src/components/Learn.tsx`)
- Integrated LaTeX rendering throughout all sections
- Added visual cards with colored backgrounds for formula displays
- Mathematical Background section with matrices and formulas
- All formulas now render beautifully with proper mathematical notation

### 4. Installed Dependencies
```bash
npm install katex react-katex --legacy-peer-deps
npm install --save-dev @types/react-katex --legacy-peer-deps
```

## How to Edit Content

Simply edit `src/content/learnContent.ts`:

- Use `$formula$` for inline math (e.g., `$d_{min} = 3$`)
- Add formulas to the respective arrays
- All LaTeX will automatically render in the Learn component

## Example LaTeX Syntax

- Subscripts: `$d_{min}$`
- Superscripts: `$2^r$`
- Fractions: `$\frac{k}{n}$`
- Greek letters: `$\oplus$` (XOR symbol)
- Matrices: `$\begin{bmatrix} ... \end{bmatrix}$`
- Not equal: `$\neq$`
- Greater/Less than or equal: `$\geq$`, `$\leq$`

## Benefits

✅ Professional mathematical notation
✅ Easy content editing in one place
✅ Consistent styling across all formulas
✅ Fast rendering with KaTeX
✅ Responsive and accessible

