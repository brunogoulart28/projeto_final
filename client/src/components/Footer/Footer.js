import React from "react";

import "./Footer.css";
import Logo_unesc from "../../imagens/logo_unesc.jpeg";

const Footer = () => (
  <footer className="app-footer">
    <img src={Logo_unesc} />
    <span className="app-footer__message">
      Projeto de Conclusão de Curso em Ciência da Computação da Universidade do
      Extremo Sul Catarinense, UNESC.
    </span>
  </footer>
);

export default Footer;
