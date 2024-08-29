import { MdOutlinePushPin, MdCreate, MdDelete } from 'react-icons/md';
import moment from 'moment';
import { appStore } from '../../store/appStore.js';
import { deleteNote, getAllNotes } from '../../utils/requests.js';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';

const NoteCard = ({
    title,
    date,
    content,
    tags,
    isPinned,
    onPinNote,
    noteId,
}) => {
    const setIdEditNote = appStore((state) => state.setIdEditNote);
    const setIsShown = appStore((state) => state.setIsShown);
    const setTypeAddEdit = appStore((state) => state.setTypeAddEdit);
    const allNotes = appStore((state) => state.allNotes);
    const setAllNotes = appStore((state) => state.setAllNotes);
    const setTagFilteredNotes = appStore((state) => state.setTagFilteredNotes);
    const setTagFilter = appStore((state) => state.setTagFilter);

    const [selectedTag, setSelectedTag] = useState('');

    const filterOnTag = () => {
        let filteredNotes = allNotes.filter((note, i) => {
            let temp = false;
            note.tags.forEach((tag) => {
                if (tag === selectedTag) {
                    temp = true;
                }
            });
            return temp === true;
        });
        setTagFilteredNotes(filteredNotes);
        setTagFilter(true);
    };

    const formatMyTags = () => {
        let myTags;
        if (Array.isArray(tags) && tags.length > 0) {
            myTags = tags.map((tag, i) => {
                return (
                    <span
                        className=' cursor-pointer hover:font-bold'
                        key={i}
                        onClick={() => {
                            console.log(tag);
                            setSelectedTag(tag);
                        }}
                    >
                        {`#${tag} `}
                    </span>
                );
            });
        }
        return myTags;
    };

    useEffect(() => {
        if (selectedTag) {
            filterOnTag();
        }
    }, [selectedTag]);

    return (
        <div className=' border rounded p-4 bg-white hover:shadow-xl transition-all ease-in-out overflow-hidden'>
            <div className='flex items-center justify-between'>
                <div>
                    <h6 className=' text-sm font-medium'>{title}</h6>
                    <span className=' text-xs text-slate-500'>
                        {moment(date).format('Do MMM YYYY')}
                    </span>
                </div>
                <MdOutlinePushPin
                    className={`icon-btn ${
                        isPinned ? 'text-primary' : 'text-slate-300'
                    }`}
                    onClick={onPinNote}
                />
            </div>
            <p className='text-xs text-slate-600 mt-2'>
                {content?.slice(0, 60)}
            </p>
            <div className='flex items-center justify-between mt-2'>
                <div className=' text-xs text-slate-500'>{formatMyTags()}</div>
                <div className=' flex items-center gap-2'>
                    <MdCreate
                        className=' icon-btn hover:text-green-600'
                        onClick={() => {
                            setIsShown(true);
                            setTypeAddEdit('edit');
                            let editedNote;
                            editedNote = allNotes.filter((note) => {
                                return note._id === noteId;
                            });
                            setIdEditNote(editedNote[0]);
                        }}
                    />
                    <MdDelete
                        className='icon-btn hover:text-red-500'
                        onClick={() => {
                            deleteNote(noteId)
                                .then((response) => {
                                    getAllNotes()
                                        .then((response) => {
                                            setAllNotes(response.data.notes);
                                        })
                                        .catch((err) => console.log(err));
                                    return response;
                                })
                                .then((response) => {
                                    toast.success(response.data.message);
                                })
                                .catch((err) => console.log(err));
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default NoteCard;
