import { useState } from 'react';
import TagInput from '../../components/input/TagInput';
import { MdClose } from 'react-icons/md';
import { useForm } from 'react-hook-form';
import InputErrorMessage from '../../components/InputErrorMessage.jsx';

const AddEditNotes = ({ noteData, type, onClose }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ mode: 'all' });

    const [tags, setTags] = useState([]);

    const handleAddEditNotes = (data) => {
        if (tags.length > 0) {
            data.tags = tags;
        }
        console.log(data);
        if(type === 'edit'){
            editNote();
        }else{
            addNewNote();
        }
    };

    const addNewNote = async () => {};
    const editNote = async () => {};

    return (
        <div className=' relative'>
            <button
                className='w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-50'
                onClick={onClose}
            >
                <MdClose className='text-xl text-slate-400' />
            </button>
            <form onSubmit={handleSubmit(handleAddEditNotes)}>
                <div className=' flex flex-col gap-2'>
                    <label className='input-label'>TITLE</label>
                    <input
                        type='text'
                        className='text-2xl text-slate-950 outline-none'
                        placeholder='Go To Gym At 5'
                        {...register('title', {
                            required: {
                                value: true,
                                message: 'Title - required field',
                            },
                            minLength: {
                                value: 3,
                                message:
                                    'The title must be 3 or more characters long.',
                            },
                        })}
                    />
                    {(errors.title?.type === 'required' && (
                        <InputErrorMessage
                            errorMessage={errors.title.message}
                        />
                    )) ||
                        (errors.title?.type === 'minLength' && (
                            <InputErrorMessage
                                errorMessage={errors.title.message}
                            />
                        ))}
                </div>
                <div className=' flex flex-col gap-2 mt-4'>
                    <label className='input-label'>CONTENT</label>
                    <textarea
                        className='text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded'
                        placeholder='Content'
                        rows={10}
                        {...register('content', {
                            required: {
                                value: true,
                                message: 'Content - required field',
                            },
                            minLength: {
                                value: 10,
                                message:
                                    'The content must be 10 or more characters long.',
                            },
                        })}
                    ></textarea>
                    {(errors.content?.type === 'required' && (
                        <InputErrorMessage
                            errorMessage={errors.content.message}
                        />
                    )) ||
                        (errors.content?.type === 'minLength' && (
                            <InputErrorMessage
                                errorMessage={errors.content.message}
                            />
                        ))}
                </div>
                <div className='mt-3'>
                    <label className='input-label'>TAGS</label>
                    <TagInput
                        tags={tags}
                        setTags={setTags}
                        register={register}
                    />
                </div>
                <button
                    type='submit'
                    className=' btn-primary font-medium mt-5 p-3'
                    onClick={() => {}}
                >
                    {/* ADD */}
                    {type === 'add' ? 'ADD' : 'SAVE'}
                </button>
            </form>
        </div>
    );
};

export default AddEditNotes;
