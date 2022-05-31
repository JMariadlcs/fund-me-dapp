# FUND ME DAPP ✅
This is a simple Backend implementation of a fund-me dApp from Patrick Alpha's Free Code Camp course.

In this project we are implementing a simple dapp that is used to send funds to users.

The workshop followed to complete this repo is [this one](https://github.com/PatrickAlphaC/hardhat-fund-me-fcc).

The repo that we are going to implement is like [this one](https://www.youtube.com/watch?v=gyMwXuJrbJQ&t=15996s).

## Project

## Requirements for creating similar projects from scratch

- Install yarn and start hardhat project:
```bash
yarn 
yarn add --dev hardhat
yarn hardhat
```

- Install other hardhat dependencies:
```bash
yarn add --dev @nomiclabs/hardhat-waffle@^2.0.0 ethereum-waffle@^3.0.0 chai@^4.2.0 @nomiclabs/hardhat-ethers@^2.0.0 ethers@^5.0.0 @nomiclabs/hardhat-etherscan@^3.0.0 dotenv@^16.0.0 eslint@^7.29.0 eslint-config-prettier@^8.3.0 eslint-config-standard@^16.0.3 eslint-plugin-import@^2.23.4 eslint-plugin-node@^11.1.0 eslint-plugin-prettier@^3.4.0 eslint-plugin-promise@^5.1.0 hardhat-gas-reporter@^1.0.4 prettier@^2.3.2 prettier-plugin-solidity@^1.0.0-beta.13 solhint@^3.3.6 solidity-coverage@^0.7.16
```

- Install chainlink dependencies and others:
```bash
yarn add --dev @chainlink/contracts hardhat-deploy
```

- Include the following like inside [hardhat.config.js](https://github.com/JMariadlcs/fund-me-dapp/blob/main/hardhat.config.js)
```bash
require("hardhat-deploy");
```

## Reminders
- If you want to execute solhint to search for potential Solidity errors

Execute: 
```bash
yar solhint contracts/*.sol
```

- If you want to use a text formarter:
Check [.prettierrc](https://github.com/JMariadlcs/fund-me-dappp/blob/main/.prettierrc) and [.prettierignore](https://github.com/JMariadlcs/fund-me-dappp/blob/main/.prettierignore).