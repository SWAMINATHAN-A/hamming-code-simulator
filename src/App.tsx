import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { EncoderPanel } from './components/EncoderPanel';
import { DecoderPanel } from './components/DecoderPanel';
import { ColorPaletteVisualization } from './components/ColorPaletteVisualization';
import Help from './components/Help';
import Learn from './components/Learn';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { motion } from 'motion/react';
import { Palette } from 'lucide-react';

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [showPalette, setShowPalette] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [showLearn, setShowLearn] = useState(false);

  useEffect(() => {
    const openHelp = () => setShowHelp(true);
    const openLearn = () => setShowLearn(true);

    window.addEventListener('app-nav-help', openHelp);
    window.addEventListener('app-nav-learn', openLearn);

    return () => {
      window.removeEventListener('app-nav-help', openHelp);
      window.removeEventListener('app-nav-learn', openLearn);
    };
  }, []);

  if (showPalette) return <ColorPaletteVisualization onBack={() => setShowPalette(false)} />;
  if (showHelp) return <Help onBack={() => setShowHelp(false)} darkMode={darkMode} />;
  if (showLearn) return <Learn onBack={() => setShowLearn(false)} darkMode={darkMode} />;

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-[#2C2766]' : 'bg-[#FFFFFF]'}`}>
      <div className={darkMode ? 'dark' : ''}>
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />

        <main className="container mx-auto px-4 py-8 max-w-7xl">
          <div className="mb-4 flex justify-end">
            <button
              onClick={() => setShowPalette(true)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors shadow-md ${
                darkMode 
                  ? 'bg-[#FFB300]/20 text-[#FFB300] hover:bg-[#FFB300]/30 border border-[#7C70C8]' 
                  : 'bg-[#FFB300]/10 text-[#24292F] hover:bg-[#FFB300]/20 border border-[#E7E6F8]'
              }`}
            >
              <Palette className="w-4 h-4" />
              <span className="text-sm">View Color Palettes</span>
            </button>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className={`rounded-2xl shadow-xl overflow-hidden ${darkMode ? 'bg-[#2C2766] border-2 border-[#7C70C8]' : 'bg-[#FFFFFF] border-2 border-[#E7E6F8]'}`}>
              <Tabs defaultValue="encode" className="w-full">
                <div className={`border-b-2 ${darkMode ? 'border-[#7C70C8]' : 'border-[#E7E6F8]'}`}>
                  <TabsList className={`w-full grid grid-cols-2 rounded-none h-16 ${darkMode ? 'bg-[#2C2766]' : 'bg-[#FFFFFF]'}`}>
                    <TabsTrigger value="encode" className="text-lg data-[state=active]:border-b-4 data-[state=active]:border-[#FFB300] rounded-none">
                      Sender (Encode)
                    </TabsTrigger>
                    <TabsTrigger value="decode" className="text-lg data-[state=active]:border-b-4 data-[state=active]:border-[#FFB300] rounded-none">
                      Receiver (Decode/Verify)
                    </TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="encode" className="p-8">
                  <EncoderPanel darkMode={darkMode} />
                </TabsContent>

                <TabsContent value="decode" className="p-8">
                  <DecoderPanel darkMode={darkMode} />
                </TabsContent>
              </Tabs>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
