import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, TrendingUp, Users, History, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
    const location = useLocation();
    const { logout } = useAuth();

    const menuItems = [
        { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
        { name: 'Investments', path: '/investments', icon: TrendingUp },
        { name: 'Referral Team', path: '/referrals', icon: Users },
        { name: 'Transactions', path: '/transactions', icon: History },
    ];

    return (
        <div className="w-64 bg-slate-800 border-r border-slate-700 min-h-screen flex flex-col justify-between p-4">
            <div>
                <div className="text-2xl font-bold text-emerald-400 mb-8 px-4 flex items-center gap-2">
                    <span>⚡</span> NexaChain
                </div>

                <nav className="space-y-2">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${isActive
                                        ? 'bg-emerald-600 text-white'
                                        : 'text-slate-400 hover:bg-slate-700 hover:text-slate-100'
                                    }`}
                            >
                                <Icon size={18} />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>
            </div>

            <button
                onClick={logout}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-400 hover:bg-slate-700 w-full transition-colors"
            >
                <LogOut size={18} />
                Logout
            </button>
        </div>
    );
};

export default Sidebar;