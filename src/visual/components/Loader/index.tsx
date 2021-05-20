import React, { FC } from "react";
import { Spinner } from "react-bootstrap";

type LoaderProps = {
  isLoading: boolean;
};

const Loader: FC<LoaderProps> = ({ children, isLoading }) => {
  if (isLoading)
    return (
      <div className={"w-100 d-flex flex-row justify-content-center"}>
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
    );
  return <>{children}</>;
};

export default Loader;
