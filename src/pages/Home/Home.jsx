import Navbar from '../../components/Navbar/Navbar.jsx';
import NoteCard from '../../components/Cards/NoteCard.jsx';
import { MdAdd } from 'react-icons/md';
import AddEditNotes from './AddEditNotes.jsx';
import Modal from 'react-modal';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllNotes, getUserInfo } from '../../utils/requests.js';

Modal.setAppElement('#root');

const Home = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [allNotes, setAllNotes] = useState(null);

    const navigate = useNavigate();

    const [openAddEditModal, setOpenAddEditModal] = useState({
        isShown: false,
        type: 'add',
        data: null,
    });

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
        getAllNotes().then((response) => {
            console.log(response.data.notes);
            setAllNotes(response.data.notes);
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
                                    date={new Date(
                                        note.createdAt
                                    ).toLocaleDateString('uk', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                        hour:'numeric',
                                        minute:'numeric'
                                    })}
                                    content={note.content}
                                    tags={note.tags}
                                    isPinned={true}
                                    onEdit={() => {
                                        setOpenAddEditModal({
                                            isShown: true,
                                            type: 'edit',
                                            data: null,
                                        });
                                    }}
                                    onDelete={() => {}}
                                    onPinNote={() => {}}
                                />
                            );
                        })
                    ) : (
                        <div>Loading....</div>
                    )}
                    {/* <NoteCard
                        title={'Meeting on 7th April'}
                        date={'3rd Apr 2024'}
                        content={'Meeting on 7th April'}
                        tags={'#Meeting'}
                        isPinned={true}
                        onEdit={() => {
                            setOpenAddEditModal({
                                isShown: true,
                                type: 'edit',
                                data: null,
                            });
                        }}
                        onDelete={() => {}}
                        onPinNote={() => {}}
                    /> */}
                </div>
            </div>
            <button
                className='w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 absolute right-10 bottom-10'
                onClick={() => {
                    setOpenAddEditModal({
                        isShown: true,
                        type: 'add',
                        data: null,
                    });
                }}
            >
                <MdAdd className='text-[32px] text-white' />
            </button>
            <Modal
                isOpen={openAddEditModal.isShown}
                onRequestClose={() => {}}
                style={{
                    overlay: {
                        backgroundColor: 'rgba(0,0,0,0.2)',
                    },
                }}
                contentLabel=''
                className='w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-auto'
            >
                <AddEditNotes
                    onClose={() => {
                        setOpenAddEditModal({
                            isShown: false,
                            type: 'add',
                            data: null,
                        });
                    }}
                    type={openAddEditModal.type}
                    noteData={openAddEditModal.data}
                />
            </Modal>
        </>
    );
};

export default Home;
