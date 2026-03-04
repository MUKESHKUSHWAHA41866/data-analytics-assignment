# import pandas as pd
# from pathlib import Path

# RAW_PATH = Path("data/raw")
# PROCESSED_PATH = Path("data/processed")

# PROCESSED_PATH.mkdir(parents=True, exist_ok=True)


# def load_customers():
#     """
#     Load customers dataset
#     """
#     file_path = RAW_PATH / "customers.csv"
#     df = pd.read_csv(file_path)

#     print("Loaded customers:", df.shape)
#     return df

# def clean_customers(df):
#     """
#     Perform basic cleaning on customers dataset
#     """

#     print("Starting customer cleaning...")

#     # remove duplicate customer ids
#     before = len(df)
#     df = df.drop_duplicates(subset="customer_id", keep="last")
#     after = len(df)

#     print(f"Removed duplicates: {before - after}")

#     # standardize email
#     df["email"] = df["email"].str.lower()

#     # trim whitespace
#     df["name"] = df["name"].str.strip()
#     df["region"] = df["region"].str.strip()

#     # fill missing region
#     df["region"] = df["region"].fillna("Unknown")

#     return df


# def save_clean_customers(df):
#     """
#     Save cleaned dataset
#     """
#     output_path = PROCESSED_PATH / "customers_clean.csv"
#     df.to_csv(output_path, index=False)

#     print("Saved cleaned customers →", output_path)


# def load_orders():
#     file_path = RAW_PATH / "orders.csv"
#     df = pd.read_csv(file_path)
#     return df

# def main():
#     customers = load_customers()
#     orders = load_orders()

#     customers_clean = clean_customers(customers)
#     save_clean_customers(customers_clean)

#     print("Customers shape:", customers.shape)
#     print("Orders shape:", orders.shape)

# if __name__ == "__main__":
#     main()




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


def clean_customers(df):
    """
    Perform basic cleaning on customers dataset
    """

    print("Starting customer cleaning...")

    # sort by signup date to keep latest record
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


def save_clean_customers(df):
    """
    Save cleaned dataset
    """

    output_path = PROCESSED_PATH / "customers_clean.csv"

    df.to_csv(output_path, index=False)

    print("Saved cleaned customers →", output_path)


def load_orders():
    """
    Load orders dataset
    """
    file_path = RAW_PATH / "orders.csv"

    df = pd.read_csv(file_path)

    return df


def main():

    customers = load_customers()

    # orders will be used in next step
    orders = load_orders()

    customers_clean = clean_customers(customers)

    save_clean_customers(customers_clean)

    print("Customers shape:", customers.shape)
    print("Orders shape:", orders.shape)


if __name__ == "__main__":
    main()