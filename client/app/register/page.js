'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import api from '../../lib/api';
import toast from 'react-hot-toast';
import { User, Lock, Mail, Loader2, ArrowLeft } from 'lucide-react';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      toast.error('Please fill in all fields');
      return;
    }
    
    setLoading(true);
    try {
      const { data } = await api.post('/auth/register', { name, email, password });
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data));
      toast.success('Registration successful!');
      router.push('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center relative p-6">
      <div className="absolute top-20 right-1/2 translate-x-1/2 w-full max-w-md bg-purple-500/20 h-64 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="w-full max-w-md z-10">
        <Link href="/" className="inline-flex items-center text-slate-400 hover:text-white transition-colors mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to home
        </Link>
        
        <div className="glass-panel rounded-2xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
            <p className="text-slate-400">Join us to organize your tasks efficiently</p>
          </div>
          
          <form onSubmit={handleRegister} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="w-5 h-5 text-slate-500" />
                </div>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e)=>setName(e.target.value)}
                  className="input-field pl-10" 
                  placeholder="John Doe"
                />
              </div>
            </div>

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
                  placeholder="you@example.com"
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
                  placeholder="••••••••"
                />
              </div>
            </div>
            
            <button 
              type="submit" 
              disabled={loading}
              className="btn-primary w-full py-3 mt-4 text-lg"
            >
              {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : 'Sign Up'}
            </button>
          </form>
          
          <p className="mt-6 text-center text-slate-400">
            Already have an account? <Link href="/login" className="text-primary hover:text-primary-hover font-medium">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
