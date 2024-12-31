import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import loginPreview from '/login-preview.png';
import loginPreviewFallback from '/login-preview.png';
import { register } from '../services/api';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const year = new Date().getFullYear();
    if (document.getElementById('register-year')) {
      document.getElementById('register-year').textContent = year;
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await register(
        formData.email, 
        formData.username, 
        formData.password
      );
      console.log('Registration successful:', response);
      
      // If registration is successful, navigate to home
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="font-poppins bg-gray-100">
      <div className="container mx-auto p-4 flex items-center justify-center min-h-screen">
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm w-full max-w-md md:max-w-4xl flex flex-col md:flex-row">
          {/* Form Section */}
          <div className="bg-white border-gray-200 p-6 w-full md:w-1/2">
            {/* Logo */}
            <div className="text-center mb-9">
              <h1 className="text-3xl font-bold font-archivo tracking-wide text-black">DATUS.</h1>
            </div>

            <div className="text-left mb-4">
              <h1 className="text-2xl font-bold text-gray-800">Create Account</h1>
              <p className="mt-2 text-sm text-gray-600">
                Already have an account?{' '}
                <a href="/login" className="text-blue-600 hover:underline focus:outline-none font-medium">
                  Sign in here
                </a>
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit}>
              <div className="grid gap-y-4">
                {error && (
                  <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded">
                    {error}
                  </div>
                )}

                <button type="button" className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50">
                  <svg class="w-4 h-auto" width="46" height="47" viewBox="0 0 46 47" fill="none">
                    <path d="M46 24.0287C46 22.09 45.8533 20.68 45.5013 19.2112H23.4694V27.9356H36.4069C36.1429 30.1094 34.7347 33.37 31.5957 35.5731L31.5663 35.8669L38.5191 41.2719L38.9885 41.3306C43.4477 37.2181 46 31.1669 46 24.0287Z" fill="#4285F4"/>
                    <path d="M23.4694 47C29.8061 47 35.1161 44.9144 39.0179 41.3012L31.625 35.5437C29.6301 36.9244 26.9898 37.8937 23.4987 37.8937C17.2793 37.8937 12.0281 33.7812 10.1505 28.1412L9.88649 28.1706L2.61097 33.7812L2.52296 34.0456C6.36608 41.7125 14.287 47 23.4694 47Z" fill="#34A853"/>
                    <path d="M10.1212 28.1413C9.62245 26.6725 9.32908 25.1156 9.32908 23.5C9.32908 21.8844 9.62245 20.3275 10.0918 18.8588V18.5356L2.75765 12.8369L2.52296 12.9544C0.909439 16.1269 0 19.7106 0 23.5C0 27.2894 0.909439 30.8731 2.49362 34.0456L10.1212 28.1413Z" fill="#FBBC05"/>
                    <path d="M23.4694 9.07688C27.8699 9.07688 30.8622 10.9863 32.5344 12.5725L39.1645 6.11C35.0867 2.32063 29.8061 0 23.4694 0C14.287 0 6.36607 5.2875 2.49362 12.9544L10.0918 18.8588C11.9987 13.1894 17.25 9.07688 23.4694 9.07688Z" fill="#EB4335"/>
                  </svg>
                  Sign up with Google
                </button>

                <div class="py-3 flex items-center text-xs text-gray-400 uppercase before:flex-1 before:border-t before:border-gray-200 after:flex-1 after:border-t after:border-gray-200">
                    Or
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="john@example.com"
                    required
                  />
                </div>
                
                {/* Username Field */}
                <div>
                  <label htmlFor="username" className="block text-sm mb-2">
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="johndoe"
                    required
                  />
                </div>

                {/* Password Field */}
                <div>
                  <label htmlFor="password" className="block text-sm mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="********"
                    required
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Creating Account...' : 'Register'}
                </button>
              </div>
            </form>

            {/* Footer */}
            <footer>
              <h1 className="text-sm text-gray-600 mt-8 text-center">
                All rights reserved &copy; <span id="register-year"></span>{' '}
                <a href="/dashboard" className="underline hover:text-blue-600 focus:ring-blue-500">
                  DatusAI
                </a>
              </h1>
            </footer>
          </div>

          {/* Image Section */}
          <div className="hidden md:flex md:w-1/2 bg-blue-600 items-center justify-center p-8 rounded-r-xl">
            <img
              src={loginPreview}
              alt="Register preview"
              className="w-full h-auto max-h-[600px] object-contain rounded-lg shadow-lg"
              onError={(e) => {
                console.log('Image failed to load, trying fallback');
                e.target.onerror = null;
                e.target.src = loginPreviewFallback;
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;