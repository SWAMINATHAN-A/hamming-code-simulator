import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { motion } from "motion/react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "./ui/accordion"; // Make sure you have these components

interface HelpProps {
  onBack: () => void;
  darkMode: boolean;
}

export default function Help({ onBack, darkMode }: HelpProps) {
  return (
    <div
      className={`min-h-screen p-6 max-w-3xl mx-auto ${
        darkMode ? "text-[#FFB300] bg-[#1f1b45]" : "text-[#24292F] bg-white"
      }`}
    >
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

      <h1 className="text-3xl font-bold mb-6">Help & Guide</h1>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="space-y-6"
      >
        {/* Step-by-Step Guide Card */}
        <Card
          className={`p-6 ${
            darkMode ? "bg-[#2C2766] border-[#7C70C8]" : "bg-white border-[#E7E6F8]"
          }`}
        >
          <h2 className="text-xl font-semibold mb-4">How to Use the Simulator</h2>

          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-lg mb-2">1. Enter Your Data</h3>
              <p className="opacity-90">
                Type or paste your binary data (0s and 1s) into the input field. The simulator will automatically validate your input.
              </p>
            </div>

            <div>
              <h3 className="font-medium text-lg mb-2">2. Encode the Data</h3>
              <p className="opacity-90">
                Click the "Encode" button to generate the Hamming code. The simulator will show you:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1 opacity-90">
                <li>Where the parity bits are placed</li>
                <li>How each parity bit is calculated</li>
                <li>The final encoded message</li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium text-lg mb-2">3. Introduce Errors (Optional)</h3>
              <p className="opacity-90">
                Use the "Introduce Error" button to flip a random bit in the encoded message. This helps you see how error detection and correction works.
              </p>
            </div>

            <div>
              <h3 className="font-medium text-lg mb-2">4. Decode and Correct</h3>
              <p className="opacity-90">
                Click "Decode" to see how the Hamming code can detect and correct single-bit errors. The simulator will:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1 opacity-90">
                <li>Check the parity bits</li>
                <li>Locate any single-bit errors</li>
                <li>Show the corrected message</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Accordion with Extra Help */}
        <Card
          className={`p-6 ${
            darkMode ? "bg-[#2C2766] border-[#7C70C8]" : "bg-white border-[#E7E6F8]"
          }`}
        >
          <Accordion type="single" collapsible>
            <AccordionItem value="inputs">
              <AccordionTrigger>How to give input</AccordionTrigger>
              <AccordionContent>
                - Choose an input format: Binary, Decimal, Hex, ASCII, or Text.<br/>
                - Enter your value and click “Convert to Binary”. The app shows the binary stream that will be encoded.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="flow">
              <AccordionTrigger>Correct flow to execute</AccordionTrigger>
              <AccordionContent>
                1) Encode tab: Convert to Binary, Generate Hamming Code, Optionally simulate an error.<br/>
                2) Decode tab: Paste/enter a codeword, Decode & Verify to compute syndrome, locate error, correct codeword, and extract data.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="interpret">
              <AccordionTrigger>How to interpret the results</AccordionTrigger>
              <AccordionContent>
                - Parity Steps: shows which positions each parity covers and the computed value.<br/>
                - Final/Corrected Codeword: grid of bits; highlighted cells indicate parity positions.<br/>
                - Syndrome/Error: non‑zero syndrome pinpoints the erroneous bit (1‑based index).<br/>
                - Extracted Data: original data bits after removing parity bits.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="download">
              <AccordionTrigger>Download your work</AccordionTrigger>
              <AccordionContent>
                Use the top “Download” button to export your inputs, outputs, and the entire step‑by‑step log as a text file.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="tips">
              <AccordionTrigger>Troubleshooting & tips</AccordionTrigger>
              <AccordionContent>
                - Only 0/1 are valid for binary codewords.<br/>
                - If the page appears blank, hard‑refresh (Ctrl+F5).<br/>
                - Use the “Help” button anytime to return to these instructions.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </Card>
      </motion.div>
    </div>
  );
}
