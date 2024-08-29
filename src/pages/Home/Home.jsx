import Navbar from '../../components/Navbar/Navbar.jsx';
import NoteCard from '../../components/Cards/NoteCard.jsx';
import EmptyCard from '../../components/EmptyCard/EmptyCard.jsx';
import { MdAdd } from 'react-icons/md';
import AddEditNotes from './AddEditNotes.jsx';
import Modal from 'react-modal';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllNotes, getUserInfo } from '../../utils/requests.js';
import { appStore } from '../../store/appStore.js';
import { ToastContainer, Bounce, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import spinnerImage from '../../images/spinner.svg';

Modal.setAppElement('#root');

const Home = () => {
    const setIsShown = appStore((state) => state.setIsShown);
    const isShown = appStore((state) => state.isShown);
    const setTypeAddEdit = appStore((state) => state.setTypeAddEdit);
    const allNotes = appStore((state) => state.allNotes);
    const setAllNotes = appStore((state) => state.setAllNotes);
    const tagFilteredNotes = appStore((state) => state.tagFilteredNotes);
    const tagFilter = appStore((state) => state.tagFilter);
    const setTagFilter = appStore((state) => state.setTagFilter);
    const loading = appStore((state) => state.loading);
    const setLoading = appStore((state) => state.setLoading);

    const [userInfo, setUserInfo] = useState(null);
    const [notes, setNotes] = useState(null);

    const navigate = useNavigate();

    if (localStorage.getItem('token')) {
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
    }

    useEffect(() => {
        if (localStorage.getItem('token')) {
            setLoading(true);
            getAllNotes()
                .then((response) => {
                    console.log(response.data);
                    setAllNotes(response.data.notes);
                    setLoading(false);
                    if (response.data.notes.length > 0) {
                        toast.success(response.data.message);
                    } else {
                        toast.info('Notes not found. Create your first note.');
                    }
                })
                .catch((err) => {
                    console.log(err);
                    setLoading(false);
                    toast.error('Internal server error!');
                });
        }
    }, []);

    useEffect(() => {
        getUserInfo();
    }, []);

    useEffect(() => {
        if (tagFilter) {
            setNotes(tagFilteredNotes);
        }
    }, [tagFilter]);

    useEffect(() => {
        setNotes(allNotes);
    }, [allNotes]);

    return (
        <>
            <Navbar userInfo={userInfo} />
            <div className=' container mx-auto'>
                {notes?.length > 0 ? (
                    <div className='grid grid-cols-3 gap-4 mt-8'>
                        {notes ? (
                            notes.map((note, index) => {
                                return (
                                    <NoteCard
                                        key={index}
                                        title={note.title}
                                        date={note.createdAt}
                                        content={note.content}
                                        tags={note.tags}
                                        isPinned={note.isPinned}
                                        onPinNote={() => {}}
                                        noteId={note._id}
                                    />
                                );
                            })
                        ) : (
                            <div>Loading....</div>
                        )}
                    </div>
                ) : (
                    !loading && <EmptyCard />
                )}
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
                onRequestClose={() => {setIsShown(false)}}
                style={{
                    overlay: {
                        backgroundColor: 'rgba(0,0,0,0.2)',
                    },
                }}
                contentLabel=''
                className='w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-auto'
                shouldCloseOnOverlayClick={true}
            >
                <AddEditNotes />
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
            {tagFilter && (
                <div
                    className=' absolute top-[70px] right-[50px] cursor-pointer'
                    onClick={() => {
                        setTagFilter(false);
                        setNotes(allNotes);
                    }}
                >
                    Reset tag filter
                </div>
            )}
            {
                loading && (
                    <div className=' absolute top-0 left-0 w-full h-full flex justify-center items-center bg-[rgba(0,0,0,.6)]'>
                        <img src={spinnerImage} alt="spinner" />
                    </div>
                )
            }
        </>
    );
};

export default Home;
