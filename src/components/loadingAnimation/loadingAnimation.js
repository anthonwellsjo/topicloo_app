import React from 'react';
import classes from './loadingAnimation.module.css';
import pic from '../../assets/images/loadingPic.gif';

const loadingAnimation = () => {
    return (
        <div className={classes.div}>
            <img
                className={classes.img} 
                src={pic} alt='loading'/>
        </div>
    )
}

export default loadingAnimation;