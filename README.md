# Transaction Anomaly Detection System

A full-stack web application for statistical analysis of transaction anomalies using Z-Score methodology.

## Features

- **CSV Upload**: Upload transaction data in CSV format
- **Statistical Analysis**: Z-Score analysis with separate statistics for incoming and outgoing transactions
- **Two-Way Anomaly Detection**: Flags high-value outgoing and low-value incoming transactions
- **Dashboard**: Visual summary cards showing key metrics
- **Charts**: Interactive visualizations comparing normal vs flagged transactions
- **Transaction Table**: Detailed view of all transactions with flagging reasons

## Technology Stack

**Backend:**
- Python 3.x
- Flask
- Flask-CORS
- Pandas
- NumPy

**Frontend:**
- React 18
- TypeScript
- Vite
- Tailwind CSS
- Lucide React (icons)

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment:
```bash
python -m venv venv
```

3. Activate the virtual environment:
- **Windows**: `venv\Scripts\activate`
- **Mac/Linux**: `source venv/bin/activate`

4. Install dependencies:
```bash
pip install -r requirements.txt
```

5. Run the Flask server:
```bash
python app.py
```

The backend will start on `http://localhost:5000`

### Frontend Setup

1. Navigate to the project root directory

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

The frontend will start on `http://localhost:5173`

## Usage

1. Start both the backend and frontend servers
2. Open the application in your browser
3. Upload a CSV file with the following columns:
   - `transaction_id`: Unique transaction identifier
   - `date`: Transaction date
   - `amount`: Transaction amount (numeric)
   - `transaction_type`: Either "Incoming" or "Outgoing"
4. Adjust the Z-Score threshold (default: ±3)
5. Click "Analyze Transactions"
6. View the results in the dashboard, charts, and table

## Sample Data

A sample CSV file (`sample_transactions.csv`) is included in the project root for testing purposes.

## How It Works

### Statistical Analysis

1. **Separate Statistics**: The system calculates mean and standard deviation separately for:
   - Incoming transactions
   - Outgoing transactions

2. **Z-Score Calculation**: For each transaction:
   ```
   Z-Score = (amount - mean) / standard deviation
   ```
   Using the statistics from its respective group (incoming or outgoing)

3. **Anomaly Detection**:
   - **High-value outgoing**: Z-Score > threshold (default: +3)
   - **Low-value incoming**: Z-Score < -threshold (default: -3)

### API Endpoints

**POST /api/analyze**
- Accepts: CSV file + threshold parameter
- Returns: Transaction details with Z-Scores and summary statistics

**GET /api/health**
- Health check endpoint

## Project Structure

```
project/
├── backend/
│   ├── app.py              # Flask application
│   ├── requirements.txt    # Python dependencies
│   └── README.md          # Backend documentation
├── src/
│   ├── components/        # React components
│   │   ├── FileUpload.tsx
│   │   ├── SummaryCards.tsx
│   │   ├── TransactionTable.tsx
│   │   └── Charts.tsx
│   ├── types.ts          # TypeScript interfaces
│   ├── App.tsx           # Main application
│   └── index.css         # Global styles
└── sample_transactions.csv # Sample data for testing
```

## Design Principles

- **Explainable**: All flagging decisions are based on transparent statistical methods
- **Dataset-driven**: Analysis is performed on uploaded data only
- **Decision-support**: Provides insights for review, not automated actions
- **Professional UI**: Clean, vibrant interface with clear data visualization

## Notes

- This is a demonstration/academic tool
- Flagging indicates statistical irregularity, not confirmed fraud
- No data is stored permanently
- No authentication required
- Analysis is performed in-memory

## License

This project is for academic and demonstration purposes.
