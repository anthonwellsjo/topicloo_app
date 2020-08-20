import React, { Component } from 'react';
import Zoom from '@material-ui/core/Zoom';

import Frame from '../../components/frame/frame';
import CountDownAnimation from '../../components/countDownAnimation/countDownAnimation';
import { Spinner } from 'react-bootstrap';

import Axios from '../../axios/axios-topics';
import Paper from '@material-ui/core/Paper';
import classes from './answeringPage.module.css';
import AnswerTopic from '../../components/answerTopic/answerTopic';
import StartTopiclooModal from '../../components/startTopiclooModal/startTopiclooModal';


class AnsweringPage extends Component {
    state = {
        showStartModal: false,
        showCounterAnimation: false,
        showLoadingAnimation: false,
        topicsHaveBeenFetched: false,
        readyToStart: false,
        showAnswerPaper: true
    }
    ANIMATION_WAS_CLICKED = false;

    TOPICLOO_NAMES = {};
    TOPICLOO_TOPICS = {};
    TOPICLOO_TOPIC_KEYS_TO_ANSWER = [];
    CURRENT_TOPIC = "";

    //Life cycles

    componentDidMount() {
        this.setState(prevState => ({ ...prevState, showLoadingAnimation: true }));

        this.getTOPICLOO();

    }

    componentDidUpdate(prevProps, prevState) {
        if ((this.state.topicsHaveBeenFetched !== prevState.topicsHaveBeenFetched) && this.state.topicsHaveBeenFetched === true) {
            this.setState(prevState => ({ ...prevState, showStartModal: true, showLoadingAnimation: false }));
        }
    }

    //Event Handlers 

    onGoEventHandler = () => {
        this.setState(prevState => ({ ...prevState, showStartModal: false }));
        this.handleCounterAnimation();
    }
    onBackEventHandler = () => {
        this.setState(prevState => ({ ...prevState, showStartModal: false }));
        this.props.onBack();
    }
    countDownAnimationClickedEventHanlder = () => {
        this.startGame();
        this.ANIMATION_WAS_CLICKED = true;

    }
    onTimerFinishedEventHandler = () => {
        console.log("timer finished!");
        this.setState(prevState => ({ ...prevState, showAnswerPaper: false, showLoadingAnimation: true }));
        this.removeCurrentTopicFromTopicsToDo();
    }

    //Functions

    removeCurrentTopicFromTopicsToDo = () => {
        console.log("removeCurrentTopicFromTopicsToDo", this);
        this.TOPICLOO_TOPIC_KEYS_TO_ANSWER.splice(this.TOPICLOO_TOPIC_KEYS_TO_ANSWER.indexOf(this.CURRENT_TOPIC, 1));
    }

    handleCounterAnimation = () => {
        console.log("handle counter anim");
        setTimeout(() => {
            this.setState(prevState => ({ ...prevState, showCounterAnimation: true, showLoadingAnimation: false }))
            setTimeout(() => {
                if (!this.ANIMATION_WAS_CLICKED) {
                    this.startGame();
                }
            }, 4500)
        }, 500);
    }

    startGame = () => {
        this.setState(prevState => ({ ...prevState, showCounterAnimation: false, readyToStart: true }));
    }

    getTOPICLOO = () => {
        console.log("topicloo id", this.props.topiclooID)
        Axios.get(`/cloud_${this.props.topiclooID}/.json`)
            .then(resp => {
                if (resp) {
                    console.log("get topicloo response", resp.data)
                    this.TOPICLOO_NAMES = resp.data[Object.keys(resp.data)[0]].topiclooNames;
                    this.TOPICLOO_TOPICS = resp.data[Object.keys(resp.data)[0]].topicsSettings;
                    this.TOPICLOO_TOPIC_KEYS_TO_ANSWER = Object.keys(resp.data[Object.keys(resp.data)[0]].topicsSettings);
                    this.setState(prevState => ({ ...prevState, topicsHaveBeenFetched: true }))
                }
            })
    }

    getRandomTopic = () => {
        const randomIndex = Math.floor(Math.random() * this.TOPICLOO_TOPIC_KEYS_TO_ANSWER.length);
        console.log("get topic", this.TOPICLOO_TOPICS[this.TOPICLOO_TOPIC_KEYS_TO_ANSWER[randomIndex]]);
        const randomTopic = this.TOPICLOO_TOPICS[this.TOPICLOO_TOPIC_KEYS_TO_ANSWER[randomIndex]];
        console.log("randomtTOpic after delete", randomTopic, this);
        return randomTopic;
    }

    renderAnswerPage = () => {
        this.CURRENT_TOPIC = this.getRandomTopic();
        return (
            this.state.readyToStart && this.state.topicsHaveBeenFetched ? <AnswerTopic
                in={this.state.showAnswerPaper}
                onTimerFinished={this.onTimerFinishedEventHandler}
                topic={this.CURRENT_TOPIC} /> : null
        )
    }

    render() {
        const answerPaperRender = this.renderAnswerPage()
        console.log("rerender", this);
        return (
            <Frame>
                <Paper elevation={3} className={classes.paperdiv} >
                    <StartTopiclooModal
                        in={this.state.showStartModal}
                        topiclooObjects={this.TOPICLOO_TOPICS}
                        topiclooSubjects={this.TOPICLOO_TOPIC_KEYS_TO_ANSWER}
                        topiclooNames={this.TOPICLOO_NAMES}
                        onBack={this.onBackEventHandler}
                        onGo={this.onGoEventHandler}
                    />
                    <div >
                        <Frame>
                            <Zoom
                                in={this.state.showLoadingAnimation}>
                                <Spinner animation="border" />
                            </Zoom>
                            <CountDownAnimation
                                clicked={this.countDownAnimationClickedEventHanlder}
                                in={this.state.showCounterAnimation} />
                        </Frame>
                    </div>
                </Paper>
                <Frame>
                    {answerPaperRender}
                </Frame>
            </Frame>
        )
    }
}

export default AnsweringPage;


