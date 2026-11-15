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
          <p className="eyebrow">HYPERSPECTRAL CROP INTELLIGENCE</p>
          <h2>Welcome to TerraSpectra</h2>
          <p>
            Monitor crop health and explore hyperspectral insights
            through an integrated agriculture dashboard.
          </p>
        </section>

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
              {activePage === "Overview"
                ? "The TerraSpectra dashboard foundation has been initialized."
                : `${activePage} module will be developed in the upcoming tasks.`}
            </p>
          </div>
        </section>

        <footer>
          TerraSpectra · Hyperspectral Crop Disease Forecasting
        </footer>
      </main>
    </div>
  );
}

export default App;
