import { getInitials } from '../../utils/helper.js';
import { appStore } from '../../store/appStore.js';
import { useNavigate } from 'react-router-dom';

const ProfileInfo = ({ userInfo }) => {

    const navigate = useNavigate();

    const setAllNotes = appStore(state => state.setAllNotes);

    return (
        <div className='flex items-center gap-3'>
            <div className='w-12 h-12 flex items-center justify-center rounded-full text-slate-950 font-medium bg-slate-100'>
                {getInitials(userInfo?.fullName || 'user')}
            </div>
            <div>
                <p className=' text-sm font-medium'>
                    {userInfo?.fullName || 'user'}
                </p>
                <button
                    className=' text-sm text-slate-700 underline'
                    onClick={() => {
                        localStorage.removeItem('token');
                        setAllNotes(null);
                        navigate('/login');
                    }}
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default ProfileInfo;
