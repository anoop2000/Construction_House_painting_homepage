
// src/components/ErrorBoundary.jsx
import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render shows fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can log errors here (console, monitoring service, etc.).
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Allow overriding fallback UI via props, or use a default.
      return this.props.fallback || (
        <div className="container py-5 text-center">
          <h2 className="mb-3">Something went wrong.</h2>
          <p className="text-muted mb-4">
            Please refresh the page or try again in a few moments.
          </p>
          <button
            className="btn btn-warning"
            onClick={() => this.setState({ hasError: false })}
          >
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;