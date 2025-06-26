import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import StudentPage from './pages/StudentPage';
import FacultyPage from './pages/FacultyPage';
import BooksPage from './pages/BooksPage';
import AllRecordsPage from './pages/AllRecordsPage';
import LuckyDrawPage from './pages/LuckyDrawPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        
        <Route path="/home" element={<Dashboard />}>
          <Route path="students" element={<StudentPage />} />
          <Route path="faculty" element={<FacultyPage />} />
          <Route path="books" element={<BooksPage />} />
          <Route path="lucky-draw" element={<LuckyDrawPage />} />
          <Route path="all-records" element={<AllRecordsPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
