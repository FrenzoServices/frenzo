import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { User, LogOut, LayoutDashboard, ChevronDown } from 'lucide-react';
import '../../styles/UserMenu.css'; // We'll create this CSS next

const UserMenu = () => {
  const { currentUser, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch {
      console.error("Failed to log out");
    }
  };

  if (!currentUser) {
    return (
      <Link to="/login" className="btn-primary">
        Login
      </Link>
    );
  }

  return (
    <div className="user-menu-container" ref={menuRef}>
      <button className="user-menu-btn" onClick={toggleMenu}>
        <div className="avatar">
          {currentUser.photoURL ? (
            <img src={currentUser.photoURL} alt="User" />
          ) : (
            <User size={20} />
          )}
        </div>
        <ChevronDown size={16} className={`chevron ${isOpen ? 'open' : ''}`} />
      </button>

      {isOpen && (
        <div className="user-dropdown">
          <div className="user-info">
             <p className="user-name">{currentUser.displayName || 'User'}</p>
             <p className="user-email">{currentUser.email}</p>
          </div>
          <div className="dropdown-divider"></div>
          <Link to="/dashboard" className="dropdown-item" onClick={() => setIsOpen(false)}>
            <LayoutDashboard size={16} />
            Dashboard
          </Link>
          <button onClick={handleLogout} className="dropdown-item logout-item">
            <LogOut size={16} />
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
