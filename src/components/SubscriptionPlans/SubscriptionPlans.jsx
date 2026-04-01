import { useState } from "react";

const plans = [
  {
    id: "guest",
    icon: "🛡️",
    label: "Guest",
    price: "Free",
    priceSub: null,
    features: [
      "No account required",
      "Email & contact needed",
      "1 estimate only",
      "No data storage",
    ],
    stats: { Cars: 0, Estimates: "1 per one-time", Quotes: 0 },
    vrm: false,
    priority: false,
    popular: false,
    color: "from-slate-100 to-slate-50",
    accent: "#64748b",
    border: "border-slate-200",
    iconBg: "bg-slate-100",
  },
  {
    id: "free",
    icon: "⭐",
    label: "Free",
    price: "Free",
    priceSub: null,
    features: [
      "1 estimate per 7 days",
      "Cannot save cars",
      "Estimates deleted after 30 days",
      "Basic support",
    ],
    stats: { Cars: 0, Estimates: "1 per 7 days", Quotes: 0 },
    vrm: false,
    priority: false,
    popular: false,
    color: "from-gray-100 to-gray-50",
    accent: "#6b7280",
    border: "border-gray-200",
    iconBg: "bg-gray-100",
  },
  {
    id: "basic",
    icon: "⭐",
    label: "Basic",
    price: "£4.99",
    priceSub: "/yearly",
    features: [
      "Save 1 car",
      "1 estimate per day",
      "Save 2 quotes",
      "Email support",
      "Data retention",
    ],
    stats: { Cars: 1, Estimates: "1 per daily", Quotes: 2 },
    vrm: false,
    priority: false,
    popular: false,
    color: "from-blue-50 to-sky-50",
    accent: "#3b82f6",
    border: "border-blue-400",
    iconBg: "bg-blue-100",
  },
  {
    id: "premium",
    icon: "👑",
    label: "Premium",
    price: "£59",
    priceSub: "/yearly",
    features: [
      "Save up to 5 cars",
      "Unlimited estimate saves",
      "VRM lookup included",
      "Priority support",
    ],
    stats: { Cars: 5, Estimates: "Unlimited", Quotes: "Unlimited" },
    vrm: true,
    priority: true,
    popular: true,
    color: "from-amber-50 to-yellow-50",
    accent: "#f59e0b",
    border: "border-amber-400",
    iconBg: "bg-amber-100",
  },
];

const CheckIcon = ({ checked }) =>
  checked ? (
    <svg className="w-4 h-4 text-blue-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  ) : (
    <svg className="w-4 h-4 text-red-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );

const PlanCard = ({ plan, index }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`
        relative flex flex-col rounded-2xl border-2 ${plan.border}
        bg-white shadow-sm transition-all duration-300 cursor-pointer
        ${hovered ? "shadow-xl -translate-y-1" : ""}
        ${plan.popular ? "ring-2 ring-amber-400 ring-offset-2" : ""}
      `}
      style={{
        animationDelay: `${index * 80}ms`,
        animation: "fadeSlideUp 0.5s ease both",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Most Popular Badge */}
      {plan.popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="bg-cyan-400 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md whitespace-nowrap tracking-wide">
            Most Popular
          </span>
        </div>
      )}

      {/* Top Action Buttons */}
      <div className="flex justify-between items-start px-5 pt-5 pb-0">
        <div className={`w-10 h-10 rounded-xl ${plan.iconBg} flex items-center justify-center text-lg`}>
          {plan.icon}
        </div>
        <div className="flex gap-2">
          <button className="w-7 h-7 rounded-lg bg-gray-100 hover:bg-blue-100 flex items-center justify-center transition-colors">
            <svg className="w-3.5 h-3.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button className="w-7 h-7 rounded-lg bg-gray-100 hover:bg-red-100 flex items-center justify-center transition-colors">
            <svg className="w-3.5 h-3.5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Label & Price */}
      <div className="px-5 pt-3 pb-4">
        <p className="text-sm text-gray-500 font-medium mb-0.5">{plan.label}</p>
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-extrabold text-gray-900 tracking-tight">{plan.price}</span>
          {plan.priceSub && (
            <span className="text-sm text-gray-400 font-medium">{plan.priceSub}</span>
          )}
        </div>
      </div>

      {/* Divider */}
      <div className="mx-5 border-t border-gray-100" />

      {/* Features */}
      <ul className="px-5 pt-4 pb-3 flex flex-col gap-2.5 flex-1">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm text-gray-700">
            <CheckIcon checked={true} />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      {/* Stats */}
      <div className="mx-5 mt-1 mb-3 rounded-xl bg-gray-50 px-4 py-3 text-xs text-gray-500 space-y-1">
        {Object.entries(plan.stats).map(([k, v]) => (
          <div key={k} className="flex justify-between">
            <span className="font-semibold text-gray-600">{k}:</span>
            <span>{v}</span>
          </div>
        ))}
      </div>

      {/* VRM & Priority Support */}
      <div className="px-5 pb-5 flex gap-3 text-xs">
        <span className="flex items-center gap-1 text-gray-500">
          <CheckIcon checked={plan.vrm} />
          VRM Lookup
        </span>
        <span className="flex items-center gap-1 text-gray-500">
          <CheckIcon checked={plan.priority} />
          Priority Support
        </span>
      </div>
    </div>
  );
};

export default function SubscriptionPlans() {
  return (
    <div className="min-h-screen py-16 px-4">
      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            Subscription Plans
          </h1>
          <p className="mt-2 text-gray-500 text-base">
            Choose the plan that fits your needs. Upgrade or downgrade anytime.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan, i) => (
            <PlanCard key={plan.id} plan={plan} index={i} />
          ))}
        </div>

        {/* Footer note */}
        <p className="mt-8 text-center text-xs text-gray-400">
          All prices include VAT. Cancel anytime. No hidden fees.
        </p>
      </div>
    </div>
  );
}