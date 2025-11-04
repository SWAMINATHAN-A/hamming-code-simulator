interface FormulaDisplayProps {
  formula: string;
  darkMode: boolean;
  className?: string;
}

export function FormulaDisplay({ formula, darkMode, className = '' }: FormulaDisplayProps) {
  // Parse and render mathematical formulas with proper notation
  const renderFormula = (text: string) => {
    const parts: JSX.Element[] = [];
    let i = 0;
    let key = 0;

    while (i < text.length) {
      // Handle superscript (^)
      if (text[i] === '^') {
        i++; // skip ^
        let superscript = '';
        
        // Check for braces
        if (text[i] === '{') {
          i++; // skip {
          while (i < text.length && text[i] !== '}') {
            superscript += text[i];
            i++;
          }
          i++; // skip }
        } else {
          // Single character superscript
          if (i < text.length) {
            superscript = text[i];
            i++;
          }
        }
        
        parts.push(
          <sup key={`sup-${key++}`} className="text-[0.7em] -top-[0.5em] relative">
            {superscript}
          </sup>
        );
      }
      // Handle subscript (_)
      else if (text[i] === '_') {
        i++; // skip _
        let subscript = '';
        
        // Check for braces
        if (text[i] === '{') {
          i++; // skip {
          while (i < text.length && text[i] !== '}') {
            subscript += text[i];
            i++;
          }
          i++; // skip }
        } else {
          // Single character subscript
          if (i < text.length) {
            subscript = text[i];
            i++;
          }
        }
        
        parts.push(
          <sub key={`sub-${key++}`} className="text-[0.7em] -bottom-[0.25em] relative">
            {subscript}
          </sub>
        );
      }
      // Regular text
      else {
        let text_content = '';
        while (i < text.length && text[i] !== '^' && text[i] !== '_') {
          text_content += text[i];
          i++;
        }
        if (text_content) {
          parts.push(<span key={`text-${key++}`}>{text_content}</span>);
        }
      }
    }

    return parts;
  };

  return (
    <div 
      className={`inline-flex items-center whitespace-nowrap ${darkMode ? 'text-[#FFB300]' : 'text-[#24292F]'} ${className}`}
      style={{ fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace' }}
    >
      {renderFormula(formula)}
    </div>
  );
}
