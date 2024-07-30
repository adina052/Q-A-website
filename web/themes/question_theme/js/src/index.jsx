
// import React from 'react';
// import ReactDOM from 'react-dom';

// const DrupalData = () => {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     fetch('https://question-and-answer-page.ddev.site:8051/jsonapi/node/article') // Adjust the URL as needed
//       .then((response) => response.json())
//       .then((data) => {
//         setData(data.data);
        
//       })
//       .catch((error) => console.error('Error fetching data:', error));
//   }, []);

//   return (
//     <div>
//       <h1>Drupal Data</h1>
//       <h3>{data.attributes.topic}</h3>
//       <ul>
//         {data.map((item) => (
//           <li key={item.id}>{item.attributes.title}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default DrupalData;

// ReactDOM.render(
//   <DrupalData></DrupalData>,
//   // <h1>Questions</h1>,
//   document.getElementById('react-app')
// );



// import React from 'react';
// import ReactDOM from 'react-dom';

// // # Example 1: Simple "Hello, World" code
// ReactDOM.render(
//   <h1>Hello there - world!</h1>,
//   document.getElementById('react-app')
// );


// src/index.jsx
import React from 'react';
import ReactDOM from 'react-dom';
// import App from './components/App'; // עדכן את הנתיב בהתאם למיקום הקובץ שלך
import App from './App'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('react-app')
);
