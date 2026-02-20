from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import numpy as np
from io import StringIO
import json

app = Flask(__name__)
CORS(app)

def calculate_zscore_by_type(df, threshold=3):
    results = []
    summary = {
        'total_transactions': len(df),
        'flagged_count': 0,
        'flagged_percentage': 0,
        'avg_flagged_amount': 0,
        'avg_normal_amount': 0,
        'avg_incoming_amount': 0,
        'avg_outgoing_amount': 0,
        'total_incoming': 0,
        'total_outgoing': 0
    }

    incoming_df = df[df['transaction_type'] == 'Incoming']
    outgoing_df = df[df['transaction_type'] == 'Outgoing']

    incoming_mean = incoming_df['amount'].mean() if len(incoming_df) > 0 else 0
    incoming_std = incoming_df['amount'].std() if len(incoming_df) > 0 else 0
    outgoing_mean = outgoing_df['amount'].mean() if len(outgoing_df) > 0 else 0
    outgoing_std = outgoing_df['amount'].std() if len(outgoing_df) > 0 else 0

    summary['total_incoming'] = len(incoming_df)
    summary['total_outgoing'] = len(outgoing_df)
    summary['avg_incoming_amount'] = float(incoming_mean) if not np.isnan(incoming_mean) else 0
    summary['avg_outgoing_amount'] = float(outgoing_mean) if not np.isnan(outgoing_mean) else 0

    flagged_amounts = []
    normal_amounts = []

    for _, row in df.iterrows():
        transaction_type = row['transaction_type']
        amount = row['amount']

        if transaction_type == 'Incoming':
            mean = incoming_mean
            std = incoming_std
        else:
            mean = outgoing_mean
            std = outgoing_std

        if std == 0 or np.isnan(std):
            zscore = 0
        else:
            zscore = (amount - mean) / std

        is_flagged = False
        reason = None

        if transaction_type == 'Outgoing' and zscore > threshold:
            is_flagged = True
            reason = f"High-value outgoing transaction (Z-Score: {zscore:.2f}, exceeds +{threshold})"
        elif transaction_type == 'Outgoing' and zscore < -threshold:
            is_flagged = True
            reason = f"Low-value outgoing transaction (Z-Score: {zscore:.2f}, below -{threshold})"
        elif transaction_type == 'Incoming' and zscore > threshold:
            is_flagged = True
            reason = f"High-value incoming transaction (Z-Score: {zscore:.2f}, exceeds +{threshold})"
        elif transaction_type == 'Incoming' and zscore < -threshold:
            is_flagged = True
            reason = f"Low-value incoming transaction (Z-Score: {zscore:.2f}, below -{threshold})"

        if is_flagged:
            flagged_amounts.append(amount)
            summary['flagged_count'] += 1
        else:
            normal_amounts.append(amount)

        results.append({
            'transaction_id': str(row['transaction_id']),
            'date': str(row['date']),
            'amount': float(amount),
            'transaction_type': transaction_type,
            'zscore': float(zscore) if not np.isnan(zscore) else 0,
            'is_flagged': is_flagged,
            'reason': reason if is_flagged else 'Normal transaction'
        })

    summary['flagged_percentage'] = (summary['flagged_count'] / summary['total_transactions'] * 100) if summary['total_transactions'] > 0 else 0
    summary['avg_flagged_amount'] = float(np.mean(flagged_amounts)) if flagged_amounts else 0
    summary['avg_normal_amount'] = float(np.mean(normal_amounts)) if normal_amounts else 0

    return results, summary

@app.route('/api/analyze', methods=['POST'])
def analyze_transactions():
    try:
        if 'file' not in request.files:
            return jsonify({'error': 'No file provided'}), 400

        file = request.files['file']

        if file.filename == '':
            return jsonify({'error': 'No file selected'}), 400

        if not file.filename.endswith('.csv'):
            return jsonify({'error': 'File must be a CSV'}), 400

        threshold = float(request.form.get('threshold', 3))

        content = file.read().decode('utf-8')
        df = pd.read_csv(StringIO(content))

        required_columns = ['transaction_id', 'date', 'amount', 'transaction_type']
        if not all(col in df.columns for col in required_columns):
            return jsonify({'error': f'CSV must contain columns: {", ".join(required_columns)}'}), 400

        df['transaction_type'] = df['transaction_type'].str.strip()

        valid_types = df['transaction_type'].isin(['Incoming', 'Outgoing'])
        if not valid_types.all():
            return jsonify({'error': 'transaction_type must be either "Incoming" or "Outgoing"'}), 400

        transactions, summary = calculate_zscore_by_type(df, threshold)

        return jsonify({
            'transactions': transactions,
            'summary': summary
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/health', methods=['GET'])
def health():
    return jsonify({'status': 'ok'})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
