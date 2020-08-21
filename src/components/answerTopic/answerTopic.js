import React, { useState, useEffect, useRef } from 'react';
import { ProgressBar, Row, Col, Container } from 'react-bootstrap';
import Zoom from '@material-ui/core/Zoom';
import Paper from '@material-ui/core/Paper';
import classes from './answerTopic.module.css';
import Timer from 'react-compound-timer';
import EmojisInAnswerTopic from '../emojisInAnswerTopic/emojisInAnswerTopic';



const calculateProgressBarVariant = (timeLeft, timeoutTotal) => {
    if ((timeLeft / timeoutTotal * 100) > 45) {
        return "success"
    } if ((timeLeft / timeoutTotal * 100) > 15) {
        return "warning"
    } if ((timeLeft / timeoutTotal * 100) > 0) {
        return "danger"
    }
}

const formatTextAnswer = (str) => {
    return str.replace(/.+?[\.\?\!](\s|$)/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}



const AnswerTopic = (props) => {
    //states
    const [emojiAnswer, setEmojiAnswer] = useState({ happy: false, sad: false, angry: false, curious: false });
    const [textAnswer, setTextAnswer] = useState("");
    //refs
    const focusRef = useRef(null);
    //life cycles
    useEffect(() => {
        focusRef.current.focus();
    })

    //event handlers
    const onTextChangeEventHandler = (e) => {
        let newValue = e.target.value;
        newValue = formatTextAnswer(newValue);
        setTextAnswer(newValue);
    }
    //variables
    const timeout = props.topic.timeout * 1000;



    return (

        <Timer
            initialTime={timeout}
            startImmediately={true}
            direction="backward"
            checkpoints={[{ time: 0, callback: props.onTimerFinished },]}
        >
            {({ getTime }) => (
                <>
                    <Paper className={classes.div}>
                        <Container>
                            <br />
                            <Row>
                                <Col className="text-center">
                                    <h3>{props.topic.topic}</h3>
                                </Col>
                            </Row>
                            <Row>
                                <Col className="text-center">
                                    <h4>{props.topic.comment}</h4>
                                </Col>
                            </Row>

                            <Row>
                                <Col className="text-center">
                                    <textarea className={classes.textarea} placeholder="..." ref={focusRef} value={textAnswer} onChange={(e) => onTextChangeEventHandler(e)} />
                                </Col>
                            </Row>
                            <Row>
                                <Col className="text-center">
                                    <h4>This makes me</h4>
                                </Col>
                            </Row>
                            <Row>
                                <Col className="text-center">
                                    <EmojisInAnswerTopic
                                        happy={props.topic.emojis.happy}
                                        sad={props.topic.emojis.sad}
                                        angry={props.topic.emojis.angry}
                                        curious={props.topic.emojis.curious}
                                        happyIsChecked={emojiAnswer.happy}
                                        sadIsChecked={emojiAnswer.sad}
                                        angryIsChecked={emojiAnswer.angry}
                                        curiousIsChecked={emojiAnswer.curious}
                                        happyToggleChecked={() => setEmojiAnswer({ ...emojiAnswer, happy: !emojiAnswer.happy })}
                                        sadToggleChecked={() => setEmojiAnswer({ ...emojiAnswer, sad: !emojiAnswer.sad })}
                                        angryToggleChecked={() => setEmojiAnswer({ ...emojiAnswer, angry: !emojiAnswer.angry })}
                                        curiousToggleChecked={() => setEmojiAnswer({ ...emojiAnswer, curious: !emojiAnswer.curious })}
                                    />
                                </Col>
                            </Row>
                            <div className={classes.progressDiv}>
                                <Row>
                                    <Col>
                                        <ProgressBar>
                                            <ProgressBar animated striped variant={calculateProgressBarVariant(getTime(), timeout)} now={Math.floor((getTime() / timeout * 100)) - 3} key={1} />
                                        </ProgressBar>
                                    </Col>
                                </Row>
                            </div>
                            <Row>
                                <Col className="text-center">
                                    <Timer.Seconds /> seconds
                            </Col>
                            </Row>
                        </Container>
                    </Paper>
                </>
            )}
        </Timer>

    )
}

export default AnswerTopic;