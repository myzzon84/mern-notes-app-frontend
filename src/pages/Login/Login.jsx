import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import PasswordInput from '../../components/input/PasswordInput';
import { useForm } from 'react-hook-form';
import InputErrorMessage from '../../components/InputErrorMessage.jsx';

const Login = () => {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ mode: 'all' });

    const handleLogin = async (data) => {
        console.log(data);
    };

    return (
        <>
            <Navbar />

            <div className='flex items-center justify-center mt-28'>
                <div className='w-96 border rounded bg-white px-7 py-10'>
                    <form onSubmit={handleSubmit(handleLogin)}>
                        <h4 className=' text-2xl mb-7'>Login</h4>
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
                        <PasswordInput register={register}/>
                        {
                            (errors.email?.type === 'required' && <InputErrorMessage errorMessage={errors.email.message}/>) ||
                            (errors.email?.type === 'pattern' && <InputErrorMessage errorMessage={errors.email.message}/>) ||
                            (errors.password?.type === 'required' && <InputErrorMessage errorMessage={errors.password.message}/>) ||
                            (errors.password?.type === 'minLength' && <InputErrorMessage errorMessage={errors.password.message}/>)
                        }
                        <button
                            type='submit'
                            className='btn-primary'
                        >
                            Login
                        </button>
                        <p className=' text-sm text-center mt-4'>
                            Not registered yet?{' '}
                            <Link
                                to={'/signup'}
                                className='font-medium text-primary underline'
                            >
                                Create an Account
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Login;
