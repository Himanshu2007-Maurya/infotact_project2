import FarmMap from "./FarmMap";
import { useState } from "react";
import Plot from "react-plotly.js";
import "./App.css";

const cropHealthData = [
  { label: "Healthy Crops", value: 67, color: "#58b77a" },
  { label: "Moderate Risk", value: 14, color: "#e7b45d" },
  { label: "High Risk", value: 19, color: "#df7770" },
];

// Day 10: Illustrative analytics dataset
const analyticsRecords = [
  { crop: "Wheat", risk: "Low", health: 88, month: "January" },
  { crop: "Rice", risk: "Moderate", health: 72, month: "January" },
  { crop: "Maize", risk: "High", health: 48, month: "January" },
  { crop: "Cotton", risk: "Low", health: 84, month: "January" },

  { crop: "Wheat", risk: "Moderate", health: 76, month: "February" },
  { crop: "Rice", risk: "Low", health: 91, month: "February" },
  { crop: "Maize", risk: "Moderate", health: 69, month: "February" },
  { crop: "Cotton", risk: "High", health: 52, month: "February" },

  { crop: "Wheat", risk: "Low", health: 90, month: "March" },
  { crop: "Rice", risk: "High", health: 55, month: "March" },
  { crop: "Maize", risk: "Low", health: 86, month: "March" },
  { crop: "Cotton", risk: "Moderate", health: 73, month: "March" },
];


// Day 11: Illustrative disease information for the details panel
const diseaseDetailsData = [
  {
    name: "Wheat Rust",
    crop: "Wheat",
    risk: "High",
    symptoms: [
      "Small orange-brown or yellow rust-like pustules on leaves",
      "Yellowing of affected leaf areas",
      "Reduced plant vigour in severe cases",
    ],
    actions: [
      "Inspect nearby plants and check whether symptoms are spreading",
      "Remove heavily affected plant material where practical",
      "Consult a local agricultural expert before selecting any treatment",
    ],
    prevention: [
      "Use locally recommended resistant varieties",
      "Monitor the crop regularly, especially during favourable weather",
      "Follow recommended field sanitation and crop-management practices",
    ],
    description:
      "A fungal disease group that can affect wheat leaves and reduce crop performance.",
  },
  {
    name: "Rice Blast",
    crop: "Rice",
    risk: "High",
    symptoms: [
      "Spindle-shaped lesions with grey or whitish centres",
      "Brown or reddish margins around leaf lesions",
      "In severe cases, lesions may appear on nodes or panicles",
    ],
    actions: [
      "Inspect affected and neighbouring areas for similar symptoms",
      "Avoid making treatment decisions from this sample panel alone",
      "Seek advice from a qualified local agriculture officer",
    ],
    prevention: [
      "Use suitable resistant varieties where available",
      "Avoid excessive nitrogen application",
      "Maintain recommended spacing and field-management practices",
    ],
    description:
      "A fungal disease that may affect rice leaves, nodes and panicles.",
  },
  {
    name: "Maize Leaf Blight",
    crop: "Maize",
    risk: "Moderate",
    symptoms: [
      "Long, cigar-shaped grey-green or tan lesions on leaves",
      "Lesions may enlarge and join together",
      "Lower leaves can show symptoms first",
    ],
    actions: [
      "Check the size and spread of lesions across multiple plants",
      "Record affected field locations for follow-up monitoring",
      "Ask a local crop specialist to confirm the cause",
    ],
    prevention: [
      "Use healthy seed and locally recommended varieties",
      "Manage crop residues according to local guidance",
      "Maintain balanced crop nutrition",
    ],
    description:
      "A leaf disease that can reduce healthy leaf area when symptoms become severe.",
  },
  {
    name: "Cotton Leaf Curl",
    crop: "Cotton",
    risk: "Moderate",
    symptoms: [
      "Upward or downward curling of leaves",
      "Thickening of veins and a leathery leaf appearance",
      "Stunted growth in affected plants",
    ],
    actions: [
      "Inspect plants for symptoms and possible whitefly presence",
      "Monitor affected patches and record their location",
      "Confirm the problem with a local agricultural specialist",
    ],
    prevention: [
      "Use recommended varieties and healthy planting material",
      "Monitor vector populations regularly",
      "Follow integrated pest-management guidance",
    ],
    description:
      "A viral disease complex associated with cotton leaf-curl symptoms and whitefly transmission.",
  },
];

