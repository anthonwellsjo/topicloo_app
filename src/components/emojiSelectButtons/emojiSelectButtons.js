import React from 'react';
import { Row, Col, Image } from 'react-bootstrap';
import Zoom from '@material-ui/core/Zoom';
import Fab from '@material-ui/core/Fab';
import happy from '../../assets/images/emojis/happy.png';
import sad from '../../assets/images/emojis/sad.png';
import angry from '../../assets/images/emojis/angry.png';
import curious from '../../assets/images/emojis/curious.png';

import classes from './emojiSelectButtons.module.css';



const emojiSelectButtons = props => {


    return (
        <>
            <Row className="text-center">
                <Col>
                    <Zoom
                        in={!props.happyIsChecked}
                        unmountOnExit>
                        <div className={classes.fabdiv}>
                            <Fab
                                onClick={props.happyToggleChecked}
                                size="small"><></></Fab>
                        </div>
                    </Zoom>
                    <Zoom
                        unmountOnExit
                        in={props.happyIsChecked}>
                        <Image roundedCircle onClick={props.happyToggleChecked} className={classes.emoji} src={happy}></Image>
                    </Zoom>
                </Col>
                <Col>
                    <Zoom
                        in={!props.sadIsChecked}
                        unmountOnExit>
                        <div className={classes.fabdiv}>
                            <Fab
                                onClick={props.sadToggleChecked}
                                size="small"><></></Fab>
                        </div>
                    </Zoom>
                    <Zoom
                        unmountOnExit
                        in={props.sadIsChecked}>
                        <Image roundedCircle onClick={props.sadToggleChecked} className={classes.emoji} src={sad}></Image>
                    </Zoom>
                </Col>
                <Col>
                    <Zoom
                        in={!props.angryIsChecked}
                        unmountOnExit>
                        <div className={classes.fabdiv}>
                            <Fab
                                onClick={props.angryToggleChecked}
                                size="small"><></></Fab>
                        </div>
                    </Zoom>
                    <Zoom
                        unmountOnExit
                        in={props.angryIsChecked}>
                        <Image roundedCircle onClick={props.angryToggleChecked} className={classes.emoji} src={angry}></Image>
                    </Zoom>
                </Col>
                <Col>
                    <Zoom
                        in={!props.curiousIsChecked}
                        unmountOnExit>
                        <div className={classes.fabdiv}>
                            <Fab
                                onClick={props.curiousToggleChecked}
                                size="small"><></></Fab>
                        </div>
                    </Zoom>
                    <Zoom
                        unmountOnExit
                        in={props.curiousIsChecked}>
                        <Image roundedCircle onClick={props.curiousToggleChecked} className={classes.emoji} src={curious}></Image>
                    </Zoom>
                </Col>
                <br />
                <br />
            </Row>
            <Row>
                <Col className="text-center">{props.happyIsChecked ? <span><strong>Happy</strong></span> : <span>Happy</span>}</Col>
                <Col className="text-center">{props.sadIsChecked ? <span><strong>&nbsp;Sad</strong></span> : <span>&nbsp;Sad</span>}</Col>
                <Col className="text-center">{props.angryIsChecked ? <span><strong>&nbsp;Angry</strong></span> : <span>&nbsp;Angry</span>}</Col>
                <Col className="text-center">{props.curiousIsChecked ? <span><strong>Curious</strong></span> : <span>Curious</span>}</Col>
            </Row>
        </>
    )
}

emojiSelectButtons.defaultProps = {
    showhappy: true,
    showsad: true,
    showangry: true,
    showcurious: true,

}

export default emojiSelectButtons;



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