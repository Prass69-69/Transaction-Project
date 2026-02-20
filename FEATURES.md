# Transaction Anomaly Detection - Feature Documentation

## Core Features

### 1. Statistical Analysis Engine

**Z-Score Methodology**
- Calculates mean and standard deviation separately for incoming and outgoing transactions
- Computes Z-Score for each transaction relative to its transaction type group
- Formula: `Z-Score = (amount - mean) / standard_deviation`

**Two-Way Anomaly Detection**
- **High-value outgoing transactions**: Z-Score > threshold (default: +3)
- **Low-value incoming transactions**: Z-Score < -threshold (default: -3)
- Configurable threshold parameter (range: 1-5)

### 2. Data Upload & Processing

**CSV Upload Interface**
- Drag-and-drop or click-to-select file upload
- Real-time validation of CSV format
- Required columns:
  - `transaction_id` (string)
  - `date` (string)
  - `amount` (numeric)
  - `transaction_type` ("Incoming" or "Outgoing")

**Server-Side Processing**
- Python Flask backend with CORS support
- Pandas for efficient data processing
- NumPy for statistical calculations
- In-memory processing (no data persistence)

### 3. Dashboard & Visualizations

**Summary Cards**
- Total Transactions: Count of all transactions analyzed
- Flagged Anomalies: Count and percentage of flagged transactions
- Average Incoming: Mean amount of all incoming transactions
- Average Outgoing: Mean amount of all outgoing transactions

**Interactive Charts**
1. **Normal vs Flagged Comparison**
   - Horizontal bar chart showing distribution
   - Percentage breakdown
   - Average amounts for each category
   - Color-coded (green for normal, red for flagged)

2. **Transaction Type Distribution**
   - Incoming vs Outgoing transaction counts
   - Percentage distribution
   - Average amounts by type
   - Color-coded (green for incoming, orange for outgoing)

**Transaction Table**
- Sortable columns
- Color-coded rows (red background for flagged transactions)
- Shows all transaction details:
  - Transaction ID
  - Date
  - Type (with badge)
  - Amount (formatted as currency)
  - Z-Score (color-coded by severity)
  - Status icon (check or alert)
  - Detailed reason for flagging

### 4. User Interface Design

**Modern, Professional Aesthetic**
- Gradient backgrounds and buttons
- Rounded corners and subtle shadows
- Smooth transitions and animations
- Responsive grid layout
- Mobile-friendly design

**Visual Feedback**
- Loading states during analysis
- Error messages with clear styling
- Hover effects on interactive elements
- Animated fade-in for results
- Color-coded status indicators

**Color Scheme**
- Blue: Primary actions and branding
- Green: Incoming transactions and normal status
- Orange: Outgoing transactions
- Red: Flagged anomalies and alerts
- Gray: Neutral elements and backgrounds

### 5. API Architecture

**Backend Endpoints**
- `POST /api/analyze`: Upload CSV and receive analysis results
- `GET /api/health`: Health check endpoint

**Request Format**
```
POST /api/analyze
Content-Type: multipart/form-data

Parameters:
- file: CSV file
- threshold: numeric (optional, default: 3)
```

**Response Format**
```json
{
  "transactions": [
    {
      "transaction_id": "TXN001",
      "date": "2024-01-01",
      "amount": 1500.00,
      "transaction_type": "Incoming",
      "zscore": -0.25,
      "is_flagged": false,
      "reason": "Normal transaction"
    }
  ],
  "summary": {
    "total_transactions": 20,
    "flagged_count": 3,
    "flagged_percentage": 15.0,
    "avg_flagged_amount": 12500.00,
    "avg_normal_amount": 2100.00,
    "avg_incoming_amount": 1850.00,
    "avg_outgoing_amount": 2800.00,
    "total_incoming": 11,
    "total_outgoing": 9
  }
}
```

### 6. Security & Best Practices

**Security Features**
- CORS enabled for local development
- File type validation (CSV only)
- Input sanitization
- No persistent data storage
- No authentication required (academic use)

**Code Quality**
- TypeScript for type safety
- Component-based React architecture
- Separation of concerns (backend/frontend)
- Error handling and user feedback
- Clean, maintainable code structure

### 7. Explainability & Transparency

**Clear Reasoning**
- Every flagged transaction includes a detailed reason
- Z-Score values displayed for all transactions
- Color-coded severity indicators
- Summary statistics for context
- No black-box decisions

**Educational Value**
- Transparent statistical methodology
- Visual representation of data distribution
- Comparative metrics (normal vs flagged)
- Sample data included for testing

### 8. Performance Optimization

**Frontend**
- Vite for fast builds and hot module replacement
- Lazy loading of components (where applicable)
- Optimized CSS with Tailwind
- Production build optimization

**Backend**
- Efficient Pandas operations
- Vectorized NumPy calculations
- Minimal memory footprint
- Fast in-memory processing

## Use Cases

1. **Academic Demonstration**: Show statistical anomaly detection in action
2. **Financial Analysis**: Identify unusual transaction patterns
3. **Data Quality Checking**: Find outliers in transaction datasets
4. **Educational Tool**: Learn about Z-Score methodology
5. **Decision Support**: Provide insights for manual review

## Limitations (By Design)

- No machine learning or AI
- No automated actions or blocking
- No data persistence or history
- No real-time streaming
- No user authentication
- No transaction execution
- Dataset-based analysis only

## Future Enhancement Possibilities

While not implemented, potential extensions could include:
- Multiple threshold levels (warning, critical)
- Time-series analysis
- Export results to PDF/Excel
- Batch file processing
- Customizable flagging rules
- Historical comparison
- Multi-user support with authentication

---

**Note**: This application is designed as a decision-support tool for academic and demonstration purposes. All flagging indicates statistical irregularity, not confirmed fraud or malicious activity.
