import { useEffect, useState } from 'react';
import './App.css';

function App() {
  
  //const [data, setData] = useState(null); // to store data
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // set to false once data is received
  const [count, setCount] = useState(0); // timer will increment coutn every second
  
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
    .then((response) => response.json())
    .then((data) => {
      //setData(data);
      //setLoading(false);
      console.log('Fetched data:', data);
      if (Array.isArray(data)) {
        setData(data);
      } else {
        throw new Error('Data format is incorrect');
      }
      setLoading(false);
    })
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevCount) => prevCount + 1)
    }, 1000);

    return clearInterval(interval);
  }, []);

  return (
    <div className="App">
      <h2>Side-Effect Example</h2>
      {loading ? (<p>Loading data</p>) : (
        /*<div>
          <h2>Data Fetched from API</h2>
          <p>Title : {data.title}</p>
          <p>Body : {data.body}</p>
        </div>*/
        <div>
          <h2>Data Fetched from API:</h2>
          <ul>
            {data.slice(0, 10).map((post) => (
              <li key={post.id}>
                <h3>{post.title}</h3>
                <p>{post.body}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
      <h2>Timer Count : {count}</h2>
    </div>
  );
}

export default App;
