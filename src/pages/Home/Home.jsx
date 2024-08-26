import Navbar from '../../components/Navbar/Navbar.jsx';
import NoteCard from '../../components/Cards/NoteCard.jsx';
import { MdAdd } from 'react-icons/md';
import AddEditNotes from './AddEditNotes.jsx';
import Modal from 'react-modal';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllNotes, getUserInfo } from '../../utils/requests.js';
import { appStore } from '../../store/appStore.js';
import { ToastContainer, Bounce, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

Modal.setAppElement('#root');

const Home = () => {
    const setIsShown = appStore((state) => state.setIsShown);
    const isShown = appStore((state) => state.isShown);
    const setTypeAddEdit = appStore((state) => state.setTypeAddEdit);
    const allNotes = appStore((state) => state.allNotes);
    const setAllNotes = appStore((state) => state.setAllNotes);

    const [userInfo, setUserInfo] = useState(null);

    const navigate = useNavigate();

    getUserInfo()
        .then((response) => {
            setUserInfo(response.data.user);
        })
        .catch((error) => {
            console.log(error);
            if (error.response.status === 401) {
                localStorage.clear();
                navigate('/login');
            }
        });

    useEffect(() => {
        getAllNotes()
            .then((response) => {
                console.log(response.data);
                setAllNotes(response.data.notes);
                toast.success(response.data.message);
            })
            .catch((err) => {
                console.log(err);
                toast.error('Internal server error!');
            });
    }, []);

    useEffect(() => {
        getUserInfo();
    }, []);

    return (
        <>
            <Navbar userInfo={userInfo} />
            <div className=' container mx-auto'>
                <div className='grid grid-cols-3 gap-4 mt-8'>
                    {allNotes ? (
                        allNotes.map((note, index) => {
                            return (
                                <NoteCard
                                    key={index}
                                    title={note.title}
                                    date={note.createdAt}
                                    content={note.content}
                                    tags={note.tags}
                                    isPinned={note.isPinned}
                                    onDelete={() => {}}
                                    onPinNote={() => {}}
                                    noteId={note._id}
                                />
                            );
                        })
                    ) : (
                        <div>Loading....</div>
                    )}
                </div>
            </div>
            <button
                className='w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 absolute right-10 bottom-10'
                onClick={() => {
                    setIsShown(true);
                    setTypeAddEdit('add');
                }}
            >
                <MdAdd className='text-[32px] text-white' />
            </button>
            <Modal
                isOpen={isShown}
                onRequestClose={() => {}}
                style={{
                    overlay: {
                        backgroundColor: 'rgba(0,0,0,0.2)',
                    },
                }}
                contentLabel=''
                className='w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-auto'
            >
                <AddEditNotes setAllNotes={setAllNotes} />
            </Modal>
            <ToastContainer
                position='bottom-right'
                autoClose={3500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme='light'
                transition={Bounce}
            />
        </>
    );
};

export default Home;
