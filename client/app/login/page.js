'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import api from '../../lib/api';
import toast from 'react-hot-toast';
import { Lock, Mail, Loader2, ArrowLeft } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please enter email and password');
      return;
    }
    
    setLoading(true);
    try {
      const { data } = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data));
      toast.success('Login successful!');
      router.push('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center relative p-6">
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-full max-w-md bg-primary/20 h-64 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="w-full max-w-md z-10">
        <Link href="/" className="inline-flex items-center text-slate-400 hover:text-white transition-colors mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to home
        </Link>
        
        <div className="glass-panel rounded-2xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
            <p className="text-slate-400">Enter your credentials to access your account</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="w-5 h-5 text-slate-500" />
                </div>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                  className="input-field pl-10" 
                  placeholder="Enter your email"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="w-5 h-5 text-slate-500" />
                </div>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                  className="input-field pl-10" 
                  placeholder="Enter your password"
                />
              </div>
            </div>
            
            <button 
              type="submit" 
              disabled={loading}
              className="btn-primary w-full py-3 mt-4 text-lg"
            >
              {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : 'Log In'}
            </button>
          </form>
          
          <p className="mt-6 text-center text-slate-400">
            Don't have an account? <Link href="/register" className="text-primary hover:text-primary-hover font-medium">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
