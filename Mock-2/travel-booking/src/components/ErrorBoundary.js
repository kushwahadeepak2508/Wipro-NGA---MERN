// ErrorBoundary.js
import React from 'react';
import PropTypes from 'prop-types';

/**
 * ErrorBoundary catches render/runtime errors in child components.
 * It should wrap the routes or top-level UI where unexpected exceptions may occur.
 */
export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, info: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    // You can log to a monitoring service here
    this.setState({ info });
    console.error('ErrorBoundary caught an error', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="container mt-5">
          <div className="alert alert-danger">
            <h4>Something went wrong.</h4>
            <p>We&apos;re sorry — an unexpected error occurred. Please try again later.</p>
            <details style={{ whiteSpace: 'pre-wrap' }}>
              {this.state.error && this.state.error.toString()}
              <br />
              {this.state.info?.componentStack}
            </details>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};
