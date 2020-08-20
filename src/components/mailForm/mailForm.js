import React from 'react';
import classes from './mailForm.module.css';
import Frame from '../frame/frame';
import { Modal, Row, Col, Button, Spinner, Image } from 'react-bootstrap'
import { InlineShareButtons } from 'sharethis-reactjs';
import ShareButton from '../shareButton/shareButton';
import { Backdrop } from '@material-ui/core';
import madeIt from '../../assets/images/ui/madeit.png';

const mailForm = props => {

    console.log("cloud id", props.cloudID)

    if (props.idConfirmation) {
        return (
            <>
                <Modal
                    show
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered>
                    <Backdrop
                        open />
                    <Modal.Title className="text-center">
                        That's it!
                    </Modal.Title>
                    <Modal.Body>
                        <Row>
                            <Col></Col>
                            <Col xs={8}>
                                <Image fluid src={madeIt} alt="you did it"></Image>
                            </Col>
                            <Col></Col>
                        </Row>
                        <Row>
                            <Col className="text-center">
                            <p>Now it's time to share your TOPICLOO.</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col className='text-center'>
                                <Button
                                    className={classes.animatedColors}
                                    onClick={() => props.newtopicidclicked(props.cloudID)}
                                >
                                    <h3>{props.cloudID}</h3>
                                </Button>
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Col className="text-center">
                                <ShareButton>
                                    <InlineShareButtons
                                        config={{
                                            alignment: 'center',  // alignment of buttons (left, center, right)
                                            color: 'social',      // set the color of buttons (social, white)
                                            enabled: true,        // show/hide buttons (true, false)
                                            font_size: 16,        // font size for the buttons
                                            labels: 'cta',        // button labels (cta, counts, null)
                                            language: 'en',       // which language to use (see LANGUAGES)
                                            networks: [           // which networks to include (see SHARING NETWORKS)
                                                'whatsapp',
                                                'gmail',
                                                'messenger',
                                                'facebook',
                                                'twitter'
                                            ],
                                            padding: 12,          // padding within buttons (INTEGER)
                                            radius: 4,            // the corner radius on each button (INTEGER)
                                            show_total: false,
                                            size: 40,             // the size of each button (INTEGER)

                                            // OPTIONAL PARAMETERS
                                            url: `http://localhost:300/login/${props.cloudID}`, // (defaults to current url)
                                            image: 'https://bit.ly/2CMhCMC',  // (defaults to og:image or twitter:image)
                                            description: `${props.userName} wants you to give some anonymous and merciless feedback.`,       // (defaults to og:description or twitter:description)
                                            title: 'Respond to your TOPICLOO invitation.',            // (defaults to og:title or twitter:title)
                                            message: `Don't make him dissapointed. And don't worry, it's completely anonymous. He won't see your answers until at least 5 other people have given their responses. Just click this link: http://localhost:300/login/${props.cloudID}`,     // (only for email sharing)
                                            subject: `You have received a TOPICLOO invitation from ${props.userName}`,  // (only for email sharing)
                                            username: 'custom twitter handle' // (only for twitter sharing)
                                        }}
                                    />
                                </ShareButton>
                            </Col>
                        </Row>

                    </Modal.Body>
                </Modal>
            </>
        )
    }
    if (!props.idConfirmation) {
        return (

            <Frame><Spinner animation="border" /></Frame>

        )
    }
    if (props.connectionError) {
        return (
            <div className={classes.div}>
                <h1>Check you connection...</h1>
            </div>
        )
    }
}

export default mailForm;