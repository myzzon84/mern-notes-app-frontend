import { FaMagnifyingGlass } from 'react-icons/fa6';
import { IoMdClose } from 'react-icons/io';
import { appStore } from '../../store/appStore.js';
import { searchNotes, getAllNotes } from '../../utils/requests.js';
import { useEffect, useState } from 'react';

const SearchBar = () => {

    const [searchValue, setSearchValue] = useState('');

    const setAllNotes = appStore((state) => state.setAllNotes);
    const setActiveSearch = appStore((state) => state.setActiveSearch);
    const setLoading = appStore((state) => state.setLoading);

    const onSearchNotes = () => {
        setLoading(true);
        searchNotes(searchValue)
            .then((response) => {
                setActiveSearch(true);
                return response;
            })
            .then((response) => {
                setLoading(false);
                setAllNotes(response.data.notes);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    };

    useEffect(() => {
        if (!searchValue && localStorage.getItem('token')) {
            setLoading(true);
            getAllNotes()
                .then((response) => {
                    setAllNotes(response.data.notes);
                    setLoading(false);
                })
                .catch((error) => {
                    console.log(error);
                    setLoading(false);
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
                        setActiveSearch(false);
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
