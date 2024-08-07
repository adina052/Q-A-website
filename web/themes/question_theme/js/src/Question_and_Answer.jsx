// src/components/Question_and_Answer.jsx
import React, { useEffect, useState } from 'react';
import './Question_and_Answer.css' 

const Question_and_Answer = () => {
  const [questions, setQuestions] = useState([]);
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState('1');
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch('https://question-and-answer-page.ddev.site:8051/jsonapi/node/question'); // for drupal
        // const response = await fetch('/jsonapi.json'); //for react
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        
        const data = await response.json();
        setQuestions(data.data);

      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    const fetchTopics = async () => {
      try {
        const response = await fetch('https://question-and-answer-page.ddev.site:8051/jsonapi/taxonomy_term/tags'); // for drupal
        // const response = await fetch('/jsonapi_tags.json'); // for react
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        
        const data = await response.json();

        const topics = data.data.reduce((acc, item) => {
          const tid = item.attributes.drupal_internal__tid;
          const name = item.attributes.name;
          acc[tid] = name;
          return acc;
        }, {});
        console.log(topics);
        setTopics(topics);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestions();
    fetchTopics();
  }, []);

  const handleTopicChange = (event) => {
    setSelectedTopic(event);
  };

  const handleExpandToggle = (id) => {
    setExpanded(expanded === id ? null : id);
  };

  
    
  const filteredQuestions =questions ? questions.filter(
    q => q.relationships.field_topic.data.meta.drupal_internal__target_id == selectedTopic) : [];

  return (
    <div className="container">
       <div className="tabs-container">
        {Object.keys(topics).map(topic => (
          <div>
            <button
            key={topic}
            className={`tab ${selectedTopic === topic ? 'active' : ''}`}
            onClick={() => handleTopicChange(topic)}
          >
            {topics[topic]}
          </button>
          </div>
          
        ))}
      </div>
      <div>
        {filteredQuestions
          .sort((a, b) => a.attributes.field_order - b.attributes.field_order)
          .map(question => (
            <div key={question.id} className="question-container">
              <h3 
                onClick={() => handleExpandToggle(question.id)} 
                style={{ cursor: 'pointer' }}
              >
                {question.attributes.title}
              </h3>
            
              {expanded === question.id && (
                <div className="answer-container">
                  <p dangerouslySetInnerHTML={{ __html: question.attributes.field_answer.value }} />
                </div>
              )}
            
            </div>
          ))}
      </div>
    </div>
  );
};

export default Question_and_Answer;
