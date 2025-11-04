import React from 'react';
import { Button } from "./ui/button";

const LearnButton: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  if (isOpen) {
    return (
      <div className="fixed inset-0 bg-white dark:bg-gray-900 z-50 overflow-y-auto p-0 m-0">
        <div className="min-h-screen w-full p-0 m-0">
          <div className="flex justify-end p-2 sticky top-0 bg-white dark:bg-gray-900 z-10">
            <button 
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white text-2xl p-2"
              aria-label="Close"
            >
              ✕
            </button>
          </div>
          
          <div className="w-full max-w-4xl mx-auto px-4 py-8">
            {/* Profile Section */}
            <section className="mb-12">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Hamming Code Simulator</h2>
                <p className="text-gray-600 dark:text-gray-300">A project by</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Person 1 */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold">
                          J
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-lg font-semibold text-gray-900 dark:text-white truncate">Joel Alfred Israel</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">24BCE5361</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Person 2 */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-blue-600 flex items-center justify-center text-white text-2xl font-bold">
                          N
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-lg font-semibold text-gray-900 dark:text-white truncate">Nithin</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">24BCE5392</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section className="mb-8">
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium">Introduction to Hamming Codes</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Hamming codes are a family of linear error-correcting codes that can detect and correct single-bit errors.
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium">Key Concepts</h4>
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li>Parity bits and error detection</li>
                    <li>Hamming distance and error correction capability</li>
                    <li>Systematic code representation</li>
                    <li>Encoding and decoding algorithms</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium">Implementation</h4>
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li>Built with React and TypeScript</li>
                    <li>UI components using Radix UI and Tailwind CSS</li>
                    <li>State management using React Hooks</li>
                    <li>Responsive design for all screen sizes</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Source Code</h3>
              <div className="p-6 border dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800">
                <h4 className="font-medium text-lg mb-3 text-gray-800 dark:text-gray-200">GitHub Repository</h4>
                <p className="text-gray-700 dark:text-gray-300 mb-3">
                  The complete source code is available on GitHub:
                </p>
                <a 
                  href="https://github.com/your-username/hamming-code-simulator" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline inline-block text-lg"
                >
                  github.com/your-username/hamming-code-simulator
                </a>
              </div>
            </section>

            <section className="w-full max-w-7xl mx-auto mb-8">
              <div className="w-full aspect-video">
                <iframe
                  className="w-full h-full min-h-[400px] rounded-lg shadow-xl"
                  src="https://www.youtube.com/embed/X8jsijhllIA"
                  title="Hamming Code Explained"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen>
                </iframe>
              </div>
            </section>

            <section className="mb-8">
              <div className="space-y-4">
                <div className="p-6 border dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800">
                  <h4 className="font-medium text-lg mb-3 text-gray-800 dark:text-gray-200">References</h4>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                    <li>Hamming, R. W. (1950). "Error detecting and error correcting codes". Bell System Technical Journal.</li>
                    <li>Peterson, W. W., & Weldon, E. J. (1972). "Error-Correcting Codes". MIT Press.</li>
                  </ul>
                </div>
              </div>
            </section>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent dark:from-gray-900 dark:to-transparent pointer-events-none"></div>
        </div>
      </div>
    );
  }

  return (
    <Button 
      variant="outline" 
      onClick={() => setIsOpen(true)}
      className="ml-2"
    >
      Learn
    </Button>
  );
};

export default LearnButton;
