import pandas as pd
from pathlib import Path

RAW_PATH = Path("data/raw")
PROCESSED_PATH = Path("data/processed")

def load_customers():
    file_path = RAW_PATH / "customers.csv"
    df = pd.read_csv(file_path)
    return df

def load_orders():
    file_path = RAW_PATH / "orders.csv"
    df = pd.read_csv(file_path)
    return df

def main():
    customers = load_customers()
    orders = load_orders()

    print("Customers shape:", customers.shape)
    print("Orders shape:", orders.shape)

if __name__ == "__main__":
    main()