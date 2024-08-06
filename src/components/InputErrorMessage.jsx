const InputErrorMessage = ({errorMessage}) => {
    return(
        <p className='text-red-500 text-xs pb-1'>
            {errorMessage}
        </p>
    );
}

export default InputErrorMessage;