import React from 'react';
import QuestionsList from './QuestionsList';
import data from './data.json';

function App() {
  return (
    <div className="App">
      <h1>LeetCode Contest Questions</h1>
      <QuestionsList data={data} />
    </div>
  );
}

export default App;
