import React from 'react';
import happy from '../../assets/images/emojis/happy.png';
import sad from '../../assets/images/emojis/sad.png';
import angry from '../../assets/images/emojis/angry.png';
import curious from '../../assets/images/emojis/curious.png';

import classes from './emojiosInSubjectButton.module.css';



const emojiosInSubjectButton = props => {


    return (
        <>
            {props.happy && <img className={classes.miniEmoji} src={happy} alt="happy"/>}
            {props.sad && <img className={classes.miniEmoji} src={sad} alt="sad"/>}
            {props.angry && <img className={classes.miniEmoji} src={angry} alt="angry"/>}
            {props.curious && <img className={classes.miniEmoji} src={curious} alt="curious"/>}
        </>
    )
}


export default emojiosInSubjectButton;



/*
import React from 'react';
import Row from 'react-bootstrap/Row';
import { Switch, FormGroup, FormControlLabel } from '@material-ui/core';

const emojiSelectButtons = props => {
    return (
        <Row>
            <FormGroup>
                <FormControlLabel
                    control={<Switch size="small" checked={props.happyIsChecked} onChange={props.happyToggleChecked} />}
                    label="Happy"
                />
                <FormControlLabel
                    control={<Switch checked={props.angryIsChecked} onChange={props.angryToggleChecked} />}
                    label="Angry"
                />
                <FormControlLabel
                    control={<Switch size="small" checked={props.sadIsChecked} onChange={props.sadToggleChecked} />}
                    label="Sad"
                />
                <FormControlLabel
                    control={<Switch checked={props.curiousIsChecked} onChange={props.curiousToggleChecked} />}
                    label="Curious"
                />
            </FormGroup>
        </Row>
    )
}

export default emojiSelectButtons;

*/