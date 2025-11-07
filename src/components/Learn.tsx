import { learnContent } from '../content/learnContent';
import LaTeX, { LaTeXText } from './LaTeX';
import { Header } from './Header';

interface LearnProps {
    onBack: () => void;
    darkMode: boolean;
    setDarkMode?: (v: boolean) => void;
}

export default function Learn({ onBack, darkMode, setDarkMode }: LearnProps) {
    // Match homepage purple scheme exactly
    const mainBg = darkMode ? 'bg-[#2C2766]' : 'bg-[#FFFFFF]';
    const cardBg = darkMode ? 'bg-[#2C2766]' : 'bg-[#FFFFFF]'; // Same as homepage
    const headingColor = 'text-[#FFB300]'; // gold for all headings
    const textColor = darkMode ? 'text-white' : 'text-[#24292F]';
    const borderColor = darkMode ? 'border-[#7C70C8]' : 'border-[#E7E6F8]';

    return (
        <div className={`min-h-screen transition-colors duration-300 ${mainBg}`}>
            <Header darkMode={darkMode} setDarkMode={setDarkMode} onHome={onBack} />


            <main className="container mx-auto px-4 py-8 max-w-7xl">
                <div className={`w-full ${cardBg} rounded-2xl px-8 py-3 ${borderColor}`}>
                    <h1 className={`text-4xl font-extrabold mb-12 text-center ${headingColor} tracking-wide`}>
                        Hamming Code Tutorial
                    </h1>

                    <div className="flex flex-col gap-8">{/* ...existing code... */}
                        {/* Introduction */}
                        <div className={`${cardBg} rounded-xl px-8 py-6  ${borderColor}`}>
                            <h2 className={`text-2xl font-semibold mb-4 ${headingColor}`}>Introduction</h2>
                            <p className={`text-lg leading-relaxed opacity-90 whitespace-pre-line ${textColor}`}>
                                {learnContent.introduction}
                            </p>
                        </div>

                        {/* Hamming Distance */}
                        <div className={`${cardBg} rounded-xl px-8 py-6 ${borderColor}`}>
                            <h2 className={`text-2xl font-semibold mb-4 ${headingColor}`}>1. Concept of Hamming Distance</h2>
                            <p className={`text-base leading-relaxed opacity-90 whitespace-pre-line mb-4 ${textColor}`}>
                                <LaTeXText darkMode={darkMode}>{learnContent.hammingDistance.text}</LaTeXText>
                            </p>
                            <p className={`text-base opacity-90 mb-4 ${textColor}`}>
                                <LaTeXText darkMode={darkMode}>{learnContent.hammingDistance.formula}</LaTeXText>
                            </p>
                            {learnContent.hammingDistance.latexFormulas && (
                                <div className={`space-y-3 mt-5 p-5 rounded-lg ${darkMode ? 'bg-[#3B3476] border border-[#7C70C8]' : 'bg-blue-50 border border-blue-200'}`}>
                                    {learnContent.hammingDistance.latexFormulas.map((item, idx) => (
                                        <div key={idx} className="flex flex-col mb-3">
                                            <span className={`text-sm font-semibold mb-2 ${headingColor}`}>{item.label}:</span>
                                            <LaTeX block darkMode={darkMode}>{item.formula}</LaTeX>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Structure */}
                        <div className={`${cardBg} rounded-xl  px-8 py-6  ${borderColor}`}>
                            <h2 className={`text-2xl font-semibold mb-4 ${headingColor}`}>2. Structure of Hamming Codes</h2>
                            <ul className={`list-disc pl-6 text-base space-y-2 mb-4 ${textColor}`}>
                                {learnContent.structure.items.map((item, idx) => (
                                    <li key={idx}>
                                        <LaTeX darkMode={darkMode}>{item.latex || item.symbol}</LaTeX> = {item.description}
                                    </li>
                                ))}
                            </ul>
                            <p className={`text-base opacity-90 mb-4 ${textColor}`}>{learnContent.structure.note}</p>
                            {learnContent.structure.formulas && (
                                <div className={`space-y-3 mt-5 p-5 rounded-lg ${darkMode ? 'bg-[#3B3476] border border-[#7C70C8]' : 'bg-green-50 border border-green-200'}`}>
                                    {learnContent.structure.formulas.map((item, idx) => (
                                        <div key={idx} className="flex flex-col mb-3">
                                            <span className={`text-sm font-semibold mb-2 ${headingColor}`}>{item.label}:</span>
                                            <LaTeX block darkMode={darkMode}>{item.formula}</LaTeX>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Parity Bit Placement */}
                        <div className={`${cardBg} rounded-xl  px-8 py-6  ${borderColor}`}>
                            <h2 className={`text-2xl font-semibold mb-4 ${headingColor}`}>3. Parity Bit Placement & Calculation</h2>
                            <div className="mb-4">
                                <span className={`px-3 py-1 rounded font-mono text-sm ${darkMode ? 'bg-[#FFB300] text-[#2C2766]' : 'bg-yellow-100 text-yellow-800'}`}>
                                    <LaTeXText darkMode={darkMode}>{learnContent.parityExample.label}</LaTeXText>
                                </span>
                            </div>
                            {learnContent.parityExample.description && (
                                <p className={`text-base mb-4 ${textColor}`}>
                                    <LaTeXText darkMode={darkMode}>{learnContent.parityExample.description}</LaTeXText>
                                </p>
                            )}
                            <div className="overflow-x-auto mb-5">
                                <pre className={`${darkMode ? 'bg-[#FFB300] text-green-200 border border-[#7C70C8]' : 'bg-gray-100 text-green-800 border border-gray-300'} rounded-lg p-5 text-sm whitespace-pre`}>
                                    {learnContent.parityExample.code}
                                </pre>
                            </div>
                            {learnContent.parityExample.parityFormulas && (
                                <div className={`space-y-3 p-5 rounded-lg ${darkMode ? 'bg-[#3B3476] border border-[#7C70C8]' : 'bg-purple-50 border border-purple-200'}`}>
                                    <p className={`text-sm font-semibold mb-3 ${headingColor}`}>Parity Bit Formulas:</p>
                                    {learnContent.parityExample.parityFormulas.map((item, idx) => (
                                        <div key={idx} className={`flex items-center gap-2 mb-2 ${textColor}`}>
                                            <span className="text-sm font-medium">Position {item.position}:</span>
                                            <LaTeX darkMode={darkMode}>{item.formula}</LaTeX>
                                        </div>
                                    ))}
                                </div>

                            )}
                        </div>


                        <div className={`rounded-2xl shadow-2xl overflow-hidden my-6 ${darkMode ? "border-2 border-white" : "border-2 border-gray-300"}`}>
                            <table className="min-w-[500px] w-full border-collapse text-base text-center">
                                <thead>
                                <tr>
                                    <th className={`border px-6 py-3 font-semibold text-lg ${darkMode ? "text-white border-white" : "border-gray-300"}`}>Associated data bits</th>
                                    <th className={`border px-6 py-3 font-semibold text-lg ${darkMode ? "text-white border-white" : "border-gray-300"}`}>P₁</th>
                                    <th className={`border px-6 py-3 font-semibold text-lg ${darkMode ? "text-white border-white" : "border-gray-300"}`}>P₂</th>
                                    <th className={`border px-6 py-3 font-semibold text-lg ${darkMode ? "text-white border-white" : "border-gray-300"}`}>P₄</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td className={`border px-6 py-3 ${darkMode ? "text-white border-white" : "border-gray-300"}`}>1</td>
                                    <td className={`border px-6 py-3 ${darkMode ? "text-white border-white" : "border-gray-300"}`}>1</td>
                                    <td className={`border px-6 py-3 text-[#FFB300] font-bold ${darkMode ? "border-white" : "border-gray-300"}`}>X</td>
                                    <td className={`border px-6 py-3 text-[#FFB300] font-bold ${darkMode ? "border-white" : "border-gray-300"}`}>X</td>
                                </tr>
                                <tr>
                                    <td className={`border px-6 py-3 ${darkMode ? "text-white border-white" : "border-gray-300"}`}>2</td>
                                    <td className={`border px-6 py-3 ${darkMode ? "text-white border-white" : "border-gray-300"}`}>0</td>
                                    <td className={`border px-6 py-3 ${darkMode ? "text-white border-white" : "border-gray-300"}`}>1</td>
                                    <td className={`border px-6 py-3 text-[#FFB300] font-bold ${darkMode ? "border-white" : "border-gray-300"}`}>X</td>
                                </tr>
                                <tr>
                                    <td className={`border px-6 py-3 ${darkMode ? "text-white border-white" : "border-gray-300"}`}>3</td>
                                    <td className={`border px-6 py-3 ${darkMode ? "text-white border-white" : "border-gray-300"}`}>1</td>
                                    <td className={`border px-6 py-3 ${darkMode ? "text-white border-white" : "border-gray-300"}`}>1</td>
                                    <td className={`border px-6 py-3 text-[#FFB300] font-bold ${darkMode ? "border-white" : "border-gray-300"}`}>X</td>
                                </tr>
                                <tr>
                                    <td className={`border px-6 py-3 ${darkMode ? "text-white border-white" : "border-gray-300"}`}>4</td>
                                    <td className={`border px-6 py-3 ${darkMode ? "text-white border-white" : "border-gray-300"}`}>0</td>
                                    <td className={`border px-6 py-3 ${darkMode ? "text-white border-white" : "border-gray-300"}`}>0</td>
                                    <td className={`border px-6 py-3 ${darkMode ? "text-white border-white" : "border-gray-300"}`}>1</td>
                                </tr>
                                <tr>
                                    <td className={`border px-6 py-3 ${darkMode ? "text-white border-white" : "border-gray-300"}`}>5</td>
                                    <td className={`border px-6 py-3 ${darkMode ? "text-white border-white" : "border-gray-300"}`}>1</td>
                                    <td className={`border px-6 py-3 ${darkMode ? "text-white border-white" : "border-gray-300"}`}>0</td>
                                    <td className={`border px-6 py-3 ${darkMode ? "text-white border-white" : "border-gray-300"}`}>1</td>
                                </tr>
                                <tr>
                                    <td className={`border px-6 py-3 ${darkMode ? "text-white border-white" : "border-gray-300"}`}>6</td>
                                    <td className={`border px-6 py-3 ${darkMode ? "text-white border-white" : "border-gray-300"}`}>0</td>
                                    <td className={`border px-6 py-3 ${darkMode ? "text-white border-white" : "border-gray-300"}`}>1</td>
                                    <td className={`border px-6 py-3 ${darkMode ? "text-white border-white" : "border-gray-300"}`}>1</td>
                                </tr>
                                <tr>
                                    <td className={`border px-6 py-3 ${darkMode ? "text-white border-white" : "border-gray-300"}`}>7</td>
                                    <td className={`border px-6 py-3 ${darkMode ? "text-white border-white" : "border-gray-300"}`}>1</td>
                                    <td className={`border px-6 py-3 ${darkMode ? "text-white border-white" : "border-gray-300"}`}>1</td>
                                    <td className={`border px-6 py-3 ${darkMode ? "text-white border-white" : "border-gray-300"}`}>1</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>



                        {/* Error Detection */}
                        <div className={`${cardBg} rounded-xl px-8 py-6  ${borderColor}`}>
                            <h2 className={`text-2xl font-semibold mb-10 ${headingColor}`}>4. Error Detection & Correction</h2>
                            <div className="overflow-x-auto mb-5">
                                <pre className={`${darkMode ? 'bg-[#FFB300] text-teal-200 border border-[#7C70C8]' : 'bg-gray-100 text-teal-800 border border-gray-300'} rounded-lg p-5 text-sm`}>
                                    {learnContent.errorDetection.code}
                                </pre>
                            </div>
                            {learnContent.errorDetection.syndromeFormula && (
                                <div className={`p-5 rounded-lg space-y-10 ${darkMode ? 'bg-[#3B3476] border border-[#7C70C8]' : 'bg-yellow-50 border border-yellow-200'}`}>
                                    <div>
                                        <p className={`text-sm font-semibold mb-3 ${headingColor}`}>Syndrome Calculation:</p>
                                        <div className={`flex items-center gap-2 flex-wrap ${textColor}`}>
                                            <LaTeX darkMode={darkMode}>{learnContent.errorDetection.syndromeFormula}</LaTeX>
                                            <span className="text-sm opacity-75">(binary representation of error position)</span>
                                        </div>
                                    </div>
                                    {learnContent.errorDetection.latexExplanation && (
                                        <p className={`text-sm opacity-90 border-t pt-3 ${darkMode ? 'border-[#7C70C8]' : 'border-yellow-200'} ${textColor}`}>
                                            <LaTeXText darkMode={darkMode}>{learnContent.errorDetection.latexExplanation}</LaTeXText>
                                        </p>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Mathematical Background */}
                        {learnContent.mathematicalBackground && (
                            <div className={`${cardBg} rounded-xl  px-14 py-10  ${borderColor}`}>
                                <h2 className={`text-2xl font-semibold mb-5 ${headingColor}`}>{learnContent.mathematicalBackground.title}</h2>
                                <div className="space-y-6">
                                    {learnContent.mathematicalBackground.concepts.map((concept, idx) => (
                                        <div key={idx} className={`border-l-4 border-[#FFB300] pl-5`}>
                                            <h3 className={`text-lg font-semibold mb-3 ${headingColor}`}>{concept.name}</h3>
                                            <p className={`text-sm mb-3 ${textColor}`}>
                                                <LaTeXText darkMode={darkMode}>{concept.description}</LaTeXText>
                                            </p>
                                            <div className={`p-4 rounded-lg overflow-x-auto ${darkMode ? 'bg-[#1a1a3e] border border-[#7C70C8]' : 'bg-gray-50 border border-gray-300'}`}>
                                                <LaTeX block darkMode={darkMode}>{concept.latex}</LaTeX>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Video Section */}
                        <div className={`${cardBg} rounded-xl shadow-sm px-8 py-6 fade-in border ${borderColor}`}>
                            <h2 className={`text-2xl font-semibold mb-5 ${headingColor}`}>Video Tutorial</h2>
                            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                                <iframe
                                    className="absolute top-0 left-0 w-full h-full rounded-lg"
                                    src={learnContent.video.url}
                                    title={learnContent.video.title}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    style={{ border: 0 }}
                                />
                            </div>
                        </div>

                        {/* References */}
                        <div className={`${cardBg} rounded-xl px-8 py-6 ${borderColor}`}>
                            <h2 className={`text-xl font-semibold mb-4 ${headingColor}`}>References & Resources</h2>
                            <ul className={`list-decimal pl-6 text-base space-y-2 opacity-90 ${textColor}`}>
                                {learnContent.references.map((ref, idx) => (
                                    <li key={idx}>{ref}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
