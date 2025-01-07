import React from "react";

const Textarea = ({ error, ...rest }) => {
  return <textarea className="form-control" cols={30} rows={4} {...rest} />;
};

export default Textarea;
