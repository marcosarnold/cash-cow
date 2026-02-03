import { ArrowLeft, Edit2, Trash2, Plus } from "lucide-react";
import { useState } from "react";
import { useDragScroll } from "../ui/useDragScroll";

interface ManageCardsProps {
  onNavigate: (screen: string) => void;
}

interface CardItem {
  id: string;
  name: string;
  rewardType: string;
  last4: string;
}

const initialCards: CardItem[] = [
  { id: "1", name: "Amex Gold", rewardType: "Points", last4: "7997" },
  { id: "2", name: "Chase Sapphire Preferred", rewardType: "Points", last4: "1234" },
  { id: "3", name: "Discover It", rewardType: "Cashback", last4: "5678" },
];

export function ManageCards({ onNavigate }: ManageCardsProps) {
  const [cards, setCards] = useState<CardItem[]>(initialCards);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCard, setNewCard] = useState({
    name: "",
    type: "",
    rewardType: "",
    last4: "",
  });

  const scrollRef = useDragScroll<HTMLDivElement>();

  const handleAddCard = () => {
    if (newCard.name && newCard.last4) {
      setCards([
        ...cards,
        {
          id: Date.now().toString(),
          name: newCard.name,
          rewardType: newCard.rewardType || "Points",
          last4: newCard.last4,
        },
      ]);
      setNewCard({ name: "", type: "", rewardType: "", last4: "" });
      setIsModalOpen(false);
    }
  };

  const handleDeleteCard = (id: string) => {
    setCards(cards.filter((card) => card.id !== id));
  };

  return (
    <div className="h-full flex flex-col" style={{ backgroundColor: '#F7F9FB' }}>
      {/* Header */}
      <div className="px-6 py-4 bg-white shadow-sm">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate("settings")}
            className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
          >
            <ArrowLeft className="w-5 h-5" style={{ color: '#0A2540' }} />
          </button>
          <h1 style={{ fontSize: '20px', color: '#0A2540', fontWeight: 600 }}>
            Manage Cards
          </h1>
        </div>
      </div>

      {/* Card List */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-3" ref={scrollRef}>
        {cards.map((card) => (
          <div
            key={card.id}
            className="bg-white rounded-xl p-4 shadow-sm flex items-center justify-between"
            style={{ border: '1px solid #E5E7EB' }}
          >
            <div className="flex-1">
              <div style={{ fontSize: '15px', color: '#0A2540', fontWeight: 600, marginBottom: '4px' }}>
                {card.name}
              </div>
              <div className="flex items-center gap-2">
                <span
                  className="px-2 py-1 rounded"
                  style={{ fontSize: '12px', backgroundColor: '#EFF6FF', color: '#0A2540' }}
                >
                  {card.rewardType}
                </span>
                <span style={{ fontSize: '13px', color: '#9CA3AF' }}>
                  •••• {card.last4}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors">
                <Edit2 className="w-4 h-4" style={{ color: '#6B7280' }} />
              </button>
              <button
                onClick={() => handleDeleteCard(card.id)}
                className="w-8 h-8 rounded-lg hover:bg-red-50 flex items-center justify-center transition-colors"
              >
                <Trash2 className="w-4 h-4" style={{ color: '#DC2626' }} />
              </button>
            </div>
          </div>
        ))}

        {/* Add Card Button */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="w-full py-4 rounded-xl bg-white hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 shadow-sm"
          style={{ border: '2px dashed #0A2540' }}
        >
          <Plus className="w-5 h-5" style={{ color: '#0A2540' }} />
          <span style={{ fontSize: '15px', color: '#0A2540', fontWeight: 600 }}>
            Add Card
          </span>
        </button>
      </div>

      {/* Add Card Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-96 max-w-sm mx-4">
            <h2 className="text-lg font-semibold mb-2" style={{ color: '#0A2540' }}>Add New Card</h2>
            <p className="text-sm mb-4" style={{ color: '#6B7280' }}>
              Add a new card to your account to track rewards and transactions.
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: '#0A2540' }}>Card Name</label>
                <input
                  type="text"
                  placeholder="e.g., Amex Gold"
                  value={newCard.name}
                  onChange={(e) => setNewCard({ ...newCard, name: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                  style={{ borderColor: '#E5E7EB' }}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: '#0A2540' }}>Card Type</label>
                <input
                  type="text"
                  placeholder="e.g., American Express"
                  value={newCard.type}
                  onChange={(e) => setNewCard({ ...newCard, type: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                  style={{ borderColor: '#E5E7EB' }}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: '#0A2540' }}>Reward Type</label>
                <select
                  value={newCard.rewardType}
                  onChange={(e) => setNewCard({ ...newCard, rewardType: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                  style={{ borderColor: '#E5E7EB' }}
                >
                  <option value="">Select reward type</option>
                  <option value="Points">Points</option>
                  <option value="Cashback">Cashback</option>
                  <option value="Miles">Miles</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: '#0A2540' }}>Last 4 Digits</label>
                <input
                  type="text"
                  placeholder="1234"
                  maxLength={4}
                  value={newCard.last4}
                  onChange={(e) => setNewCard({ ...newCard, last4: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                  style={{ borderColor: '#E5E7EB' }}
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setIsModalOpen(false)}
                className="flex-1 py-2 rounded-lg border hover:bg-gray-50 transition-colors"
                style={{ borderColor: '#E5E7EB', color: '#6B7280' }}
              >
                Cancel
              </button>
              <button
                onClick={handleAddCard}
                className="flex-1 py-2 rounded-lg transition-colors"
                style={{ backgroundColor: '#0A2540', color: 'white' }}
              >
                Add Card
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
