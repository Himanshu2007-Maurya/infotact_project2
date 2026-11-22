
import FarmMap from "./FarmMap";
import { useState } from "react";
import "./App.css";

function App() {
  const [activePage, setActivePage] = useState("Overview");

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

  const cropHealthData = [
    { label: "Healthy Crops", value: 67, color: "#58b77a" },
    { label: "Moderate Risk", value: 14, color: "#e7b45d" },
    { label: "High Risk", value: 19, color: "#df7770" },
  ];

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

            {/* Day 5, Day 6, Day 7 and Day 8 - Farm Map */}
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
                {/* Doughnut Chart */}
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

                {/* Bar Chart */}
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

              {/* Existing Crop Health Summary */}
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


