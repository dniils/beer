import { Component, ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);

    this.state = {
      hasError: false,
      error: null,
    };
  }

  componentDidCatch(error: Error) {
    this.setState({
      hasError: true,
      error,
    });

    console.error(error);
  }

  render() {
    const { hasError, error } = this.state;
    const { children } = this.props;

    if (hasError) {
      return (
        <div>
          <h2>🥴 Something went wrong</h2>
          <p>{error && error.toString()}</p>
        </div>
      );
    }

    return children;
  }
}

export default ErrorBoundary;
