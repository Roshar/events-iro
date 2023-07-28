const setSuccess = el => {
    const inputControl = el.parentElement;
    const errorDisplay = inputControl.querySelector('.notif');
    errorDisplay.innerText = '';
    inputControl.classList.add('success-i');
    inputControl.classList.remove('error')
}

export default setSuccess