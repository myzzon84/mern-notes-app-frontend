import { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';

const PasswordInput = ({ register, placeholder }) => {
    const [isShowPassword, setIsShowPassword] = useState(false);
    const toggleShowPassword = () => {
        setIsShowPassword(!isShowPassword);
    };
    return (
        <div className=' flex items-center bg-transparent border-[1.5px] px-5 rounded mb-3'>
            <input
                {...register('password', {
                    required: {
                        value: true,
                        message: 'Please enter password',
                    },
                    minLength: {
                        value: 6,
                        message: 'Password must be at least 6 characters'
                    }
                })}
                type={isShowPassword ? 'text' : 'password'}
                placeholder={placeholder || 'Password'}
                className=' w-full text-sm bg-transparent py-3 mr-3 rounded outline-none'
            />
            {isShowPassword ? (
                <FaRegEye
                    size={22}
                    className=' text-primary cursor-pointer'
                    onClick={() => toggleShowPassword()}
                />
            ) : (
                <FaRegEyeSlash
                    size={22}
                    className='text-slate-400 cursor-pointer'
                    onClick={() => toggleShowPassword()}
                />
            )}
        </div>
    );
};

export default PasswordInput;
