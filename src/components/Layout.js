import React from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const Layout = ({ children }) => {
    return (
        <div className="flex min-h-screen bg-slate-900">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Navbar />
                <main className="p-8 flex-1 overflow-y-auto">{children}</main>
            </div>
        </div>
    );
};

export default Layout;