import React from "react";

const App = (props) => {
  const { children } = props;
  return <div className="container">{children}</div>;
};

export default App;
