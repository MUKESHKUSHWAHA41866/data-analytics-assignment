"""
Unit tests for data cleaning functions in clean_data.py
Test coverage for: clean_customers(), clean_orders(), parse_date()
"""

import pytest
import pandas as pd
from datetime import datetime, timedelta
from pathlib import Path
import sys

# Add parent directory to path to import clean_data
sys.path.insert(0, str(Path(__file__).parent.parent))

from clean_data import clean_customers, clean_orders, parse_date


class TestParseDate:
    """Test date parsing with multiple formats"""

    def test_parse_date_yyyy_mm_dd_format(self):
        """Test parsing YYYY-MM-DD format"""
        result = parse_date("2023-06-15")
        assert result == pd.Timestamp("2023-06-15")

    def test_parse_date_dd_mm_yyyy_format(self):
        """Test parsing DD/MM/YYYY format"""
        result = parse_date("15/06/2023")
        assert result == pd.Timestamp("2023-06-15")

    def test_parse_date_mm_dd_yyyy_format(self):
        """Test parsing MM-DD-YYYY format"""
        result = parse_date("06-15-2023")
        assert result == pd.Timestamp("2023-06-15")

    def test_parse_date_invalid_format(self):
        """Test parsing invalid date format returns NaT"""
        result = parse_date("invalid-date")
        assert pd.isna(result)

    def test_parse_date_empty_string(self):
        """Test parsing empty string returns NaT"""
        result = parse_date("")
        assert pd.isna(result)


class TestCleanCustomers:
    """Test customer data cleaning"""

    @pytest.fixture
    def sample_customers_df(self):
        """Create sample customer dataframe for testing"""
        return pd.DataFrame({
            'customer_id': [1, 2, 2, 3, 4, 5, 6],
            'name': ['  John Doe  ', 'Jane Smith', 'Jane Smith', 'Bob Wilson  ', 'Alice Brown', '  Charlie Lee', 'Diana Ross'],
            'email': ['JOHN@EXAMPLE.COM', 'jane@example.com', 'jane@EXAMPLE.COM', 'bob@example.com', 'Alice@EXAMPLE.COM', 'charlie@example.com', 'DIANA@EXAMPLE.COM'],
            'region': ['  North  ', 'South', 'South', '  East  ', None, '', 'West'],
            'signup_date': ['2023-01-15', '2023-02-20', '2023-02-21', '2023-03-10', '2023-01-05', '2023-04-01', '2023-05-15']
        })

    def test_remove_duplicate_customers(self, sample_customers_df):
        """Test that duplicate customer IDs are removed"""
        result = clean_customers(sample_customers_df)
        # Customer ID 2 appears twice, should keep only the last one
        assert len(result) == 6  # 7 - 1 duplicate removed
        assert result[result['customer_id'] == 2].iloc[0]['name'] == 'Jane Smith'

    def test_email_standardization(self, sample_customers_df):
        """Test that emails are converted to lowercase"""
        result = clean_customers(sample_customers_df)
        assert all(email.islower() for email in result['email'].dropna())
        assert 'john@example.com' in result['email'].values
        assert 'JOHN@EXAMPLE.COM' not in result['email'].values

    def test_name_whitespace_trimming(self, sample_customers_df):
        """Test that leading/trailing whitespace is removed from names"""
        result = clean_customers(sample_customers_df)
        assert not any(name.startswith(' ') or name.endswith(' ') for name in result['name'])
        assert 'John Doe' in result['name'].values

    def test_region_whitespace_trimming(self, sample_customers_df):
        """Test that leading/trailing whitespace is removed from regions"""
        result = clean_customers(sample_customers_df)
        regions = result['region'].values
        assert not any((isinstance(r, str) and (r.startswith(' ') or r.endswith(' '))) for r in regions)

    def test_region_null_fill(self, sample_customers_df):
        """Test that null/missing regions are filled with 'Unknown'"""
        result = clean_customers(sample_customers_df)
        # Check that no NaN values exist in region column
        assert result['region'].isna().sum() == 0
        # Check that empty strings are replaced with 'Unknown'
        assert 'Unknown' in result['region'].values

    def test_signup_date_conversion(self, sample_customers_df):
        """Test that signup_date is converted to datetime"""
        result = clean_customers(sample_customers_df)
        assert pd.api.types.is_datetime64_any_dtype(result['signup_date'])

    def test_customers_sorted_by_signup_date(self, sample_customers_df):
        """Test that dataframe is sorted by signup_date"""
        result = clean_customers(sample_customers_df)
        dates = result['signup_date'].values
        assert (dates == sorted(dates)).all()  # Use .all() for numpy array comparison


