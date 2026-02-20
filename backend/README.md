# Transaction Anomaly Detection Backend

## Setup

1. Create a virtual environment:
```bash
python -m venv venv
```

2. Activate the virtual environment:
- Windows: `venv\Scripts\activate`
- Mac/Linux: `source venv/bin/activate`

3. Install dependencies:
```bash
pip install -r requirements.txt
```

## Run

```bash
python app.py
```

The server will start on `http://localhost:5000`

## API Endpoints

### POST /api/analyze
Analyzes a CSV file for transaction anomalies.

**Parameters:**
- `file`: CSV file (multipart/form-data)
- `threshold`: Z-Score threshold (optional, default: 3)

**Response:**
```json
{
  "transactions": [...],
  "summary": {...}
}
```

### GET /api/health
Health check endpoint.
