import React, { useState } from 'react';

const Settings = () => {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleSaveSettings = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // Add settings save logic here
            setMessage('Settings saved successfully');
        } catch (error) {
            setMessage('Error saving settings');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="px-4 py-6 sm:px-0">
                <div className="bg-white shadow-sm rounded-lg">
                    <div className="p-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Settings</h2>
                        
                        {message && (
                            <div className={`mb-4 p-4 rounded-md ${
                                message.includes('Error') 
                                    ? 'bg-red-50 text-red-700' 
                                    : 'bg-green-50 text-green-700'
                            }`}>
                                {message}
                            </div>
                        )}

                        <form onSubmit={handleSaveSettings} className="space-y-6">
                            <div>
                                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                                    Username
                                </label>
                                <input
                                    type="text"
                                    name="username"
                                    id="username"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    placeholder="Your username"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    placeholder="your.email@example.com"
                                />
                            </div>

                            <div>
                                <label htmlFor="notifications" className="flex items-center">
                                    <input
                                        type="checkbox"
                                        name="notifications"
                                        id="notifications"
                                        className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    />
                                    <span className="ml-2 text-sm text-gray-600">
                                        Enable email notifications
                                    </span>
                                </label>
                            </div>

                            <div className="pt-4">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className={`inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                                        loading ? 'opacity-75 cursor-not-allowed' : ''
                                    }`}
                                >
                                    {loading ? 'Saving...' : 'Save Settings'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
