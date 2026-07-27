import React, { useEffect, useState } from 'react';
import API from '../api/axiosInstance';
import Layout from '../components/Layout';
import { Wallet, TrendingUp, Users, DollarSign, Copy, Check } from 'lucide-react';

const Dashboard = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        fetchOverview();
    }, []);

    const fetchOverview = async () => {
        try {
            const response = await API.get('/dashboard/overview');
            setData(response.data.data);
        } catch (err) {
            console.error('Failed to fetch overview data:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleCopy = () => {
        if (data?.user?.referralCode) {
            navigator.clipboard.writeText(data.user.referralCode);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    if (loading) {
        return (
            <Layout>
                <div className="text-emerald-400 text-center py-20">Loading dashboard...</div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="space-y-6">
                {/* Referral Box */}
                <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 flex flex-wrap justify-between items-center gap-4">
                    <div>
                        <h2 className="text-lg font-medium text-slate-200">Your Referral Code</h2>
                        <p className="text-2xl font-bold text-emerald-400 mt-1">{data?.user?.referralCode}</p>
                    </div>
                    <button
                        onClick={handleCopy}
                        className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded-lg text-sm text-slate-100 transition-colors"
                    >
                        {copied ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
                        {copied ? 'Copied!' : 'Copy Code'}
                    </button>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 flex items-center gap-4">
                        <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-lg">
                            <Wallet size={28} />
                        </div>
                        <div>
                            <p className="text-sm text-slate-400">Wallet Balance</p>
                            <p className="text-2xl font-bold text-slate-100">${data?.walletBalance || 0}</p>
                        </div>
                    </div>

                    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 flex items-center gap-4">
                        <div className="p-3 bg-blue-500/10 text-blue-400 rounded-lg">
                            <TrendingUp size={28} />
                        </div>
                        <div>
                            <p className="text-sm text-slate-400">Active Investment</p>
                            <p className="text-2xl font-bold text-slate-100">${data?.activeInvestmentAmount || 0}</p>
                        </div>
                    </div>

                    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 flex items-center gap-4">
                        <div className="p-3 bg-purple-500/10 text-purple-400 rounded-lg">
                            <DollarSign size={28} />
                        </div>
                        <div>
                            <p className="text-sm text-slate-400">Total ROI Earned</p>
                            <p className="text-2xl font-bold text-slate-100">${data?.totalRoiEarned || 0}</p>
                        </div>
                    </div>

                    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 flex items-center gap-4">
                        <div className="p-3 bg-amber-500/10 text-amber-400 rounded-lg">
                            <Users size={28} />
                        </div>
                        <div>
                            <p className="text-sm text-slate-400">Referral Earned</p>
                            <p className="text-2xl font-bold text-slate-100">${data?.totalReferralCommissionEarned || 0}</p>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Dashboard;