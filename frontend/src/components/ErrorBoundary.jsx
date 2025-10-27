import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          fontFamily: 'Arial, sans-serif',
          backgroundColor: '#f5f5f5'
        }}>
          <h1 style={{ color: '#e74c3c', marginBottom: '20px' }}>
            Something went wrong
          </h1>
          <p style={{ color: '#666', textAlign: 'center', maxWidth: '600px' }}>
            The application encountered an error. This might be due to missing environment variables or API connection issues.
          </p>
          <details style={{ marginTop: '20px', color: '#666' }}>
            <summary style={{ cursor: 'pointer' }}>Technical Details</summary>
            <pre style={{
              backgroundColor: '#f8f8f8',
              padding: '10px',
              borderRadius: '4px',
              marginTop: '10px',
              fontSize: '12px',
              overflow: 'auto'
            }}>
              {this.state.error?.toString()}
            </pre>
          </details>
          <button
            onClick={() => window.location.reload()}
            style={{
              marginTop: '20px',
              padding: '10px 20px',
              backgroundColor: '#3498db',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;