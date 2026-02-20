import { useState } from 'react';
import { Plus, Trash2, Send } from 'lucide-react';

interface ManualTransaction {
  transaction_id: string;
  date: string;
  amount: string;
  transaction_type: 'Incoming' | 'Outgoing';
  status: 'successful' | 'unsuccessful';
}

interface ManualEntryProps {
  onSubmit: (transactions: ManualTransaction[], threshold: number) => void;
  isLoading: boolean;
}

export default function ManualEntry({ onSubmit, isLoading }: ManualEntryProps) {
  const [transactions, setTransactions] = useState<ManualTransaction[]>([
    {
      transaction_id: '',
      date: new Date().toISOString().split('T')[0],
      amount: '',
      transaction_type: 'Incoming',
      status: 'successful'
    }
  ]);
  const [threshold, setThreshold] = useState<number>(3);

  const addTransaction = () => {
    setTransactions([
      ...transactions,
      {
        transaction_id: '',
        date: new Date().toISOString().split('T')[0],
        amount: '',
        transaction_type: 'Incoming',
        status: 'successful'
      }
    ]);
  };

  const removeTransaction = (index: number) => {
    if (transactions.length > 1) {
      setTransactions(transactions.filter((_, i) => i !== index));
    }
  };

  const updateTransaction = (index: number, field: keyof ManualTransaction, value: string) => {
    const updated = [...transactions];
    updated[index] = { ...updated[index], [field]: value };
    setTransactions(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const isValid = transactions.every(
      t => t.transaction_id.trim() && t.date && t.amount && !isNaN(parseFloat(t.amount))
    );

    if (!isValid) {
      alert('Please fill all fields correctly');
      return;
    }

    onSubmit(transactions, threshold);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 border-2 border-green-100">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
          <Plus className="text-white" size={24} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Manual Transaction Entry</h2>
          <p className="text-gray-500 text-sm">Add transactions manually for analysis</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          {transactions.map((transaction, index) => (
            <div
              key={index}
              className="grid grid-cols-1 md:grid-cols-6 gap-3 p-4 bg-gray-50 rounded-lg border-2 border-gray-200"
            >
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  Transaction ID
                </label>
                <input
                  type="text"
                  value={transaction.transaction_id}
                  onChange={(e) => updateTransaction(index, 'transaction_id', e.target.value)}
                  placeholder="TXN001"
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                  disabled={isLoading}
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  Date
                </label>
                <input
                  type="date"
                  value={transaction.date}
                  onChange={(e) => updateTransaction(index, 'date', e.target.value)}
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                  disabled={isLoading}
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  Amount
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={transaction.amount}
                  onChange={(e) => updateTransaction(index, 'amount', e.target.value)}
                  placeholder="1500.00"
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                  disabled={isLoading}
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  Type
                </label>
                <select
                  value={transaction.transaction_type}
                  onChange={(e) => updateTransaction(index, 'transaction_type', e.target.value)}
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                  disabled={isLoading}
                >
                  <option value="Incoming">Incoming</option>
                  <option value="Outgoing">Outgoing</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  Status
                </label>
                <select
                  value={transaction.status}
                  onChange={(e) => updateTransaction(index, 'status', e.target.value)}
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                  disabled={isLoading}
                >
                  <option value="successful">Successful</option>
                  <option value="unsuccessful">Unsuccessful</option>
                </select>
              </div>

              <div className="flex items-end">
                <button
                  type="button"
                  onClick={() => removeTransaction(index)}
                  disabled={transactions.length === 1 || isLoading}
                  className="w-full px-3 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed transition-all font-semibold text-sm flex items-center justify-center gap-2"
                >
                  <Trash2 size={16} />
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={addTransaction}
          disabled={isLoading}
          className="w-full py-3 px-6 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:bg-gray-50 disabled:cursor-not-allowed transition-all font-semibold flex items-center justify-center gap-2"
        >
          <Plus size={20} />
          Add Another Transaction
        </button>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Z-Score Threshold (±)
          </label>
          <input
            type="number"
            value={threshold}
            onChange={(e) => setThreshold(parseFloat(e.target.value))}
            min="1"
            max="5"
            step="0.1"
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
            disabled={isLoading}
          />
          <p className="text-xs text-gray-500 mt-1">Higher values detect more extreme anomalies</p>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-green-600 hover:to-green-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg flex items-center justify-center gap-2"
        >
          <Send size={20} />
          {isLoading ? 'Analyzing...' : 'Analyze Transactions'}
        </button>
      </form>
    </div>
  );
}
