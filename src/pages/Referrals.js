import React, { useState, useEffect } from 'react';
import API from '../api/axiosInstance';
import Layout from '../components/Layout';
import { Users, UserCheck, GitFork } from 'lucide-react';

const Referrals = () => {
    const [activeTab, setActiveTab] = useState('tree');
    const [treeData, setTreeData] = useState([]);
    const [directsData, setDirectsData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchReferralData();
    }, []);

    const fetchReferralData = async () => {
        try {
            const [treeRes, directRes] = await Promise.all([
                API.get('/referrals/tree'),
                API.get('/referrals/direct'),
            ]);
            setTreeData(treeRes.data.data || []);
            setDirectsData(directRes.data.data || []);
        } catch (err) {
            console.error('Failed to load referral details:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout>
            <div className="space-y-6">
                {/* Navigation Tabs */}
                <div className="flex border-b border-slate-700 gap-4">
                    <button
                        onClick={() => setActiveTab('tree')}
                        className={`pb-3 font-medium text-sm flex items-center gap-2 border-b-2 transition-colors ${activeTab === 'tree'
                                ? 'border-emerald-500 text-emerald-400'
                                : 'border-transparent text-slate-400 hover:text-slate-200'
                            }`}
                    >
                        <GitFork size={18} /> Level Tree View
                    </button>
                    <button
                        onClick={() => setActiveTab('directs')}
                        className={`pb-3 font-medium text-sm flex items-center gap-2 border-b-2 transition-colors ${activeTab === 'directs'
                                ? 'border-emerald-500 text-emerald-400'
                                : 'border-transparent text-slate-400 hover:text-slate-200'
                            }`}
                    >
                        <UserCheck size={18} /> Direct Downlines
                    </button>
                </div>

                {/* Tab Content */}
                {loading ? (
                    <div className="text-emerald-400 py-10 text-center">Loading network tree...</div>
                ) : activeTab === 'tree' ? (
                    <div className="space-y-4">
                        {treeData.map((levelGroup) => (
                            <div key={levelGroup.level} className="bg-slate-800 p-5 rounded-xl border border-slate-700">
                                <h3 className="text-md font-bold text-emerald-400 mb-3 flex items-center gap-2">
                                    <span>Level {levelGroup.level}</span>
                                    <span className="text-xs bg-slate-700 text-slate-300 px-2 py-0.5 rounded-full font-normal">
                                        {levelGroup.members?.length || 0} Members
                                    </span>
                                </h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                    {levelGroup.members?.map((member) => (
                                        <div key={member._id} className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                                            <p className="font-semibold text-slate-200 text-sm">{member.fullName}</p>
                                            <p className="text-xs text-slate-400">{member.email}</p>
                                            <p className="text-xs text-emerald-400 mt-1">Status: Active</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
                        <table className="w-full text-left text-sm text-slate-300">
                            <thead className="bg-slate-900 text-slate-400 uppercase text-xs">
                                <tr>
                                    <th className="p-4">Name</th>
                                    <th className="p-4">Email</th>
                                    <th className="p-4">Mobile</th>
                                    <th className="p-4">Joined Date</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-700">
                                {directsData.map((direct) => (
                                    <tr key={direct._id} className="hover:bg-slate-700/50">
                                        <td className="p-4 font-medium text-slate-100">{direct.fullName}</td>
                                        <td className="p-4">{direct.email}</td>
                                        <td className="p-4">{direct.mobileNumber || 'N/A'}</td>
                                        <td className="p-4">{new Date(direct.createdAt).toLocaleDateString()}</td>
                                    </tr>
                                ))}
                                {directsData.length === 0 && (
                                    <tr>
                                        <td colSpan="4" className="p-6 text-center text-slate-500">
                                            No direct referrals joined yet.
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

export default Referrals;