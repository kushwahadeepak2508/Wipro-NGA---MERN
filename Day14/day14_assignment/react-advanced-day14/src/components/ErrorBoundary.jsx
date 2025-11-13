import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error("Error Boundary Caught:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ background: "#ffe5e5", padding: 10 }}>
          <h4>Something went wrong 😢</h4>
          <p>{String(this.state.error)}</p>
        </div>
      );
    }
    return this.props.children;
  }
}
