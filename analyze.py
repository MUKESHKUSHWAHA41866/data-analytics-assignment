import pandas as pd
from pathlib import Path

RAW_PATH = Path("data/raw")
PROCESSED_PATH = Path("data/processed")

def load_data():
    """
    Load cleaned datasets
    """
    customers = pd.read_csv(PROCESSED_PATH / "customers_clean.csv")
    orders = pd.read_csv(PROCESSED_PATH / "orders_clean.csv")
    products = pd.read_csv(RAW_PATH / "products.csv")

    return customers, orders, products

def merge_datasets(customers, orders, products):

    print("Merging datasets...")

    # orders + customers
    orders_with_customers = pd.merge(
        orders,
        customers,
        on="customer_id",
        how="left"
    )

    # add products
    full_data = pd.merge(
        orders_with_customers,
        products,
        left_on="product",
        right_on="product_name",
        how="left"
    )

    return full_data


def monthly_revenue_analysis(df):

    revenue = (
        df[df["status"] == "completed"]
        .groupby("order_year_month")["amount"]
        .sum()
        .reset_index()
    )

    revenue.to_csv(PROCESSED_PATH / "monthly_revenue.csv", index=False)

    print("Saved monthly_revenue.csv")


def top_customers_analysis(df):

    top_customers = (
        df[df["status"] == "completed"]
        .groupby(["customer_id", "name", "region"])["amount"]
        .sum()
        .reset_index(name="total_spend")
        .sort_values("total_spend", ascending=False)
        .head(10)
    )

    top_customers.to_csv(PROCESSED_PATH / "top_customers.csv", index=False)

    print("Saved top_customers.csv")


def category_performance_analysis(df):

    category_perf = (
        df[df["status"] == "completed"]
        .groupby("category")
        .agg(
            total_revenue=("amount", "sum"),
            avg_order_value=("amount", "mean"),
            num_orders=("order_id", "count")
        )
        .reset_index()
    )

    category_perf.to_csv(PROCESSED_PATH / "category_performance.csv", index=False)

    print("Saved category_performance.csv")


def regional_analysis(df):

    regional = (
        df[df["status"] == "completed"]
        .groupby("region")
        .agg(
            num_customers=("customer_id", "nunique"),
            num_orders=("order_id", "count"),
            total_revenue=("amount", "sum")
        )
        .reset_index()
    )

    regional["avg_revenue_per_customer"] = (
        regional["total_revenue"] / regional["num_customers"]
    )

    regional.to_csv(PROCESSED_PATH / "regional_analysis.csv", index=False)

    print("Saved regional_analysis.csv")


def main():
    customers, orders, products = load_data()

    merged_data = merge_datasets(customers, orders, products)

    monthly_revenue_analysis(merged_data)

    top_customers_analysis(merged_data)

    category_performance_analysis(merged_data)

    regional_analysis(merged_data)

    print("Analysis completed successfully")

if __name__ == "__main__":
    main()