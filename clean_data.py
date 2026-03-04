

import pandas as pd
from pathlib import Path

RAW_PATH = Path("data/raw")
PROCESSED_PATH = Path("data/processed")

PROCESSED_PATH.mkdir(parents=True, exist_ok=True)


def load_customers():
    """
    Load customers dataset
    """
    file_path = RAW_PATH / "customers.csv"

    df = pd.read_csv(file_path)

    print("Loaded customers:", df.shape)

    return df

def load_orders():
    """
    Load orders dataset
    """
    file_path = RAW_PATH / "orders.csv"

    df = pd.read_csv(file_path)
    print("Loaded orders:", df.shape)

    return df


def clean_customers(df):
    """
    Perform basic cleaning on customers dataset
    """

    print("Starting customer cleaning...")

    # sort by signup date to keep latest record
    # df = df.sort_values("signup_date")
    df["signup_date"] = pd.to_datetime(df["signup_date"], errors="coerce")
    df = df.sort_values("signup_date")

    # remove duplicate customer ids
    before = len(df)

    df = df.drop_duplicates(subset="customer_id", keep="last")

    after = len(df)

    print(f"Removed duplicates: {before - after}")

    # standardize email
    df["email"] = df["email"].str.lower()

    # trim whitespace
    df["name"] = df["name"].str.strip()
    df["region"] = df["region"].str.strip()

    # fill missing region
    df["region"] = df["region"].fillna("Unknown")

    return df

def parse_date(val):
    """
    Parse multiple date formats
    """

    for fmt in ("%Y-%m-%d", "%d/%m/%Y", "%m-%d-%Y"):
        try:
            return pd.to_datetime(val, format=fmt)
        except:
            continue

    return pd.NaT


def clean_orders(df):

    print("Starting order cleaning...")

    # parse date
    df["order_date"] = df["order_date"].apply(parse_date)

    # remove rows where both order_id and customer_id are null
    before = len(df)

    df = df.dropna(subset=["order_id", "customer_id"], how="all")

    after = len(df)

    print("Invalid rows removed:", before - after)

    # fill missing amount using median grouped by product
    # df["amount"] = df.groupby("product")["amount"].transform(
    #     lambda x: x.fillna(x.median())
    # )

    # df["amount"] = df.groupby("product")["amount"].transform(
    # lambda x: x.fillna(x.median())
    # )

    # df["amount"] = df["amount"].fillna(0)
    # fill missing amount safely
    def fill_group_median(series):
        valid_values = series.dropna()

        if len(valid_values) == 0:
           return series.fillna(0)

        median_val = valid_values.median()
        return series.fillna(median_val)

    df["amount"] = df.groupby("product")["amount"].transform(fill_group_median)

    # normalize status
    status_map = {
        "done": "completed",
        "completed": "completed",
        "pending": "pending",
        "canceled": "cancelled",
        "cancelled": "cancelled",
        "refund": "refunded",
        "refunded": "refunded",
    }

    df["status"] = df["status"].str.lower().map(status_map).fillna("pending")

    # create year month column
    df["order_year_month"] = df["order_date"].dt.strftime("%Y-%m")

    return df



def save_clean_customers(df):
    """
    Save cleaned dataset
    """

    output_path = PROCESSED_PATH / "customers_clean.csv"

    df.to_csv(output_path, index=False)

    print("Saved cleaned customers →", output_path)

def save_clean_orders(df):

    output_path = PROCESSED_PATH / "orders_clean.csv"

    df.to_csv(output_path, index=False)

    print("Saved cleaned orders →", output_path)






def main():

    customers = load_customers()

    # orders will be used in next step
    orders = load_orders()
     # clean customers
    customers_clean = clean_customers(customers)
    save_clean_customers(customers_clean)

    # clean orders
    orders_clean = clean_orders(orders)
    save_clean_orders(orders_clean)

    print("Customers shape:", customers.shape)
    print("Orders shape:", orders.shape)


if __name__ == "__main__":
    main()