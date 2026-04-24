import { Check, Edit2, Trash2 } from "lucide-react";
import { formatPrice } from "./subscriptionData";

const SubscriptionPlanCard = ({ plan, onEdit, onDelete }) => {
  const Icon = plan.icon;

  return (
    <div
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
            onClick={() => onEdit(plan.id)}
            className="text-slate-400 transition hover:text-slate-700"
            aria-label={`Edit ${plan.name} plan`}
          >
            <Edit2 className="h-4 w-4" />
          </button>
          <button
            onClick={() => onDelete(plan.id)}
            className="text-[#ff6b6b] transition hover:text-red-600"
            aria-label={`Delete ${plan.name} plan`}
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="mb-5">
        <h3 className="text-lg font-semibold text-slate-800">{plan.name}</h3>

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
          <div key={feature} className="flex items-start gap-2 text-sm">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
            <span className="text-slate-600">{feature}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubscriptionPlanCard;
