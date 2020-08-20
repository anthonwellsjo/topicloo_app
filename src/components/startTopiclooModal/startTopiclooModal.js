import React, { useState, useEffect } from 'react';
import { Button, Row, Col, Container, Image } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Zoom from '@material-ui/core/Zoom';
import Frame from '../../components/frame/frame';
import NotePad from '../../assets/images/ui/notepad.jpg';
import classes from './startTopiclooModal.module.css';




//functions
const countTopiclooSubjects = (topicKeys) => {
    return topicKeys.length;
}

const countTopiclooDuration = (objects, keys) => {
    let duration = 0;
    keys.forEach(key => {
        duration += objects[`${key}`].timeout;
    });

    return formatDuration(duration);
}

const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds - (minutes * 60);

    if (minutes > 0) {
        return `${minutes} min ${secs} sec`
    } else {
        return `${secs} sec`
    }

}



const StartTopiclooModal = props => {

    //hooks

    const [showGo, setShowGo] = useState(false);
    const [showBack, setShowBack] = useState(false);
    const [buttonsVisible, setButtonsVisible] = useState(false);




    //life cycles
    useEffect(() => {
        if (!buttonsVisible) {
            setTimeout(() => {
                setShowGo(true);
            }, 600);
            setTimeout(() => {
                setShowBack(true)
                setButtonsVisible(true)
            }, 500)
        }
    });

    const noOfTopics = countTopiclooSubjects(props.topiclooSubjects);
    const duration = countTopiclooDuration(props.topiclooObjects, props.topiclooSubjects)
    console.log("render start topicloo modal")
    console.log("topicloo objects", props.topiclooObjects)

    return (
        <Frame>
            <Zoom
                unmountOnExit
                in={props.in}>
                <Paper elevation={3} className={classes.paper}>
                    <Container>
                        <br />
                        <Row>
                            <Col></Col>
                            <Col xs={6} >
                                <Image fluid src={NotePad} />
                            </Col>
                            <Col></Col>
                        </Row>
                        <br />
                        <Row>
                            <Col className="text-center">
                                <p>TOPICLOO CREATED BY: <strong>{props.topiclooNames.userName}</strong></p>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="text-center">
                                <p>TOPICLOO NAME: <strong>{props.topiclooNames.topiclooName}</strong></p>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="text-center">
                                <p>
                                    TOPICS: <strong>{noOfTopics}</strong>
                                </p>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="text-center">
                                <p>
                                    DURATION: <strong>{duration}</strong>
                                </p>
                            </Col>
                        </Row>
                        <br />
                        <br />
                        <div className={classes.buttonsDiv}>
                            <Container>
                                <Row>
                                    <Col><Zoom in={showBack}>
                                        <NavLink to="/login">
                                            <Button variant="warning" onClick={props.onBack}>Back</Button>
                                        </NavLink>
                                    </Zoom></Col>
                                    <Col></Col>
                                    <Col>
                                        <Zoom in={showGo}>
                                            <Button variant="success" onClick={props.onGo}>Go</Button>
                                        </Zoom>
                                    </Col>
                                </Row>
                            </Container>
                        </div>
                    </Container>
                </Paper>
            </Zoom>
        </Frame>
        // <Modal
        //     in={props.in}
        //     size="lg"
        //     centered
        // >
        //     <Modal.Body>
        //         <p>created by: {props.topiclooNames.userName}</p>
        //         <h5>toicloo name: {props.topiclooNames.topiclooName}</h5>
        //         <p>
        //             no of topics: {noOfTopics}
        //         </p>
        //     </Modal.Body>
        //     <Modal.Footer>
        //         <Button onClick={props.onBack}>Back</Button>
        //         <Button onClick={props.onGo}>Go</Button>
        //     </Modal.Footer>
        // </Modal>
    )
}

export default StartTopiclooModal;