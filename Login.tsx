
import React, { useState } from 'react';

interface LoginProps {
  onLogin: (email: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setLoading(true);
      onLogin(email);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-cover bg-center" 
         style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('https://picsum.photos/seed/bg/1600/900')` }}>
      <div className="w-full max-w-md p-10 bg-black/80 rounded-lg shadow-2xl">
        <h1 className="text-3xl font-bold mb-8 text-white">Sign In</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email or phone number"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 bg-neutral-800 rounded text-white focus:outline-none focus:ring-2 focus:ring-red-600"
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 bg-neutral-800 rounded text-white focus:outline-none focus:ring-2 focus:ring-red-600"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-red-600 text-white font-bold rounded hover:bg-red-700 transition disabled:bg-red-800"
          >
            {loading ? 'Entering...' : 'Sign In'}
          </button>
        </form>
        
        <div className="mt-6 flex flex-col space-y-4">
          <button 
            onClick={() => onLogin('google-user@gmail.com')}
            className="flex items-center justify-center space-x-2 w-full py-2 bg-white text-black font-semibold rounded hover:bg-neutral-200 transition"
          >
            <i className="fab fa-google text-red-600"></i>
            <span>Login with Google</span>
          </button>
          
          <div className="flex justify-between text-neutral-400 text-sm">
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="accent-red-600" />
              <span>Remember me</span>
            </label>
            <a href="#" className="hover:underline">Need help?</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
