import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

interface LaTeXProps {
    children: string;
    block?: boolean;
    className?: string;
    darkMode?: boolean;
}

export default function LaTeX({ children, block = false, className = '', darkMode = false }: LaTeXProps) {
  // Remove $ delimiters if present
  const cleanedContent = children.replace(/^\$+|\$+$/g, '');
  const style = darkMode ? { color: '#ffffff' } : {};

  if (block) {
    return (
      <div className={`my-4 ${className}`} style={style}>
        <BlockMath math={cleanedContent} />
      </div>
    );
  }
  
  return (
    <span className={className} style={style}>
      <InlineMath math={cleanedContent} />
    </span>
  );
}

// Helper component to render text with inline LaTeX
interface LaTeXTextProps {
  children: string;
  className?: string;
  darkMode?: boolean;
}

export function LaTeXText({ children, className = '', darkMode = false }: LaTeXTextProps) {
  // Split text by $ delimiters for inline math
  const parts = children.split(/(\$[^$]+\$)/g);
  
  return (
    <span className={className}>
      {parts.map((part, index) => {
        if (part.startsWith('$') && part.endsWith('$')) {
          return <LaTeX key={index} darkMode={darkMode}>{part}</LaTeX>;
        }
        return <span key={index}>{part}</span>;
      })}
    </span>
  );
}

