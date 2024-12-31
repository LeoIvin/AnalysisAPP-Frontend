import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }
        setLoading(false);
    }, [navigate]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="px-4 py-6 sm:px-0">
                <div className="bg-white overflow-hidden shadow-sm rounded-lg">
                    <div className="p-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Sales Analysis Dashboard</h2>
                        <p className="text-gray-600">
                            Welcome to your sales analysis dashboard. Upload your sales data and view detailed analysis here.
                        </p>
                        {/* Analysis components will be added here */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;