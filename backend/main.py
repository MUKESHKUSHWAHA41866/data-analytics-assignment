from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
from pathlib import Path

app = FastAPI(title="Data Analytics API")
DATA_PATH = Path("data/processed")

# enable CORS so frontend can access API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def read_csv(file_name: str):
    file_path = DATA_PATH / file_name

    if not file_path.exists():
        raise HTTPException(status_code=404, detail="Data file not found")

    df = pd.read_csv(file_path)

    return df.to_dict(orient="records")

@app.get("/")
def home():
    return {"message": "API running"}

@app.get("/health")
def health_check():
    return {"status": "ok"}


@app.get("/api/revenue")
def get_revenue():
    return read_csv("monthly_revenue.csv")


@app.get("/api/top-customers")
def get_top_customers():
    return read_csv("top_customers.csv")


@app.get("/api/categories")
def get_categories():
    return read_csv("category_performance.csv")


@app.get("/api/regions")
def get_regions():
    return read_csv("regional_analysis.csv")