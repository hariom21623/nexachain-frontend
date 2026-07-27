import React, { useState, useEffect } from 'react';
import API from '../api/axiosInstance';
import Layout from '../components/Layout';
import { History } from 'lucide-react';

const Transactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTransactions();
    }, []);

    const fetchTransactions = async () => {
        try {
            const response = await API.get('/dashboard/transactions');
            setTransactions(response.data.data || []);
        } catch (err) {
            console.error('Failed to load transactions:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout>
            <div className="space-y-6">
                <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
                    <History className="text-emerald-400" /> Transaction Ledger
                </h2>

                {loading ? (
                    <div className="text-emerald-400 py-10 text-center">Loading transactions...</div>
                ) : (
                    <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
                        <table className="w-full text-left text-sm text-slate-300">
                            <thead className="bg-slate-900 text-slate-400 uppercase text-xs">
                                <tr>
                                    <th className="p-4">Type</th>
                                    <th className="p-4">Amount</th>
                                    <th className="p-4">Description</th>
                                    <th className="p-4">Date</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-700">
                                {transactions.map((tx) => (
                                    <tr key={tx._id} className="hover:bg-slate-700/50">
                                        <td className="p-4">
                                            <span
                                                className={`text-xs font-semibold px-2.5 py-1 rounded ${tx.type === 'ROI'
                                                        ? 'bg-purple-500/10 text-purple-400'
                                                        : tx.type === 'REFERRAL_COMMISSION'
                                                            ? 'bg-emerald-500/10 text-emerald-400'
                                                            : 'bg-blue-500/10 text-blue-400'
                                                    }`}
                                            >
                                                {tx.type}
                                            </span>
                                        </td>
                                        <td className="p-4 font-bold text-emerald-400">+${tx.amount}</td>
                                        <td className="p-4 text-slate-300">{tx.description || '-'}</td>
                                        <td className="p-4 text-slate-400">
                                            {new Date(tx.createdAt).toLocaleString()}
                                        </td>
                                    </tr>
                                ))}

                                {transactions.length === 0 && (
                                    <tr>
                                        <td colSpan="4" className="p-6 text-center text-slate-500">
                                            No transaction records found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default Transactions;