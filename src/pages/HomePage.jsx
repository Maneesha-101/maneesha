import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  FaUserCircle,
  FaSignOutAlt,
  FaUserGraduate,
  FaBook,
  FaChalkboardTeacher
} from 'react-icons/fa';

function HomePage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="d-flex" style={{ height: '100vh' }}>
      {/* Sidebar */}
      <div
        className="bg-dark text-white d-flex flex-column justify-content-between"
        style={{ width: '220px', padding: '20px' }}
      >
        {/* Top Section */}
        <div>
          <div className="text-center mb-4">
            <FaUserCircle size={50} className="mb-2" />
            <h6>Maneesha</h6>
          </div>

          <ul className="nav flex-column">
            <li className="nav-item">
              <Link to="/home" className="nav-link text-white">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/home/student" className="nav-link text-white">
                Student
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/home/faculty" className="nav-link text-white">
                Faculty
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/home/books" className="nav-link text-white">
                Books
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/home/all-records" className="nav-link text-white">
                All Records
              </Link>
              
            </li>
          </ul>
        </div>

        {/* Bottom Logout Button */}
        <div>
          <button className="btn btn-danger w-100 mt-3" onClick={handleLogout}>
            <FaSignOutAlt className="me-2" /> Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mt-5">
        <h3 className="text-center mb-4">Welcome to School Dashboard</h3>
        <div className="row justify-content-center">
          <div className="col-md-3 mb-4">
            <div
              className="card text-center p-4 shadow"
              onClick={() => navigate('/home/student')}
              style={{ cursor: 'pointer' }}
            >
              <FaUserGraduate size={50} className="mb-2 text-primary" />
              <h5>Student</h5>
            </div>
          </div>
          <div className="col-md-3 mb-4">
            <div
              className="card text-center p-4 shadow"
              onClick={() => navigate('/home/faculty')}
              style={{ cursor: 'pointer' }}
            >
              <FaChalkboardTeacher size={50} className="mb-2 text-success" />
              <h5>Faculty</h5>
            </div>
          </div>
          <div className="col-md-3 mb-4">
            <div
              className="card text-center p-4 shadow"
              onClick={() => navigate('/home/books')}
              style={{ cursor: 'pointer' }}
            >
              <FaBook size={50} className="mb-2 text-warning" />
              <h5>Books</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
