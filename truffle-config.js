module.exports = {
  networks: {
    ganache: {				// 이름은 구별하기 쉽게 작성
      host: "127.0.0.1",
      port: 7545,			// ganache-cli 에 연결한다면 8545
      network_id: "5777",       // Any network (default: none)
    },
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.5.6",
      settings: {
        evmVersion: "constantinople",
      },
    },
  },
};