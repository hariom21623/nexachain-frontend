import React, { useState, useEffect } from 'react';
import API from '../api/axiosInstance';
import Layout from '../components/Layout';
import { DollarSign, CheckCircle, TrendingUp } from 'lucide-react';

const Investments = () => {
  const [amount, setAmount] = useState('');
  const [investments, setInvestments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    fetchInvestments();
  }, []);

  const fetchInvestments = async () => {
    try {
      const response = await API.get('/investments');
      setInvestments(response.data.data || []);
    } catch (err) {
      console.error('Failed to load investments:', err);
    }
  };

  const handleInvest = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });
    setLoading(true);

    try {
      const response = await API.post('/investments', { amount: Number(amount) });
      setMessage({ type: 'success', text: response.data.message || 'Investment successful!' });
      setAmount('');
      fetchInvestments();
    } catch (err) {
      setMessage({
        type: 'error',
        text: err.response?.data?.message || 'Investment failed. Minimum required is $100.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="space-y-8">
        {/* Purchase Card */}
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 max-w-xl">
          <h2 className="text-xl font-bold text-slate-100 mb-2 flex items-center gap-2">
            <TrendingUp className="text-emerald-400" /> Start New Investment
          </h2>
          <p className="text-slate-400 text-sm mb-6">
            Earn 2.5% daily ROI for 30 days. Minimum investment is $100.
          </p>

          {message.text && (
            <div
              className={`p-3 rounded-lg text-sm mb-4 border ${
                message.type === 'success'
                  ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400'
                  : 'bg-red-500/10 border-red-500 text-red-400'
              }`}
            >
              {message.text}
            </div>
          )}

          <form onSubmit={handleInvest} className="space-y-4">
            <div>
              <label className="block text-slate-300 text-sm mb-1">Investment Amount ($)</label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-slate-500">$</span>
                <input
                  type="number"
                  required
                  min="100"
                  placeholder="e.g. 500"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 pl-8 text-slate-100 focus:outline-none focus:border-emerald-500"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-medium p-3 rounded-lg transition-colors"
            >
              {loading ? 'Processing...' : 'Invest Now'}
            </button>
          </form>
        </div>

        {/* Investment List */}
        <div>
          <h3 className="text-lg font-bold text-slate-100 mb-4">My Active Investments</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {investments.map((inv) => (
              <div key={inv._id} className="bg-slate-800 p-5 rounded-xl border border-slate-700">
                <div className="flex justify-between items-start mb-3">
                  <span className="bg-emerald-500/10 text-emerald-400 text-xs font-semibold px-2.5 py-1 rounded">
                    {inv.planDetails?.planName || 'Growth Plan'}
                  </span>
                  <span className="text-xs text-slate-400">{inv.investmentStatus}</span>
                </div>
                <p className="text-2xl font-bold text-slate-100 mb-2">${inv.investmentAmount}</p>
                <div className="text-xs text-slate-400 space-y-1">
                  <p>Daily ROI: {inv.dailyRoiPercentage}%</p>
                  <p>Start: {new Date(inv.startDate).toLocaleDateString()}</p>
                  <p>End: {new Date(inv.endDate).toLocaleDateString()}</p>
                </div>
              </div>
            ))}

            {investments.length === 0 && (
              <div className="col-span-full bg-slate-800 p-8 rounded-xl border border-slate-700 text-center text-slate-400">
                No active investments found.
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Investments;