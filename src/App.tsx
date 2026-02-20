import { useState } from 'react';
import { BarChart3, AlertTriangle } from 'lucide-react';
import FileUpload from './components/FileUpload';
import SummaryCards from './components/SummaryCards';
import TransactionTable from './components/TransactionTable';
import Charts from './components/Charts';
import Summary from './components/Summary';
import { AnalysisResult } from './types';

type Page = 'dashboard' | 'summary';

function App() {
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<Page>('dashboard');

  const handleFileUpload = async (file: File, threshold: number) => {
    setIsLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('threshold', threshold.toString());

    try {
      const response = await fetch('http://localhost:5000/api/analyze', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to analyze transactions');
      }

      const data: AnalysisResult = await response.json();
      setResult(data);
      setPage('dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const flaggedCount = result?.transactions.filter((t) => t.is_flagged).length ?? 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-2">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center shadow-xl transform rotate-3">
                <BarChart3 className="text-white" size={28} />
              </div>
              <div>
                <h1 className="text-3xl font-extrabold text-gray-800">Transaction Anomaly Detector</h1>
                <p className="text-gray-500 text-sm">Z-Score statistical analysis for transaction anomalies</p>
              </div>
            </div>

            {result && (
              <nav className="flex items-center bg-white rounded-xl shadow border-2 border-gray-100 p-1 gap-1">
                <button
                  onClick={() => setPage('dashboard')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                    page === 'dashboard'
                      ? 'bg-blue-500 text-white shadow'
                      : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'
                  }`}
                >
                  <BarChart3 size={16} />
                  Dashboard
                </button>
                <button
                  onClick={() => setPage('summary')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                    page === 'summary'
                      ? 'bg-red-500 text-white shadow'
                      : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'
                  }`}
                >
                  <AlertTriangle size={16} />
                  Summary
                  {flaggedCount > 0 && (
                    <span className={`px-1.5 py-0.5 rounded-full text-xs font-bold ${page === 'summary' ? 'bg-red-400 text-white' : 'bg-red-100 text-red-600'}`}>
                      {flaggedCount}
                    </span>
                  )}
                </button>
              </nav>
            )}
          </div>
        </div>

        <FileUpload onUpload={handleFileUpload} isLoading={isLoading} />

        {error && (
          <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 mb-8">
            <p className="text-red-700 font-semibold">Error: {error}</p>
          </div>
        )}

        {result && page === 'dashboard' && (
          <div className="animate-fadeIn">
            <SummaryCards summary={result.summary} />
            <Charts transactions={result.transactions} summary={result.summary} />
            <TransactionTable transactions={result.transactions} />
          </div>
        )}

        {result && page === 'summary' && (
          <div className="animate-fadeIn">
            <Summary transactions={result.transactions} />
          </div>
        )}

        {!result && !isLoading && !error && (
          <div className="text-center py-16 bg-white rounded-xl shadow-lg border-2 border-gray-100">
            <BarChart3 className="mx-auto mb-4 text-gray-300" size={64} />
            <p className="text-gray-500 text-lg">Upload a CSV file to begin analysis</p>
            <p className="text-gray-400 text-sm mt-2">Supports transaction_id, date, amount, and transaction_type columns</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