class TestCleanOrders:
    """Test order data cleaning"""

    @pytest.fixture
    def sample_orders_df(self):
        """Create sample orders dataframe for testing"""
        return pd.DataFrame({
            'order_id': ['O001', 'O002', 'O003', None, 'O005', 'O006', 'O007', None],
            'customer_id': [1, 2, 3, 4, None, 6, 7, None],
            'product': ['Laptop', 'Mouse', 'Keyboard', 'Monitor', 'Laptop', 'Mouse', 'Keyboard', 'Monitor'],
            'amount': [1200.00, 25.00, 75.00, None, 1250.00, None, 80.00, 350.00],
            'order_date': ['2023-06-15', '2023/02/20', '06-15-2023', '2023-01-10', '2023-03-05', '2023-04-01', '2023-05-15', 'invalid'],
            'status': ['done', 'pending', 'Completed', 'CANCELED', 'refund', 'Cancelled', 'REFUNDED', 'pending']
        })

    def test_parse_order_dates(self, sample_orders_df):
        """Test that multiple date formats are parsed correctly"""
        result = clean_orders(sample_orders_df)
        assert pd.api.types.is_datetime64_any_dtype(result['order_date'])
        # Valid dates should be preserved
        assert result['order_date'].notna().sum() >= 6

    def test_remove_invalid_rows(self, sample_orders_df):
        """Test that rows with both order_id and customer_id null are removed"""
        result = clean_orders(sample_orders_df)
        # Row with index 7 has both order_id and customer_id as None, should be removed
        assert len(result) < len(sample_orders_df)

    def test_fill_missing_amounts(self, sample_orders_df):
        """Test that missing amounts are filled with median by product"""
        result = clean_orders(sample_orders_df)
        # No NaN values should remain in amount column
        assert result['amount'].isna().sum() == 0
        # Mouse product median: (25 + None) -> 25, so None should be 25
        mouse_amounts = result[result['product'] == 'Mouse']['amount'].values
        assert 25.0 in mouse_amounts

    def test_status_normalization(self, sample_orders_df):
        """Test that all status values are normalized to standard forms"""
        result = clean_orders(sample_orders_df)
        valid_statuses = {'completed', 'pending', 'cancelled', 'refunded'}
        result_statuses = set(result['status'].unique())
        assert result_statuses.issubset(valid_statuses)

    def test_status_mapping_done_to_completed(self, sample_orders_df):
        """Test that 'done' status is mapped to 'completed'"""
        result = clean_orders(sample_orders_df)
        assert 'done' not in result['status'].values
        assert 'completed' in result['status'].values

    def test_status_mapping_cancelled_variants(self, sample_orders_df):
        """Test that 'canceled' and 'cancelled' are both mapped to 'cancelled'"""
        result = clean_orders(sample_orders_df)
        assert 'canceled' not in result['status'].values
        assert 'cancelled' in result['status'].values

    def test_status_mapping_refunded_variants(self, sample_orders_df):
        """Test that 'refund' and 'refunded' are both mapped to 'refunded'"""
        result = clean_orders(sample_orders_df)
        assert 'refund' not in result['status'].values
        assert 'refunded' in result['status'].values

    def test_year_month_column_creation(self, sample_orders_df):
        """Test that order_year_month column is created in YYYY-MM format"""
        result = clean_orders(sample_orders_df)
        assert 'order_year_month' in result.columns
        # Check format is YYYY-MM
        valid_dates = result.dropna(subset=['order_year_month'])
        for ym in valid_dates['order_year_month']:
            if pd.notna(ym):
                assert len(str(ym)) == 7  # YYYY-MM format is 7 chars
                assert str(ym)[4] == '-'  # Dash in correct position

    def test_case_insensitive_status_mapping(self, sample_orders_df):
        """Test that status mapping is case-insensitive"""
        result = clean_orders(sample_orders_df)
        # All statuses should be lowercase
        assert all(status.islower() for status in result['status'])


class TestIntegration:
    """Integration tests for cleaning pipeline"""

    def test_clean_customers_preserves_data_integrity(self):
        """Test that cleaning doesn't lose critical data"""
        df = pd.DataFrame({
            'customer_id': [1, 2, 3],
            'name': ['John', 'Jane', 'Bob'],
            'email': ['john@example.com', 'jane@example.com', 'bob@example.com'],
            'region': ['North', 'South', 'East'],
            'signup_date': ['2023-01-01', '2023-01-02', '2023-01-03']
        })
        result = clean_customers(df)
        assert len(result) == 3  # All rows preserved when no duplicates
        assert result['customer_id'].tolist() == [1, 2, 3]

    def test_clean_orders_multi_product_median_fill(self):
        """Test that multiple products maintain separate median calculations"""
        df = pd.DataFrame({
            'order_id': ['O001', 'O002', 'O003', 'O004'],
            'customer_id': [1, 2, 3, 4],
            'product': ['Laptop', 'Laptop', 'Mouse', 'Mouse'],
            'amount': [1000, None, 25, None],
            'order_date': ['2023-01-01', '2023-01-02', '2023-01-03', '2023-01-04'],
            'status': ['pending', 'pending', 'completed', 'completed']
        })
        result = clean_orders(df)
        # Laptop missing value should be filled with 1000 (median of Laptop)
        assert result.loc[result['order_id'] == 'O002', 'amount'].values[0] == 1000
        # Mouse missing value should be filled with 25 (median of Mouse)
        assert result.loc[result['order_id'] == 'O004', 'amount'].values[0] == 25

    def test_empty_dataframe_handling(self):
        """Test that cleaning functions handle empty dataframes gracefully"""
        empty_df = pd.DataFrame(columns=['customer_id', 'name', 'email', 'region', 'signup_date'])
        result = clean_customers(empty_df)
        assert len(result) == 0
        assert list(result.columns) == list(empty_df.columns)


if __name__ == "__main__":
    pytest.main([__file__, "-v", "--tb=short"])
