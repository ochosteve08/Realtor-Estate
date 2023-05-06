import React from 'react'
import {  BsTwitter, BsGithub} from 'react-icons/bs'
import { FiMail } from "react-icons/fi";
import { FaLinkedinIn } from 'react-icons/fa'
import './Footer.css'

const Footer = () => {
  
    const today = new Date();
  return (
    <footer>
      <div>
        <a href="https://twitter.com/Prof_Ochosteve" target={"_blank"}>
          <BsTwitter />
        </a>
        <a href="mailto:stephenujah@yahoo.com">
          <FiMail />
        </a>
        <a href="https://www.linkedin.com/in/ujah-stephen-4a3a8782/">
          <FaLinkedinIn />
        </a>

        <a href="https://github.com/ochosteve08">
          <BsGithub />
        </a>
      </div>
      <p style={{ margin: "20px" }}>Copyright &copy; {today.getFullYear()} </p>
    </footer>
  );
}
export default Footer