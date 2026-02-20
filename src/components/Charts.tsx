import { Transaction, Summary } from '../types';

interface ChartsProps {
  transactions: Transaction[];
  summary: Summary;
}

export default function Charts({ transactions, summary }: ChartsProps) {
  const normalCount = summary.total_transactions - summary.flagged_count;
  const normalPercentage = (normalCount / summary.total_transactions) * 100;
  const flaggedPercentage = summary.flagged_percentage;

  const incomingPercentage = (summary.total_incoming / summary.total_transactions) * 100;
  const outgoingPercentage = (summary.total_outgoing / summary.total_transactions) * 100;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
      <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-gray-100">
        <h3 className="text-lg font-bold text-gray-800 mb-6">Normal vs Flagged Transactions</h3>
        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-gray-700">Normal Transactions</span>
              <span className="text-sm font-bold text-green-600">{normalCount} ({normalPercentage.toFixed(1)}%)</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden shadow-inner">
              <div
                className="bg-gradient-to-r from-green-400 to-green-500 h-6 rounded-full transition-all duration-1000 ease-out flex items-center justify-end pr-2"
                style={{ width: `${normalPercentage}%` }}
              >
                {normalPercentage > 10 && <span className="text-xs font-bold text-white">{normalPercentage.toFixed(1)}%</span>}
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-gray-700">Flagged Anomalies</span>
              <span className="text-sm font-bold text-red-600">{summary.flagged_count} ({flaggedPercentage.toFixed(1)}%)</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden shadow-inner">
              <div
                className="bg-gradient-to-r from-red-400 to-red-500 h-6 rounded-full transition-all duration-1000 ease-out flex items-center justify-end pr-2"
                style={{ width: `${flaggedPercentage}%` }}
              >
                {flaggedPercentage > 10 && <span className="text-xs font-bold text-white">{flaggedPercentage.toFixed(1)}%</span>}
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-gray-600">Average Normal Amount</p>
                <p className="text-xl font-bold text-blue-600">₹{summary.avg_normal_amount.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-600">Average Flagged Amount</p>
                <p className="text-xl font-bold text-red-600">₹{summary.avg_flagged_amount.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-gray-100">
        <h3 className="text-lg font-bold text-gray-800 mb-6">Transaction Type Distribution</h3>
        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-gray-700">Incoming Transactions</span>
              <span className="text-sm font-bold text-green-600">{summary.total_incoming} ({incomingPercentage.toFixed(1)}%)</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden shadow-inner">
              <div
                className="bg-gradient-to-r from-green-400 to-green-500 h-6 rounded-full transition-all duration-1000 ease-out flex items-center justify-end pr-2"
                style={{ width: `${incomingPercentage}%` }}
              >
                {incomingPercentage > 10 && <span className="text-xs font-bold text-white">{incomingPercentage.toFixed(1)}%</span>}
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-gray-700">Outgoing Transactions</span>
              <span className="text-sm font-bold text-orange-600">{summary.total_outgoing} ({outgoingPercentage.toFixed(1)}%)</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden shadow-inner">
              <div
                className="bg-gradient-to-r from-orange-400 to-orange-500 h-6 rounded-full transition-all duration-1000 ease-out flex items-center justify-end pr-2"
                style={{ width: `${outgoingPercentage}%` }}
              >
                {outgoingPercentage > 10 && <span className="text-xs font-bold text-white">{outgoingPercentage.toFixed(1)}%</span>}
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-orange-50 rounded-lg border-2 border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-gray-600">Avg Incoming</p>
                <p className="text-xl font-bold text-green-600">₹{summary.avg_incoming_amount.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-600">Avg Outgoing</p>
                <p className="text-xl font-bold text-orange-600">₹{summary.avg_outgoing_amount.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
