'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import api from '../../lib/api';
import toast from 'react-hot-toast';
import Navbar from '../../components/Navbar';
import TaskCard from '../../components/TaskCard';
import TaskModal from '../../components/TaskModal';
import { Plus, ListTodo, CheckCircle2, Clock } from 'lucide-react';

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState({ total: 0, completed: 0, pending: 0 });
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [modalLoading, setModalLoading] = useState(false);
  const router = useRouter();

  const fetchTasksAndStats = async () => {
    try {
      const [tasksRes, statsRes] = await Promise.all([
        api.get('/tasks'),
        api.get('/tasks/stats')
      ]);
      setTasks(tasksRes.data);
      setStats(statsRes.data);
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        router.push('/login');
      } else {
        toast.error('Failed to fetch tasks');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }
    fetchTasksAndStats();
  }, []);

  const handleCreateOrUpdate = async (taskData) => {
    setModalLoading(true);
    try {
      if (editingTask) {
        await api.put(`/tasks/${editingTask._id}`, taskData);
        toast.success('Task updated');
      } else {
        await api.post('/tasks', taskData);
        toast.success('Task created');
      }
      setModalOpen(false);
      setEditingTask(null);
      fetchTasksAndStats();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong');
    } finally {
      setModalLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;
    try {
      await api.delete(`/tasks/${id}`);
      toast.success('Task deleted');
      fetchTasksAndStats();
    } catch (error) {
      toast.error('Failed to delete task');
    }
  };

  const handleUpdateStatus = async (id, status) => {
    try {
      await api.put(`/tasks/${id}`, { status });
      toast.success(`Task marked as ${status}`);
      fetchTasksAndStats();
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'All') return true;
    if (filter === 'Completed') return task.status === 'Completed';
    if (filter === 'Pending') return task.status === 'Pending';
    return task.priority === filter;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight">Dashboard</h1>
            <p className="text-slate-400 mt-1">Here's what's happening with your projects.</p>
          </div>
          
          <button 
            onClick={() => { setEditingTask(null); setModalOpen(true); }}
            className="btn-primary"
          >
            <Plus className="w-5 h-5" />
            New Task
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="card bg-gradient-to-br from-surface to-surface/50 border-slate-800">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <ListTodo className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-400">Total Tasks</p>
                <p className="text-3xl font-bold text-white mt-1">{stats.total}</p>
              </div>
            </div>
          </div>
          
          <div className="card bg-gradient-to-br from-surface to-surface/50 border-slate-800">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-warning/10 flex items-center justify-center text-warning">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-400">In Progress</p>
                <p className="text-3xl font-bold text-white mt-1">{stats.pending}</p>
              </div>
            </div>
          </div>
          
          <div className="card bg-gradient-to-br from-surface to-surface/50 border-slate-800">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center text-success">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-400">Completed</p>
                <p className="text-3xl font-bold text-white mt-1">{stats.completed}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex overflow-x-auto pb-4 gap-2 mb-6 scrollbar-hide">
          {['All', 'Pending', 'Completed', 'High', 'Medium', 'Low'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                filter === f 
                  ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                  : 'bg-surface border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
              }`}
            >
              {f} {['High', 'Medium', 'Low'].includes(f) && 'Priority'}
            </button>
          ))}
        </div>

        {/* Tasks Grid */}
        {filteredTasks.length === 0 ? (
          <div className="card text-center py-20 px-6 border-dashed">
            <div className="w-16 h-16 rounded-full bg-slate-800 mx-auto flex items-center justify-center mb-4">
              <ListTodo className="w-8 h-8 text-slate-500" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No tasks found</h3>
            <p className="text-slate-400 max-w-sm mx-auto">
              There are no tasks matching this filter. Create a new task to get started!
            </p>
            <button 
              onClick={() => { setEditingTask(null); setModalOpen(true); }}
              className="mt-6 text-primary hover:text-primary-hover font-medium inline-flex items-center"
            >
              <Plus className="w-4 h-4 mr-1" /> Create Task
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTasks.map(task => (
              <TaskCard 
                key={task._id} 
                task={task} 
                onUpdateStatus={handleUpdateStatus}
                onDelete={handleDelete}
                onEdit={(t) => { setEditingTask(t); setModalOpen(true); }}
              />
            ))}
          </div>
        )}
      </main>

      <TaskModal 
        isOpen={modalOpen} 
        onClose={() => { setModalOpen(false); setEditingTask(null); }}
        onSubmit={handleCreateOrUpdate}
        task={editingTask}
        isLoading={modalLoading}
      />
    </div>
  );
}
