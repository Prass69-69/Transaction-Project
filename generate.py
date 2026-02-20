import csv
import random
from datetime import datetime, timedelta

# Configuration
num_transactions = 5000
anomaly_ratio = 0.08          # 8% anomalies
incoming_anomaly_ratio = 0.60 # 60% of anomalies are Incoming

start_date = datetime(2021, 1, 1)
end_date = datetime(2025, 12, 31)

date_range_days = (end_date - start_date).days

output_file = "transactions.csv"

num_anomalies = int(num_transactions * anomaly_ratio)
num_incoming_anomalies = int(num_anomalies * incoming_anomaly_ratio)
num_outgoing_anomalies = num_anomalies - num_incoming_anomalies

# Random anomaly positions
anomaly_indices = random.sample(range(num_transactions), num_anomalies)
incoming_anomaly_indices = set(anomaly_indices[:num_incoming_anomalies])
outgoing_anomaly_indices = set(anomaly_indices[num_incoming_anomalies:])

with open(output_file, mode='w', newline='') as file:
    writer = csv.writer(file)
    
    # Header
    writer.writerow(["transaction_id", "date", "amount", "transaction_type", "is_anomaly"])
    
    for i in range(num_transactions):
        transaction_id = f"TXN{i+1:05d}"
        
        # Random date between 2021–2025
        random_days = random.randint(0, date_range_days)
        date = start_date + timedelta(days=random_days)
        
        # Anomaly logic
        if i in incoming_anomaly_indices:
            transaction_type = "Incoming"
            amount = round(random.uniform(25000, 90000), 2)
            is_anomaly = 1
        
        elif i in outgoing_anomaly_indices:
            transaction_type = "Outgoing"
            amount = round(random.uniform(20000, 70000), 2)
            is_anomaly = 1
        
        else:
            transaction_type = random.choice(["Incoming", "Outgoing"])
            
            if transaction_type == "Incoming":
                amount = round(random.uniform(100, 6000), 2)
            else:
                amount = round(random.uniform(100, 8000), 2)
            
            is_anomaly = 0
        
        writer.writerow([
            transaction_id,
            date.strftime("%Y-%m-%d"),
            amount,
            transaction_type,
            is_anomaly
        ])

print("CSV file generated successfully!")
print(f"Incoming anomalies: {num_incoming_anomalies}")
print(f"Outgoing anomalies: {num_outgoing_anomalies}")
