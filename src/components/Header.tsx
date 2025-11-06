import { Moon, Sun } from "lucide-react";
import { Switch } from "./ui/switch";
import { Button } from "./ui/button";

interface HeaderProps {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
  onHome?: () => void;
}

export function Header({ darkMode, setDarkMode, onHome }: HeaderProps) {
  return (
    <>
      <header className={`border-b-2 ${darkMode ? "border-[#7C70C8] bg-[#2C2766]" : "border-[#E7E6F8] bg-[#FFFFFF]"} sticky top-0 z-50 backdrop-blur-sm bg-opacity-95 shadow-lg`}>
        <div className="container mx-auto px-4 py-4 max-w-7xl">
          <div className="flex justify-between items-center">
            
            {/* Logo & Title */}
            <div className="flex items-center gap-3">
              {onHome && (
                <Button variant="outline" size="sm" onClick={onHome} className={`${darkMode ? "bg-[#7C70C8] border-[#FFB300] text-[#FFB300] hover:bg-[#FFB300]/10" : "border-[#FFB300] text-[#24292F] hover:bg-[#FFB300]/10"}`}>
                  Home
                </Button>
              )}
              <div className="w-10 h-10 rounded-lg flex items-center justify-center shadow-md bg-gradient-to-br from-[#FFB300] to-[#FFB300]/80">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
                  <path d="M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
                  <path d="M16 4h2a2 2 0 0 1 2 2v4" />
                  <path d="M21 14H11" />
                  <path d="m15 10-4 4 4 4" />
                </svg>
              </div>
              <div>
                <h1 className={`text-xl ${darkMode ? "text-[#FFB300]" : "text-[#24292F]"}`}>Hamming Code Simulator</h1>
                <p className={`text-xs ${darkMode ? "text-[#FFB300]/70" : "text-[#24292F]/70"}`}>Error Detection & Correction</p>
              </div>
            </div>

            {/* Nav Buttons */}
            <div className="hidden md:flex items-center gap-3">
              <Button variant="outline" size="sm" onClick={() => window.dispatchEvent(new CustomEvent('app-nav-learn'))} className={`${darkMode ? "bg-[#2C2766] border-[#FFB300] text-[#FFB300] hover:bg-[#FFB300]/10" : "border-[#FFB300] text-[#24292F] hover:bg-[#FFB300]/10"}`}>Learn</Button>

              <Button variant="outline" size="sm" onClick={() => window.dispatchEvent(new CustomEvent('app-nav-developed-by'))} className={`${darkMode ? " bg-[#2C2766] border-[#FFB300] text-[#FFB300] hover:bg-[#FFB300]/10" : "border-[#FFB300] text-[#24292F] hover:bg-[#FFB300]/10"}`}>Developed By</Button>

              <Button variant="outline" size="sm" onClick={() => window.dispatchEvent(new CustomEvent("app-nav-help"))} className={`${darkMode ? " bg-[#2C2766] border-[#FFB300] text-[#FFB300] hover:bg-[#FFB300]/10" : "border-[#FFB300] text-[#24292F] hover:bg-[#FFB300]/10"}`}>Help</Button>

              <Button variant="outline" size="sm" onClick={() => window.dispatchEvent(new CustomEvent("app-download-request"))} className={`${darkMode ? "bg-[#2C2766] border-[#FFB300] text-[#FFB300] hover:bg-[#FFB300]/10" : "border-[#FFB300] text-[#24292F] hover:bg-[#FFB300]/10"}`}>Download</Button>
            </div>

            {/* Dark Mode */}
            <div className="flex items-center gap-3">
              <Sun className={`w-4 h-4 ${darkMode ? "text-[#FFB300]/50" : "text-[#FFB300]"}`} />
              <Switch checked={darkMode} onCheckedChange={setDarkMode} />
              <Moon className={`w-4 h-4 ${darkMode ? "text-[#FFB300]" : "text-[#24292F]/50"}`} />
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
