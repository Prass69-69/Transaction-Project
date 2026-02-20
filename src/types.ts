export interface Transaction {
  transaction_id: string;
  date: string;
  amount: number;
  transaction_type: 'Incoming' | 'Outgoing';
  zscore: number;
  is_flagged: boolean;
  reason: string;
  status?: 'successful' | 'unsuccessful';
}

export interface Summary {
  total_transactions: number;
  flagged_count: number;
  flagged_percentage: number;
  avg_flagged_amount: number;
  avg_normal_amount: number;
  avg_incoming_amount: number;
  avg_outgoing_amount: number;
  total_incoming: number;
  total_outgoing: number;
}

export interface AnalysisResult {
  transactions: Transaction[];
  summary: Summary;
}