const chartLayout = {
  autosize: true,
  height: 320,
  margin: { t: 20, r: 20, b: 55, l: 45 },
  paper_bgcolor: "rgba(0,0,0,0)",
  plot_bgcolor: "rgba(0,0,0,0)",
  font: {
    family: "Inter, Arial, sans-serif",
    color: "#52675c",
    size: 11,
  },
};

const chartConfig = {
  responsive: true,
  displayModeBar: false,
};

function App() {
  const [activePage, setActivePage] = useState("Overview");
  const [selectedCrop, setSelectedCrop] = useState("All");
  const [selectedRisk, setSelectedRisk] = useState("All");
  const [selectedDisease, setSelectedDisease] = useState("Wheat Rust");

  const navigation = [
    "Overview",
    "Crop Monitoring",
    "Analytics",
    "Reports",
  ];

  const summaryCards = [
    {
      title: "Total Farms",
      value: "128",
      change: "Demo farm records",
      icon: "🌾",
      color: "green",
    },
    {
      title: "Healthy Crops",
      value: "86",
      change: "67.2% of monitored farms",
      icon: "🌱",
      color: "blue",
    },
    {
      title: "At-Risk Areas",
      value: "24",
      change: "Requires further monitoring",
      icon: "⚠️",
      color: "orange",
    },
    {
      title: "Average Crop Health",
      value: "78.5%",
      change: "Sample health indicator",
      icon: "📊",
      color: "purple",
    },
  ];

  // Apply selected filters to the sample dataset
  const filteredRecords = analyticsRecords.filter((record) => {
    const cropMatches =
      selectedCrop === "All" || record.crop === selectedCrop;

    const riskMatches =
      selectedRisk === "All" || record.risk === selectedRisk;

    return cropMatches && riskMatches;
  });

  // Risk distribution for the pie chart
  const riskCategories = ["Low", "Moderate", "High"];

  const riskCounts = riskCategories.map((risk) =>
    filteredRecords.filter((record) => record.risk === risk).length
  );

  // Average crop health for the bar chart
  const cropCategories = ["Wheat", "Rice", "Maize", "Cotton"];

  const cropAverages = cropCategories.map((crop) => {
    const cropRecords = filteredRecords.filter(
      (record) => record.crop === crop
    );

    if (cropRecords.length === 0) return 0;

    const total = cropRecords.reduce(
      (sum, record) => sum + record.health,
      0
    );

    return Math.round(total / cropRecords.length);
  });

  // Monthly average crop health for the line chart
  const months = ["January", "February", "March"];

  const monthlyAverages = months.map((month) => {
    const monthRecords = filteredRecords.filter(
      (record) => record.month === month
    );

    if (monthRecords.length === 0) return null;

    const total = monthRecords.reduce(
      (sum, record) => sum + record.health,
      0
    );

    return Math.round(total / monthRecords.length);
  });

  const resetFilters = () => {
    setSelectedCrop("All");
    setSelectedRisk("All");
  };

  return (
    <div className="app-layout">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-icon">T</div>
          <div>
            <h2>TerraSpectra</h2>
            <span>Precision Agriculture</span>
          </div>
        </div>

        <p className="nav-label">WORKSPACE</p>

        <nav>
          {navigation.map((item) => (
            <button
              key={item}
              className={`nav-item ${
                activePage === item ? "active" : ""
              }`}
              onClick={() => setActivePage(item)}
            >
              <span className="nav-dot"></span>
              {item}
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <span className="status-dot"></span>
          Development Mode
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div>
            <p className="breadcrumb">
              Workspace / {activePage}
            </p>
            <h1>{activePage}</h1>
          </div>

          <div className="profile">
            <span className="online-dot"></span>
            Prototype
          </div>
        </header>

        <section className="welcome-section">
          <p className="eyebrow">
            HYPERSPECTRAL CROP INTELLIGENCE
          </p>
          <h2>Welcome to TerraSpectra</h2>
          <p>
            Monitor crop health and explore hyperspectral insights
            through an integrated agriculture dashboard.
          </p>
        </section>

        {activePage === "Overview" ? (
          <>
            <section className="summary-section">
              <div className="summary-heading">
                <div>
                  <span className="section-tag">
                    FARM OVERVIEW
                  </span>
                  <h3>Dashboard Summary</h3>
                </div>

                <span className="prototype-tag">
                  Sample Data
                </span>
              </div>

              <div className="summary-grid">
                {summaryCards.map((card) => (
                  <div className="summary-card" key={card.title}>
                    <div className="summary-card-top">
                      <div className={`summary-icon ${card.color}`}>
                        {card.icon}
                      </div>

                      <span className="summary-indicator">●</span>
                    </div>

                    <p className="summary-title">{card.title}</p>
                    <h2>{card.value}</h2>

                    <p className="summary-description">
                      {card.change}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Day 5 to Day 8 - Farm Map */}
            <section className="workspace-card farm-map-section">
              <div className="card-heading">
                <div>
                  <span className="section-tag">
                    GEOGRAPHICAL MONITORING
                  </span>
                  <h3>Farm Location Map</h3>
                </div>

                <span className="prototype-tag">
                  Interactive Map
                </span>
              </div>

              <FarmMap />
            </section>

            {/* Day 9 - Crop Health Analytics */}
            <section className="workspace-card overview-workspace day9-analytics">
              <div className="card-heading">
                <div>
                  <span className="section-tag">
                    CROP HEALTH ANALYTICS
                  </span>
                  <h3>Crop Health Distribution</h3>
                </div>

                <span className="prototype-tag">
                  Sample Data
                </span>
              </div>

              <div className="day9-chart-grid">
                <div className="day9-chart-card">
                  <h4>Crop Health Overview</h4>
                  <p className="day9-chart-subtitle">
                    Distribution by crop health category
                  </p>

                  <div className="day9-donut-layout">
                    <div
                      className="day9-donut"
                      role="img"
                      aria-label="Crop health distribution: 67 percent healthy, 14 percent moderate risk, 19 percent high risk"
                    >
                      <div className="day9-donut-center">
                        <strong>100%</strong>
                        <span>Total</span>
                      </div>
                    </div>

                    <div className="day9-chart-legend">
                      {cropHealthData.map((item) => (
                        <div
                          className="day9-legend-item"
                          key={item.label}
                        >
                          <span
                            className="day9-legend-dot"
                            style={{ backgroundColor: item.color }}
                          ></span>

                          <span>{item.label}</span>
                          <strong>{item.value}%</strong>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="day9-chart-card">
                  <h4>Health Category Comparison</h4>
                  <p className="day9-chart-subtitle">
                    Percentage across health categories
                  </p>

                  <div className="day9-bar-chart">
                    {cropHealthData.map((item) => (
                      <div
                        className="day9-bar-item"
                        key={item.label}
                      >
                        <div className="day9-bar-heading">
                          <span>{item.label}</span>
                          <strong>{item.value}%</strong>
                        </div>

                        <div className="day9-bar-track">
                          <div
                            className="day9-bar-fill"
                            style={{
                              width: `${item.value}%`,
                              backgroundColor: item.color,
                            }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="day9-existing-summary">
                <h4>Crop Health Summary</h4>

                <div className="health-summary">
                  <div className="health-item">
                    <div className="health-label">
                      <span>Healthy Crops</span>
                      <strong>67%</strong>
                    </div>

                    <div className="health-track">
                      <div className="health-fill healthy-fill"></div>
                    </div>
                  </div>

                  <div className="health-item">
                    <div className="health-label">
                      <span>Moderate Risk</span>
                      <strong>14%</strong>
                    </div>

                    <div className="health-track">
                      <div className="health-fill moderate-fill"></div>
                    </div>
                  </div>

                  <div className="health-item">
                    <div className="health-label">
                      <span>High Risk</span>
                      <strong>19%</strong>
                    </div>

                    <div className="health-track">
                      <div className="health-fill high-fill"></div>
                    </div>
                  </div>
                </div>
              </div>

              <p className="sample-note">
                Note: These values are illustrative sample data for
                the dashboard UI. They are not actual model predictions.
              </p>
            </section>

            {/* Day 10 - Interactive Plotly Analytics */}
            <section className="workspace-card day10-analytics">
              <div className="card-heading">
                <div>
                  <span className="section-tag">
                    INTERACTIVE DATA ANALYTICS
                  </span>
                  <h3>Crop Performance Analytics</h3>
                </div>

                <span className="prototype-tag">
                  Plotly Charts
                </span>
              </div>

              {/* Analytics Filters */}
              <div className="day10-filter-panel">
                <div className="day10-filter-heading">
                  <strong>Filter Analytics</strong>
                  <span>
                    Select crop and risk level to update charts
                  </span>
                </div>

                <div className="day10-filter-controls">
                  <label>
                    <span>Crop Type</span>
                    <select
                      value={selectedCrop}
                      onChange={(event) =>
                        setSelectedCrop(event.target.value)
                      }
                    >
                      <option value="All">All Crops</option>
                      <option value="Wheat">Wheat</option>
                      <option value="Rice">Rice</option>
                      <option value="Maize">Maize</option>
                      <option value="Cotton">Cotton</option>
                    </select>
                  </label>

                  <label>
                    <span>Risk Level</span>
                    <select
                      value={selectedRisk}
                      onChange={(event) =>
                        setSelectedRisk(event.target.value)
                      }
                    >
                      <option value="All">All Risk Levels</option>
                      <option value="Low">Low Risk</option>
                      <option value="Moderate">Moderate Risk</option>
                      <option value="High">High Risk</option>
                    </select>
                  </label>

                  <button
                    type="button"
                    className="day10-reset-button"
                    onClick={resetFilters}
                  >
                    Reset Filters
                  </button>
                </div>

                <p className="day10-result-count">
                  Showing {filteredRecords.length} of{" "}
                  {analyticsRecords.length} sample records
                </p>
              </div>

              {/* Plotly Charts */}
              {filteredRecords.length > 0 ? (
                <div className="day10-chart-grid">
                  <div className="day10-chart-card">
                    <h4>Risk Level Distribution</h4>
                    <p className="day10-chart-subtitle">
                      Distribution of filtered farm records
                    </p>

                    <Plot
                      data={[
                        {
                          type: "pie",
                          labels: riskCategories,
                          values: riskCounts,
                          hole: 0.48,
                          marker: {
                            colors: ["#58b77a", "#e7b45d", "#df7770"],
                          },
                          textinfo: "label+percent",
                          hovertemplate:
                            "%{label}: %{value} farms<extra></extra>",
                        },
                      ]}
                      layout={{
                        ...chartLayout,
                        showlegend: true,
                        legend: {
                          orientation: "h",
                          x: 0.5,
                          xanchor: "center",
                          y: -0.12,
                        },
                      }}
                      config={chartConfig}
                      useResizeHandler
                      style={{ width: "100%", height: "320px" }}
                    />
                  </div>

                  <div className="day10-chart-card">
                    <h4>Crop-wise Health Comparison</h4>
                    <p className="day10-chart-subtitle">
                      Average crop health percentage
                    </p>

                    <Plot
                      data={[
                        {
                          type: "bar",
                          x: cropCategories,
                          y: cropAverages,
                          marker: {
                            color: [
                              "#58b77a",
                              "#5d9bd3",
                              "#e7b45d",
                              "#9c83c9",
                            ],
                          },
                          text: cropAverages.map((value) =>
                            value > 0 ? `${value}%` : "No data"
                          ),
                          textposition: "outside",
                          hovertemplate:
                            "%{x}: %{y}% health<extra></extra>",
                        },
                      ]}
                      layout={{
                        ...chartLayout,
                        showlegend: false,
                        yaxis: {
                          title: "Crop Health (%)",
                          range: [0, 110],
                          gridcolor: "#e8eee9",
                        },
                        xaxis: {
                          gridcolor: "rgba(0,0,0,0)",
                        },
                      }}
                      config={chartConfig}
                      useResizeHandler
                      style={{ width: "100%", height: "320px" }}
                    />
                  </div>

                  <div className="day10-chart-card day10-trend-card">
                    <h4>Monthly Crop Health Trend</h4>
                    <p className="day10-chart-subtitle">
                      Average health score across months
                    </p>

                    <Plot
                      data={[
                        {
                          type: "scatter",
                          mode: "lines+markers",
                          x: months,
                          y: monthlyAverages,
                          connectgaps: false,
                          line: {
                            color: "#38865d",
                            width: 3,
                          },
                          marker: {
                            color: "#58b77a",
                            size: 10,
                          },
                          hovertemplate:
                            "%{x}: %{y}% health<extra></extra>",
                        },
                      ]}
                      layout={{
                        ...chartLayout,
                        showlegend: false,
                        yaxis: {
                          title: "Average Health (%)",
                          range: [0, 110],
                          gridcolor: "#e8eee9",
                        },
                        xaxis: {
                          title: "Month",
                          gridcolor: "rgba(0,0,0,0)",
                        },
                      }}
                      config={chartConfig}
                      useResizeHandler
                      style={{ width: "100%", height: "320px" }}
                    />
                  </div>
                </div>
              ) : (
                <div className="day10-empty-state">
                  <span>📊</span>
                  <h4>No matching records found</h4>
                  <p>
                    Try changing the crop type or risk level filters.
                  </p>
                  <button
                    type="button"
                    onClick={resetFilters}
                  >
                    Clear Filters
                  </button>
                </div>
              )}

              <p className="day10-sample-note">
                Note: Day 10 charts use illustrative sample records
                for frontend demonstration. They are not connected to
                actual disease predictions or live farm data.
              </p>
            </section>

            {/* Day 11 - Disease Category and Details Panel */}
            <section className="workspace-card day11-disease-section">
              <div className="card-heading">
                <div>
                  <span className="section-tag">
                    DISEASE INTELLIGENCE
                  </span>
                  <h3>Disease Category & Details</h3>
                </div>

                <span className="prototype-tag">
                  Sample Information
                </span>
              </div>

              <div className="day11-disease-intro">
                Select a disease category to view its crop, risk level,
                common symptoms, suggested follow-up actions and prevention
                practices.
              </div>

              <div className="day11-disease-selector">
                <label htmlFor="day11-disease-select">
                  Select Disease Category
                </label>
                <select
                  id="day11-disease-select"
                  value={selectedDisease}
                  onChange={(event) => setSelectedDisease(event.target.value)}
                >
                  {diseaseDetailsData.map((disease) => (
                    <option key={disease.name} value={disease.name}>
                      {disease.name}
                    </option>
                  ))}
                </select>
              </div>

              {diseaseDetailsData
                .filter((disease) => disease.name === selectedDisease)
                .map((disease) => (
                  <div className="day11-disease-content" key={disease.name}>
                    <div className="day11-disease-overview">
                      <div>
                        <span className="day11-overview-label">
                          SELECTED DISEASE
                        </span>
                        <h4>{disease.name}</h4>
                        <p>{disease.description}</p>
                      </div>

                      <div className="day11-disease-meta">
                        <div className="day11-meta-item">
                          <span>Crop</span>
                          <strong>{disease.crop}</strong>
                        </div>
                        <div className="day11-meta-item">
                          <span>Sample Risk Level</span>
                          <strong
                            className={`day11-risk-badge ${disease.risk.toLowerCase()}`}
                          >
                            {disease.risk}
                          </strong>
                        </div>
                      </div>
                    </div>

                    <div className="day11-detail-grid">
                      <div className="day11-detail-card">
                        <h5><span>◎</span> Common Symptoms</h5>
                        <ul>
                          {disease.symptoms.map((symptom) => (
                            <li key={symptom}>{symptom}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="day11-detail-card">
                        <h5><span>✓</span> Recommended Follow-up</h5>
                        <ul>
                          {disease.actions.map((action) => (
                            <li key={action}>{action}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="day11-detail-card day11-prevention-card">
                        <h5><span>✚</span> Prevention Practices</h5>
                        <ul>
                          {disease.prevention.map((practice) => (
                            <li key={practice}>{practice}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}

              <p className="day11-sample-note">
                Note: Disease descriptions and risk levels are illustrative
                reference content for the frontend prototype. They are not
                generated by the TerraSpectra model, do not confirm a field
                diagnosis, and must not be used as a substitute for local
                agricultural expert advice.
              </p>
            </section>
          </>
        ) : (
          <section className="workspace-card">
            <div className="card-heading">
              <div>
                <span className="section-tag">
                  PROJECT WORKSPACE
                </span>
                <h3>{activePage}</h3>
              </div>

              <span className="prototype-tag">
                UI Prototype
              </span>
            </div>

            <div className="empty-workspace">
              <div className="empty-icon">✦</div>
              <h3>Dashboard workspace is ready</h3>

              <p>
                {activePage} module will be developed in the upcoming tasks.
              </p>
            </div>
          </section>
        )}

        <footer>
          TerraSpectra · Hyperspectral Crop Disease Forecasting
        </footer>
      </main>
    </div>
  );
}

export default App;





