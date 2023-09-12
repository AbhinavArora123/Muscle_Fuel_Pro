import React from "react";
import "./Contact.css";
import { Button } from "@mui/material";


const Contact = () => {
  return (
    <div className="contactContainer">
      <a className="mailBtn" href="mailto:mymailforabhi@gmail.com">
        <Button>Contact: musclefuelpro@gmail.com</Button>
        <h4>3248238490</h4>
      </a>
    </div>
  );
};

export default Contact;