// src/components/FAQ.jsx
import React, { useEffect, useState } from 'react';

const FAQ = () => {
  const [questions, setQuestions] = useState([]);
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState('all');
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch('https://question-and-answer-page.ddev.site:8051/jsonapi/node/question');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setQuestions(data.data);

        // Extract topics from the fetched data
        const topics = [...new Set(data.data.flatMap(q => q.relationships.field_topic.data.map(t => t.name)))];
        setTopics(topics);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestions();
  }, []);

  const handleTopicChange = (event) => {
    setSelectedTopic(event.target.value);
  };

  const handleExpandToggle = (id) => {
    setExpanded(expanded === id ? null : id);
  };

  const filteredQuestions = selectedTopic === 'all'
    ? questions
    : questions.filter(q => q.relationships.field_topic.data.some(t => t.name === selectedTopic));

  return (
    <div>
      <div>
        <label htmlFor="topic-filter">Filter by Topic:</label>
        <select id="topic-filter" onChange={handleTopicChange}>
          <option value="all">All Topics</option>
          {topics.map(topic => (
            <option key={topic} value={topic}>{topic}</option>
          ))}
        </select>
      </div>
      <div>
        {filteredQuestions
          .sort((a, b) => a.attributes.field_order - b.attributes.field_order)
          .map(question => (
            <div key={question.id}>
              <h3 
                onClick={() => handleExpandToggle(question.id)} 
                style={{ cursor: 'pointer' }}
              >
                {question.attributes.title}
              </h3>
              {expanded === question.id && <p>{question.attributes.body}</p>}
            </div>
          ))}
      </div>
    </div>
  );
};

export default FAQ;
