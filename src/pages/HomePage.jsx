import React from 'react';
import { Container } from 'react-bootstrap';
import '../App.css';
function HomePage() {
  return (
    <Container className="d-flex flex-column align-items-center justify-content-center vh-100">
      {/* Scrolling Text */}
      <marquee behavior="scroll" direction="left" scrollamount="6" className="mb-4 fs-4 text-primary">
        🏫 Welcome to Schoolzoe
      </marquee>

      {/* School Image */}
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUh3s7DAoOPAqNz8cdEo4wOZp2EPu9Ufqe9w&s"
        alt="School Logo"
        className="mb-4 rounded shadow"
        style={{ width: '500px', height: 'auto' }}
      />

      {/* School Name */}
      <h2 className="text-primary text-center">Schoolzoe International School</h2>

      {/* Address */}
      <p className="text-muted text-center fs-5 mt-2">
        📍 123 Main Street, Hyderabad, Telangana, India - 500001
      </p>
    </Container>
  );
}

export default HomePage;
