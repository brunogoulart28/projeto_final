import React, { Component } from "react";
import ArmazenadorContrato from "./contracts/ArmazenadorContrato.json";
import getWeb3 from "./getWeb3";
import { StyledDropZone } from "react-drop-zone";
import FileIcon, { defaultStyles } from "react-file-icon";
import "react-drop-zone/dist/styles.css";
import "bootstrap/dist/css/bootstrap.css";
import { Table } from "reactstrap";
import fileReaderPullStream from 'pull-file-reader';
import ipfs from './utils/ipfs';
import Moment from "react-moment";
import "./App.css";

class App extends Component {
  state = { armazenadorContrato: [], web3: null, accounts: null, contract: null };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = ArmazenadorContrato.networks[networkId];
      const instance = new web3.eth.Contract(
        ArmazenadorContrato.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }, this.getArquivos);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  getArquivos = async () => {
    //TODO:
    try{
        const {account, contract} = this.state;
        let quantidadeArquivos = await contract.methods
          .getLength().
          call({ from: account[0] });
        let arquivos = [];
        for (let i = 0; i < quantidadeArquivos; i++) {
          let arquivo = await contract.method.getArquivos(i).call({from: account[0]});
          arquivos.push(arquivos);
        }
        this.setState({armazenadorContrato: arquivos});
    } catch(error){
      console.log(error);
    }
  }

  onDrop = async (arquivo) =>{
    //TODO:
    try {
      const {contract, accounts} = this.state;
      const stream = fileReaderPullStream(arquivo);
      const resultado = await ipfs.add(stream);
      const timestamp = Math.round(+new Date() /1000);
      const tipo = arquivo.name.substr(arquivo.name.lastIndexOf(".")+1);
      debugger;
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <div className="container pt-5">
          <StyledDropZone onDrop={this.onDrop}/>
          <Table>
            <thead>
              <tr>
                <th width="5%" scope="row">Tipo</th>
                <th className="text-left">Nome do Arquivo</th>
                <th className="text-right">Data</th>
              </tr>
            </thead>
            <tbody  >
              <th><FileIcon size={30} extension="docx" {...defaultStyles.docx}/></th>
              <th className="text-left">Nome do arquivo.docx</th>
              <th className="text-right">10/09/2021</th>
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}

export default App;
