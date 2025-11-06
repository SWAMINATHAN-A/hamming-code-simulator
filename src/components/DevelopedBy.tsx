import React from 'react';
import { X } from 'lucide-react';
import { Header } from './Header';

const TeamMember = ({ name, regNo, role, github, linkedin, email, image }: {
  name: string;
  regNo: string;
  role: string;
  github?: string;
  linkedin?: string;
  email?: string;
  image: string
}) => (
  <div className="bg-white dark:bg-[#1a1a1a] p-6 rounded-2xl border border-[#FFB300]/20 hover:border-[#FFB300]/50 dark:border-[#333333] dark:hover:border-[#FFB300]/50">
    <div className="flex flex-col items-center">
      <img
        src={image}
        alt={name}
        className="w-32 h-32 rounded-full border-4 border-[#FFB300] shadow-lg object-cover mb-12"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.src = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(name) + '&background=[#FFB300]&color=fff';
        }}
      />
      <h3 className="text-2xl font-bold text-[#24292F] dark:text-[#FFFFFF]">{name}</h3>
      <p className="text-sm text-[#24292F]/70 dark:text-[#FFFFFF]/70">{regNo}</p>
      <p className="text-lg text-[#24292F] dark:text-[#FFFFFF]/90 mt-2">{role}</p>

      <div className="flex gap-4 mt-4">
        {github && github !== '#' && (
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#24292F] dark:text-[#FFFFFF] hover:opacity-80 transition-opacity"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.39-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </a>
        )}
        {linkedin && linkedin !== '#' && (
          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#24292F] dark:text-[#FFFFFF] hover:opacity-80 transition-opacity"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
          </a>
        )}
        {email && email !== '#' && (
          <a
            href={`mailto:${email}`}
            className="text-[#24292F] dark:text-[#FFFFFF] hover:opacity-80 transition-opacity"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
            </svg>
          </a>
        )}
      </div>
    </div>
  </div>
);

interface DevelopedByProps {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
  onBack: () => void;
}

export default function DevelopedBy({ darkMode, setDarkMode, onBack }: DevelopedByProps) {
  React.useEffect(() => {
    document.title = 'Developed By - Hamming Code Simulator';
  }, []);

  const teamMembers = [
    {
      name: "Joel Alfred Israel",
      regNo: "24BCE5361",
      role: "Lead Developer & UI/UX",
      github: "https://github.com/Joel01010",
      linkedin: "https://www.linkedin.com/in/joel-alfred-israel-a24204315/",
      email: "joel010.alfred@gmail.com",
      image: "/profiles/joel.jpg"
    },
    {
      name: "Nithin",
      regNo: "24BCE5392",
      role: "Backend & Algorithm Design",
      github: "https://github.com/NITHIN777-DOTCOM",
      linkedin: "https://www.linkedin.com/in/nithin-r-876b5b373/",
      email: "nithinthegreat06@gmail.com",
      image: "/profiles/nithin.jpg"
    }
  ];

  const guide = {
    name: "Dr. Swaminathan Annadurai",
    regNo: "Faculty",
    role: "Guide",
    github: "#",
    linkedin: "#",
    email: "#",
    image: "/profiles/Dr_Swaminathan_Annadurai.jpg"
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-[#2C2766]' : 'bg-[#FFFFFF]'}`}>
      <div className={darkMode ? 'dark' : ''}>
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />

        <div className="p-6">
          <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="mb-12">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className={`text-4xl font-bold ${darkMode ? 'text-[#FFB300]' : 'text-[#24292F]'}`}>Development Team</h1>
              <p className={`text-lg opacity-80 mt-2 ${darkMode ? 'text-[#FFB300]' : 'text-[#24292F]'}`}>Meet the creators of the Hamming Code Simulator</p>
            </div>
            <button
              onClick={onBack}
              className={`flex items-center gap-2 px-6 py-2 rounded-lg transition-all ${
                darkMode
                  ? 'bg-[#FFB300]/20 hover:bg-[#FFB300]/30 text-[#FFB300] border border-[#FFB300]/30'
                  : 'bg-[#FFB300]/10 hover:bg-[#FFB300]/20 text-[#24292F] border border-[#E7E6F8]'
              }`}
            >
              <X className="w-5 h-5" />
              <span>Close</span>
            </button>
          </div>
        </header>

        {/* Team Members - Top Row */}
        <div className="grid grid-cols-1 rounded-xl md:grid-cols-2 gap-8 mb-4">
          {teamMembers.map((member, index) => (
            <TeamMember key={index} {...member} />
          ))}
        </div>
        <div className={"bg-clip-padding"}>


        </div>
        {/* Guide - Centered Bottom Row */}
        <div className="flex justify-center rounded-2xl mb-12">
          <div className="w-half rounded-2xl md:w-1/2">
            <TeamMember {...guide} />
          </div>
        </div>

        {/* Project Info */}
        <div className={`max-w-3xl mx-auto p-8 rounded-2xl ${
          darkMode ? 'bg-[#2C2766] border border-[#7C70C8]' : 'bg-white border border-[#E7E6F8]'
        }`}>
          <h2 className="text-2xl text-[#FFB300] font-bold mb-3">About This Project</h2>
          <p className="mb-6 text-lg text-[#FFB300] leading-relaxed">
            The Hamming Code Simulator is an educational tool designed to demonstrate error detection and correction
            using Hamming codes. This project was developed as part of our coursework in Digital Logic and Computer Design.
          </p>
          <h3 className="text-xl text-[#FFB300] font-semibold mb-3">Key Features:</h3>
          <ul className="list-disc text-[#FFB300] pl-6 space-y-2 mb-6">
            <li>Interactive encoding and decoding of Hamming codes</li>
            <li>Visual representation of error detection and correction</li>
            <li>Support for different Hamming code configurations</li>
            <li>Dark and light theme support</li>
          </ul>
          <div className="pt-4 border-t border-[#FFB300]/20">
            <p className={`text-sm opacity-70 ${darkMode ? 'text-[#FFB300]' : 'text-[#24292F]'}`}>
              © 2025 Hamming Code Simulator | Open Source under the MIT License

            </p>
          </div>
        </div>
          </div>
        </div>
      </div>
    </div>
  );
}
