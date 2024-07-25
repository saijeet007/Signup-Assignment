import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import SignupForm from './components/SignupForm';
import ProfileDisplay from './components/ProfileDisplay';
import LoginForm from './components/LoginForm';

const App: React.FC = () => {
  
  return (
    <Router>
    <Routes>
      <Route path="/" element={<SignupForm />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/profiles" element={<ProfileDisplay />} />
    </Routes>
  </Router>
  );
};

export default App;
