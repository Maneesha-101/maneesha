import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Toast } from 'react-bootstrap';

function LoginPage() {
  const navigate = useNavigate();

  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastVariant, setToastVariant] = useState('');

  // Dummy Users
  const dummyUsers = [
    { email: 'maneeshayenugula10@gmail.com', password: 'maneesha' },
    { email: 'googleuser@gmail.com', password: 'google123' },
  ];

  // Toast style with colored line
  const getToastStyle = () => {
    const base = {
      position: 'absolute',
      top: 20,
      right: 20,
      borderLeft: '5px solid',
      paddingLeft: '10px',
      minWidth: '250px',
    };
    switch (toastVariant) {
      case 'success':
        return { ...base, borderColor: 'green' };
      case 'danger':
        return { ...base, borderColor: 'red' };
      case 'warning':
        return { ...base, borderColor: 'orange' };
      default:
        return base;
    }
  };

  // Login Handler
  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setToastMessage('Please fill all fields');
      setToastVariant('warning');
      setShowToast(true);
      return;
    }

    const user = dummyUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      setToastMessage('Login Successful');
      setToastVariant('success');
      setShowToast(true);
      setTimeout(() => navigate('/dashboard'), 1000);
    } else {
      setToastMessage('Invalid email or password');
      setToastVariant('danger');
      setShowToast(true);
    }
  };

  // Google Sign-In
  const handleGoogleLogin = () => {
    setEmail('googleuser@gmail.com');
    setPassword('google123');
    setToastMessage('Google Sign-In successful');
    setToastVariant('success');
    setShowToast(true);
    setTimeout(() => navigate('/dashboard'), 1000);
  };

  // Signup Handler
  const handleSignup = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setToastMessage('Please fill all fields');
      setToastVariant('warning');
      setShowToast(true);
      return;
    }

    setToastMessage('Account created successfully (mock)');
    setToastVariant('success');
    setShowToast(true);
    setIsSignUp(false);
    setEmail('');
    setPassword('');
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Form
        onSubmit={isSignUp ? handleSignup : handleLogin}
        className="border p-4 shadow rounded bg-white"
        style={{ maxWidth: '400px', width: '100%' }}
      >
        <h3 className="text-center mb-4">
          {isSignUp ? 'Create Account' : 'Welcome to Schoolzoe'}
        </h3>

        <Form.Group controlId="email" className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="password" className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Button type="submit" variant="primary" className="w-100 mb-2">
          {isSignUp ? 'Create Account' : 'Login'}
        </Button>

        {!isSignUp && (
          <Button
            variant="danger"
            type="button"
            className="w-100 mb-2"
            onClick={handleGoogleLogin}
          >
            Sign in with Google
          </Button>
        )}

        <div className="text-center mt-3">
          {isSignUp ? (
            <>
              <span>Already have an account? </span>
              <span
                style={{ color: 'blue', cursor: 'pointer' }}
                onClick={() => {
                  setIsSignUp(false);
                }}
              >
                Login
              </span>
            </>
          ) : (
            <>
              <span>Don't have an account? </span>
              <span
                style={{ color: 'blue', cursor: 'pointer' }}
                onClick={() => {
                  setIsSignUp(true);
                }}
              >
                Create Account
              </span>
            </>
          )}
        </div>
      </Form>

      {/* Colored Toast */}
      <Toast
        show={showToast}
        onClose={() => setShowToast(false)}
        delay={2000}
        autohide
        style={getToastStyle()}
      >
        <Toast.Header closeButton={false}>
          <strong className="me-auto">
            {toastVariant === 'success'
              ? '✅ Success'
              : toastVariant === 'danger'
              ? '❌ Error'
              : '⚠️ Warning'}
          </strong>
        </Toast.Header>
        <Toast.Body>{toastMessage}</Toast.Body>
      </Toast>
    </Container>
  );
}

export default LoginPage;
