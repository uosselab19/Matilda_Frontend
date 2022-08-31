const HDWalletProvider = require('@truffle/hdwallet-provider');
const dotenv = require('dotenv');

module.exports = {
  /**
   * Networks define how you connect to your ethereum client and let you set the
   * defaults web3 uses to send transactions. If you don't specify one truffle
   * will spin up a development blockchain for you on port 9545 when you
   * run `develop` or `test`. You can ask a truffle command to use a specific
   * network from the command line, e.g
   *
   * $ truffle test --network <network-name>
   */

  networks: {
    development: {
      provider: () => {
        dotenv.config({path:'./dev.env'});
        return new HDWalletProvider(process.env.privateKey.slice(2), "https://api.baobab.klaytn.net:8651")
      },
      network_id: '1001', //Klaytn baobab testnet's network id
      gas: '8500000',
      gasPrice: null
    },

    production: {
      provider: () => {
        dotenv.config({path:'./prod.env'});
        return new HDWalletProvider(process.env.privateKey.slice(2), "https://public-node-api.klaytnapi.com/v1/cypress")
      },
      network_id: '8217', //Klaytn 
      gas: '8500000',
      gasPrice: null
    },
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.15",      // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
      // settings: {          // See the solidity docs for advice about optimization and evmVersion
      //  optimizer: {
      //    enabled: false,
      //    runs: 200
      //  },
      //  evmVersion: "byzantium"
      // }
    }
  },
};
