/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { Button, Container } from 'react-bootstrap';
import Message from './Message';

class ErrorBoundary extends Component {
  constructor() {
    super();
    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.log('ErrorBoundary caught an error', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Container className="my-5">
          <Message title="Error" variant="error">
            Something went wrong
          </Message>
          <a href="http://saveabuiz.me">
            <Button variant="outline-primary">Return to HomePage</Button>
          </a>
        </Container>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
