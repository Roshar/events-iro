const setError = (el, msg) => {
    const inputControl = el.parentElement;
    const errorDisplay = inputControl.querySelector('.notif');
    errorDisplay.innerText = msg;
    inputControl.classList.add('error');
    inputControl.classList.remove('success-i')
}
export default setError