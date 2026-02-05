import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { RecaptchaVerifier } from 'firebase/auth';
import { auth } from '../lib/firebase';
import '../features/auth/styles/AuthForm.css';

const Login = () => {
  const [loginMethod, setLoginMethod] = useState('email'); // 'email' or 'phone'
  
  // Email State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Phone State
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [otpSent, setOtpSent] = useState(false);

  // Common State
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login, loginWithGoogle, loginWithPhone, verifyPhoneCode } = useAuth();
  const navigate = useNavigate();

  // Initialize Recaptcha
  useEffect(() => {
    if (loginMethod === 'phone' && !window.recaptchaVerifier) {
      // Ensure element exists before initializing
      const recaptchaContainer = document.getElementById('recaptcha-container');
      if (recaptchaContainer) {
          try {
              window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
                'size': 'invisible',
                'callback': (response) => {
                  // reCAPTCHA solved, allow signInWithPhoneNumber.
                  // onSignInSubmit(); 
                  console.log("Recaptcha verified");
                }
              });
          } catch (err) {
              console.error("Recaptcha initialization error:", err);
          }
      }
    }
  }, [loginMethod]);

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!phoneNumber) {
        setError("Please enter a phone number");
        setLoading(false);
        return;
    }

    try {
      const appVerifier = window.recaptchaVerifier;
      const result = await loginWithPhone(phoneNumber, appVerifier);
      setConfirmationResult(result);
      setOtpSent(true);
    } catch (err) {
      console.error(err);
      setError("Failed to send SMS: " + err.message);
      // Reset recaptcha if error
      if (window.recaptchaVerifier) {
          // window.recaptchaVerifier.render().then(widgetId => window.grecaptcha.reset(widgetId));
          // Simplified reset
          window.location.reload(); 
      }
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!otp) {
        setError("Please enter the verification code");
        setLoading(false);
        return;
    }

    try {
      await verifyPhoneCode(confirmationResult, otp);
      navigate('/dashboard');
    } catch (err) {
      setError("Invalid code: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    setLoading(true);
    try {
      await loginWithGoogle();
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Welcome Back</h2>
          <p>Login to manage your account</p>
        </div>

        {error && <div className="auth-error">{error}</div>}

        {/* Login Method Toggle */}
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '0.5rem' }}>
            <button 
                type="button" 
                onClick={() => setLoginMethod('email')}
                style={{ 
                    color: loginMethod === 'email' ? 'var(--accent-primary)' : 'var(--text-tertiary)',
                    fontWeight: loginMethod === 'email' ? '600' : '400',
                    borderBottom: loginMethod === 'email' ? '2px solid var(--accent-primary)' : 'none',
                    paddingBottom: '0.5rem'
                }}
            >
                Email
            </button>
            <button 
                type="button" 
                onClick={() => setLoginMethod('phone')}
                style={{ 
                    color: loginMethod === 'phone' ? 'var(--accent-primary)' : 'var(--text-tertiary)',
                    fontWeight: loginMethod === 'phone' ? '600' : '400',
                    borderBottom: loginMethod === 'phone' ? '2px solid var(--accent-primary)' : 'none',
                    paddingBottom: '0.5rem'
                }}
            >
                Phone
            </button>
        </div>

        {loginMethod === 'email' ? (
            /* EMAIL FORM */
            <form onSubmit={handleEmailLogin} className="auth-form">
            <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                type="email"
                id="email"
                className="form-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                />
            </div>

            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                type="password"
                id="password"
                className="form-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                />
            </div>

            <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
            </button>
            </form>
        ) : (
            /* PHONE FORM */
            <div className="auth-form">
                {!otpSent ? (
                    <form onSubmit={handleSendOtp} className="auth-form">
                        <div className="form-group">
                            <label htmlFor="phone">Phone Number</label>
                            <input
                            type="tel"
                            id="phone"
                            className="form-input"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            placeholder="+1 555 555 5555"
                            required
                            />
                            <small style={{ color: 'var(--text-tertiary)', fontSize: '0.8rem' }}>Format: +[CountryCode][Number]</small>
                        </div>
                        
                        {/* Hidden Recaptcha */}
                        <div id="recaptcha-container"></div>

                        <button type="submit" className="submit-btn" disabled={loading}>
                            {loading ? 'Sending SMS...' : 'Send Code'}
                        </button>
                    </form>
                ) : (
                    <form onSubmit={handleVerifyOtp} className="auth-form">
                        <div className="form-group">
                            <label htmlFor="otp">Verification Code</label>
                            <input
                            type="text"
                            id="otp"
                            className="form-input"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            placeholder="123456"
                            required
                            />
                        </div>

                        <button type="submit" className="submit-btn" disabled={loading}>
                            {loading ? 'Verifying...' : 'Verify & Login'}
                        </button>
                        
                        <button 
                            type="button" 
                            onClick={() => setOtpSent(false)} 
                            className="google-btn" 
                            style={{ marginTop: '0.5rem', fontSize: '0.9rem' }}
                        >
                            Change Number
                        </button>
                    </form>
                )}
            </div>
        )}

        <div className="auth-divider">
          <span>OR</span>
        </div>

        <button onClick={handleGoogleSignIn} className="google-btn" disabled={loading}>
          <svg className="w-5 h-5" viewBox="0 0 24 24" width="20" height="20">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          Continue with Google
        </button>

        <div className="auth-footer">
          Don't have an account? 
          <Link to="/register" className="auth-link">Sign Up</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
