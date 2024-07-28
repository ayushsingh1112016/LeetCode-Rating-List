import React, { useState, useEffect } from 'react';

const QuestionsList = ({ data }) => {
  const [questions, setQuestions] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');
  const [filterRange, setFilterRange] = useState({ min: 0, max: Infinity });
  const [filterIndex, setFilterIndex] = useState('');
  const [importantQuestions, setImportantQuestions] = useState({});
  const [solvedStatus, setSolvedStatus] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const questionsPerPage = 50;

  useEffect(() => {
    setQuestions(data);
  }, [data]);

  useEffect(() => {
    const savedImportantQuestions = JSON.parse(localStorage.getItem('importantQuestions')) || {};
    const savedSolvedStatus = JSON.parse(localStorage.getItem('solvedStatus')) || {};
    setImportantQuestions(savedImportantQuestions);
    setSolvedStatus(savedSolvedStatus);
  }, []);

  useEffect(() => {
    localStorage.setItem('importantQuestions', JSON.stringify(importantQuestions));
  }, [importantQuestions]);

  useEffect(() => {
    localStorage.setItem('solvedStatus', JSON.stringify(solvedStatus));
  }, [solvedStatus]);

  const sortQuestions = (order) => {
    const sorted = [...questions].sort((a, b) => 
      order === 'asc' ? a.Rating - b.Rating : b.Rating - a.Rating
    );
    setQuestions(sorted);
    setSortOrder(order);
  };

  const sortByIdDesc = () => {
    const sorted = [...questions].sort((a, b) => b.ID - a.ID);
    setQuestions(sorted);
  };

  const filterQuestions = () => {
    const { min, max } = filterRange;
    const filtered = data.filter(question => 
      question.Rating >= (min || 0) && 
      question.Rating <= (max || Infinity) &&
      question.ProblemIndex.includes(filterIndex)
    );
    setQuestions(filtered);
    setCurrentPage(1);
  };

  const handleMinChange = (e) => {
    const value = e.target.value ? parseFloat(e.target.value) : 0;
    setFilterRange(prevRange => ({ ...prevRange, min: value }));
  };

  const handleMaxChange = (e) => {
    const value = e.target.value ? parseFloat(e.target.value) : Infinity;
    setFilterRange(prevRange => ({ ...prevRange, max: value }));
  };

  const toggleImportant = (id) => {
    setImportantQuestions(prevState => ({
      ...prevState,
      [id]: !prevState[id]
    }));
  };

  const toggleSolvedStatus = (id) => {
    setSolvedStatus(prevState => ({
      ...prevState,
      [id]: !prevState[id]
    }));
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const indexOfLastQuestion = currentPage * questionsPerPage;
  const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
  const currentQuestions = questions.slice(indexOfFirstQuestion, indexOfLastQuestion);

  const totalPages = Math.ceil(questions.length / questionsPerPage);

  return (
    <div>
      <div>
        <button onClick={() => sortQuestions('asc')}>Sort Rating Min to Max</button>
        <button onClick={() => sortQuestions('desc')}>Sort Rating Max to Min</button>
        <button onClick={sortByIdDesc}>Default Sort</button>
      </div>
      <div>
        <input 
          type="number" 
          placeholder="Min Rating" 
          onChange={handleMinChange} 
        />
        <input 
          type="number" 
          placeholder="Max Rating" 
          onChange={handleMaxChange} 
        />
        <input 
          type="text" 
          placeholder="Filter by Q index" 
          onChange={(e) => setFilterIndex(e.target.value)} 
        />
        <button onClick={filterQuestions}>Filter</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Rating</th>
            <th>Question No</th>
            <th>Important</th>
            <th>Solved</th>
          </tr>
        </thead>
        <tbody>
          {currentQuestions.map(question => (
            <tr key={question.ID}>
              <td>{question.ID}</td>
              <td>
                <a href={`https://leetcode.com/problems/${question.TitleSlug}`} target="_blank" rel="noopener noreferrer">
                  {question.Title}
                </a>
              </td>
              <td>{question.Rating}</td>
              <td>{question.ProblemIndex}</td>
              <td className="center">
                <span
                  className={`star ${importantQuestions[question.ID] ? 'star-yellow' : ''}`}
                  onClick={() => toggleImportant(question.ID)}
                >
                  ★
                </span>
              </td>
              <td className="center">
                <input 
                  type="checkbox" 
                  className="checkbox-green"
                  checked={solvedStatus[question.ID] || false} 
                  onChange={() => toggleSolvedStatus(question.ID)} 
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            disabled={currentPage === index + 1}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionsList;
