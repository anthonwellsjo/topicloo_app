import React from 'react';
import classes from './frame.module.css';

const frame = props => {
    return (
        <div className={classes.frame}>
            {props.children}
        </div>
    )
}

export default frame;