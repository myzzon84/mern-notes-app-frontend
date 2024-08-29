import Home from './pages/Home/Home.jsx';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login/Login.jsx';
import SignUp from './pages/SignUp/SignUp.jsx';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function App() {
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/login');
        }
    }, []);

    return (
        <Routes>
            <Route
                path='dashboard'
                element={<Home />}
            />
            <Route
                path='login'
                element={<Login />}
            />
            <Route
                path='signup'
                element={<SignUp />}
            />
        </Routes>
    );
}

export default App;
