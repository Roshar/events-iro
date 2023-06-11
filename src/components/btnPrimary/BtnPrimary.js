import classes from './BtnPrimary.module.css';

const BtnPrimary = ({ title, type }) => {
    return (<button className={classes[type] || classes.btn}>{title}</button>);
}

export default BtnPrimary;