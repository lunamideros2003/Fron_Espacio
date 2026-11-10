export default function RobotIcon({ className = "" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <line x1="32" y1="7" x2="32" y2="13" stroke="#8ec5ff" strokeWidth="2.4" strokeLinecap="round" />
      <circle cx="32" cy="5.5" r="3" fill="#8ec5ff" />
      <rect x="9" y="12" width="46" height="33" rx="13" fill="#e9f0fe" stroke="#0b1a33" strokeWidth="2" />
      <rect x="15" y="18" width="34" height="21" rx="9" fill="#0a1428" />
      <circle cx="25" cy="27" r="4.6" fill="#4fd6ff" />
      <circle cx="39" cy="27" r="4.6" fill="#4fd6ff" />
      <circle cx="26.5" cy="25.5" r="1.4" fill="#eafaff" />
      <circle cx="40.5" cy="25.5" r="1.4" fill="#eafaff" />
      <path d="M27 33 Q32 37 37 33" stroke="#4fd6ff" strokeWidth="2" strokeLinecap="round" />
      <rect x="6" y="24" width="4" height="10" rx="2" fill="#b9cdf2" />
      <rect x="54" y="24" width="4" height="10" rx="2" fill="#b9cdf2" />
      <rect x="19" y="45" width="26" height="11" rx="5.5" fill="#dbe6fa" stroke="#0b1a33" strokeWidth="1.8" />
      <path d="M47 49 L54 40" stroke="#dbe6fa" strokeWidth="5" strokeLinecap="round" />
      <circle cx="55" cy="37" r="4.2" fill="#e9f0fe" stroke="#0b1a33" strokeWidth="1.6" />
      <circle cx="32" cy="50" r="2.4" fill="#4fd6ff" />
      <path d="M27 53 h10" stroke="#4fd6ff" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
