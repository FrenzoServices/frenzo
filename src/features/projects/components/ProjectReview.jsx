import React, { useState } from 'react';
import { Star, Check, Globe, Share2, Lock } from 'lucide-react';
import { projectService } from '../api/projectService';
import { PROJECT_ROLES } from '../constants';

const ProjectReview = ({ project, role, onReviewSubmitted }) => {
  const [rating, setRating] = useState(project.review?.rating || 0);
  const [reviewText, setReviewText] = useState(project.review?.text || '');
  const [isPublic, setIsPublic] = useState(project.isPublic || false);
  const [allowLinkShare, setAllowLinkShare] = useState(project.review?.allowLinkShare || false);
  const [loading, setLoading] = useState(false);
  const [locked, setLocked] = useState(false);

  // Check if review is already locked
  // Rule: Ratings >= 4 stars are locked immediately after submit
  // Rule: Ratings <= 3 stars allow 1 edit (We'll simplify: if review exists and rating >= 4, lock it)
  const isReviewLocked = project.review && project.review.rating >= 4;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const reviewData = {
        rating,
        text: reviewText,
        allowLinkShare,
        submittedAt: new Date().toISOString()
      };

      await projectService.updateProject(project.id, {
        review: reviewData,
        isPublic: isPublic // Root level field for filtering
      });
      
      if (onReviewSubmitted) onReviewSubmitted();
    } catch (error) {
      console.error("Review failed", error);
      alert("Failed to submit review");
    } finally {
      setLoading(false);
    }
  };

  // If Client and Review Locked, show read-only view
  if (isReviewLocked) {
    return (
      <div style={{ background: '#111', padding: '2rem', borderRadius: '12px', border: '1px solid #222', textAlign: 'center' }}>
         <div style={{ display: 'inline-flex', padding: '1rem', background: 'rgba(34, 197, 94, 0.1)', borderRadius: '50%', marginBottom: '1rem' }}>
           <Check size={32} color="#22c55e" />
         </div>
         <h3 style={{ color: '#fff', marginBottom: '0.5rem' }}>Thank you for your review!</h3>
         <div style={{ display: 'flex', justifyContent: 'center', gap: '4px', marginBottom: '1rem' }}>
            {[1,2,3,4,5].map(star => (
              <Star key={star} size={24} fill={star <= project.review.rating ? "#fbbf24" : "none"} color={star <= project.review.rating ? "#fbbf24" : "#444"} />
            ))}
         </div>
         <p style={{ color: '#aaa', fontStyle: 'italic' }}>"{project.review.text}"</p>
      </div>
    );
  }

  // If Admin, show what the client submitted
  if (role === PROJECT_ROLES.ADMIN) {
     if (!project.review) return <div style={{ color: '#666', fontStyle: 'italic' }}>Client hasn't submitted a review yet.</div>;
     return (
        <div style={{ background: '#111', padding: '1.5rem', borderRadius: '12px', border: '1px solid #333' }}>
           <h4 style={{ color: '#fff', marginBottom: '1rem' }}>Client Review</h4>
           <div style={{ display: 'flex', gap: '4px', marginBottom: '1rem' }}>
              {[1,2,3,4,5].map(star => (
                <Star key={star} size={20} fill={star <= project.review.rating ? "#fbbf24" : "none"} color={star <= project.review.rating ? "#fbbf24" : "#444"} />
              ))}
           </div>
           <p style={{ color: '#ccc', marginBottom: '1rem' }}>{project.review.text}</p>
           <div style={{ display: 'flex', gap: '1rem', fontSize: '0.9rem', color: '#888' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Globe size={14} color={project.isPublic ? "#22c55e" : "#666"} />
                Public: {project.isPublic ? 'Yes' : 'No'}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                 <Share2 size={14} color={project.review.allowLinkShare ? "#22c55e" : "#666"} />
                 Link Share: {project.review.allowLinkShare ? 'Yes' : 'No'}
              </span>
           </div>
        </div>
     );
  }

  return (
    <div style={{ background: '#111', padding: '2rem', borderRadius: '12px', border: '1px solid #222' }}>
       <h3 style={{ fontSize: '1.5rem', color: '#fff', marginBottom: '0.5rem' }}>Project Completed</h3>
       <p style={{ color: '#888', marginBottom: '2rem' }}>Please rate your experience with Frenzo.</p>

       <form onSubmit={handleSubmit}>
         {/* Stars */}
         <div style={{ display: 'flex', gap: '8px', marginBottom: '1.5rem', cursor: 'pointer' }}>
            {[1,2,3,4,5].map(star => (
              <Star 
                key={star} 
                size={32} 
                fill={star <= rating ? "#fbbf24" : "none"} 
                color={star <= rating ? "#fbbf24" : "#444"}
                onClick={() => setRating(star)}
              />
            ))}
         </div>

         {/* Text */}
         <textarea 
           value={reviewText}
           onChange={(e) => setReviewText(e.target.value)}
           placeholder="What did you like? How can we improve?"
           rows={4}
           style={{ 
             width: '100%', padding: '1rem', background: '#050505', border: '1px solid #333', 
             borderRadius: '8px', color: '#fff', marginBottom: '1.5rem', fontFamily: 'inherit' 
           }}
         />

         {/* Toggles */}
         <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#ccc', cursor: 'pointer' }}>
               <input 
                 type="checkbox" 
                 checked={isPublic} 
                 onChange={(e) => setIsPublic(e.target.checked)}
                 style={{ width: '18px', height: '18px', accentColor: 'var(--accent-primary)' }}
               />
               <span>Allow Frenzo to showcase this project publicly</span>
            </label>
            
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#ccc', cursor: 'pointer' }}>
               <input 
                 type="checkbox" 
                 checked={allowLinkShare} 
                 onChange={(e) => setAllowLinkShare(e.target.checked)}
                 style={{ width: '18px', height: '18px', accentColor: 'var(--accent-primary)' }}
               />
               <span>Allow sharing project link in portfolio</span>
            </label>
         </div>

         <button 
           type="submit"
           disabled={loading || rating === 0}
           style={{ 
             width: '100%', padding: '14px', background: loading || rating === 0 ? '#333' : 'var(--accent-primary)',
             color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: loading || rating === 0 ? 'default' : 'pointer'
           }}
         >
           {loading ? 'Submitting...' : 'Submit Review'}
         </button>
       </form>
    </div>
  );
};

export default ProjectReview;
