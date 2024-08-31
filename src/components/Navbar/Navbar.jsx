import { Link } from 'react-router-dom';
import ProfileInfo from '../Cards/ProfileInfo.jsx';
import SearchBar from '../SearchBar/SearchBar.jsx';

const Navbar = ({userInfo}) => {

    return (
        <div className=' bg-white flex items-center justify-between px-6 py-2 drop-shadow'>
            <h2 className='text-xl font-medium text-black py-2'>
                <Link to={'/dashboard'}>Notes</Link>
            </h2>

            <SearchBar/>

            <ProfileInfo userInfo={userInfo} />
        </div>
    );
};

export default Navbar;
