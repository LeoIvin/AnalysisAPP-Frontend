import React, { useState } from 'react';
import AppSettings from './AppSettings';
import AccountSettings from './AccountSettings';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('account'); // 'account' or 'app'
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

            <div className="mb-6">
              <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-8">
                  <button
                    onClick={() => setActiveTab('account')}
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'account'
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Account Settings
                  </button>
                  <button
                    onClick={() => setActiveTab('app')}
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'app'
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Application Settings
                  </button>
                </nav>
              </div>
            </div>

            {activeTab === 'account' ? (
              <AccountSettings 
                handleSaveSettings={handleSaveSettings} 
                loading={loading} 
              />
            ) : (
              <AppSettings 
                handleSaveSettings={handleSaveSettings} 
                loading={loading} 
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
