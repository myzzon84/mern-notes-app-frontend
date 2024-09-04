import Navbar from '../../components/Navbar/Navbar.jsx';
import { useForm } from 'react-hook-form';
import PasswordInput from '../../components/input/PasswordInput.jsx';
import InputErrorMessage from '../../components/InputErrorMessage.jsx';
import { Link } from 'react-router-dom';
import { registration } from '../../utils/requests.js';
import { useNavigate } from 'react-router-dom';
import { appStore } from '../../store/appStore.js';

const SignUp = () => {
    const setLoading = appStore((state) => state.setLoading);

    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ mode: 'all' });

    const handleSignUp = (data) => {
        console.log(data);
        setLoading(true);
        registration(data)
            .then((response) => {
                localStorage.setItem('token', response.data.accessToken);
                setLoading(false)
            })
            .then(() => navigate('/dashboard'))
            .catch((err) => {console.log(err); setLoading(false)});
    };

    return (
        <>
            <Navbar />
            <div className='flex items-center justify-center mt-28'>
                <div className='w-96 border rounded bg-white px-7 py-10'>
                    <form onSubmit={handleSubmit(handleSignUp)}>
                        <h4 className=' text-2xl mb-7'>Sign Up</h4>
                        <input
                            type='text'
                            placeholder='Name'
                            className=' input-box'
                            {...register('fullName', {
                                required: {
                                    value: true,
                                    message: 'Please enter your name',
                                },
                                minLength: {
                                    value: 4,
                                    message:
                                        'Name must be at least 4 characters',
                                },
                            })}
                        />
                        <input
                            type='text'
                            placeholder='Email'
                            className=' input-box'
                            {...register('email', {
                                required: {
                                    value: true,
                                    message: 'Please enter email',
                                },
                                pattern: {
                                    value: /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gim,
                                    message: 'Please enter valid email!',
                                },
                            })}
                        />
                        <PasswordInput register={register} />
                        {(errors.fullName?.type === 'required' && (
                            <InputErrorMessage
                                errorMessage={errors.fullName.message}
                            />
                        )) ||
                            (errors.fullName?.type === 'minLength' && (
                                <InputErrorMessage
                                    errorMessage={errors.fullName.message}
                                />
                            )) ||
                            (errors.email?.type === 'required' && (
                                <InputErrorMessage
                                    errorMessage={errors.email.message}
                                />
                            )) ||
                            (errors.email?.type === 'pattern' && (
                                <InputErrorMessage
                                    errorMessage={errors.email.message}
                                />
                            )) ||
                            (errors.password?.type === 'required' && (
                                <InputErrorMessage
                                    errorMessage={errors.password.message}
                                />
                            )) ||
                            (errors.password?.type === 'minLength' && (
                                <InputErrorMessage
                                    errorMessage={errors.password.message}
                                />
                            ))}
                        <button
                            type='submit'
                            className='btn-primary'
                        >
                            Create Account
                        </button>
                        <p className=' text-sm text-center mt-4'>
                            Already have an account?{' '}
                            <Link
                                to={'/login'}
                                className='font-medium text-primary underline'
                            >
                                Sign In
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </>
    );
};

export default SignUp;
