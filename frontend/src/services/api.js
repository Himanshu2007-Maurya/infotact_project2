const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000/api/v1";

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: { Accept: "application/json", ...options.headers },
    ...options,
  });

  const contentType = response.headers.get("content-type") || "";
  const body = contentType.includes("application/json")
    ? await response.json()
    : await response.text();

  if (!response.ok) {
    const message =
      body?.detail?.message ||
      body?.detail?.code ||
      `API request failed (${response.status})`;
    const error = new Error(message);
    error.status = response.status;
    error.payload = body;
    throw error;
  }
  return body;
}

export const api = {
  health: () => request("/health"),
  dashboardSummary: () => request("/dashboard/summary"),
  farms: (risk) =>
    request(`/farms${risk && risk !== "All" ? `?risk=${encodeURIComponent(risk)}` : ""}`),
  analytics: (filters = {}) => {
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(filters)) {
      if (value && value !== "All") params.set(key, value);
    }
    const query = params.toString();
    return request(`/analytics${query ? `?${query}` : ""}`);
  },
  timeline: (filters = {}) => {
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(filters)) {
      if (value && value !== "All") params.set(key, value);
    }
    const query = params.toString();
    return request(`/analytics/timeline${query ? `?${query}` : ""}`);
  },
  diseases: (crop) =>
    request(`/diseases${crop && crop !== "All" ? `?crop=${encodeURIComponent(crop)}` : ""}`),
  disease: (slug) => request(`/diseases/${encodeURIComponent(slug)}`),
  createPrediction: (payload) =>
    request("/predictions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }),
  reportCsvUrl: `${API_BASE_URL}/reports/analytics.csv`,
};
