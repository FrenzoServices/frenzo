import React, { useState, useEffect, useRef } from 'react';
import { Send, User, ShieldCheck } from 'lucide-react';
import { projectService } from '../api/projectService';
import { PROJECT_ROLES } from '../constants';

const ProjectDiscussion = ({ projectId, currentUser, role }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const bottomRef = useRef(null);

  useEffect(() => {
    const unsubscribe = projectService.subscribeToComments(projectId, (data) => {
      setComments(data);
      setLoading(false);
      // Auto scroll to bottom on new message
      setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    });
    return () => unsubscribe();
  }, [projectId]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      await projectService.addComment(projectId, {
        text: newComment,
        authorId: currentUser.uid,
        authorName: currentUser.displayName || 'User',
        authorRole: role
      });
      setNewComment('');
    } catch (error) {
      console.error("Error sending comment", error);
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return 'Just now';
    return new Date(timestamp.seconds * 1000).toLocaleString();
  };

  return (
    <div style={{ padding: '1rem', height: '100%', display: 'flex', flexDirection: 'column' }}>
       {/* Commments Area */}
       <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1rem', minHeight: '300px', maxHeight: '600px', paddingRight: '10px' }}>
          {comments.length === 0 && !loading && (
             <div style={{ textAlign: 'center', color: '#666', marginTop: '2rem' }}>
                <p>No messages yet. Start the conversation.</p>
             </div>
          )}

          {comments.map(msg => {
             const isMe = msg.authorId === currentUser.uid;
             const isAdmin = msg.authorRole === PROJECT_ROLES.ADMIN;
             
             return (
               <div 
                 key={msg.id} 
                 style={{ 
                   alignSelf: isMe ? 'flex-end' : 'flex-start',
                   maxWidth: '80%',
                   display: 'flex', flexDirection: 'column', alignItems: isMe ? 'flex-end' : 'flex-start'
                 }}
               >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px', fontSize: '0.8rem', color: '#888' }}>
                     {isAdmin && <ShieldCheck size={14} color="#3b82f6" />}
                     <span style={{ fontWeight: isAdmin ? 'bold' : 'normal', color: isAdmin ? '#3b82f6' : '#888' }}>
                       {msg.authorName}
                     </span>
                     <span>•</span>
                     <span>{formatDate(msg.createdAt)}</span>
                  </div>
                  
                  <div style={{ 
                    padding: '12px 16px', 
                    borderRadius: '12px',
                    borderTopRightRadius: isMe ? '2px' : '12px',
                    borderTopLeftRadius: isMe ? '12px' : '2px',
                    background: isMe ? 'var(--accent-primary)' : '#222',
                    color: isMe ? '#fff' : '#ddd',
                    boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
                  }}>
                    {msg.text}
                  </div>
               </div>
             );
          })}
          <div ref={bottomRef} />
       </div>

       {/* Input Area */}
       <form onSubmit={handleSend} style={{ display: 'flex', gap: '10px', background: '#111', padding: '1rem', borderRadius: '12px', border: '1px solid #333' }}>
          <input 
            value={newComment} onChange={e => setNewComment(e.target.value)}
            placeholder="Type your message..."
            style={{ flex: 1, background: 'transparent', border: 'none', color: '#fff', outline: 'none' }}
          />
          <button 
            type="submit"
            disabled={!newComment.trim()}
            style={{ 
              background: newComment.trim() ? 'var(--accent-primary)' : '#333', 
              color: newComment.trim() ? '#fff' : '#666', border: 'none', 
              padding: '8px 12px', borderRadius: '8px', cursor: newComment.trim() ? 'pointer' : 'default',
              transition: '0.2s'
            }}
          >
            <Send size={18} />
          </button>
       </form>
    </div>
  );
};

export default ProjectDiscussion;
