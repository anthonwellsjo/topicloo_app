import React from 'react';
import classnames from 'classnames';
import happy from '../../assets/images/emojis/happy.png';
import sad from '../../assets/images/emojis/sad.png';
import angry from '../../assets/images/emojis/angry.png';
import curious from '../../assets/images/emojis/curious.png';

import classes from './emojisInModalCloud.module.css';



const emojisInModalCloud = props => {
    let happyClass = !props.ishappy? classnames(classes.emoji, classes.unclicked) : classes.emoji;
    let sadClass= !props.issad? classnames(classes.emoji, classes.unclicked) : classes.emoji;
    let angryClass= !props.isangry? classnames(classes.emoji, classes.unclicked) : classes.emoji;
    let curiousClass= !props.iscurious? classnames(classes.emoji, classes.unclicked) : classes.emoji;


    return (
        <>
            <div className={classes.emojidiv}>
                {props.showhappy && <img alt="happy emoji" onClick={()=> props.clickedEmoji("happy")} className={happyClass} src={happy}></img>}
                {props.showsad && <img alt="sad emoji" onClick={()=> props.clickedEmoji("sad")} className={sadClass} src={sad}></img>}
                {props.showangry && <img alt="angry emoji" onClick={()=> props.clickedEmoji("angry")} className={angryClass} src={angry}></img>}
                {props.showcurious && <img alt="curious emoji" onClick={()=> props.clickedEmoji("curious")} className={curiousClass} src={curious}></img>}
            </div>
        </>
    )
}

export default emojisInModalCloud;