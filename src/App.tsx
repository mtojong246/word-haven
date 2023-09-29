import './App.css';
import Navbar from './routes/Navbar';
import { Routes, Route } from 'react-router-dom';
import Home from './routes/Home';
import SearchResults from './routes/SearchResults';
import Login from './routes/Login';
import Register from './routes/Register';
import RegistrationSuccessful from './routes/RegistrationSuccessful';
import Unsubscribe from './routes/Unsubscribe';
import Dashboard from './routes/Dashboard';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Navbar />}>
        <Route index element={<Home />} />
        <Route path='search/:word' element={<SearchResults />} />
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
        <Route path='registration-successful' element={<RegistrationSuccessful />} />
        <Route path='unsubscribe/:email' element={<Unsubscribe />} />
        <Route path='dashboard/:username' element={<Dashboard />} />
      </Route>
    </Routes>
  );
}

export default App;
