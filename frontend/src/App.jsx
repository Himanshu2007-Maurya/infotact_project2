
import { useState } from "react";
import "./App.css";
import FarmMap from "./FarmMap";

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
            <p className="breadcrumb">Workspace / {activePage}</p>
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
                  <span className="section-tag">FARM OVERVIEW</span>
                  <h3>Dashboard Summary</h3>
                </div>

                <span className="prototype-tag">Sample Data</span>
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

            {/* Day 5 - Geographical Farm Map */}
            <section className="workspace-card farm-map-card">
              <div className="card-heading">
                <div>
                  <span className="section-tag">
                    GEOGRAPHICAL MONITORING
                  </span>
                  <h3>Farm Location Map</h3>
                </div>

                <span className="prototype-tag">
                  Sample Locations
                </span>
              </div>

              <FarmMap />

              <div className="map-legend">
                <span>
                  <i className="legend-dot low-risk"></i>
                  Low Risk
                </span>

                <span>
                  <i className="legend-dot moderate-risk"></i>
                  Moderate Risk
                </span>

                <span>
                  <i className="legend-dot high-risk"></i>
                  High Risk
                </span>
              </div>

              <p className="sample-note">
                Note: Farm markers show illustrative sample locations
                and risk categories, not actual farm records or model
                predictions.
              </p>
            </section>

            {/* Crop Health Distribution */}
            <section className="workspace-card overview-workspace">
              <div className="card-heading">
                <div>
                  <span className="section-tag">CROP STATUS</span>
                  <h3>Crop Health Distribution</h3>
                </div>

                <span className="prototype-tag">Sample Data</span>
              </div>

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

              <p className="sample-note">
                Note: These values are illustrative sample data for the
                dashboard UI. They are not actual model predictions.
              </p>
            </section>
          </>
        ) : (
          <section className="workspace-card">
            <div className="card-heading">
              <div>
                <span className="section-tag">PROJECT WORKSPACE</span>
                <h3>{activePage}</h3>
              </div>

              <span className="prototype-tag">UI Prototype</span>
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


