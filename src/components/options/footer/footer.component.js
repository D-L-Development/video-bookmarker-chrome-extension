import React from "react";

const FooterComponent = (props) => {
    return(
      <div id="Footer-Background">
          <div id="Github">
              <div id="Copyright-Icon"/>
              <div>Copyright Info</div>
          </div>
          <div id="Github">
              <div id="Github-Icon"/>
              <div><a href="">Github</a></div>
          </div>
          <div id="Contact">
              <div id="Contact-Icon"/>
              <div><a href="">Contact Developers</a></div>
          </div>
      </div>
    );
};

export default FooterComponent;