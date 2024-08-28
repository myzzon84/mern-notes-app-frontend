import { FaMagnifyingGlass } from 'react-icons/fa6';
import { IoMdClose } from 'react-icons/io';
import { appStore } from '../../store/appStore.js';
import { searchNotes, getAllNotes } from '../../utils/requests.js';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const SearchBar = () => {

    const [searchValue, setSearchValue] = useState('');

    const setAllNotes = appStore((state) => state.setAllNotes);

    const onSearchNotes = () => {
        searchNotes(searchValue)
            .then((response) => {
                if (response.data.notes.length === 0) {
                    toast.error('Notes not found');
                } else {
                    setAllNotes(response.data.notes);
                }
            })
            .catch((error) => console.log(error));
    };

    useEffect(() => {
        if (!searchValue) {
            getAllNotes()
                .then((response) => {
                    setAllNotes(response.data.notes);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [searchValue]);

    return (
        <div className={` w-80 flex items-center px-4 bg-slate-100 rounded-md`}>
            <input
                type='text'
                placeholder='Search Notes'
                className=' w-full text-xs bg-transparent py-[11px] outline-none'
                value={searchValue}
                onChange={(e) => {
                    setSearchValue(e.target.value);
                }}
            />

            {searchValue && (
                <IoMdClose
                    className={`text-xl text-slate-500 cursor-pointer hover:text-black mr-3`}
                    onClick={() => {
                        setSearchValue('');
                    }}
                />
            )}

            <FaMagnifyingGlass
                className=' text-slate-400 cursor-pointer hover:text-black'
                onClick={onSearchNotes}
            />
        </div>
    );
};

export default SearchBar;
