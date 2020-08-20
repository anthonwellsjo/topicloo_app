import React from 'react';
import classes from './errorPopUp.module.css';

const errorPopUp = (props) => {
    return (
        <div className={classes.div}>
                <h1>{props.title}</h1>
            {props.children}
        </div>
    )
}

export default errorPopUp;