# TerraSpectra: Hyperspectral Crop Disease Forecasting

## Project Overview

TerraSpectra is an AI-powered precision agriculture project designed to analyze hyperspectral crop imagery and identify early indicators of crop stress and potential disease.

## Objectives

- Process hyperspectral image data.
- Apply PCA for dimensionality reduction.
- Develop a hybrid 3D-CNN and Vision Transformer model.
- Identify healthy and stressed crop regions.
- Develop a FastAPI prediction service.
- Visualize crop health using an interactive GIS dashboard.

## Technology Stack

- Python
- NumPy and Pandas
- Scikit-learn
- PyTorch
- Rasterio
- FastAPI
- React
- Deck.gl
- Plotly

## Project Duration

20 Days

## Team

- AI/ML and Backend Development
- Frontend and GIS Development

## Current Progress

Day 1 â€“ Project initialization and ML environment setup.

### Day 3 â€“ Frontend Dashboard Structure (15 November 2026)

**Status: Frontend Foundation Developed**

Today's work focused on building the initial TerraSpectra dashboard structure using React and Vite.

**Tasks Completed:**

- Created the initial React + Vite frontend structure.
- Developed a sidebar with TerraSpectra branding.
- Added workspace navigation:
  - Overview
  - Crop Monitoring
  - Analytics
  - Reports
- Implemented a dynamic header with breadcrumb and active page title.
- Created the main dashboard workspace layout.
- Added interactive navigation using React state (`useState`).
- Applied custom CSS styling for the dashboard.
- Added responsive styling for smaller screens.
- Included prototype and development-mode indicators.

**Technology Used:**

- React
- Vite
- JavaScript
- CSS

**Next Step:**
Develop overview dashboard cards and summary components on Day 4.

**Note:** The current dashboard is a frontend UI prototype. Live crop monitoring data, disease predictions, and GIS visualizations will be integrated in upcoming tasks.

### Day 2 – Dashboard Research, Wireframe and UI Design
**Scheduled Date:** 14 November 2026  
**Documentation completed:** 16 November 2026

**Dashboard Reference Research:**
- Reviewed agriculture monitoring dashboard layouts.
- Studied sidebar-based navigation and crop monitoring interfaces.
- Reviewed map-centric farm monitoring and analytics layouts.
- Identified the importance of clear data visualization and separated dashboard modules.

**Reference Sources:**
- Remote Monitoring Digital Dashboard – https://ausveg.com.au/app/uploads/2024/11/st19024-final-report.pdf
- Crop Health Monitoring Portal – https://eprints.whiterose.ac.uk/id/eprint/152109/1/sensors-19-03796.pdf
- Fieldwise Agriculture UX – https://www.tanguyd.com/prjt-fieldwise

**TerraSpectra Wireframe Planning:**
1. Left sidebar with project branding and navigation.
2. Top header with breadcrumb, page title and prototype status.
3. Welcome section describing hyperspectral crop intelligence.
4. Main workspace for dashboard modules.
5. Future sections for crop monitoring, GIS maps and analytics.

**Visual Design Decisions:**
- Dark green sidebar for agricultural identity.
- Light background for readable content.
- Green accent colors for active navigation and status indicators.
- Card-based layout for modular dashboard development.
- Responsive CSS for smaller screens.

**Technology:** React, Vite, JavaScript and CSS.

**Outcome:** Dashboard research, initial wireframe structure and visual design decisions documented. The initial UI structure was implemented during Day 3.

**Note:** GIS maps, heatmaps, charts and live crop predictions are planned for upcoming development tasks. No live prediction data is claimed at this stage.
