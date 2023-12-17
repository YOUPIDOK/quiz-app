'use client';
import {Col, Container, Row} from 'react-bootstrap';
import React from 'react';
import CreateQuiz from "@/components/CreateQuiz";
import JoinQuiz from "@/components/JoinQuiz";
import {useAppContext} from "@/context/AppContext";

const Menu = () => {
    const { username, quiz } = useAppContext();

    return (
        <>
            { (username !== '' && quiz === null) &&  (
                <Container>
                    <Row>
                        <Col md={6}>
                            <CreateQuiz/>
                        </Col>
                        <Col md={6}>
                            <JoinQuiz/>
                        </Col>
                    </Row>
                </Container>
            )}
        </>
    );
};

export default Menu;
