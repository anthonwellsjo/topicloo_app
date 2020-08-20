import React from 'react';
import { Modal, Col, Row, Image } from 'react-bootstrap';
import Frame from '../frame/frame';
import sadFace from '../../assets/images/emojis/sad.png'

const connectionErrorModal = props => {
    return (
        <Frame>
            <Modal
                show
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header>
                    <Col><Image fluid roundedCircle src={sadFace}></Image></Col>
                    <h1>ooops...</h1>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col className="text-center">
                            <p>Something has crashed. Is it your connection?</p>
                        </Col>
                    </Row>
                </Modal.Body>
            </Modal>
        </Frame >

    )
}

export default connectionErrorModal;