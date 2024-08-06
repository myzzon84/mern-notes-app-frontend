import Home from './pages/Home/Home.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login/Login.jsx';
import SignUp from './pages/SignUp/SignUp.jsx';

function App() {
    return (
        <BrowserRouter>
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
        </BrowserRouter>
    );
}

export default App;
