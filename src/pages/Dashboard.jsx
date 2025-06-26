import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Page Components
import HomePage from './HomePage';
import StudentPage from './StudentPage';
import FacultyPage from './FacultyPage';
import BooksPage from './BooksPage';
import AllRecordsPage from './AllRecordsPage';
import LuckyDrawPage from './LuckyDrawPage';

function Dashboard() {
  const [currentPage, setCurrentPage] = useState('home'); // Default to Home
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'students':
        return <StudentPage />;
      case 'faculty':
        return <FacultyPage />;
      case 'books':
        return <BooksPage />;
      case 'records':
        return <AllRecordsPage />;
      case 'lucky':
        return <LuckyDrawPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="d-flex" style={{ height: '100vh' }}>
      {/* Sidebar */}
      <div
        className="bg-dark text-white d-flex flex-column justify-content-between p-3"
        style={{ width: '220px' }}
      >
        <div>
          <h4 className="text-center mb-4">Schoolzoe</h4>
          <ul className="nav flex-column">
            <li className="nav-item">
              <button
                className="btn btn-link text-white text-start"
                onClick={() => setCurrentPage('home')}
              >
                🏠 Home
              </button>
            </li>
            <li className="nav-item">
              <button
                className="btn btn-link text-white text-start"
                onClick={() => setCurrentPage('students')}
              >
                🎓 Students
              </button>
            </li>
            <li className="nav-item">
              <button
                className="btn btn-link text-white text-start"
                onClick={() => setCurrentPage('faculty')}
              >
                👨‍🏫 Faculty
              </button>
            </li>
            <li className="nav-item">
              <button
                className="btn btn-link text-white text-start"
                onClick={() => setCurrentPage('books')}
              >
                📚 Books
              </button>
            </li>
            <li className="nav-item">
              <button
                className="btn btn-link text-white text-start"
                onClick={() => setCurrentPage('lucky')}
              >
                🎲 Lucky Draw
              </button>
            </li>
            <li className="nav-item">
              <button
                className="btn btn-link text-white text-start"
                onClick={() => setCurrentPage('records')}
              >
                📋 All Records
              </button>
            </li>
          </ul>
        </div>

        {/* Logout Button */}
        <div>
          <button className="btn btn-danger w-100 mt-3" onClick={handleLogout}>
            🔓 Logout
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-grow-1 p-4 bg-light" style={{ overflowY: 'auto' }}>
        {renderPage()}
      </div>
    </div>
  );
}

export default Dashboard;
