import {
  Check,
  Crown,
  Edit2,
  Plus,
  Shield,
  Star,
  Trash2,
  X,
} from "lucide-react";
import { useState } from "react";
import { ProPlanPopup } from "./ProPlanPopup";

const initialPlans = [
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

const formatPrice = (price) => {
  if (!price) return "Free";

  const value = String(price).trim();
  if (value.toLowerCase() === "free") return "Free";

  return /^[£$]/.test(value) ? value : `£${value}`;
};

export default function Subscription() {
  const [plans, setPlans] = useState(initialPlans);
  const [showProPlanPopup, setShowProPlanPopup] = useState(false);
  const [editPlanData, setEditPlanData] = useState(null);
  const [planToDelete, setPlanToDelete] = useState(null);

  const handleAddPlan = () => {
    setEditPlanData(null);
    setShowProPlanPopup(true);
  };

  const handleEditPlan = (planId) => {
    const selectedPlan = plans.find((plan) => plan.id === planId);
    setEditPlanData(selectedPlan || null);
    setShowProPlanPopup(true);
  };

  const handleDeletePlan = (planId) => {
    const selectedPlan = plans.find((plan) => plan.id === planId);
    if (!selectedPlan) return;
    setPlanToDelete(selectedPlan);
  };

  const confirmDeletePlan = () => {
    if (planToDelete) {
      setPlans((currentPlans) =>
        currentPlans.filter((plan) => plan.id !== planToDelete.id),
      );
      setPlanToDelete(null);
    }
  };

  const handleSaveProPlan = (planData) => {
    const normalizedName = planData.planName?.trim() || "Custom Plan";
    const normalizedPlan = {
      ...(editPlanData || {}),
      id:
        editPlanData?.id ||
        normalizedName.toLowerCase().replace(/\s+/g, "-") ||
        `plan-${Date.now()}`,
      name: normalizedName,
      price: planData.price?.trim() || "Free",
      duration: planData.duration?.trim() || "custom billing",
      icon: editPlanData?.icon || Star,
      popular: editPlanData?.popular || false,
      featured: editPlanData?.featured || false,
      features: planData.features?.length
        ? planData.features
        : ["Custom plan benefit"],
      stats: editPlanData?.stats || {
        cars: "0",
        estimates: "Custom",
        quotes: "0",
      },
      extras: editPlanData?.extras || [
        { label: "VRM Lookup", included: false },
        { label: "Priority Support", included: false },
      ],
    };

    if (editPlanData) {
      setPlans((currentPlans) =>
        currentPlans.map((plan) =>
          plan.id === editPlanData.id ? normalizedPlan : plan,
        ),
      );
      return;
    }

    setPlans((currentPlans) => [...currentPlans, normalizedPlan]);
  };

  return (
    <>
      <div className="min-h-[calc(100vh-64px)] bg-[#f8fafc] p-4 md:p-6 lg:p-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-secondary md:text-3xl">
                Subscription Plans
              </h1>
              <p className="mt-1 text-sm text-slate-500">
                Manage package tiers and pricing with a clean card-based layout.
              </p>
            </div>

            <button
              onClick={handleAddPlan}
              className="inline-flex items-center justify-center rounded-xl bg-[#00A3E9] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0090cf]"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Plan
            </button>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {plans.map((plan) => {
              const Icon = plan.icon;

              return (
                <div
                  key={plan.id}
                  className={`relative flex flex-col rounded-[20px] border bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md ${
                    plan.featured
                      ? "border-[#3b82f6] shadow-[0_0_0_3px_rgba(59,130,246,0.08)]"
                      : "border-slate-200"
                  }`}
                >
                  {plan.popular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#2dc7f5] px-3 py-1 text-xs font-semibold text-white shadow-sm">
                      Most Popular
                    </span>
                  )}

                  <div className="mb-5 flex items-start justify-between">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                        plan.featured
                          ? "bg-blue-50 text-[#2563eb]"
                          : plan.popular
                            ? "bg-cyan-50 text-[#06b6d4]"
                            : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEditPlan(plan.id)}
                        className="text-slate-400 transition hover:text-slate-700"
                        aria-label={`Edit ${plan.name} plan`}
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeletePlan(plan.id)}
                        className="text-[#ff6b6b] transition hover:text-red-600"
                        aria-label={`Delete ${plan.name} plan`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <div className="mb-5">
                    <h3 className="text-lg font-semibold text-slate-800">
                      {plan.name}
                    </h3>

                    <div className="mt-2 flex items-end gap-1">
                      <span className="text-[2rem] font-bold leading-none text-slate-900">
                        {formatPrice(plan.price)}
                      </span>
                      {plan.duration && (
                        <span className="pb-1 text-sm font-medium text-slate-400">
                          {plan.duration}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2.5">
                    {plan.features.map((feature) => (
                      <div
                        key={feature}
                        className="flex items-start gap-2 text-sm"
                      >
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                        <span className="text-slate-600">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* <div className="my-5 border-t border-slate-200" /> */}

                  {/* <div className="space-y-1.5 text-sm text-slate-600">
                    <p>
                      <span className="font-semibold text-slate-700">
                        Cars:
                      </span>{" "}
                      {plan.stats.cars}
                    </p>
                    <p>
                      <span className="font-semibold text-slate-700">
                        Estimates:
                      </span>{" "}
                      {plan.stats.estimates}
                    </p>
                    <p>
                      <span className="font-semibold text-slate-700">
                        Quotes:
                      </span>{" "}
                      {plan.stats.quotes}
                    </p>
                  </div> */}

                  {/* <div className="mt-auto pt-5">
                    <div className="border-t border-slate-200 pt-4">
                      <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs sm:text-[13px]">
                        {plan.extras.map((item) => (
                          <div
                            key={item.label}
                            className={`flex items-center gap-1.5 ${
                              item.included
                                ? "text-green-600"
                                : "text-slate-400"
                            }`}
                          >
                            {item.included ? (
                              <Check className="h-3.5 w-3.5" />
                            ) : (
                              <X className="h-3.5 w-3.5 text-red-400" />
                            )}
                            <span>{item.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div> */}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <ProPlanPopup
        isOpen={showProPlanPopup}
        onClose={() => setShowProPlanPopup(false)}
        onSave={handleSaveProPlan}
        editData={editPlanData}
      />

      {/* Delete Confirmation Modal */}
      {planToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 transition-opacity backdrop-blur-sm">
          <div className="relative w-full max-w-[420px] rounded-2xl bg-white p-7 shadow-xl">
            {/* Close Button */}
            <button 
              onClick={() => setPlanToDelete(null)}
              className="absolute right-4 top-4 text-slate-400 hover:bg-slate-100 p-1.5 rounded-full hover:text-slate-600 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Modal Content */}
            <div className="mb-2 pt-1">
              <h2 className="text-xl font-bold text-slate-900">Delete Plan</h2>
              <p className="text-[14.5px] text-slate-500 mt-2.5 leading-relaxed pr-4">
                Are you sure you want to delete the <span className="font-semibold text-slate-800">{planToDelete.name}</span> plan? This will affect all users subscribed to this plan.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-3 mt-8">
              <button 
                onClick={() => setPlanToDelete(null)}
                className="px-5 py-2.5 rounded-xl border border-slate-200 text-[14px] font-semibold text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={confirmDeletePlan}
                className="px-5 py-2.5 rounded-xl bg-[#e32149] text-[14px] font-semibold text-white hover:bg-[#c91839] transition-colors shadow-sm"
              >
                Delete Plan
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
