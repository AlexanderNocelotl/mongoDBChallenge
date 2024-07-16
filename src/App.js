import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProfileForm from './components/ProfileForm';
import ProfileList from './components/ProfileList';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<ProfileForm />} />
          <Route path="/profiles" element={<ProfileList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
