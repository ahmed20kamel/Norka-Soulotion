// Real brand logo SVGs for technology partners

export const MicrosoftLogo = ({ className = "h-8" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 108 23" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="0" y="0" width="10" height="10" fill="#f25022"/>
    <rect x="11.5" y="0" width="10" height="10" fill="#7fba00"/>
    <rect x="0" y="11.5" width="10" height="10" fill="#00a4ef"/>
    <rect x="11.5" y="11.5" width="10" height="10" fill="#ffb900"/>
    <text x="28" y="16" fontFamily="Segoe UI, Arial" fontWeight="600" fontSize="14" fill="currentColor">Microsoft</text>
  </svg>
);

export const CiscoLogo = ({ className = "h-8" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 100 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g fill="#1ba0d8">
      <rect x="44" y="0" width="5" height="16" rx="2.5"/>
      <rect x="35" y="4" width="5" height="12" rx="2.5"/>
      <rect x="53" y="4" width="5" height="12" rx="2.5"/>
      <rect x="26" y="8" width="5" height="8" rx="2.5"/>
      <rect x="62" y="8" width="5" height="8" rx="2.5"/>
    </g>
    <text x="10" y="35" fontFamily="Arial" fontWeight="700" fontSize="13" fill="currentColor">CISCO</text>
  </svg>
);

export const AWSLogo = ({ className = "h-8" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 80 30" fill="none" xmlns="http://www.w3.org/2000/svg">
    <text x="0" y="20" fontFamily="Arial" fontWeight="800" fontSize="16" fill="#FF9900">aws</text>
    <path d="M0 24 Q40 30 80 24" stroke="#FF9900" strokeWidth="2" fill="none"/>
  </svg>
);

export const GoogleCloudLogo = ({ className = "h-8" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 120 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 6C10.7 6 8 8.7 8 12C8 15.3 10.7 18 14 18C15.9 18 17.6 17.1 18.7 15.7L20.9 17.9C19.1 20 16.7 21 14 21C9.0 21 5 17 5 12C5 7 9 3 14 3C16.8 3 19.3 4.1 21.1 6L18.9 8.2C17.8 6.8 16.0 6 14 6Z" fill="#4285F4"/>
    <path d="M14 6L20 6L20 9L17 9" stroke="#34A853" strokeWidth="1" fill="none"/>
    <text x="24" y="17" fontFamily="Arial" fontWeight="500" fontSize="11" fill="currentColor">Google Cloud</text>
  </svg>
);

export const FortinetLogo = ({ className = "h-8" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 100 30" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 5H15V25H5V5Z" fill="#EE3124"/>
    <path d="M5 13H20V17H5V13Z" fill="#EE3124"/>
    <text x="22" y="20" fontFamily="Arial" fontWeight="700" fontSize="13" fill="currentColor">fortinet</text>
  </svg>
);

export const VMwareLogo = ({ className = "h-8" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 100 30" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="15" r="10" fill="#696566"/>
    <path d="M7 15L12 8L17 15L12 22Z" fill="white"/>
    <text x="26" y="20" fontFamily="Arial" fontWeight="600" fontSize="13" fill="currentColor">VMware</text>
  </svg>
);

export const DellLogo = ({ className = "h-8" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 70 30" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="15" cy="15" r="13" stroke="#007DB8" strokeWidth="2.5" fill="none"/>
    <text x="6" y="20" fontFamily="Arial" fontWeight="800" fontSize="14" fill="#007DB8">Dell</text>
  </svg>
);

export const HPLogo = ({ className = "h-8" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 60 30" fill="none" xmlns="http://www.w3.org/2000/svg">
    <text x="5" y="22" fontFamily="Arial" fontWeight="900" fontSize="22" fill="#0096D6">hp</text>
  </svg>
);
