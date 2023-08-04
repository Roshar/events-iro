
import { useEffect, useState } from 'react';
import './styles.css'

const Notification = ({ msg, status, display, id, displayText }) => {


    const [show, setShow] = useState('')


    localStorage.removeItem(id);


    const changeMsg = (e) => {
        setShow('none')
    }

    const classes = `p_box ${status} ${show} `
    const classes2 = `vissible_btn ${show}`


    return (
        <div className='notification'>
            <p className={classes}  >
                <span className={show}> {msg} </span>
                <button type='button' className={classes2} onClick={changeMsg}>{displayText}</button>
            </p>
        </div >
    );

}

export default Notification;