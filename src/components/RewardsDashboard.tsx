import { ArrowLeft, TrendingUp, Sparkles } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useDragScroll } from "./useDragScroll";

interface RewardsDashboardProps {
  onNavigate: (screen: string) => void;
}

const monthlyData = [
  { name: "Jan", amount: 45 },
  { name: "Feb", amount: 52 },
  { name: "Mar", amount: 38 },
  { name: "Apr", amount: 68 },
  { name: "May", amount: 72 },
  { name: "Jun", amount: 95 },
];

const categoryData = [
  { category: "Dining", amount: 285, color: "#F59E0B" },
  { category: "Travel", amount: 195, color: "#3B82F6" },
  { category: "Groceries", amount: 142, color: "#10B981" },
  { category: "Gas", amount: 89, color: "#8B5CF6" },
];

export function RewardsDashboard({ onNavigate }: RewardsDashboardProps) {
  const totalEarned = categoryData.reduce((sum, cat) => sum + cat.amount, 0);
  const scrollRef = useDragScroll<HTMLDivElement>();

  return (
    <div className="h-full flex flex-col" style={{ backgroundColor: '#F7F9FB' }}>
      {/* Header */}
      <div className="px-5 py-5 bg-white shadow-sm border-b" style={{ borderColor: '#E5E7EB' }}>
        <div className="flex items-center gap-4">
          <button
            onClick={() => onNavigate("main")}
            className="w-9 h-9 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
          >
            <ArrowLeft className="w-5 h-5" style={{ color: '#0A2540' }} />
          </button>
          <h1 style={{ fontSize: '20px', color: '#0A2540', fontWeight: 700 }}>
            Rewards Dashboard
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-5 py-6 space-y-6" ref={scrollRef}>
        {/* Total Earned Card */}
        <div
          className="rounded-xl p-6 shadow-lg"
          style={{
            background: 'linear-gradient(135deg, #0A2540 0%, #1E3A8A 100%)',
          }}
        >
          <div className="flex items-start justify-between mb-5">
            <div>
              <div style={{ fontSize: '15px', color: 'rgba(255,255,255,0.7)', marginBottom: '8px' }}>
                Total Earned This Month
              </div>
              <div style={{ fontSize: '36px', color: 'white', fontWeight: 700 }}>
                ${totalEarned}
              </div>
            </div>
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ backgroundColor: 'rgba(245, 184, 65, 0.2)' }}
            >
              <TrendingUp className="w-6 h-6" style={{ color: '#F5B841' }} />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="px-3 py-1 rounded-full"
              style={{ backgroundColor: 'rgba(16, 185, 129, 0.2)', fontSize: '13px', color: '#10B981', fontWeight: 600 }}
            >
              +23% vs last month
            </div>
          </div>
        </div>

        {/* Monthly Trend */}
        <div className="bg-white rounded-xl p-6 shadow-lg" style={{ border: '1px solid #E5E7EB' }}>
          <h3 style={{ fontSize: '18px', color: '#0A2540', fontWeight: 700, marginBottom: '24px' }}>
            Monthly Trend
          </h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
              <XAxis 
                dataKey="name" 
                axisLine={false}
                tickLine={false}
                style={{ fontSize: '13px', fill: '#9CA3AF' }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                style={{ fontSize: '13px', fill: '#9CA3AF' }}
                domain={[0, 100]}
                ticks={[0, 25, 50, 75, 100]}
              />
              <Tooltip 
                cursor={{ fill: 'rgba(10, 37, 64, 0.05)' }}
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px',
                  fontSize: '13px',
                }}
              />
              <Bar dataKey="amount" fill="#F5B841" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Category Breakdown */}
        <div className="bg-white rounded-xl p-6 shadow-lg" style={{ border: '1px solid #E5E7EB' }}>
          <h3 style={{ fontSize: '18px', color: '#0A2540', fontWeight: 700, marginBottom: '24px' }}>
            Rewards by Category
          </h3>
          <div className="space-y-5">
            {categoryData.map((item) => (
              <div key={item.category} className="flex items-center gap-4">
                <div
                  className="w-4 h-4 rounded-full shrink-0"
                  style={{ backgroundColor: item.color }}
                />
                <div className="flex-1 flex items-center justify-between">
                  <span style={{ fontSize: '15px', color: '#0A2540', fontWeight: 500 }}>
                    {item.category}
                  </span>
                  <span style={{ fontSize: '15px', color: '#0A2540', fontWeight: 600 }}>
                    ${item.amount}
                  </span>
                </div>
                <div
                  className="h-3 rounded-full"
                  style={{
                    width: `${Math.min((item.amount / totalEarned) * 120, 120)}px`,
                    backgroundColor: item.color,
                    opacity: 0.3,
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Premium Upgrade CTA */}
        <div
          className="rounded-xl p-6 shadow-lg relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #F5B841 0%, #F59E0B 100%)',
          }}
        >
          <div className="relative z-10">
            <div className="flex items-start gap-4 mb-5">
              <Sparkles className="w-7 h-7 shrink-0" style={{ color: '#0A2540' }} />
              <div>
                <h3 style={{ fontSize: '18px', color: '#0A2540', fontWeight: 700, marginBottom: '8px' }}>
                  Upgrade to Harmony Premium
                </h3>
                <p style={{ fontSize: '15px', color: 'rgba(10, 37, 64, 0.8)', lineHeight: '1.5' }}>
                  Unlock advanced analytics, custom alerts, and priority support
                </p>
              </div>
            </div>
            <button
              className="px-6 py-3 rounded-lg shadow-sm hover:shadow-md transition-all"
              style={{
                backgroundColor: '#0A2540',
                color: 'white',
                fontSize: '15px',
                fontWeight: 600,
              }}
            >
              Learn More
            </button>
          </div>
          <div
            className="absolute -right-8 -bottom-8 w-32 h-32 rounded-full"
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
          />
        </div>
      </div>
    </div>
  );
}