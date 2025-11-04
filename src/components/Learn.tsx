interface LearnProps {
  onBack: () => void;
  darkMode: boolean;
}

export default function Learn({ onBack, darkMode }: LearnProps) {
  return (
    <div className={`min-h-screen p-6 max-w-3xl mx-auto ${darkMode ? "text-[#FFB300] bg-[#1f1b45]" : "text-[#24292F] bg-white"}`}>
      {/* Back Button */}
      <div className="mb-8">
        <button onClick={onBack} className="flex items-center gap-2 text-[#FFB300] hover:opacity-80 transition-opacity">
          ← Back to Simulator
        </button>
      </div>

      <h1 className="text-3xl font-bold mb-6">Learn About Hamming Codes</h1>

      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold mb-2">What are Hamming Codes?</h2>
          <p className="opacity-90">
            Hamming codes are linear error-correcting codes that detect and correct single-bit errors in digital data. 
            They are widely used in memory systems and communication protocols.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Encoding Process</h2>
          <ol className="list-decimal pl-6 space-y-1 opacity-90">
            <li>Determine number of parity bits needed</li>
            <li>Place parity bits at positions that are powers of 2</li>
            <li>Calculate parity bits to cover specific bits</li>
            <li>Combine data and parity bits into final codeword</li>
          </ol>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Error Detection & Correction</h2>
          <ol className="list-decimal pl-6 space-y-1 opacity-90">
            <li>Recalculate parity bits from received data</li>
            <li>Compare with received parity bits</li>
            <li>Identify single-bit error positions</li>
            <li>Flip erroneous bits to correct data</li>
          </ol>
        </div>

        <div>
          <h2 className="text-xl font-semibold mt-6">References & Resources</h2>
          <p className="opacity-90">
            1. "Digital Logic and Computer Design" by M. Morris Mano.<br/>
             2. Online Hamming code tutorials.<br/>
             3. Lecture notes from your course.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mt-6">Animated Video</h2>
          <a href="https://www.youtube.com/watch?v=X8jsijhllIA" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
            Click here to watch
          </a>
        </div>
      </div>
    </div>
  );
}
