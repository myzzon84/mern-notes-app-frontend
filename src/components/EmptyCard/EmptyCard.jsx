import addNoteImage from '../../images/add-note-svgrepo-com.svg';
import notFoundImage from '../../images/not-found.jpg';
import { appStore } from '../../store/appStore.js';

const EmptyCard = () => {
    const activeSearch = appStore((state) => state.activeSearch);

    return (
        <div className='flex flex-col items-center justify-center mt-20'>
            <img
                src={activeSearch ? notFoundImage : addNoteImage}
                alt='No notes'
                className='w-60'
            />
            <p className='w-1/2 text-sm font-medium text-slate-700 text-center leading-7 mt-5'>
                {activeSearch
                    ? `Ooops! No notes found matching your search!`
                    : `Start creating your first note! Click the "Add" button to jot
                down your thoughts, ideas, and reminders. Let's get started!`}
            </p>
        </div>
    );
};

export default EmptyCard;
