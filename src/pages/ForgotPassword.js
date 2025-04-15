import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ForgotPassword() {
  const [email, setEmail] = useState(''); // State for storing the email
  const [message, setMessage] = useState(null); // State for displaying success/error message
  const [loading, setLoading] = useState(false); // State for showing the loading spinner
  const navigate = useNavigate(); // Hook to navigate the user to different pages

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setLoading(true); // Start loading spinner

    try {
      // Make an API request to send a password reset link
      const response = await axios.post('http://localhost:4001/api/forgot-password', { email });

      // Set the success message from the response
      setMessage(response.data.message);

      // After a successful request, redirect to the login page after a 3-second delay
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (error) {
      // Handle error if API request fails
      setMessage(error.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false); // Stop the loading spinner after the request is complete
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="w-full max-w-md space-y-8 p-10 bg-white rounded-lg shadow-lg">
        <h2 className="text-center text-3xl font-bold text-gray-900">Forgot Password</h2>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="relative block w-full rounded-md border py-2 px-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-gray-600 sm:text-sm"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} // Update email state on change
              />
            </div>
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500"
            >
              {loading ? 'Sending...' : 'Send Reset Link'} {/* Show loading text when in progress */}
            </button>
          </div>
        </form>
        
        {/* Show response message */}
        {message && <p className="text-center text-sm text-gray-600 mt-4">{message}</p>}
      </div>
    </div>
  );
}

export default ForgotPassword;
