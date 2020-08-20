import React from 'react';
import classes from './infoBackDrop.module.css';
 
const infoBackDrop = props => {
    return (
        <div 
            className={classes.blur}
            onClick={props.clicked}>

        </div>
    )
}

export default infoBackDrop;