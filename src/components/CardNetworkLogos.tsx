export function AmexLogo({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="30" rx="4" fill="white" fillOpacity="0.95"/>
      <path d="M10 15L11.5 11H13.5L15 15L13.5 19H11.5L10 15Z" fill="#006FCF"/>
      <path d="M15.5 11H18.5L20 15L18.5 19H15.5L17 15L15.5 11Z" fill="#006FCF"/>
      <path d="M21 15L22.5 11H24.5L26 15L24.5 19H22.5L21 15Z" fill="#006FCF"/>
      <path d="M26.5 11H30L31.5 15L30 19H26.5L28 15L26.5 11Z" fill="#006FCF"/>
      <path d="M32 11H36.5V13H33V14.5H36V16H33V17.5H36.5V19H32V11Z" fill="#006FCF"/>
      <path d="M37 19L39 15L37 11H39.5L40.5 13.5L41.5 11H44L42 15L44 19H41.5L40.5 16.5L39.5 19H37Z" fill="#006FCF"/>
    </svg>
  );
}

export function VisaLogo({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18.5 2L15 14H12L15.5 2H18.5Z" fill="white" fillOpacity="0.95"/>
      <path d="M27.5 2.5C26.8 2.2 25.5 2 24 2C20.5 2 18 3.8 18 6.5C18 8.5 19.8 9.5 21.2 10.2C22.7 10.9 23.2 11.3 23.2 12C23.2 12.9 22.2 13.3 21.2 13.3C19.8 13.3 19 13.1 17.8 12.6L17.3 12.4L16.8 15.3C17.7 15.7 19.3 16 21 16C24.7 16 27 14.2 27 11.4C27 9.8 26 8.6 23.8 7.6C22.5 7 21.7 6.5 21.7 5.8C21.7 5.2 22.4 4.5 24 4.5C25.2 4.5 26.1 4.7 26.8 5L27.2 5.2L27.5 2.5Z" fill="white" fillOpacity="0.95"/>
      <path d="M33 2L30.5 14H27.5L30 2H33Z" fill="white" fillOpacity="0.95"/>
      <path d="M39.5 2C38.9 2 38.4 2.3 38.2 2.9L33 14H36.7L37.3 12.3H41.7L42 14H45.3L42.5 2H39.5ZM38.2 9.8L39.7 5.5L40.6 9.8H38.2Z" fill="white" fillOpacity="0.95"/>
      <path d="M11.5 2L8 11.5L7.6 9.3L6.4 3.3C6.2 2.5 5.6 2.1 4.8 2H0.1L0 2.4C1.2 2.7 2.3 3.1 3.3 3.6L6.8 14H10.5L16 2H11.5Z" fill="white" fillOpacity="0.95"/>
    </svg>
  );
}

export function MastercardLogo({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="18" cy="15" r="10" fill="#EB001B" fillOpacity="0.95"/>
      <circle cx="30" cy="15" r="10" fill="#F79E1B" fillOpacity="0.95"/>
      <path d="M24 8C21.8 9.7 20.3 12.2 20.3 15C20.3 17.8 21.8 20.3 24 22C26.2 20.3 27.7 17.8 27.7 15C27.7 12.2 26.2 9.7 24 8Z" fill="#FF5F00" fillOpacity="0.95"/>
    </svg>
  );
}

export function DiscoverLogo({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 2H4.5C7.5 2 9 3.5 9 6C9 8.5 7.5 10 4.5 10H2V14H0V2ZM2 4V8H4.3C5.8 8 6.8 7.2 6.8 6C6.8 4.8 5.8 4 4.3 4H2Z" fill="white" fillOpacity="0.95"/>
      <path d="M10 2H12V14H10V2Z" fill="white" fillOpacity="0.95"/>
      <path d="M14 10.5C14 9 15 8 16.5 8C17.5 8 18.2 8.5 18.5 9.2L17 9.8C16.9 9.4 16.7 9.2 16.4 9.2C15.9 9.2 15.5 9.7 15.5 10.5C15.5 11.3 15.9 11.8 16.4 11.8C16.7 11.8 16.9 11.6 17 11.2L18.5 11.8C18.2 12.5 17.5 13 16.5 13C15 13 14 12 14 10.5Z" fill="white" fillOpacity="0.95"/>
      <path d="M44 2C46.2 2 48 3.8 48 6C48 8.2 46.2 10 44 10C41.8 10 40 8.2 40 6C40 3.8 41.8 2 44 2Z" fill="#FF6000" fillOpacity="0.95"/>
    </svg>
  );
}

export function ChipIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 40 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="40" height="30" rx="4" fill="url(#chipGradient)" fillOpacity="0.9"/>
      <rect x="2" y="2" width="36" height="26" rx="2" stroke="white" strokeOpacity="0.3" strokeWidth="0.5"/>
      <line x1="10" y1="2" x2="10" y2="8" stroke="white" strokeOpacity="0.3" strokeWidth="1"/>
      <line x1="15" y1="2" x2="15" y2="8" stroke="white" strokeOpacity="0.3" strokeWidth="1"/>
      <line x1="20" y1="2" x2="20" y2="8" stroke="white" strokeOpacity="0.3" strokeWidth="1"/>
      <line x1="25" y1="2" x2="25" y2="8" stroke="white" strokeOpacity="0.3" strokeWidth="1"/>
      <line x1="30" y1="2" x2="30" y2="8" stroke="white" strokeOpacity="0.3" strokeWidth="1"/>
      
      <line x1="10" y1="22" x2="10" y2="28" stroke="white" strokeOpacity="0.3" strokeWidth="1"/>
      <line x1="15" y1="22" x2="15" y2="28" stroke="white" strokeOpacity="0.3" strokeWidth="1"/>
      <line x1="20" y1="22" x2="20" y2="28" stroke="white" strokeOpacity="0.3" strokeWidth="1"/>
      <line x1="25" y1="22" x2="25" y2="28" stroke="white" strokeOpacity="0.3" strokeWidth="1"/>
      <line x1="30" y1="22" x2="30" y2="28" stroke="white" strokeOpacity="0.3" strokeWidth="1"/>
      
      <line x1="2" y1="10" x2="8" y2="10" stroke="white" strokeOpacity="0.3" strokeWidth="1"/>
      <line x1="2" y1="15" x2="8" y2="15" stroke="white" strokeOpacity="0.3" strokeWidth="1"/>
      <line x1="2" y1="20" x2="8" y2="20" stroke="white" strokeOpacity="0.3" strokeWidth="1"/>
      
      <line x1="32" y1="10" x2="38" y2="10" stroke="white" strokeOpacity="0.3" strokeWidth="1"/>
      <line x1="32" y1="15" x2="38" y2="15" stroke="white" strokeOpacity="0.3" strokeWidth="1"/>
      <line x1="32" y1="20" x2="38" y2="20" stroke="white" strokeOpacity="0.3" strokeWidth="1"/>
      
      <defs>
        <linearGradient id="chipGradient" x1="0" y1="0" x2="40" y2="30">
          <stop stopColor="#FFD700" stopOpacity="0.9"/>
          <stop offset="1" stopColor="#DAA520" stopOpacity="0.9"/>
        </linearGradient>
      </defs>
    </svg>
  );
}



