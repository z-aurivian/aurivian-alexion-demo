import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-auri-black flex items-center justify-center p-8">
          <div className="bg-auri-dark rounded-lg p-8 max-w-lg text-center">
            <h2 className="text-xl font-semibold text-auri-white mb-4">Something went wrong</h2>
            <p className="text-auri-gray mb-6">{this.state.error?.message}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-auri-blue text-white rounded-lg hover:bg-blue-600 transition"
            >
              Reload
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
