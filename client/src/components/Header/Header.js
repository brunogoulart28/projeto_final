import React, { Component } from "react";

import "./Header.css";
import Logo_curso from "../../imagens/logo_curso.jpeg";

const Header = () => (
  <header className="app-header">
    <img src={Logo_curso} />
    <h1>Armazenador de Documentos</h1>
  </header>
);

export default Header;
