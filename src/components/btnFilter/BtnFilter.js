import classes from './BtnFilter.module.css'

const Btn = ({ title }) => {
    console.log('btnFilter')
    return (
        <button id="btnFilter" className={classes.btn}>{title}</button>
    );
}

export default Btn;