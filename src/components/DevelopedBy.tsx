import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TeamMember = ({ name, regNo, role, github, linkedin, email, image }: { 
  name: string; 
  regNo: string; 
  role: string; 
  github?: string; 
  linkedin?: string; 
  email?: string; 
  image: string 
}) => (
  <div className="bg-white/5 dark:bg-[#2C2766]/30 p-6 rounded-xl border border-[#FFB300]/20 hover:border-[#FFB300]/50 transition-colors">
    <div className="flex flex-col items-center">
      <img
        src={image}
        alt={name}
        className="w-40 h-40 rounded-full border-4 border-[#FFB300] shadow-lg object-cover mb-4"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.src = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(name) + '&background=FFB300&color=fff';
        }}
      />
      <h3 className="text-2xl font-bold text-[#24292F] dark:text-[#FFB300]">{name}</h3>
      <p className="text-sm text-[#24292F]/70 dark:text-[#FFB300]/70">{regNo}</p>
      <p className="text-lg text-[#24292F] dark:text-[#FFB300]/90 mt-2">{role}</p>
      
      <div className="flex gap-4 mt-4">
        {github && github !== '#' && (
          <a 
            href={github} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-[#24292F] dark:text-[#FFB300] hover:opacity-80 transition-opacity"
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
            className="text-[#24292F] dark:text-[#FFB300] hover:opacity-80 transition-opacity"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
          </a>
        )}
        {email && email !== '#' && (
          <a 
            href={`mailto:${email}`} 
            className="text-[#24292F] dark:text-[#FFB300] hover:opacity-80 transition-opacity"
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
  onBack: () => void;
}

export default function DevelopedBy({ darkMode, onBack }: DevelopedByProps) {
  useEffect(() => {
    document.title = 'Developed By - Hamming Code Simulator';
  }, []);

  const teamMembers = [
    {
      name: "Joel Alfred Israel",
      regNo: "24BCE5361",
      role: "Lead Developer & UI/UX",
      github: "https://github.com/joelalfredisrael",
      linkedin: "https://linkedin.com/in/joelalfredisrael",
      email: "joel.alfredisrael@gmail.com",
      image: "/profiles/joel.jpg"
    },
    {
      name: "Nithin",
      regNo: "24BCE5392",
      role: "Backend & Algorithm Design",
      github: "#",
      linkedin: "#",
      email: "#",
      image: "/profiles/nithin.jpg"
    }
  ];

  return (
    <div className={`min-h-screen p-6 transition-colors duration-300 ${darkMode ? 'bg-[#1f1b45] text-[#FFB300]' : 'bg-white text-[#24292F]'}`}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="mb-12">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold">Development Team</h1>
              <p className="text-lg opacity-80 mt-2">Meet the creators of the Hamming Code Simulator</p>
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

        {/* Team Members */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {teamMembers.map((member, index) => (
            <TeamMember key={index} {...member} />
          ))}
        </div>

        {/* Project Info */}
        <div className={`max-w-3xl mx-auto p-8 rounded-2xl ${
          darkMode ? 'bg-[#2C2766]/50 border border-[#7C70C8]/30' : 'bg-gray-50 border border-gray-200'
        }`}>
          <h2 className="text-2xl font-bold mb-4">About This Project</h2>
          <p className="mb-6 text-lg leading-relaxed">
            The Hamming Code Simulator is an educational tool designed to demonstrate error detection and correction 
            using Hamming codes. This project was developed as part of our coursework in Digital Logic and Computer Design.
          </p>
          <h3 className="text-xl font-semibold mb-3">Key Features:</h3>
          <ul className="list-disc pl-6 space-y-2 mb-6">
            <li>Interactive encoding and decoding of Hamming codes</li>
            <li>Visual representation of error detection and correction</li>
            <li>Support for different Hamming code configurations</li>
            <li>Dark and light theme support</li>
          </ul>
          <div className="pt-4 border-t border-[#FFB300]/20">
            <p className="text-sm opacity-70">
              © {new Date().getFullYear()} Hamming Code Simulator | All Rights Reserved
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
