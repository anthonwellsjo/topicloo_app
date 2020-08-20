import React from 'react';
import classes from './mainFrame.module.css';
 
const mainFrame = (props) => {
    return (
        <div className={classes.mainFrame}>
            {props.children}
        </div>
    )
}

export default mainFrame;