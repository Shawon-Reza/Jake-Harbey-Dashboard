const hasValue = (value) => value !== null && value !== undefined && value !== "";

const toDisplay = (value) => (hasValue(value) ? value : "N/A");

const toNumberOrNull = (value) => {
  if (!hasValue(value)) return null;
  const numeric = Number(value);
  return Number.isNaN(numeric) ? null : numeric;
};

export const formatCurrency = (value) => {
  const numeric = toNumberOrNull(value);
  if (numeric === null) return "N/A";
  return `£${numeric.toFixed(2)}`;
};

export const getInitial = (name) => {
  if (!hasValue(name)) return "N";
  return String(name).charAt(0).toUpperCase();
};

export const getAvatarColor = (index) => {
  const colors = [
    "bg-blue-200",
    "bg-purple-200",
    "bg-pink-200",
    "bg-orange-200",
    "bg-green-200",
    "bg-yellow-200",
    "bg-indigo-200",
    "bg-red-200",
  ];
  return colors[index % colors.length];
};

export const getCustomerAvatarSrc = (customer) =>
  customer?.profile_picture || customer?.profilePicture || customer?.image || null;

const normalizeSubmissions = (items) => {
  if (!Array.isArray(items)) return [];

  return items.map((item, index) => ({
    id: item?.id || item?.submission_id || index + 1,
    service: toDisplay(item?.service || item?.service_name || item?.title),
    description: toDisplay(item?.description),
    status: toDisplay(item?.status),
    urgency: hasValue(item?.urgency) ? item.urgency : null,
    assign: hasValue(item?.assign) ? item.assign : null,
    date: toDisplay(item?.date || item?.created_at),
    amount: hasValue(item?.amount) ? formatCurrency(item.amount) : null,
    progress: toNumberOrNull(item?.progress) || 0,
  }));
};

const normalizeVehicle = (vehicle) => {
  const data = vehicle || {};
  return {
    make: toDisplay(data.make),
    model: toDisplay(data.model),
    year: toDisplay(data.year),
    colour: toDisplay(data.colour || data.color),
    fuel: toDisplay(data.fuel),
    reg: toDisplay(data.reg || data.registration),
  };
};

export const normalizeCustomers = (payload) => {
  const items = Array.isArray(payload)
    ? payload
    : payload?.results || payload?.data || payload?.customers || [];

  if (!Array.isArray(items)) return [];

  return items.map((item, index) => ({
    id: item?.id || item?.customer_id || item?.user_id || index + 1,
    name: toDisplay(item?.name || item?.full_name || item?.customer_name),
    since: toDisplay(item?.since || item?.customer_since || item?.created_year),
    phone: toDisplay(item?.phone || item?.phone_number),
    email: toDisplay(item?.email),
    location: toDisplay(item?.location || item?.postcode || item?.postal_code),
    jobs: toNumberOrNull(item?.jobs || item?.total_jobs),
    totalSpent: formatCurrency(item?.total_spent || item?.totalSpent),
    activeJobs: toNumberOrNull(item?.active_jobs),
    completedJobs: toNumberOrNull(item?.completed_jobs),
    vehicle: normalizeVehicle(item?.vehicle),
    submissions: normalizeSubmissions(item?.submissions || item?.history),
  }));
};
