import React from "react";
import PropTypes from "prop-types";
import * as Styles from "./session.styles";

const SessionComponent = (props) => {
  return (
    <Styles.Square>
      <Styles.Session>{props.children}</Styles.Session>
    </Styles.Square>
  );
};

export default SessionComponent;
