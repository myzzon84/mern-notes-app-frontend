import { Link, useNavigate } from 'react-router-dom';
import ProfileInfo from '../Cards/ProfileInfo.jsx';
import SearchBar from '../SearchBar/SearchBar.jsx';
import { useState } from 'react';

const Navbar = ({userInfo}) => {
    const [searchQuery, setSearchQuery] = useState('');

    const navigate = useNavigate();

    const onLogout = () => {
        localStorage.clear();
        navigate('/login');
    };

    const handleSearch = () => {

    }

    const onClearSearch = () => {
        setSearchQuery('');
    }

    return (
        <div className=' bg-white flex items-center justify-between px-6 py-2 drop-shadow'>
            <h2 className='text-xl font-medium text-black py-2'>
                <Link to={'/dashboard'}>Notes</Link>
            </h2>

            <SearchBar
                value={searchQuery}
                onChange={(e) => {
                    setSearchQuery(e.target.value);
                }}
                handleSearch={handleSearch}
                onClearSearch={onClearSearch}
            />

            <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
        </div>
    );
};

export default Navbar;
