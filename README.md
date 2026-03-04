# Data Analytics Fullstack Assignment

## Overview

This project demonstrates an **end-to-end data pipeline** built using **Python, FastAPI, and React**.

The application:

1. Ingests raw CSV datasets
2. Cleans and transforms the data
3. Generates analytical insights
4. Exposes the results through a REST API
5. Displays insights on a frontend dashboard

---

# Tech Stack

### Backend

* Python 3.10+
* Pandas
* FastAPI
* Uvicorn

### Frontend

* React (Vite)
* Axios
* Recharts

### Data Processing

* Pandas
* NumPy

---

# Project Structure

```
data-analytics-assignment
│
├── clean_data.py
├── analyze.py
├── README.md
│
├── backend
│   └── main.py
│
├── frontend
│   ├── package.json
│   ├── index.html
│   │
│   └── src
│       ├── App.jsx
│       ├── api.js
│       │
│       └── components
│           ├── RevenueChart.jsx
│           ├── TopCustomersTable.jsx
│           ├── CategoryChart.jsx
│           └── RegionSummary.jsx
│
├── data
│   ├── raw
│   │   ├── customers.csv
│   │   ├── orders.csv
│   │   └── products.csv
│   │
│   └── processed
│       ├── customers_clean.csv
│       ├── orders_clean.csv
│       ├── monthly_revenue.csv
│       ├── top_customers.csv
│       ├── category_performance.csv
│       └── regional_analysis.csv
│
└── requirements.txt
```

---

# Setup Instructions

## 1. Extract or Clone Repository

```
git clone <repo-url>
cd data-analytics-assignment
```

---

## 2. Create Virtual Environment

```
python -m venv venv
```

Activate:

Windows

```
venv\Scripts\activate
```

Mac/Linux

```
source venv/bin/activate
```

---

## 3. Install Dependencies

```
pip install -r requirements.txt
```

---

# Running the Project

## Step 1 — Clean Raw Data

```
python clean_data.py
```

This generates:

```
data/processed/customers_clean.csv
data/processed/orders_clean.csv
```

---

## Step 2 — Run Data Analysis

```
python analyze.py
```

This generates:

```
monthly_revenue.csv
top_customers.csv
category_performance.csv
regional_analysis.csv
```

---

## Step 3 — Start Backend API

```
uvicorn backend.main:app --reload
```

API docs available at:

```
http://localhost:8000/docs
```

Available endpoints:

```
/api/revenue
/api/top-customers
/api/categories
/api/regions
/health
```

---

## Step 4 — Start Frontend Dashboard

```
cd frontend
npm install
npm run dev
```

Open:

```
http://localhost:5173
```

---

# Dashboard Features

* Monthly Revenue Trend Chart
* Top Customers Table
* Revenue by Category
* Regional Performance Summary

---

# Data Pipeline Architecture

```
Raw CSV Data
     ↓
Data Cleaning (clean_data.py)
     ↓
Data Analysis (analyze.py)
     ↓
FastAPI Backend
     ↓
React Dashboard
```

---

# Assumptions

* Missing order amounts are filled using the median value per product.
* If median cannot be computed, the value defaults to **0**.
* Email addresses are standardized to lowercase.

---

# Author

Mukesh Kushwaha
