import React, { useState, useEffect } from 'react';
import { Plus, CheckCircle, Circle, Clock } from 'lucide-react';
import { projectService } from '../api/projectService';
import { PROJECT_ROLES, TASK_STATUS } from '../constants';

const ProjectTasks = ({ projectId, role }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', description: '', dueDate: '' });
  
  const isAdmin = role === PROJECT_ROLES.ADMIN;

  useEffect(() => {
    const unsubscribe = projectService.subscribeToTasks(projectId, (data) => {
      setTasks(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [projectId]);

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!newTask.title) return;
    try {
      await projectService.addTask(projectId, {
        ...newTask,
        status: TASK_STATUS.PENDING
      });
      setNewTask({ title: '', description: '', dueDate: '' });
      setShowAddForm(false);
    } catch (error) {
      console.error("Error adding task", error);
    }
  };

  const handleStatusChange = async (taskId, currentStatus) => {
    if (!isAdmin) return;
    
    let nextStatus = TASK_STATUS.PENDING;
    if (currentStatus === TASK_STATUS.PENDING) nextStatus = TASK_STATUS.IN_PROGRESS;
    else if (currentStatus === TASK_STATUS.IN_PROGRESS) nextStatus = TASK_STATUS.COMPLETED;
    else if (currentStatus === TASK_STATUS.COMPLETED) nextStatus = TASK_STATUS.PENDING;

    try {
      await projectService.updateTask(projectId, taskId, { status: nextStatus });
    } catch (error) {
      console.error("Error updating task", error);
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case TASK_STATUS.COMPLETED: return <CheckCircle size={20} color="#10b981" />;
      case TASK_STATUS.IN_PROGRESS: return <Clock size={20} color="#3b82f6" />;
      default: return <Circle size={20} color="#666" />;
    }
  };

  return (
    <div style={{ padding: '1rem' }}>
       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <div>
            <h3 style={{ fontSize: '1.2rem', color: '#fff' }}>Project Plan & Tasks</h3>
            <p style={{ color: '#888', fontSize: '0.9rem' }}>Track progress of deliverables.</p>
          </div>
          {isAdmin && (
            <button 
              onClick={() => setShowAddForm(!showAddForm)}
              style={{ 
                background: 'var(--accent-primary)', border: 'none', color: '#fff', 
                padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' 
              }}
            >
              <Plus size={18} /> Add Task
            </button>
          )}
       </div>

       {/* Add Task Form */}
       {showAddForm && (
         <form onSubmit={handleAddTask} style={{ background: '#111', padding: '1.5rem', borderRadius: '12px', border: '1px solid #333', marginBottom: '2rem' }}>
            <h4 style={{ marginBottom: '1rem', color: '#fff' }}>New Task</h4>
            <div style={{ display: 'grid', gap: '1rem' }}>
               <input 
                 value={newTask.title} onChange={e => setNewTask({...newTask, title: e.target.value})}
                 placeholder="Task Title"
                 autoFocus
                 style={{ padding: '10px', borderRadius: '6px', background: '#222', border: '1px solid #444', color: '#fff' }}
               />
               <textarea 
                 value={newTask.description} onChange={e => setNewTask({...newTask, description: e.target.value})}
                 placeholder="Description (Optional)"
                 rows={2}
                 style={{ padding: '10px', borderRadius: '6px', background: '#222', border: '1px solid #444', color: '#fff', fontFamily: 'inherit' }}
               />
               <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                  <button type="button" onClick={() => setShowAddForm(false)} style={{ padding: '8px 16px', background: 'transparent', color: '#888', border: 'none', cursor: 'pointer' }}>Cancel</button>
                  <button type="submit" style={{ padding: '8px 16px', background: '#fff', color: '#000', borderRadius: '6px', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}>Add Task</button>
               </div>
            </div>
         </form>
       )}

       {/* Tasks List */}
       <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {tasks.length === 0 && !loading && (
            <div style={{ textAlign: 'center', padding: '3rem', color: '#666', border: '1px dashed #333', borderRadius: '12px' }}>
               No tasks created yet.
            </div>
          )}
          
          {tasks.map(task => (
            <div 
              key={task.id}
              style={{ 
                background: '#111', border: '1px solid #222', borderRadius: '10px', padding: '1rem',
                display: 'flex', alignItems: 'flex-start', gap: '1rem', transition: '0.2s'
              }}
            >
               <button 
                 onClick={() => handleStatusChange(task.id, task.status)}
                 disabled={!isAdmin}
                 style={{ background: 'transparent', border: 'none', cursor: isAdmin ? 'pointer' : 'default', padding: '0', marginTop: '2px' }}
               >
                 {getStatusIcon(task.status)}
               </button>
               
               <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <h4 style={{ 
                      textDecoration: task.status === TASK_STATUS.COMPLETED ? 'line-through' : 'none',
                      color: task.status === TASK_STATUS.COMPLETED ? '#666' : '#fff',
                      marginBottom: '4px'
                    }}>
                      {task.title}
                    </h4>
                    <span style={{ fontSize: '0.8rem', padding: '2px 8px', borderRadius: '12px', background: '#222', color: '#888' }}>
                      {task.status}
                    </span>
                  </div>
                  {task.description && <p style={{ color: '#888', fontSize: '0.9rem' }}>{task.description}</p>}
               </div>
            </div>
          ))}
       </div>
    </div>
  );
};

export default ProjectTasks;
