import React from 'react';
import QuestionsList from './QuestionsList';
import data from './data.json';

const App = () => {
  return (
    <div>
      <header style={headerStyle}>
        <h1>LeetCode Questions</h1>
        <div style={socialLinksStyle}>
          <a href="https://x.com/Ayushx081" target="_blank" rel="noopener noreferrer" style={linkStyle}>X</a>
          <a href="https://www.linkedin.com/in/ayush-singh-083694248/" target="_blank" rel="noopener noreferrer" style={linkStyle}>LinkedIn</a>
          <a href="https://github.com/ayushsingh1112016" target="_blank" rel="noopener noreferrer" style={linkStyle}>GitHub</a>
        </div>
      </header>
      <QuestionsList data={data} />
    </div>
  );
};

const headerStyle = {
  textAlign: 'center',
  padding: '20px',
  backgroundColor: '#1e90ff', 
  color: '#ffffff', 
};

const socialLinksStyle = {
  display: 'flex',
  justifyContent: 'center',
  gap: '15px',
};

const linkStyle = {
  color: '#ffffff',
  textDecoration: 'none',
  fontSize: '1.2em',
};

export default App;
