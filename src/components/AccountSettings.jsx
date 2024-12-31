import React, { useState, useEffect } from 'react';
import { getProfile, updateProfile } from '../services/api';
import { useNavigate } from 'react-router-dom';

const AccountSettings = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    first_name: '',
    last_name: '',
    profile_picture: null,
    company_name: '',
    gender: '',
    mobile_number: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    fetchProfile();
  }, [navigate]);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      setMessage({ type: '', text: '' });
      
      const response = await getProfile();
      if (response.data) {
        setProfile(response.data);
        if (response.data.profile_picture) {
          // If the profile picture URL is a relative path, prepend the API URL
          const imageUrl = response.data.profile_picture.startsWith('http') 
            ? response.data.profile_picture 
            : `http://localhost:8000${response.data.profile_picture}`;
          setPreviewImage(imageUrl);
        }
      }
    } catch (error) {
      if (error.message === 'No authentication token found' || error.response?.status === 401) {
        navigate('/login');
      } else {
        setMessage({ 
          type: 'error', 
          text: error.response?.data?.detail || error.response?.data?.message || 'Failed to fetch profile data' 
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPreviewImage(previewUrl);
      
      setProfile(prev => ({
        ...prev,
        profile_picture: file
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ type: '', text: '' });

    try {
      const formData = new FormData();
      Object.keys(profile).forEach(key => {
        if (profile[key] !== null && profile[key] !== '') {
          formData.append(key, profile[key]);
        }
      });

      const response = await updateProfile(formData);
      if (response.data) {
        setMessage({ type: 'success', text: 'Profile updated successfully!' });
        await fetchProfile(); // This will update the profile with the new image URL from the server
      }
    } catch (error) {
      if (error.message === 'No authentication token found' || error.response?.status === 401) {
        navigate('/login');
      } else {
        setMessage({ 
          type: 'error', 
          text: error.response?.data?.detail || error.response?.data?.message || 'Failed to update profile' 
        });
      }
    } finally {
      setSaving(false);
    }
  };

  // Cleanup function for blob URLs
  useEffect(() => {
    return () => {
      if (previewImage && previewImage.startsWith('blob:')) {
        URL.revokeObjectURL(previewImage);
      }
    };
  }, [previewImage]);

  if (loading) {
    return (
      <div className="p-8">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-center h-48">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Account Settings</h2>
        
        {message.text && (
          <div className={`mb-4 p-3 rounded ${
            message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Profile Picture Section */}
          <div className="flex flex-col items-center mb-6">
            <div className="mb-4">
              {previewImage ? (
                <img
                  src={previewImage}
                  alt="Profile Preview"
                  className="w-32 h-32 object-cover rounded-full border-2 border-gray-200"
                />
              ) : (
                <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500">No Image</span>
                </div>
              )}
            </div>
            <div className="w-full max-w-xs">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Profile Picture
              </label>
              <input
                type="file"
                name="profile_picture"
                onChange={handleImageChange}
                accept="image/*"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Personal Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                First Name
              </label>
              <input
                type="text"
                name="first_name"
                value={profile.first_name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Last Name
              </label>
              <input
                type="text"
                name="last_name"
                value={profile.last_name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Company Name
              </label>
              <input
                type="text"
                name="company_name"
                value={profile.company_name || ''}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mobile Number
              </label>
              <input
                type="tel"
                name="mobile_number"
                value={profile.mobile_number || ''}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Gender
              </label>
              <select
                name="gender"
                value={profile.gender || ''}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button
              type="submit"
              disabled={saving}
              className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                saving ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AccountSettings;
