import React from 'react';
import classes from './backDrop.module.css';

const backDrop = (props) => {
    return (
        <div
            className={classes.backDrop}
            onClick={props.onClick}>
            {props.children}
        </div>
    )
}

export default backDrop;