import pandas as pd
from pathlib import Path

PROCESSED_PATH = Path("data/processed")

def load_data():
    customers = pd.read_csv(PROCESSED_PATH / "customers_clean.csv")
    orders = pd.read_csv(PROCESSED_PATH / "orders_clean.csv")

    return customers, orders

def main():
    customers, orders = load_data()

    print("Customers:", customers.head())
    print("Orders:", orders.head())

if __name__ == "__main__":
    main()