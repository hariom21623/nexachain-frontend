import React from 'react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { user } = useAuth();

    return (
        <header className="bg-slate-800 border-b border-slate-700 px-8 py-4 flex justify-between items-center">
            <h1 className="text-xl font-semibold text-slate-100">User Panel</h1>

            <div className="flex items-center gap-4">
                <div className="text-right">
                    <p className="text-sm font-medium text-slate-100">{user?.fullName || 'User'}</p>
                    <p className="text-xs text-slate-400">{user?.email}</p>
                </div>
                <div className="w-10 h-10 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold">
                    {user?.fullName ? user.fullName[0].toUpperCase() : 'U'}
                </div>
            </div>
        </header>
    );
};

export default Navbar;