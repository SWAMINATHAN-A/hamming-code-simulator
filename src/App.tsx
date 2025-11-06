import React from 'react';
import { Header } from './components/Header';
import { EncoderPanel } from './components/EncoderPanel';
import { DecoderPanel } from './components/DecoderPanel';
import Help from './components/Help';
import Learn from './components/Learn';
import DevelopedBy from './components/DevelopedBy';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { motion } from 'motion/react';

export default function App() {
  const [darkMode, setDarkMode] = React.useState(false);
  const [showHelp, setShowHelp] = React.useState(false);
  const [showLearn, setShowLearn] = React.useState(false);
  const [showDevelopedBy, setShowDevelopedBy] = React.useState(false);

  React.useEffect(() => {
    const openHelp = () => setShowHelp(true);
    const openLearn = () => setShowLearn(true);
    const openDevelopedBy = () => setShowDevelopedBy(true);

    window.addEventListener('app-nav-help', openHelp);
    window.addEventListener('app-nav-learn', openLearn);
    window.addEventListener('app-nav-developed-by', openDevelopedBy);

    return () => {
      window.removeEventListener('app-nav-help', openHelp);
      window.removeEventListener('app-nav-learn', openLearn);
      window.removeEventListener('app-nav-developed-by', openDevelopedBy);
    };
  }, []);

  if (showHelp) return <Help onBack={() => setShowHelp(false)} darkMode={darkMode} setDarkMode={setDarkMode} />;
  if (showLearn) return <Learn onBack={() => setShowLearn(false)} darkMode={darkMode} setDarkMode={setDarkMode} />;
  if (showDevelopedBy) return <DevelopedBy onBack={() => setShowDevelopedBy(false)} darkMode={darkMode} setDarkMode={setDarkMode} />;

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-[#2C2766]' : 'bg-[#FFFFFF]'}`}>
      <div className={darkMode ? 'dark' : ''}>
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />

        <main className="container mx-auto px-4 py-8 max-w-7xl">

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
