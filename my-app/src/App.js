import logo from './logo.svg';
import './App.css';
import {Button} from "antd";
import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';
import Home from './pages/home';
import Register from './pages/register';
import Login from './pages/login';

function App() {
  return (
    <div className="App">
      
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<ProtectedRoute><Home/></ProtectedRoute>}/>
            <Route path='/register' element={<NotProtectedRoute><Register/></NotProtectedRoute>}/>
            <Route path='/login' element={<NotProtectedRoute><Login/></NotProtectedRoute>}/>
          </Routes>
        </BrowserRouter>

    </div>
  );
}

function ProtectedRoute(props){
  if(localStorage.getItem("expenseTracker-user")){
    return props.children;
  }
  else return <Navigate to='/login'/>;
}

function NotProtectedRoute(props){
  if(localStorage.getItem("expenseTracker-user")){
    return <Navigate to='/'/>
  }
  else return props.children;
}


export default App;
