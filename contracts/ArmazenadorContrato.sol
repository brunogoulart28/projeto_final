pragma solidity ^0.5.0;

    contract ArmazenadorContrato {
        struct Arquivo {
            string hash;
            string nomeArquivo;
            string tipoArquivo;
            uint data;
        }

        mapping(address => Arquivo[]) arquivos;

        function add(string memory _hash, string memory _nomeArquivo, string memory _tipoArquivo, uint _data) public 
        {
            arquivos[msg.sender]
            .push(Arquivo({hash: _hash, nomeArquivo: _nomeArquivo, tipoArquivo: _tipoArquivo, data: _data}));
        }

        function getArquivo(uint _index) public view returns(string memory, string memory, string memory, uint) 
        {
            Arquivo memory arquivo = arquivos[msg.sender][_index];
            return (arquivo.hash, arquivo.nomeArquivo, arquivo.tipoArquivo, arquivo.data);
        }

        function getLength() public view returns(uint) 
        {
            return arquivos[msg.sender].length;
        }
    }




