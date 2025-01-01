import React, { useEffect, useState } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    BarElement,
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import { getSummary } from '../services/api';
import { getProfile } from '../services/api';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const Home = () => {
    const [loading, setLoading] = useState(true);
    const [summaryData, setSummaryData] = useState(null);
    const [profileData, setProfileData] = useState({
        username: '',
        first_name: '',
        last_name: ''
    });
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    return;
                }
                const response = await getSummary();
                console.log('API Response:', response);
                setSummaryData(response.data);
            } catch (error) {
                console.error('Error fetching summary:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        const fetchProfile = async () => {
            try {
                const response = await getProfile();
                if (response.data) {
                    setProfileData(response.data);
                }
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        };

        fetchData();
        fetchProfile();
    }, []);
    

    // Chart Options
    const chartOptions = (title, isMonetary = true) => ({
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
            mode: 'index',
            intersect: false,
        },
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: true,
                text: title,
                align: 'start',
                font: {
                    size: 16,
                    weight: 'normal'
                },
                color: '#6B7280',
                padding: {
                    bottom: 30
                }
            },
            tooltip: {
                enabled: true,
                mode: 'index',
                intersect: false,
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                titleColor: '#1F2937',
                bodyColor: '#1F2937',
                borderColor: '#E5E7EB',
                borderWidth: 1,
                padding: 12,
                boxPadding: 6,
                usePointStyle: true,
                callbacks: {
                    label: function(context) {
                        let label = context.dataset.label || '';
                        if (label) {
                            label += ': ';
                        }
                        if (context.parsed.y !== null) {
                            if (isMonetary) {
                                label += new Intl.NumberFormat('en-US', {
                                    style: 'currency',
                                    currency: 'USD'
                                }).format(context.parsed.y);
                            } else {
                                label += new Intl.NumberFormat('en-US').format(context.parsed.y);
                            }
                        }
                        return label;
                    }
                }
            }
        },
        scales: {
            x: {
                grid: {
                    display: false,
                },
                ticks: {
                    font: {
                        size: 12,
                    },
                    color: '#9CA3AF',
                }
            },
            y: {
                beginAtZero: true,
                grid: {
                    color: '#F3F4F6',
                },
                ticks: {
                    font: {
                        size: 12,
                    },
                    color: '#9CA3AF',
                    callback: function(value) {
                        if (isMonetary) {
                            return value >= 1000 ? '$' + value/1000 + 'k' : '$' + value;
                        }
                        return value >= 1000 ? value/1000 + 'k' : value;
                    }
                }
            },
        },
        elements: {
            line: {
                tension: 0.4,
                borderWidth: 2,
            },
            point: {
                radius: 0,
                hitRadius: 8,
                hoverRadius: 4,
            },
        },
        hover: {
            mode: 'index',
            intersect: false,
        },
    });

    // Chart Data
    const salesByMonthData = {
        labels: summaryData?.sales_by_month_x || [],
        datasets: [
            {
                label: 'Sales by Month',
                data: summaryData?.sales_by_month_y || [],
                borderColor: '#3B82F6',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                fill: true,
                tension: 0.4,
            },
        ],
    };

    const productSalesData = {
        labels: summaryData?.product_sales_x || [],
        datasets: [
            {
                label: 'Units Sold',
                data: summaryData?.product_sales_y || [],
                backgroundColor: '#3B82F6',
                borderColor: '#3B82F6',
                barThickness: 8,
            },
        ],
    };

    const totalSalesData = {
        labels: summaryData?.total_sales_x || [],
        datasets: [
            {
                label: 'Total Sales',
                data: summaryData?.total_sales_y || [],
                borderColor: '#3B82F6',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                fill: true,
                tension: 0.4,
            },
        ],
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-red-500 p-4">
                Error loading dashboard data: {error}
            </div>
        );
    }

    return (
        <div className="px-4 py-4 sm:px-0">
            <div className="bg-white overflow-hidden shadow-sm rounded-lg">
                <div className="p-4">
                    <h2 className="text-3xl font-semibold text-gray-900 mb-6 text-center tracking-wide"> Hello {profileData.first_name || profileData.username || 'User'},</h2>
                    
                    {!summaryData ? (
                        <p className="text-gray-500 italic mb-4">No data available. Please upload sales data to view analytics.</p>
                    ) : (
                        <>
                            {/* Summary Statistics */}
                            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 mb-6">
                                <div className="bg-white overflow-hidden shadow-sm rounded-xl border border-gray-100 p-6">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0">
                                            <div className="bg-blue-50 rounded-lg p-3">
                                                <svg className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </div>
                                        </div>
                                        <div className="ml-5 w-0 flex-1">
                                            <dl>
                                                <dt className="text-sm font-medium text-gray-500 truncate">
                                                    Total Revenue
                                                </dt>
                                                <dd className="text-2xl font-semibold text-gray-900 mt-1">
                                                    ${(summaryData?.total_sales || 0).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                                                </dd>
                                            </dl>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white overflow-hidden shadow-sm rounded-xl border border-gray-100 p-6">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0">
                                            <div className="bg-blue-50 rounded-lg p-3">
                                                <svg className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                                </svg>
                                            </div>
                                        </div>
                                        <div className="ml-5 w-0 flex-1">
                                            <dl>
                                                <dt className="text-sm font-medium text-gray-500 truncate">
                                                    Best Selling Product
                                                </dt>
                                                <dd className="text-2xl font-semibold text-gray-900 mt-1">
                                                    {summaryData?.best_selling_product || 'None'}
                                                </dd>
                                            </dl>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white overflow-hidden shadow-sm rounded-xl border border-gray-100 p-6">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0">
                                            <div className="bg-blue-50 rounded-lg p-3">
                                                <svg className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                                </svg>
                                            </div>
                                        </div>
                                        <div className="ml-5 w-0 flex-1">
                                            <dl>
                                                <dt className="text-sm font-medium text-gray-500 truncate">
                                                    Average Sale per Month
                                                </dt>
                                                <dd className="text-2xl font-semibold text-gray-900 mt-1">
                                                    ${(summaryData?.avg_sales_by_month || 0).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                                                </dd>
                                            </dl>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Charts Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Sales by Month Chart */}
                                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                    <div className="h-[300px]">
                                        <Line 
                                            options={chartOptions('Sales by Month')} 
                                            data={salesByMonthData}
                                        />
                                    </div>
                                </div>

                                {/* Product Sales Chart */}
                                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                    <div className="h-[300px]">
                                        <Bar 
                                            options={chartOptions('Sales by Quantity', false)} 
                                            data={productSalesData}
                                        />
                                    </div>
                                </div>

                                {/* Total Sales Chart */}
                                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 md:col-span-2">
                                    <div className="h-[300px]">
                                        <Line 
                                            options={chartOptions('Products by Total Sales')} 
                                            data={totalSalesData}
                                        />
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Home;