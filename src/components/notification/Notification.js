
import { useEffect, useState } from 'react';
import classes from './Notification.module.css'

const Notification = ({ msg, status, display, id }) => {



    localStorage.removeItem(id);
    setTimeout(function () { notification.close() }, 2000);
    return (
        <div className={classes.notification}>
            <p className={classes[status]}  >
                {msg}
            </p>
        </div>
    );

}

export default Notification;