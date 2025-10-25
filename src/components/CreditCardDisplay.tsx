import { AmexLogo, VisaLogo, MastercardLogo, DiscoverLogo, ChipIcon } from "./CardNetworkLogos";

export interface CreditCardData {
  id: string;
  name: string;
  type: string;
  last4: string;
  color: string;
  rewardType: string;
  network: "amex" | "visa" | "mastercard" | "discover";
  cardNumber?: string;
}

const NetworkLogo = ({ network }: { network: string }) => {
  switch (network) {
    case "amex":
      return <AmexLogo className="h-6" />;
    case "visa":
      return <VisaLogo className="h-4" />;
    case "mastercard":
      return <MastercardLogo className="h-8" />;
    case "discover":
      return <DiscoverLogo className="h-4" />;
    default:
      return null;
  }
};

export function CreditCardDisplay({ card }: { card: CreditCardData }) {
  return (
    <div 
      className="relative rounded-lg min-w-[280px] h-[160px] flex flex-col justify-between overflow-hidden shadow-2xl"
      style={{ 
        background: card.color,
        boxShadow: '0 20px 60px -12px rgba(0, 0, 0, 0.35), 0 10px 30px -10px rgba(0, 0, 0, 0.2)',
      }}
    >
      {/* Glossy overlay effect */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 50%, rgba(255,255,255,0.1) 100%)',
        }}
      />
      
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 80%, white 1px, transparent 1px)',
          backgroundSize: '30px 30px'
        }}
      />
      
      {/* Animated gradient orb */}
      <div 
        className="absolute w-48 h-48 rounded-full opacity-30 blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)',
          top: '-50%',
          right: '-20%',
        }}
      />
      
      {/* Card content */}
      <div className="relative z-10 flex flex-col h-full justify-between p-6">
        {/* Top Section */}
        <div className="flex justify-between items-start">
          <ChipIcon className="w-10 h-8" />
          <div className="text-right">
            <NetworkLogo network={card.network} />
          </div>
        </div>
        
        {/* Card Number */}
        <div className="text-white/95 tracking-widest" style={{ fontSize: '16px', fontWeight: 500, fontFamily: 'monospace', textShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          {card.cardNumber || `•••• •••• •••• ${card.last4}`}
        </div>
        
        {/* Bottom Section */}
        <div className="flex justify-between items-end">
          <div className="text-white/90">
            <div style={{ fontSize: '10px', opacity: 0.7, marginBottom: '2px' }}>CARDHOLDER</div>
            <div style={{ fontSize: '13px', fontWeight: 600, letterSpacing: '0.5px', textShadow: '0 1px 2px rgba(0,0,0,0.1)' }}>{card.name.toUpperCase()}</div>
          </div>
          <div 
            className="px-2.5 py-1 bg-white/25 backdrop-blur-sm rounded-md"
            style={{ fontSize: '9px', color: 'white', fontWeight: 600, border: '1px solid rgba(255,255,255,0.2)' }}
          >
            {card.rewardType.toUpperCase()}
          </div>
        </div>
      </div>
    </div>
  );
}


