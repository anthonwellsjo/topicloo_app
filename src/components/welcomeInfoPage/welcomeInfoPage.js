import React from 'react';
import { Button, Col, Row, Carousel, Image, Container } from 'react-bootstrap';
import classes from './welcomeInfoPage.module.css';
import sitting from '../../assets/images/ui/sitting.png';
import loving from '../../assets/images/ui/loving.png';
import coffee from '../../assets/images/ui/coffee.gif';
import Paper from '@material-ui/core/Paper';

const welcomeInfoPage = props => {


    return (
        <div
            className={classes.welcomedivframe}>
            <div className={classes.welcomediv}>
                <Paper
                    elevation={2}>
                    <Carousel
                        nextIcon={null}
                        prevIcon={null}
                        indicators={false}
                        pause={true}
                    >
                        <Carousel.Item>
                            <div className={classes.carouselwrapper}>
                                <Container>
                                    <Row>
                                        <Col>
                                            <Image fluid src={sitting} />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <h1>Hi stranger!</h1>
                                    </Row>
                                    <br />
                                    <Row>
                                        <p>TOPICLOO is your go-to service for doing quick surveys where you want short, spontaneous and emotional answers rather than long rational ones.</p>
                                    </Row>
                                </Container>
                            </div>
                        </Carousel.Item>

                        <Carousel.Item>
                            <div className={classes.carouselwrapper}>
                                <Container>
                                    <Row>
                                        <p>People are masters of hiding the truth. But when you put some time pressure on them, a few sunrays of honest opinion might just slip through.</p>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Image fluid src={loving} />
                                        </Col>
                                    </Row>
                                    <Row>
                                    </Row>
                                </Container>
                            </div>
                        </Carousel.Item>

                        <Carousel.Item>
                            <div className={classes.carouselwrapper}>
                                <Container>
                                    <Row>
                                        <Col className="text-center">
                                            <span>
                                                <strong>-"How do you like our food?"</strong> <br />
                                                <strong>-"Am I a good boss?"</strong> <br />
                                                <strong>-"What's up with Brian?"</strong> <br />
                                            </span>
                                        </Col>
                                    </Row>
                                    <br />
                                    <br />
                                    <Row>
                                        <Col>
                                            <Image fluid src={coffee} />
                                        </Col>
                                    </Row>
                                    <br />
                                    <br />
                                    <br />

                                    <Row>
                                        <Col></Col>
                                        <Col></Col>
                                        <Col>
                                            <Button
                                                variant="primary"
                                                onClick={props.closeButtonClicked}>Start!</Button>
                                        </Col>
                                    </Row>
                                </Container>
                            </div>
                        </Carousel.Item>

                    </Carousel>
                </Paper>
            </div>
        </div>
    )
}


export default welcomeInfoPage;