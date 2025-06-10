import React, { useState } from 'react';
import { uploadSalesFile } from '../services/api';
import { useNavigate } from 'react-router-dom';

const UploadSales = () => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [summaryData, setSummaryData] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
      setError('');
      setSummaryData(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a file to upload');
      return;
    }

    setIsLoading(true);
    setError('');
    setSuccess('');
    setSummaryData(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const uploadResponse = await uploadSalesFile(formData);
      console.log('Upload complete:', uploadResponse);
      
      // Reset the file input
      const fileInput = document.querySelector('input[type="file"]');
      if (fileInput) {
        fileInput.value = '';
      }

      setSummaryData(uploadResponse);
      setSuccess('File uploaded and analyzed successfully!');
    } catch (err) {
      setError(err.response?.data?.error || 'Error processing file');
    } finally {
      setIsLoading(false);
    }
  };

  const renderSummary = () => {
    if (!summaryData) return null;

    return (
      <div className="mt-8 space-y-6">
        {/* General Summary */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">General Summary</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Total Records</p>
              <p className="font-medium text-gray-800">{summaryData.summary.total_rows.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Sales</p>
              <p className="font-medium text-gray-800">${summaryData.summary.total_sales.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Period Start</p>
              <p className="font-medium text-gray-800">{new Date(summaryData.summary.start_date).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Period End</p>
              <p className="font-medium text-gray-800">{new Date(summaryData.summary.end_date).toLocaleDateString()}</p>
            </div>
          </div>
         
        </div>

        {/* Monthly Analysis */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Monthly Analysis</h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600">Best Performing Month</p>
              <p className="font-medium text-gray-800">{summaryData.summary_month.best_month}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Average Monthly Sales</p>
              <p className="font-medium text-gray-800">${summaryData.summary_month.avg_sales_by_month.toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* Product Analysis */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Product Analysis</h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600">Best Selling Product</p>
              <p className="font-medium text-gray-800">{summaryData.summary_products.highest_selling_product}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Highest Quantity Sold</p>
              <p className="font-medium text-gray-800">{summaryData.summary_products.best_selling_quantity.toLocaleString()} units</p>
            </div>
          </div>
        </div>

        {/* Sales Analysis */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Sales Analysis</h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600">Highest Sale Recorded</p>
              <p className="font-medium text-gray-800">${summaryData.summary_sales.highest_sale_recorded.toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* Trends Analysis */}
        {summaryData.summary_trends.summary_message && (
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Trends Analysis</h3>
            <p className="text-gray-700">{summaryData.summary_trends.summary_message}</p>
          </div>
        )}
         <div className="mt-6">
            <button
              onClick={() => navigate('/home')}
              className="w-45 flex justify-center items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md shadow-sm transition duration-150 ease-in-out"
            >
              <span>View More Analytics</span>
              <svg 
                className="ml-2 w-4 h-4" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex items-center space-x-5 mb-6">
            <div className="h-14 w-14 bg-blue-100 rounded-full flex flex-shrink-0 justify-center items-center">
              <svg className="h-8 w-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">Upload Sales Data</h2>
              <p className="text-gray-500">Upload your sales data file for comprehensive analysis</p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="flex text-sm text-gray-600 justify-center">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer bg-white rounded-lg font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                    >
                      <span>Upload a file</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                        onChange={handleFileChange}
                        accept=".csv,.xlsx,.xls"
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">CSV, Excel files up to 10MB</p>
                  {fileName && (
                    <p className="text-sm text-gray-600 mt-2">Selected file: {fileName}</p>
                  )}
                </div>
              </div>
            </div>

            {error && (
              <div className="mb-4 p-3 rounded bg-red-50 text-red-600 text-sm">
                {error}
              </div>
            )}

            {success && (
              <div className="mb-4 p-3 rounded bg-green-50 text-green-600 text-sm">
                {success}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className={`w-45 flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                isLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                'Upload and Analyze'
              )}
            </button>
          </form>
        </div>

        {/* Render analysis results */}
        {renderSummary()}
      </div>
    </div>
  );
};

export default UploadSales;