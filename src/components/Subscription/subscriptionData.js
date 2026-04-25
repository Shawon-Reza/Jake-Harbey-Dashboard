import { Crown, Shield, Star } from "lucide-react";

export const initialPlans = [
  {
    id: "guest",
    name: "Guest",
    price: "Free",
    duration: "",
    icon: Shield,
    popular: false,
    featured: false,
    features: [
      "No account required",
      "Email & contact needed",
      "1 estimate only",
      "No data storage",
    ],
    stats: {
      cars: "0",
      estimates: "1 per one-time",
      quotes: "0",
    },
    extras: [
      { label: "VRM Lookup", included: false },
      { label: "Priority Support", included: false },
    ],
  },
  {
    id: "free",
    name: "Free",
    price: "Free",
    duration: "",
    icon: Star,
    popular: false,
    featured: false,
    features: [
      "1 estimate per 7 days",
      "Cannot save cars",
      "Estimates deleted after 30 days",
      "Basic support",
    ],
    stats: {
      cars: "0",
      estimates: "1 per 7 days",
      quotes: "0",
    },
    extras: [
      { label: "VRM Lookup", included: false },
      { label: "Priority Support", included: false },
    ],
  },
  {
    id: "basic",
    name: "Basic",
    price: "4.99",
    duration: "/yearly",
    icon: Star,
    popular: false,
    featured: true,
    features: [
      "Save 1 car",
      "1 estimate per day",
      "Save 2 quotes",
      "Email support",
      "Data retention",
    ],
    stats: {
      cars: "1",
      estimates: "1 per daily",
      quotes: "2",
    },
    extras: [
      { label: "VRM Lookup", included: false },
      { label: "Priority Support", included: false },
    ],
  },
  {
    id: "premium",
    name: "Premium",
    price: "59",
    duration: "/yearly",
    icon: Crown,
    popular: true,
    featured: false,
    features: [
      "Save up to 5 cars",
      "Unlimited estimate saves",
      "VRM lookup included",
      "Priority support",
    ],
    stats: {
      cars: "5",
      estimates: "Unlimited",
      quotes: "Unlimited",
    },
    extras: [
      { label: "VRM Lookup", included: true },
      { label: "Priority Support", included: true },
    ],
  },
];

export const formatPrice = (price) => {
  if (price === 0 || price === "0") return "Free";
  if (!price) return "Free";

  const value = String(price).trim();
  if (value.toLowerCase() === "free") return "Free";

  return /^[£$]/.test(value) ? value : `£${value}`;
};
