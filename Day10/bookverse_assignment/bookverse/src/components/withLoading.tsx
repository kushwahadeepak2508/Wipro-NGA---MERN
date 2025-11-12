import React from "react";

type WithLoadingProps = {
  loading: boolean;
};

export function withLoading<P extends object>(WrappedComponent: React.ComponentType<P>) {
  return (props: P & WithLoadingProps) => {
    const { loading, ...rest } = props as WithLoadingProps & P;
    if (loading) {
      return (
        <div style={{ display: "flex", justifyContent: "center", padding: 20 }}>
          <div className="spinner" aria-label="Loading"></div>
        </div>
      );
    }
    return <WrappedComponent {...(rest as P)} />;
  };
}
