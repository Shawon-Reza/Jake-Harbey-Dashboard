import { Plus } from "lucide-react";
import { useState } from "react";
import DeletePlanModal from "./DeletePlanModal";
import { ProPlanPopup } from "./ProPlanPopup";
import SubscriptionPlanCard from "./SubscriptionPlanCard";
import { initialPlans } from "./subscriptionData";

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
            {plans.map((plan) => (
              <SubscriptionPlanCard
                key={plan.id}
                plan={plan}
                onEdit={handleEditPlan}
                onDelete={handleDeletePlan}
              />
            ))}
          </div>
        </div>
      </div>

      <ProPlanPopup
        isOpen={showProPlanPopup}
        onClose={() => setShowProPlanPopup(false)}
        onSave={handleSaveProPlan}
        editData={editPlanData}
      />

      <DeletePlanModal
        plan={planToDelete}
        onCancel={() => setPlanToDelete(null)}
        onConfirm={confirmDeletePlan}
      />
    </>
  );
}
