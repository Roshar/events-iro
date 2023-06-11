import classes from './BtnFilter.module.css'

const Btn = ({ title }) => {
    return (
        <button className={classes.btn}>{title}</button>
    );
}

export default Btn;