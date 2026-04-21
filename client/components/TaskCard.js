import { Calendar, AlertCircle, CheckCircle, Trash2, Edit2 } from 'lucide-react';

export default function TaskCard({ task, onUpdateStatus, onDelete, onEdit }) {
  const isOverdue = new Date(task.deadline) < new Date() && task.status !== 'Completed';

  const priorityColors = {
    Low: 'bg-slate-500/10 text-slate-400 border-slate-500/20',
    Medium: 'bg-warning/10 text-warning border-warning/20',
    High: 'bg-danger/10 text-danger border-danger/20'
  };

  return (
    <div className={`card transition-all hover:-translate-y-1 ${isOverdue ? 'border-danger/50 shadow-danger/10' : ''}`}>
      <div className="flex justify-between items-start mb-4">
        <h3 className={`font-semibold text-lg ${task.status === 'Completed' ? 'line-through text-slate-500' : 'text-slate-100'}`}>
          {task.title}
        </h3>
        <div className="flex gap-2">
          <button 
            onClick={() => onEdit(task)}
            className="p-1.5 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-md transition-colors"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button 
            onClick={() => onDelete(task._id)}
            className="p-1.5 text-slate-400 hover:text-danger hover:bg-danger/10 rounded-md transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      {task.description && (
        <p className="text-slate-400 text-sm mb-4 line-clamp-2">{task.description}</p>
      )}
      
      <div className="flex flex-wrap items-center gap-3 mt-4">
        <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${priorityColors[task.priority] || priorityColors.Medium}`}>
          {task.priority} Priority
        </span>
        
        {task.deadline && (
          <div className={`flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border ${isOverdue ? 'bg-danger/10 text-danger border-danger/20' : 'bg-slate-800 text-slate-300 border-slate-700'}`}>
            {isOverdue ? <AlertCircle className="w-3.5 h-3.5" /> : <Calendar className="w-3.5 h-3.5" />}
            {new Date(task.deadline).toLocaleDateString()}
          </div>
        )}
      </div>

      <div className="mt-5 pt-4 border-t border-slate-800 flex items-center justify-between">
        <span className="text-xs text-slate-500">
          Created {new Date(task.createdAt).toLocaleDateString()}
        </span>
        
        <button
          onClick={() => onUpdateStatus(task._id, task.status === 'Pending' ? 'Completed' : 'Pending')}
          className={`text-sm font-medium flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors ${
            task.status === 'Completed' 
              ? 'text-success bg-success/10 hover:bg-success/20' 
              : 'text-slate-300 bg-slate-800 hover:bg-slate-700'
          }`}
        >
          <CheckCircle className={`w-4 h-4 ${task.status === 'Completed' ? 'fill-success/20' : ''}`} />
          {task.status === 'Completed' ? 'Completed' : 'Mark Complete'}
        </button>
      </div>
    </div>
  );
}
