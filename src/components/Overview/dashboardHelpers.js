const hasValue = (value) => value !== null && value !== undefined && value !== "";

const toNumberOrNull = (value) => {
  if (!hasValue(value)) return null;
  const numeric = Number(value);
  return Number.isNaN(numeric) ? null : numeric;
};

export const formatCurrency = (amount) => {
  const numeric = toNumberOrNull(amount);
  if (numeric === null) return "N/A";
  return `£${numeric.toLocaleString()}`;
};

export const mapRevenueTrend = (items = []) => {
  return items.map((item) => ({
    month: item.month,
    value: toNumberOrNull(item.revenue),
    target: toNumberOrNull(item.prev_month),
  }));
};

export const mapCustomerGrowth = (items = []) => {
  return items.map((item) => ({
    day: item.day,
    value: toNumberOrNull(item.count),
  }));
};

export const mapTechnicians = (items = []) => {
  return items.map((item) => ({
    name: item.name,
    id: item.user_id,
    jobs: toNumberOrNull(item.ongoing_jobs),
  }));
};
