import logo from './logo.svg';
import './App.css';
import MainPages from './components/mainpages/Pages'
import {useState, useEffect} from 'react';
import Home from './pages/home/index';
import Header from './components/headers/Header';
import {DataProvider} from './GlobalState'
import {BrowserRouter as Router} from 'react-router-dom'
function App() {



  return (


    <DataProvider>
    <Router>
      <div className="App">
        app here
       <Header />
        <MainPages /> 
      </div>
    </Router>
  </DataProvider>







//     <div className="App">
      








// <div>

// <Home/>

// </div>





//     </div>
  );
}

export default App;
