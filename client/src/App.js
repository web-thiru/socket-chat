import { useState, useEffect } from 'react';
import './App.css';
import Login from './Login';



function App() {
  const [data, setData] = useState([]);
  useEffect(() => {
    // if (localStorage.getItem('data')) {
    //   setData(JSON.parse(localStorage.getItem('data')))
    // }
    // else {
      // fetch('http://localhost:5000/')
      //   .then((res) => {
      //     return res.json()
      //   })
      //   .then((dat) => {
      //     localStorage.setItem('data', JSON.stringify(dat))
      //     setData(JSON.parse(localStorage.getItem('data')))
      //   })
    // }

  }, [])

  const clearLocalStorage = () => {
    localStorage.clear();
    setData([]);
  }

  return (
    <div className="App">
      {/* {
        data.map((dat) => (
          <p>{dat.name + "," + dat.age}</p>
        ))
      }
      <button onClick={() => clearLocalStorage()}>Clear</button> */}
      <Login/>
    </div>
  );
}

export default App;

