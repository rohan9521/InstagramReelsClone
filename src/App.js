import './App.css';
import SignUp from './components/signUp/SignUp.js';
import Login from './components/login/Login.js';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './components/context/AuthProvider';
import Feed from './components/feed/Feed';
import PrivateRoute from './components/privateRoute/PrivateRoute';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider >
        <Routes>
          <Route path='/' element={
            <PrivateRoute>
              <Feed/>
            </PrivateRoute>
          } />
          <Route path='/login' Component={Login} />
          <Route path='/signup' Component={SignUp} />
        </Routes >
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
