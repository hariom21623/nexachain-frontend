import React, { useEffect, useState } from 'react';
import API from '../api/axiosInstance';
import Layout from '../components/Layout';
import { ShieldCheck, Users, DollarSign, TrendingUp } from 'lucide-react';

const AdminDashboard = () => {
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalInvestments: 0,
        totalPayouts: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAdminStats();
    }, []);

    const fetchAdminStats = async () => {
        try {
            // Backend admin overview API
            const response = await API.get('/admin/overview');
            const data = response.data.data || response.data;
            setStats({
                totalUsers: data.totalUsers || 0,
                totalInvestments: data.totalInvestments || 0,
                totalPayouts: data.totalPayouts || 0
            });
        } catch (err) {
            console.error("Failed to fetch admin stats:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout>
            <div className="space-y-6">
                <div className="bg-slate-800 p-6 rounded-xl border border-amber-500/30 flex justify-between items-center">
                    <div>
                        <span className="bg-amber-500/10 text-amber-400 text-xs font-bold px-3 py-1 rounded-full uppercase">
                            Admin Control Panel
                        </span>
                        <h2 className="text-2xl font-bold text-slate-100 mt-2">Platform Overview</h2>
                    </div>
                    <ShieldCheck className="text-amber-400" size={36} />
                </div>

                {/* Real Dynamic System Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                        <p className="text-slate-400 text-sm">Total Platform Users</p>
                        <p className="text-3xl font-bold text-slate-100 mt-1">
                            {loading ? '...' : stats.totalUsers}
                        </p>
                    </div>
                    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                        <p className="text-slate-400 text-sm">Total System Investments</p>
                        <p className="text-3xl font-bold text-emerald-400 mt-1">
                            ${loading ? '...' : stats.totalInvestments}
                        </p>
                    </div>
                    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                        <p className="text-slate-400 text-sm">Total Payouts Distributed</p>
                        <p className="text-3xl font-bold text-purple-400 mt-1">
                            ${loading ? '...' : stats.totalPayouts}
                        </p>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default AdminDashboard;