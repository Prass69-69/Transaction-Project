# Quick Setup Guide

## Prerequisites

- Python 3.8 or higher
- Node.js 16 or higher
- npm or yarn

## Step-by-Step Setup

### 1. Backend Setup (Terminal 1)

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On Mac/Linux:
source venv/bin/activate

# Install Python dependencies
pip install -r requirements.txt

# Run the Flask server
python app.py
```

The backend will be available at `http://localhost:5000`

### 2. Frontend Setup (Terminal 2)

```bash
# From the project root directory

# Install Node dependencies
npm install

# Start the development server
npm run dev
```

The frontend will be available at `http://localhost:5173`

### 3. Access the Application

Open your browser and navigate to `http://localhost:5173`

## Testing the Application

1. Use the provided `sample_transactions.csv` file in the project root
2. Click the "Upload Transaction Data" section
3. Select the CSV file
4. Adjust the Z-Score threshold if needed (default: 3)
5. Click "Analyze Transactions"
6. View the results in the dashboard

## CSV File Format

Your CSV file must include these columns:

| Column | Type | Description | Example |
|--------|------|-------------|---------|
| transaction_id | string | Unique identifier | TXN001 |
| date | string | Transaction date | 2024-01-01 |
| amount | number | Transaction amount | 1500.00 |
| transaction_type | string | "Incoming" or "Outgoing" | Incoming |

## Troubleshooting

### Backend Issues

**Port 5000 already in use:**
```python
# In backend/app.py, change the port:
app.run(debug=True, port=5001)

# Then update frontend API URL in src/App.tsx:
fetch('http://localhost:5001/api/analyze', ...)
```

**CORS errors:**
- Ensure Flask-CORS is installed
- Check that both servers are running

### Frontend Issues

**Port 5173 already in use:**
- Vite will automatically use the next available port
- Check the terminal output for the correct port

**API connection failed:**
- Verify the backend is running on port 5000
- Check browser console for error messages

## Production Build

To create a production build of the frontend:

```bash
npm run build
```

The optimized files will be in the `dist/` directory.

## Notes

- Keep both terminal windows open while using the application
- The backend must be running before analyzing transactions
- No data is stored; analysis is performed in-memory only
