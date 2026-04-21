'use client';
import { useRouter } from 'next/navigation';
import { LogOut, User as UserIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/login');
  };

  return (
    <nav className="fixed top-0 inset-x-0 h-16 bg-surface border-b border-slate-800 flex items-center justify-between px-6 z-50">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold">TM</div>
        <span className="font-bold text-lg hidden sm:block">Task Manager</span>
      </div>
      
      <div className="flex items-center gap-4">
        {user && (
          <div className="flex items-center gap-2 bg-slate-900 rounded-full pl-1 pr-4 py-1 border border-slate-800">
            <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center">
              <UserIcon className="w-4 h-4 text-slate-400" />
            </div>
            <span className="text-sm font-medium text-slate-300">{user.name}</span>
          </div>
        )}
        <button 
          onClick={handleLogout}
          className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          title="Logout"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </div>
    </nav>
  );
}
