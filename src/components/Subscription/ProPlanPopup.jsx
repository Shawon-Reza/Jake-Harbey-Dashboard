import { useEffect, useState } from "react";
import { Plus, Save, Trash2 } from "lucide-react";
import Button from "../Shared/Button";
import { CgClose } from "react-icons/cg";

export const ProPlanPopup = ({
  isOpen,
  onClose,
  onSave,
  editData = null,
  mode = "create",
  onCreateFeature,
  onCreateMissingFeature,
  onDeleteFeature,
  onDeleteMissingFeature,
}) => {
  const isFeatureEditMode = mode === "feature-edit";
  const [planName, setPlanName] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");
  const [features, setFeatures] = useState([]);
  const [newFeature, setNewFeature] = useState("");
  const [missingFeatures, setMissingFeatures] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const [deletingItemId, setDeletingItemId] = useState(null);
  const [newFeatureLabel, setNewFeatureLabel] = useState("");
  const [newMissingFeatureLabel, setNewMissingFeatureLabel] = useState("");
  const [isAddingFeature, setIsAddingFeature] = useState(false);
  const [isAddingMissingFeature, setIsAddingMissingFeature] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (isFeatureEditMode && editData) {
        setPlanName(editData.name || "");
        setPrice(editData.price !== undefined && editData.price !== null ? String(editData.price) : "");
        setDuration(editData.duration || "");
        setFeatures(
          Array.isArray(editData.featureItems)
            ? editData.featureItems.map((item) => ({
              id: item.id,
              feature: item.feature || "",
            }))
            : [],
        );
        setMissingFeatures(
          Array.isArray(editData.missingFeatureItems)
            ? editData.missingFeatureItems.map((item) => ({
              id: item.id,
              missing_feature: item.missing_feature || "",
            }))
            : [],
        );
      } else if (editData) {
        setPlanName(editData.name || "");
        setPrice(
          editData.price !== undefined && editData.price !== null
            ? String(editData.price)
            : "",
        );
        setDuration(editData.duration || "");
        setFeatures(Array.isArray(editData.features) ? editData.features : []);
        setMissingFeatures([]);
      } else {
        setPlanName("");
        setPrice("");
        setDuration("");
        setFeatures([]);
        setMissingFeatures([]);
      }
      setNewFeature("");
      setNewFeatureLabel("");
      setNewMissingFeatureLabel("");
    }
  }, [editData, isFeatureEditMode, isOpen]);

  if (!isOpen) return null;

  const addFeature = () => {
    if (newFeature.trim() && !features.includes(newFeature.trim())) {
      setFeatures([...features, newFeature.trim()]);
      setNewFeature("");
    }
  };

  const removeFeature = (index) => {
    setFeatures(features.filter((_, i) => i !== index));
  };

  const deleteFeatureItem = async (feature, index) => {
    if (feature?.id) {
      try {
        setDeletingItemId(feature.id);
        await Promise.resolve(onDeleteFeature?.(feature));
        setFeatures((current) => current.filter((_, itemIndex) => itemIndex !== index));
      } finally {
        setDeletingItemId(null);
      }
      return;
    }

    removeFeature(index);
  };

  const deleteMissingFeatureItem = async (feature, index) => {
    if (feature?.id) {
      try {
        setDeletingItemId(feature.id);
        await Promise.resolve(onDeleteMissingFeature?.(feature));
        setMissingFeatures((current) => current.filter((_, itemIndex) => itemIndex !== index));
      } finally {
        setDeletingItemId(null);
      }
      return;
    }

    setMissingFeatures((current) => current.filter((_, itemIndex) => itemIndex !== index));
  };

  const handleCreateFeature = async () => {
    const value = newFeatureLabel.trim();
    if (!value) return;

    try {
      setIsAddingFeature(true);
      const createdFeature = await Promise.resolve(onCreateFeature?.(value));
      if (createdFeature) {
        setFeatures((current) => [
          ...current,
          {
            id: createdFeature.id ?? `local-feature-${Date.now()}`,
            feature: createdFeature.feature ?? value,
          },
        ]);
      }
      setNewFeatureLabel("");
    } finally {
      setIsAddingFeature(false);
    }
  };

  const handleCreateMissingFeature = async () => {
    const value = newMissingFeatureLabel.trim();
    if (!value) return;

    try {
      setIsAddingMissingFeature(true);
      const createdMissingFeature = await Promise.resolve(onCreateMissingFeature?.(value));
      if (createdMissingFeature) {
        setMissingFeatures((current) => [
          ...current,
          {
            id: createdMissingFeature.id ?? `local-missing-${Date.now()}`,
            missing_feature: createdMissingFeature.missing_feature ?? value,
          },
        ]);
      }
      setNewMissingFeatureLabel("");
    } finally {
      setIsAddingMissingFeature(false);
    }
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      await Promise.resolve(
        onSave(
          isFeatureEditMode
            ? {
              featureItems: features,
              missingFeatureItems: missingFeatures,
            }
            : {
              planName,
              price,
              duration,
              features,
            },
        ),
      );
      onClose();
    } finally {
      setIsSaving(false);
    }
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="mx-auto max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-white shadow-xl">
        <div className="flex items-center justify-between p-4">
          <h2 className="text-lg font-medium text-gray-900">
            {isFeatureEditMode
              ? "Edit Plan Features"
              : editData
                ? "Edit Plan"
                : "Add New Plan"}
          </h2>
          <button onClick={handleClose} className="text-gray-400 hover:text-gray-600">
            <CgClose className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-4 p-4">
          {isFeatureEditMode ? (
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="grid gap-3 text-sm text-slate-600 sm:grid-cols-3">
                <div>
                  <div className="font-medium text-slate-500">Plan</div>
                  <div className="text-slate-900">{planName || "N/A"}</div>
                </div>
                <div>
                  <div className="font-medium text-slate-500">Price</div>
                  <div className="text-slate-900">{price || "N/A"}</div>
                </div>
                <div>
                  <div className="font-medium text-slate-500">Duration</div>
                  <div className="text-slate-900">{duration || "N/A"}</div>
                </div>
              </div>
              <p className="mt-3 text-xs text-slate-500">
                Update feature labels here. Changes are saved back through the specific feature endpoints.
              </p>
            </div>
          ) : (
            <div>
              <label className="mb-1 block text-sm text-gray-600">
                Plan Name
              </label>
              <input
                type="text"
                value={planName}
                onChange={(e) => setPlanName(e.target.value)}
                className="w-full rounded-md border border-gray p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}

          {!isFeatureEditMode ? (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-1 block text-sm text-gray-600">
                  Price ($)
                </label>
                <input
                  type="text"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full rounded-md border border-gray p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm text-gray-600">
                  Duration
                </label>
                <input
                  type="text"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full rounded-md border border-gray p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          ) : null}

          <div>
            <label className="mb-2 block text-sm text-gray-600">
              Features
            </label>

            {isFeatureEditMode ? (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={newFeatureLabel}
                    onChange={(e) => setNewFeatureLabel(e.target.value)}
                    placeholder="Add new feature"
                    className="flex-1 rounded-md border border-gray p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onKeyDown={(e) => e.key === "Enter" && handleCreateFeature()}
                  />
                  <button
                    type="button"
                    onClick={handleCreateFeature}
                    disabled={isAddingFeature}
                    className="inline-flex items-center justify-center rounded-md border border-gray px-3 py-2 text-sm text-gray-500 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>

                {features.length ? (
                  features.map((feature, index) => (
                    <div
                      key={feature.id || index}
                      className="grid gap-2 rounded-md border border-gray p-3 sm:grid-cols-[1fr_auto]"
                    >
                      <input
                        type="text"
                        value={feature.feature}
                        onChange={(e) => {
                          const value = e.target.value;
                          setFeatures((current) =>
                            current.map((item, itemIndex) =>
                              itemIndex === index ? { ...item, feature: value } : item,
                            ),
                          );
                        }}
                        className="w-full rounded-md border border-slate-200 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <div className="flex items-center justify-between gap-3 text-xs text-slate-400 sm:justify-end">
                        <button
                          type="button"
                          onClick={() => deleteFeatureItem(feature, index)}
                          disabled={deletingItemId === feature.id}
                          className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-[#ff6b6b] transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          <Trash2 className="h-4 w-4" />
                          {deletingItemId === feature.id ? "Deleting..." : "Delete"}
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="rounded-md border border-dashed border-slate-200 p-4 text-sm text-slate-400">
                    No features available.
                  </div>
                )}

              </div>
            ) : (
              <div className="space-y-2">
                {features.map((feature, index) => (
                  <div
                    key={index}
                  >
                    <span className="text-sm text-gray-700">{feature}</span>
                    <button
                      onClick={() => removeFeature(index)}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}

                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={newFeature}
                    onChange={(e) => setNewFeature(e.target.value)}
                    placeholder="Add new features"
                    className="flex-1 rounded-md border border-gray p-2 text-sm text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onKeyDown={(e) => e.key === "Enter" && addFeature()}
                  />
                  <button
                    onClick={addFeature}
                    className="rounded-md border border-gray p-2.5 text-gray-400 hover:text-blue-500"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {isFeatureEditMode ? (
            <div>
              <label className="mb-2 block text-sm text-gray-600">
                Missing Features
              </label>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={newMissingFeatureLabel}
                    onChange={(e) => setNewMissingFeatureLabel(e.target.value)}
                    placeholder="Add new missing feature"
                    className="flex-1 rounded-md border border-gray p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onKeyDown={(e) => e.key === "Enter" && handleCreateMissingFeature()}
                  />
                  <button
                    type="button"
                    onClick={handleCreateMissingFeature}
                    disabled={isAddingMissingFeature}
                    className="inline-flex items-center justify-center rounded-md border border-gray px-3 py-2 text-sm text-gray-500 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>

                {missingFeatures.map((feature, index) => (
                  <div
                    key={feature.id || index}
                    className="grid gap-2 rounded-md border border-gray p-3 sm:grid-cols-[1fr_auto]"
                  >
                    <input
                      type="text"
                      value={feature.missing_feature}
                      onChange={(e) => {
                        const value = e.target.value;
                        setMissingFeatures((current) =>
                          current.map((item, itemIndex) =>
                            itemIndex === index ? { ...item, missing_feature: value } : item,
                          ),
                        );
                      }}
                      className="w-full rounded-md border border-slate-200 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <div className="flex items-center justify-between gap-3 text-xs text-slate-400 sm:justify-end">
                      <span>Feature ID: {feature.id ?? "N/A"}</span>
                      <button
                        type="button"
                        onClick={() => deleteMissingFeatureItem(feature, index)}
                        disabled={deletingItemId === feature.id}
                        className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-[#ff6b6b] transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        <Trash2 className="h-4 w-4" />
                        {deletingItemId === feature.id ? "Deleting..." : "Delete"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          {!isFeatureEditMode ? (
            <div className="w-full" onClick={handleSave}>
              <Button className="w-full">
                <div className="flex items-center justify-center gap-2">
                  <Save className="h-4 w-4" />
                  {editData ? "Save Changes" : "Add Plan"}
                </div>
              </Button>
            </div>
          ) : (
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={handleClose}
                className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="inline-flex items-center justify-center rounded-xl bg-[#00A3E9] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0090cf] disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Save className="mr-2 h-4 w-4" />
                {isSaving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
