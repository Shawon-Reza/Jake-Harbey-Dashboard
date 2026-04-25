import { Crown, Plus, Shield, Star } from "lucide-react";
import { useMemo, useState } from "react";
import DeletePlanModal from "./DeletePlanModal";
import { ProPlanPopup } from "./ProPlanPopup";
import SubscriptionPlanCard from "./SubscriptionPlanCard";
import {
  useDashboardPlansQuery,
  useCreateDashboardPlanMutation,
  useCreateDashboardPlanFeatureMutation,
  useCreateDashboardPlanMissingFeatureMutation,
  useDeleteDashboardPlanFeatureMutation,
  useDeleteDashboardPlanMissingFeatureMutation,
  useUpdateDashboardPlanFeatureMutation,
  useUpdateDashboardPlanMissingFeatureMutation,
} from "../../Api/dashboardApi";

export default function Subscription() {
  const { data, isLoading, isError } = useDashboardPlansQuery();
  const [showProPlanPopup, setShowProPlanPopup] = useState(false);
  const [editPlanData, setEditPlanData] = useState(null);
  const [planPopupMode, setPlanPopupMode] = useState("create");
  const [planToDelete, setPlanToDelete] = useState(null);
  const [deletedPlanIds, setDeletedPlanIds] = useState([]);
  const createPlan = useCreateDashboardPlanMutation();
  const updatePlanFeature = useUpdateDashboardPlanFeatureMutation();
  const updatePlanMissingFeature = useUpdateDashboardPlanMissingFeatureMutation();
  const createPlanFeature = useCreateDashboardPlanFeatureMutation();
  const createPlanMissingFeature = useCreateDashboardPlanMissingFeatureMutation();
  const deletePlanFeature = useDeleteDashboardPlanFeatureMutation();
  const deletePlanMissingFeature = useDeleteDashboardPlanMissingFeatureMutation();

  const iconByPlanType = {
    guest: Shield,
    free: Star,
    basic: Star,
    premium: Crown,
  };

  const basePlans = useMemo(
    () =>
      Array.isArray(data)
        ? data.map((plan) => ({
          id: plan.id,
          name: plan.name,
          plan_type: plan.plan_type,
          tagline: plan.tagline,
          price: plan.price,
          duration: plan.duration,
          icon: iconByPlanType[plan.plan_type] || Star,
          featured: plan.plan_type === "basic",
          popular: plan.plan_type === "premium",
          featureItems: Array.isArray(plan.features)
            ? plan.features.map((feature) => ({
                id: feature.id,
                feature: feature.feature,
              }))
            : [],
          missingFeatureItems: Array.isArray(plan.missing_features)
            ? plan.missing_features.map((feature) => ({
                id: feature.id,
                missing_feature: feature.missing_feature,
              }))
            : [],
          features: Array.isArray(plan.features)
            ? plan.features.map((feature) => feature.feature)
            : [],
          missingFeatures: Array.isArray(plan.missing_features)
            ? plan.missing_features.map((feature) => feature.missing_feature)
            : [],
        }))
        : [],
    [data],
  );

  const plans = useMemo(() => {
    return basePlans.filter((plan) => !deletedPlanIds.includes(plan.id));
  }, [basePlans, deletedPlanIds]);

  const handleAddPlan = () => {
    setEditPlanData(null);
    setPlanPopupMode("create");
    setShowProPlanPopup(true);
  };

  const handleEditPlan = (planId) => {
    const selectedPlan = plans.find((plan) => plan.id === planId);
    if (!selectedPlan) return;

    setEditPlanData(selectedPlan);
    setPlanPopupMode(String(selectedPlan.id).startsWith("local-") ? "create" : "feature-edit");
    setShowProPlanPopup(true);
  };

  const handleDeletePlan = (planId) => {
    const selectedPlan = plans.find((plan) => plan.id === planId);
    if (!selectedPlan) return;

    setPlanToDelete(selectedPlan);
  };

  const confirmDeletePlan = () => {
    if (!planToDelete) return;

    setDeletedPlanIds((currentIds) => [...new Set([...currentIds, planToDelete.id])]);

    setPlanToDelete(null);
  };

  const handleSaveProPlan = async (planData) => {
    if (planPopupMode === "create") {
      await createPlan.mutateAsync({
        name: planData.planName?.trim(),
        plan_type: planData.planType,
        tagline: planData.tagline?.trim(),
        price: planData.price?.trim(),
      });
      setShowProPlanPopup(false);
      setEditPlanData(null);
      return;
    }

    if (planPopupMode === "feature-edit") {
      const selectedPlan = editPlanData;
      if (!selectedPlan) return;

      const originalFeatures = selectedPlan.featureItems || [];
      const originalMissingFeatures = selectedPlan.missingFeatureItems || [];

      const featureUpdates = (planData.featureItems || []).filter((item) => {
        const originalItem = originalFeatures.find((feature) => feature.id === item.id);
        return originalItem && originalItem.feature !== item.feature.trim();
      });

      const missingFeatureUpdates = (planData.missingFeatureItems || []).filter((item) => {
        const originalItem = originalMissingFeatures.find((feature) => feature.id === item.id);
        return originalItem && originalItem.missing_feature !== item.missing_feature.trim();
      });

      const runUpdates = async () => {
        await Promise.all([
          ...featureUpdates.map((item) =>
            updatePlanFeature.mutateAsync({
              id: item.id,
              feature: item.feature.trim(),
            }),
          ),
          ...missingFeatureUpdates.map((item) =>
            updatePlanMissingFeature.mutateAsync({
              id: item.id,
              missing_feature: item.missing_feature.trim(),
            }),
          ),
        ]);
      };

      return runUpdates().then(() => {
        setShowProPlanPopup(false);
        setEditPlanData(null);
      });
    }
  };

  const handleDeletePlanFeature = async (item) => {
    if (!item?.id) return;

    await deletePlanFeature.mutateAsync(item.id);
  };

  const handleDeletePlanMissingFeature = async (item) => {
    if (!item?.id) return;

    await deletePlanMissingFeature.mutateAsync(item.id);
  };

  const handleCreatePlanFeature = async (feature) => {
    if (!editPlanData?.id || !feature?.trim()) return;

    await createPlanFeature.mutateAsync({
      planId: editPlanData.id,
      feature: feature.trim(),
    });
  };

  const handleCreatePlanMissingFeature = async (missingFeature) => {
    if (!editPlanData?.id || !missingFeature?.trim()) return;

    await createPlanMissingFeature.mutateAsync({
      planId: editPlanData.id,
      missing_feature: missingFeature.trim(),
    });
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-[#f8fafc] p-4 md:p-6 lg:p-8">
      <div className="mx-auto ">
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

        {isLoading ? <div className="p-6 text-gray-500">Loading plans...</div> : null}
        {isError ? <div className="p-6 text-red-500">Failed to load plans.</div> : null}

        {!isLoading && !isError ? (
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
        ) : null}
      </div>

      <ProPlanPopup
        isOpen={showProPlanPopup}
        onClose={() => setShowProPlanPopup(false)}
        onSave={handleSaveProPlan}
        editData={editPlanData}
        mode={planPopupMode}
        onCreateFeature={handleCreatePlanFeature}
        onCreateMissingFeature={handleCreatePlanMissingFeature}
        onDeleteFeature={handleDeletePlanFeature}
        onDeleteMissingFeature={handleDeletePlanMissingFeature}
      />

      <DeletePlanModal
        plan={planToDelete}
        onCancel={() => setPlanToDelete(null)}
        onConfirm={confirmDeletePlan}
      />
    </div>
  );
}
