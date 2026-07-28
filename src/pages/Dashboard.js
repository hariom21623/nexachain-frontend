import React, { useEffect, useState } from 'react';
import API from '../api/axiosInstance';
import { useAuth } from '../context/AuthContext';
import Layout from '../components/Layout';
import { Wallet, TrendingUp, DollarSign, Users } from 'lucide-react';

const Dashboard = () => {
    // Extracting user from AuthContext
    const { user } = useAuth();

    const [stats, setStats] = useState({
        walletBalance: 0,
        totalInvestments: 0,
        totalRoiEarned: 0,
        totalLevelIncomeEarned: 0,
    });
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        fetchDashboardStats();
    }, []);

    const fetchDashboardStats = async () => {
        try {
            const response = await API.get('/dashboard/overview');
            const data = response.data.data || response.data;
            setStats({
                walletBalance: data.walletBalance || 0,
                totalInvestments: data.totalInvestments || 0,
                totalRoiEarned: data.totalRoiEarned || 0,
                totalLevelIncomeEarned: data.totalLevelIncomeEarned || 0,
            });
        } catch (error) {
            console.error('Failed to fetch user dashboard stats:', error);
        }
    };

    const handleCopyCode = () => {
        if (user?.referralCode) {
            navigator.clipboard.writeText(user.referralCode);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <Layout>
            <div className="space-y-6">
                {/* Referral Code Box */}
                <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 flex justify-between items-center">
                    <div>
                        <p className="text-slate-400 text-sm">Your Referral Code</p>
                        <p className="text-2xl font-bold text-emerald-400 mt-1">
                            {user?.referralCode || 'N/A'}
                        </p>
                    </div>
                    <button
                        onClick={handleCopyCode}
                        className="bg-slate-700 hover:bg-slate-600 text-slate-200 px-4 py-2 rounded-lg text-sm transition-colors"
                    >
                        {copied ? 'Copied!' : 'Copy Code'}
                    </button>
                </div>

                {/* Overview Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 flex items-center justify-between">
                        <div>
                            <p className="text-slate-400 text-sm">Wallet Balance</p>
                            <p className="text-2xl font-bold text-slate-100 mt-1">${stats.walletBalance}</p>
                        </div>
                        <div className="bg-slate-700/50 p-3 rounded-lg text-emerald-400">
                            <Wallet size={24} />
                        </div>
                    </div>

                    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 flex items-center justify-between">
                        <div>
                            <p className="text-slate-400 text-sm">Active Investment</p>
                            <p className="text-2xl font-bold text-slate-100 mt-1">${stats.totalInvestments}</p>
                        </div>
                        <div className="bg-slate-700/50 p-3 rounded-lg text-blue-400">
                            <TrendingUp size={24} />
                        </div>
                    </div>

                    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 flex items-center justify-between">
                        <div>
                            <p className="text-slate-400 text-sm">Total ROI Earned</p>
                            <p className="text-2xl font-bold text-slate-100 mt-1">${stats.totalRoiEarned}</p>
                        </div>
                        <div className="bg-slate-700/50 p-3 rounded-lg text-purple-400">
                            <DollarSign size={24} />
                        </div>
                    </div>

                    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 flex items-center justify-between">
                        <div>
                            <p className="text-slate-400 text-sm">Referral Earned</p>
                            <p className="text-2xl font-bold text-slate-100 mt-1">${stats.totalLevelIncomeEarned}</p>
                        </div>
                        <div className="bg-slate-700/50 p-3 rounded-lg text-amber-400">
                            <Users size={24} />
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Dashboard;