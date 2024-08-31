import React, { Component } from "react";
import { Row } from "reactstrap";

export default class NotFound extends Component {
    render() {
        return (
            <Row style={{ textAlign: "center", marginTop: '20px' }}>
                <h3 style={{ color: "#146356" }}>
                    Sorry, the page you're looking for cannot be found.
                </h3>
            </Row>
        );
    }
}