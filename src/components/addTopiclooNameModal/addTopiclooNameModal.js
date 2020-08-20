import React from 'react';
import { Modal, Button, Row, Col } from 'react-bootstrap';
import { NavLink } from 'react-router-dom'


const addTopiclooNameModal = props => {

    return (
        <Modal
            show={props.show}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body>
                <Row>
                    <Col className="text-center">
                        <h5>SAVE TOPICLOO</h5>
                    </Col>
                </Row>
                <br/>
                <br/>
                <Row>
                    <Col className="text-center">
                        <input
                            type="text"
                            maxLength={20}
                            placeholder={"TOPICLOO NAME"}
                            value={props.topiclooname}
                            onChange={props.topicloonamechange} />
                    </Col>
                </Row>
                <Row>
                    <Col className="text-center">
                        <input
                            type="text"
                            maxLength={20}
                            placeholder={"YOUR NAME"}
                            value={props.username}
                            onChange={props.usernamechange} />
                    </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onClose}>Close</Button>
                <NavLink to='/cloud/create/maillist'>
                    <Button onClick={props.onSaveClicked}>Save</Button>
                </NavLink>
            </Modal.Footer>
        </Modal>
    )
}
export default addTopiclooNameModal;