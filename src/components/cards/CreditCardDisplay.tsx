export interface CreditCardData {
  id: string;
  name: string;
  type: string;
  last4: string;
  color: string;
  rewardType: string;
  network: "amex" | "visa" | "mastercard" | "discover";
  cardNumber?: string;
  imagePath?: string; // Add image path property
}

export function CreditCardDisplay({ card }: { card: CreditCardData }) {
  // Get the card image path based on card name
  const getCardImage = (cardName: string) => {
    switch (cardName.toLowerCase()) {
      case "amex gold":
        return "/src/assets/cards/amexgold.png";
      case "chase sapphire preferred":
        return "/src/assets/cards/sapphirecard.png";
      case "discover it":
        return "/src/assets/cards/discovercard.png";
      default:
        return null;
    }
  };

  const cardImage = getCardImage(card.name);

  return (
    <div
      className="relative rounded-2xl min-w-[280px] h-[160px] flex flex-col justify-between overflow-hidden shadow-2xl"
      style={{
        boxShadow: '0 20px 60px -12px rgba(0, 0, 0, 0.35), 0 10px 30px -10px rgba(0, 0, 0, 0.2)',
        borderRadius: '14px',
      }}
    >
      {/* Card Background Image */}
      {cardImage ? (
        <img
          src={cardImage}
          alt={`${card.name} card`}
          className="absolute inset-0 w-full h-full object-cover rounded-lg"
        />
      ) : (
        <div
          className="absolute inset-0 rounded-lg"
          style={{ background: card.color }}
        />
      )}

      {/* Glossy overlay effect */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 50%, rgba(255,255,255,0.1) 100%)',
        }}
      />

      {/* Card content - removed all overlay text elements */}
    </div>
  );
}
