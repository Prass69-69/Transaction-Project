import { useState, useMemo } from 'react';
import { AlertTriangle, TrendingUp, TrendingDown, Scale, Filter } from 'lucide-react';
import { Transaction } from '../types';

interface SummaryProps {
  transactions: Transaction[];
}

export default function Summary({ transactions }: SummaryProps) {
  const flagged = transactions.filter((t) => t.is_flagged);

  const years = useMemo(() => {
    const set = new Set<string>();
    flagged.forEach((t) => {
      const y = t.date.split('-')[0];
      if (y) set.add(y);
    });
    return Array.from(set).sort();
  }, [flagged]);

  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [selectedMonth, setSelectedMonth] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');

  const months = [
    { value: '01', label: 'January' },
    { value: '02', label: 'February' },
    { value: '03', label: 'March' },
    { value: '04', label: 'April' },
    { value: '05', label: 'May' },
    { value: '06', label: 'June' },
    { value: '07', label: 'July' },
    { value: '08', label: 'August' },
    { value: '09', label: 'September' },
    { value: '10', label: 'October' },
    { value: '11', label: 'November' },
    { value: '12', label: 'December' },
  ];

  const filtered = useMemo(() => {
    return flagged.filter((t) => {
      const parts = t.date.split('-');
      const year = parts[0];
      const month = parts[1];
      if (selectedYear !== 'all' && year !== selectedYear) return false;
      if (selectedMonth !== 'all' && month !== selectedMonth) return false;
      if (selectedType !== 'all' && t.transaction_type !== selectedType) return false;
      return true;
    });
  }, [flagged, selectedYear, selectedMonth, selectedType]);

  const totalIncoming = useMemo(
    () => filtered.filter((t) => t.transaction_type === 'Incoming').reduce((s, t) => s + t.amount, 0),
    [filtered]
  );

  const totalOutgoing = useMemo(
    () => filtered.filter((t) => t.transaction_type === 'Outgoing').reduce((s, t) => s + t.amount, 0),
    [filtered]
  );

  const balance = totalIncoming - totalOutgoing;

  if (flagged.length === 0) {
    return (
      <div className="text-center py-20 bg-white rounded-xl shadow-lg border-2 border-gray-100">
        <AlertTriangle className="mx-auto mb-4 text-gray-300" size={64} />
        <p className="text-gray-500 text-lg">No flagged transactions to display</p>
        <p className="text-gray-400 text-sm mt-2">Upload and analyze a CSV file first</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-gray-100">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center">
            <Filter className="text-white" size={20} />
          </div>
          <h2 className="text-xl font-bold text-gray-800">Filter Flagged Transactions</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">Year</label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent text-sm text-gray-700 bg-white"
            >
              <option value="all">All Years</option>
              {years.map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">Month</label>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent text-sm text-gray-700 bg-white"
            >
              <option value="all">All Months</option>
              {months.map((m) => (
                <option key={m.value} value={m.value}>{m.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">Type</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent text-sm text-gray-700 bg-white"
            >
              <option value="all">All Types</option>
              <option value="Incoming">Incoming</option>
              <option value="Outgoing">Outgoing</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-green-100">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
              <TrendingUp className="text-white" size={20} />
            </div>
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Total Flagged Incoming</p>
          </div>
          <p className="text-3xl font-extrabold text-green-600">₹{totalIncoming.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
          <p className="text-xs text-gray-400 mt-1">{filtered.filter((t) => t.transaction_type === 'Incoming').length} transactions</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-orange-100">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
              <TrendingDown className="text-white" size={20} />
            </div>
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Total Flagged Outgoing</p>
          </div>
          <p className="text-3xl font-extrabold text-orange-600">₹{totalOutgoing.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
          <p className="text-xs text-gray-400 mt-1">{filtered.filter((t) => t.transaction_type === 'Outgoing').length} transactions</p>
        </div>

        <div className={`bg-white rounded-xl shadow-lg p-6 border-2 ${balance >= 0 ? 'border-blue-100' : 'border-red-100'}`}>
          <div className="flex items-center gap-3 mb-3">
            <div className={`w-10 h-10 bg-gradient-to-br ${balance >= 0 ? 'from-blue-500 to-blue-600' : 'from-red-500 to-red-600'} rounded-lg flex items-center justify-center`}>
              <Scale className="text-white" size={20} />
            </div>
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Balance (In - Out)</p>
          </div>
          <p className={`text-3xl font-extrabold ${balance >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
            {balance < 0 ? '-' : ''}₹{Math.abs(balance).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
          <p className="text-xs text-gray-400 mt-1">{filtered.length} flagged transactions shown</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden border-2 border-gray-100">
        <div className="px-6 py-4 bg-gradient-to-r from-red-50 to-orange-50 border-b-2 border-red-100">
          <div className="flex items-center gap-2">
            <AlertTriangle className="text-red-500" size={20} />
            <h3 className="text-xl font-bold text-gray-800">Flagged Transactions</h3>
            <span className="ml-2 px-2.5 py-0.5 bg-red-100 text-red-700 text-xs font-bold rounded-full">{filtered.length}</span>
          </div>
          <p className="text-sm text-gray-500 mt-1">Statistically anomalous transactions flagged by Z-Score analysis</p>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <AlertTriangle className="mx-auto mb-3 text-gray-300" size={48} />
            <p className="text-gray-500">No flagged transactions match the selected filters</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b-2 border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-4 text-right text-xs font-bold text-gray-600 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-4 text-center text-xs font-bold text-gray-600 uppercase tracking-wider">Z-Score</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Reason</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filtered.map((t, i) => (
                  <tr key={i} className="bg-red-50 border-l-4 border-red-400 hover:bg-red-100 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">{t.transaction_id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{t.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${t.transaction_type === 'Incoming' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                        {t.transaction_type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-semibold text-gray-900">
                      ₹{t.amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700">
                        {t.zscore.toFixed(2)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 max-w-xs">{t.reason}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
