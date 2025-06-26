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

  const dummyUsers = [
    { email: 'maneeshayenugula10@gmail.com', password: 'maneesha' },
    { email: 'googleuser@gmail.com', password: 'google123' },
  ];

  const getToastStyle = () => {
    const base = {
      position: 'fixed',
      top: 20,
      right: 20,
      borderLeft: '5px solid',
      paddingLeft: '10px',
      zIndex: 9999,
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

  const showToastMsg = (message, variant) => {
    setToastMessage(message);
    setToastVariant(variant);
    setShowToast(true);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      showToastMsg('Please fill in all fields', 'warning');
      return;
    }

    const user = dummyUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      showToastMsg('Login successful!', 'success');
      setTimeout(() => navigate('/home'), 1000);
    } else {
      showToastMsg('Invalid email or password', 'danger');
    }
  };

  const handleGoogleLogin = () => {
    setEmail('googleuser@gmail.com');
    setPassword('google123');
    showToastMsg('Google sign-in successful!', 'success');
    setTimeout(() => navigate('/home'), 1000);
  };

  const handleSignup = (e) => {
    e.preventDefault();

    if (!email || !password) {
      showToastMsg('Please fill in all fields', 'warning');
      return;
    }

    showToastMsg('Account created successfully (mock)', 'success');
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
        <h3 className="text-center mb-4 text-primary">
          {isSignUp ? 'Create Account' : 'Welcome to Schoolzoe'}
        </h3>

        <Form.Group controlId="email" className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="password" className="mb-4">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Button type="submit" variant="primary" className="w-100 mb-2">
          {isSignUp ? 'Sign Up' : 'Login'}
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
                onClick={() => setIsSignUp(false)}
              >
                Login
              </span>
            </>
          ) : (
            <>
              <span>Don't have an account? </span>
              <span
                style={{ color: 'blue', cursor: 'pointer' }}
                onClick={() => setIsSignUp(true)}
              >
                Create Account
              </span>
            </>
          )}
        </div>
      </Form>

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
