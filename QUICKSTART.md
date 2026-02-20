# Quick Start Guide

## One-Minute Setup

### Terminal 1 - Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

### Terminal 2 - Frontend
```bash
npm install
npm run dev
```

### Open Browser
Navigate to: `http://localhost:5173`

## Quick Test

1. Click "Select CSV File"
2. Choose `sample_transactions.csv` from project root
3. Click "Analyze Transactions"
4. View results!

## What You'll See

- **Summary Cards**: Key metrics at a glance
- **Charts**: Visual comparison of transaction patterns
- **Table**: Detailed transaction list with flagged anomalies highlighted

## How It Works

The system calculates Z-Scores for each transaction based on its type (Incoming/Outgoing):

- **Z-Score > +3**: High-value outgoing (flagged)
- **Z-Score < -3**: Low-value incoming (flagged)
- **Z-Score between -3 and +3**: Normal transaction

## Need Help?

See `README.md` for detailed documentation.
