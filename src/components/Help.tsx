import { Card } from "./ui/card";
import { motion } from "motion/react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "./ui/accordion";
import { Header } from './Header';

interface HelpProps {
  onBack: () => void;
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
}

export default function Help({ onBack, darkMode, setDarkMode }: HelpProps) {
  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-[#2C2766]' : 'bg-[#FFFFFF]'}`}>
      <div className={darkMode ? 'dark' : ''}>
        <Header darkMode={darkMode} setDarkMode={setDarkMode} onHome={onBack} />

        <div className="p-6 max-w-3xl mx-auto">
      {/* Back Button */}
      <div className="mb-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-[#FFB300] hover:opacity-80 transition-opacity"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 12H5" />
            <path d="m12 19-7-7 7-7" />
          </svg>
          Back to Simulator
        </button>
      </div>


            <h1 className={`text-4xl font-extrabold mb-12 text-center ${'text-[#FFB300]'} tracking-wide`}>
                Help & Guide
            </h1>

            <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="space-y-6"
      >
        {/* Step-by-Step Guide Card */}
                <div className="flex justify-center items-center min-h-[80vh] px-4">
                    <Card
                        className={`p-10 rounded-[2rem] shadow-2xl border-4 max-w-2xl w-full transition-all duration-300 ${
                            darkMode
                                ? "bg-gradient-to-br from-[#2C2766] via-[#3B3476] to-[#10093e] border-[#FFB300]/60 text-white"
                                : "bg-[#FFFDF8] border-[#FFB300]/30 text-[#24292F]"
                        }`}
                    >
                        <h2 className="text-2xl font-extrabold mb-10 text-[#FFB300] tracking-wide text-center drop-shadow-lg">
                            How to Use the Simulator
                        </h2>
                        <div className="space-y-9">
                            {/* SECTION: STEP 1 */}
                            <div className="flex gap-6 items-start">
                                <span className="inline-flex items-center justify-center w-12 h-12 bg-[#FFECB3] dark:bg-[#3B3476] rounded-full text-3xl border-2 border-[#FFB300]/30">🟡</span>
                                <div>
                                    <h3 className="text-xl font-semibold mb-2 text-[#FFB300]">1. Enter Your Data</h3>
                                    <p className="opacity-95 text-[1.14rem] leading-relaxed">
                                        Type or paste your binary data (<b>0s</b> and <b>1s</b>) into the input field.<br />
                                        The simulator will automatically validate your input.
                                    </p>
                                </div>
                            </div>
                            {/* SECTION: STEP 2 */}
                            <div className="flex gap-6 items-start">
                                <span className="inline-flex items-center justify-center w-12 h-12 bg-[#FFECB3] dark:bg-[#3B3476] rounded-full text-3xl border-2 border-[#FFB300]/30">🔐</span>
                                <div>
                                    <h3 className="text-xl font-semibold mb-2 text-[#FFB300]">2. Encode the Data</h3>
                                    <p className="opacity-95 text-[1.14rem] leading-relaxed mb-1">
                                        Click the <span className="font-mono bg-[#FFB300]/15 px-2 py-1 rounded border border-[#FFB300]/30">Encode</span> button to generate the Hamming code.<br />
                                        The simulator will show you:
                                    </p>
                                    <ul className="list-disc pl-8 mt-3 mb-2 space-y-1 opacity-95 text-[1.14rem]">
                                        <li>Where the parity bits are placed</li>
                                        <li>How each parity bit is calculated</li>
                                        <li>The final encoded message</li>
                                    </ul>
                                </div>
                            </div>
                            {/* SECTION: STEP 3 */}
                            <div className="flex gap-6 items-start">
                                <span className="inline-flex items-center justify-center w-12 h-12 bg-[#FFECB3] dark:bg-[#3B3476] rounded-full text-3xl border-2 border-[#FFB300]/30">⚡</span>
                                <div>
                                    <h3 className="text-xl font-semibold mb-2 text-[#FFB300]">3. Introduce Errors (Optional)</h3>
                                    <p className="opacity-95 text-[1.14rem] leading-relaxed">
                                        Use <span className="font-mono bg-[#FFB300]/15 px-2 py-1 rounded border border-[#FFB300]/30">Introduce Error</span> to flip a random bit.<br />
                                        See how error detection and correction works.
                                    </p>
                                </div>
                            </div>
                            {/* SECTION: STEP 4 */}
                            <div className="flex gap-6 items-start">
                                <span className="inline-flex items-center justify-center w-12 h-12 bg-[#FFECB3] dark:bg-[#3B3476] rounded-full text-3xl border-2 border-[#FFB300]/30">✅</span>
                                <div>
                                    <h3 className="text-xl font-semibold mb-2 text-[#FFB300]">4. Decode and Correct</h3>
                                    <p className="opacity-95 text-[1.14rem] leading-relaxed mb-1">
                                        Click <span className="font-mono bg-[#FFB300]/15 px-2 py-1 rounded border border-[#FFB300]/30">Decode</span> to watch detection and correction of errors:
                                    </p>
                                    <ul className="list-disc pl-8 mt-3 space-y-1 opacity-95 text-[1.14rem]">
                                        <li>Check parity bits</li>
                                        <li>Locate errors</li>
                                        <li>Show corrected message</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>


                {/* Accordion with Extra Help */}
                <Card
                    className={`p-10 rounded-[2rem] shadow-2xl border-4 max-w-2xl w-full transition-all duration-300 ${
                        darkMode
                            ? "bg-gradient-to-br from-[#2C2766] via-[#3B3476] to-[#1a0e40] border-[#FFB300]/40 text-white"
                            : "bg-[#FFFDF8] border-[#FFB300]/10 text-[#24292F]"
                    }`}
                >
                    <h2 className="text-2xl font-extrabold mb-9 text-[#FFB300] text-center">Frequently Asked Questions (FAQ)</h2>
                    <Accordion type="single" collapsible className="space-y-6">
                        {[
                            {
                                title: "How to give input",
                                content: (
                                    <>
                                        • Choose an input format: <b>Binary</b>, <b>Decimal</b>, <b>Hex</b>, <b>ASCII</b>, or <b>Text</b>.<br />
                                        • Enter your value and click <b>“Convert to Binary”</b>. The app shows the binary stream that will be encoded.
                                    </>
                                )
                            },
                            {
                                title: "Correct flow to execute",
                                content: (
                                    <>
                                        • <b>Encode</b> tab: Convert to Binary. Generate Hamming Code. Optionally simulate an error.<br />
                                        • <b>Decode</b> tab: Paste/enter a codeword. Decode &amp; Verify to compute syndrome. Locate error. Correct codeword. Extract data.
                                    </>
                                )
                            },
                            {
                                title: "How to interpret the results",
                                content: (
                                    <>
                                        • <b>Parity Steps:</b> shows which positions each parity covers and the computed value.<br />
                                        • <b>Final/Corrected Codeword:</b> grid of bits; highlighted cells indicate parity positions.<br />
                                        • <b>Syndrome/Error:</b> non‑zero syndrome pinpoints the erroneous bit (1‑based index).<br />
                                        • <b>Extracted Data:</b> original data bits after removing parity bits.
                                    </>
                                )
                            },
                            {
                                title: "Download your work",
                                content: "• Use the top “Download” button to export your inputs, outputs, and the entire step‑by‑step log as a text file."
                            },
                            {
                                title: "Troubleshooting & tips",
                                content: (
                                    <>
                                        • Only 0.1 are valid for binary codewords.<br />
                                        • If the page appears blank, hard‑refresh (<b>Ctrl+F5</b>).<br />
                                        • Use the <b>“Help”</b> button anytime to return to these instructions.
                                    </>
                                )
                            }
                        ].map(({ title, content }, idx) => (
                            <AccordionItem key={idx} value={`q${idx}`}>
                                <div
                                    className={`rounded-xl border-2 p-5 ${
                                        darkMode
                                            ? "bg-[#3B3476]/70 border-[#7C70C8]"
                                            : "bg-white border-[#FFB300]/10 shadow-md"
                                    } transition-colors`}
                                >
                                    <AccordionTrigger
                                        className="text-[1.13rem] font-semibold px-2 py-2 rounded-lg focus:bg-[#FFB300]/10 data-[state=open]:bg-[#FFB300]/20 transition-all"
                                    >
                                        {title}
                                    </AccordionTrigger>
                                    <AccordionContent className="pl-3 py-4 text-base leading-7 opacity-95">{content}</AccordionContent>
                                </div>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </Card>



            </motion.div>
        </div>
      </div>
    </div>
  );
}
