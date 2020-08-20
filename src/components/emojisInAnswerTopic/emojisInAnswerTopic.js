import React, { useState } from 'react';
import { Row, Col, Image } from 'react-bootstrap';
import Zoom from '@material-ui/core/Zoom';
import Fab from '@material-ui/core/Fab';
import happy from '../../assets/images/emojis/happy.png';
import sad from '../../assets/images/emojis/sad.png';
import angry from '../../assets/images/emojis/angry.png';
import curious from '../../assets/images/emojis/curious.png';

import classes from './emojisInAnswerTopic.module.css';



const EmojisInAnswerTopic = props => {
    const [fillEmoji, setFillEmoji] = useState({ happy: false, sad: false, angry: false, curious: false });

    return (
        <>
            <Row>
                {props.happy && (
                    <Col className="text-center">
                        <Zoom
                            in={!props.happyIsChecked}
                            timeout={0}
                            onExited={() => setFillEmoji({ ...fillEmoji, happy: true })}
                            unmountOnExit>
                            <div className={classes.fabdiv}>
                                <Fab
                                    className={classes.fab}
                                    onClick={props.happyToggleChecked}
                                    size="small"><></></Fab>
                            </div>
                        </Zoom>
                        <Zoom
                            unmountOnExit
                            onExited={props.happyToggleChecked}
                            onClick={() => {
                                setFillEmoji({ ...fillEmoji, happy: false });
                            }}
                            in={fillEmoji.happy && props.happyIsChecked}>
                            <Image className={classes.emojiFill} roundedCircle onClick={props.happyToggleChecked} className={classes.emoji} src={happy}></Image>
                        </Zoom>
                    </Col>)}
                {props.sad && (
                    <Col className="text-center">
                        <Zoom
                            in={!props.sadIsChecked}
                            timeout={0}
                            onExited={() => setFillEmoji({ ...fillEmoji, sad: true })}
                            unmountOnExit>
                            <div className={classes.fabdiv}>
                                <Fab
                                    className={classes.fab}
                                    onClick={props.sadToggleChecked}
                                    size="small"><></></Fab>
                            </div>
                        </Zoom>
                        <Zoom
                            unmountOnExit
                            onExited={props.sadToggleChecked}
                            onClick={() => {
                                setFillEmoji({ ...fillEmoji, sad: false });
                            }}
                            in={fillEmoji.sad && props.sadIsChecked}>
                            <Image className={classes.emojiFill} roundedCircle onClick={props.sadToggleChecked} className={classes.emoji} src={sad}></Image>
                        </Zoom>
                    </Col>)}
                {props.angry && (
                    <Col className="text-center">
                        <Zoom
                            in={!props.angryIsChecked}
                            timeout={0}
                            onExited={() => setFillEmoji({ ...fillEmoji, angry: true })}
                            unmountOnExit>
                            <div className={classes.fabdiv}>
                                <Fab
                                    className={classes.fab}
                                    onClick={props.angryToggleChecked}
                                    size="small"><></></Fab>
                            </div>
                        </Zoom>
                        <Zoom
                            unmountOnExit
                            onExited={props.angryToggleChecked}
                            onClick={() => {
                                setFillEmoji({ ...fillEmoji, angry: false });
                            }}
                            in={fillEmoji.angry && props.angryIsChecked}>
                            <Image className={classes.emojiFill} roundedCircle onClick={props.angryToggleChecked} className={classes.emoji} src={angry}></Image>
                        </Zoom>
                    </Col>)}
                {props.curious && (
                    <Col className="text-center">
                        <Zoom
                            in={!props.curiousIsChecked}
                            timeout={0}
                            onExited={() => setFillEmoji({ ...fillEmoji, curious: true })}
                            unmountOnExit>
                            <div className={classes.fabdiv}>
                                <Fab
                                    className={classes.fab}
                                    onClick={props.curiousToggleChecked}
                                    size="small"><></></Fab>
                            </div>
                        </Zoom>
                        <Zoom
                            unmountOnExit
                            onExited={props.curiousToggleChecked}
                            onClick={() => {
                                setFillEmoji({ ...fillEmoji, curious: false });
                            }}
                            in={fillEmoji.curious && props.curiousIsChecked}>
                            <Image className={classes.emojiFill} roundedCircle onClick={props.curiousToggleChecked} className={classes.emoji} src={curious}></Image>
                        </Zoom>
                    </Col>)}
                <br />
                <br />
            </Row>
            <Row>
                {props.happy && (
                    <Col className="text-center">{props.happyIsChecked ? <span><strong>Happy</strong></span> : <span>Happy</span>}</Col>)}
                {props.sad && (
                    <Col className="text-center">{props.sadIsChecked ? <span><strong>&nbsp;Sad</strong></span> : <span>&nbsp;Sad</span>}</Col>)}
                {props.angry && (
                    <Col className="text-center">{props.angryIsChecked ? <span><strong>&nbsp;Angry</strong></span> : <span>&nbsp;Angry</span>}</Col>)}
                {props.curious && (
                    <Col className="text-center">{props.curiousIsChecked ? <span><strong>Curious</strong></span> : <span>Curious</span>}</Col>)}
            </Row>
        </>
    )
}


export default EmojisInAnswerTopic;



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