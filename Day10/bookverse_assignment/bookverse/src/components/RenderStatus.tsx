import React from "react";

type RenderProps = {
  status: string;
  children: (props: { status: string }) => React.ReactNode;
};

const RenderStatus: React.FC<RenderProps> = ({ status, children }) => {
  return <>{children({ status })}</>;
};

export default RenderStatus;
