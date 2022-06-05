# FUND ME DAPP ✅

This is a simple Backend implementation of a fund-me dApp from Patrick Alpha's Free Code Camp course.

In this project we are implementing a simple dapp that is used to send funds to users.

The workshop followed to complete this repo is [this one](https://github.com/PatrickAlphaC/hardhat-fund-me-fcc).

The repo that we are going to implement is like [this one](https://www.youtube.com/watch?v=gyMwXuJrbJQ&t=15996s).

## PROJECT

## CREATE SIMILAR PROJECT FROM SCRATCH

-   Install yarn and start hardhat project:

```bash
yarn
yarn add --dev hardhat
yarn hardhat
```

-   Install other hardhat dependencies:

```bash
yarn add --dev @nomiclabs/hardhat-waffle@^2.0.0 ethereum-waffle@^3.0.0 chai@^4.2.0 @nomiclabs/hardhat-ethers@^2.0.0 ethers@^5.0.0 @nomiclabs/hardhat-etherscan@^3.0.0 dotenv@^16.0.0 eslint@^7.29.0 eslint-config-prettier@^8.3.0 eslint-config-standard@^16.0.3 eslint-plugin-import@^2.23.4 eslint-plugin-node@^11.1.0 eslint-plugin-prettier@^3.4.0 eslint-plugin-promise@^5.1.0 hardhat-gas-reporter@^1.0.4 prettier@^2.3.2 prettier-plugin-solidity@^1.0.0-beta.13 solhint@^3.3.6 solidity-coverage@^0.7.16
```

-   Install ethers dependencies:

```bash
yarn add --dev @nomiclabs/hardhat-ethers@npm:hardhat-deploy-ethers ethers
```

-   Install chainlink dependencies and others:

```bash
yarn add --dev @chainlink/contracts hardhat-deploy
```

-   Include the following like inside [hardhat.config.js](https://github.com/JMariadlcs/fund-me-dapp/blob/main/hardhat.config.js):

```bash
require("hardhat-deploy");
```

## HOW TO DEPLOY

-   To deploy Mocked contracts (only done in local network or hardhat network):

```bash
yarn hardhat deploy --tags mocks
```

If you dont especify on which network you want to deploy the contract it will choose hardhat network (configured in [hardhat.config.js](https://github.com/JMariadlcs/fund-me-dapp/blob/main/hardhat.config.js)).

-   To deploy FundMe.sol contract (example done in Rinkeby network - just change network name):

```bash
yarn hardhat deploy --tags fundme --network rinkeby
```

## HOW TO TEST

Two types of tests are created for this project:

1. "Unit tests" inside [unit](https://github.com/JMariadlcs/fund-me-dapp/tree/main/test/unit): used to test functions separately
2. "Integration tests" inside [staging](https://github.com/JMariadlcs/fund-me-dapp/tree/main/test/staging): used to test entire contracts

To execute tests **unit tests** (on development chain):

```bash
yarn hardhat test
```

and to see test coverage:

```bash
yarn hardhat coverage
```

To execute tests **integrated tests** (on testnet):

```bash
yarn hardhat test --network rinkeby
```

and to see test coverage:

```bash
yarn hardhat coverage
```

## HOW TO RUN SCRIPTS LOCALLY

First, start local node

```bash
yarn hardhat node
```

Then, open a new terminal and execute scripts:

```bash
yarn hardhat run scripts/fund.js --network localhost
```

## REMINDERS

-   To setup an environment able to deploy on different networks check the code inside [helper-hardhat-config.js](https://github.com/JMariadlcs/fund-me-dapp/blob/main/helper-hardhat-config.js).

-   To test on localhost o hardhat network we can not use a PriceAggregator address because it does not exist. We need to deploy a MockAggregator that behaves as a real one. Check [test folder](https://github.com/JMariadlcs/fund-me-dapp/tree/main/contracts/test) and [00-deploy-mocks.js](https://github.com/JMariadlcs/fund-me-dapp/blob/main/deploy/00-deploy-mocks.js).

Some Mocks can be directly imported from [Chainlink Github repo](https://github.com/smartcontractkit/chainlink/tree/develop/contracts/src/v0.6/tests) as it is done in [MockV3Aggregator.sol](https://github.com/JMariadlcs/fund-me-dapp/blob/main/contracts/test/MockV3Aggregator.sol).

-   If you want to execute solhint to search for potential Solidity errors
    Execute:

```bash
yar solhint contracts/*.sol
```

-   If you want to use a text formarter:
    Check [.prettierrc](https://github.com/JMariadlcs/fund-me-dappp/blob/main/.prettierrc) and [.prettierignore](https://github.com/JMariadlcs/fund-me-dappp/blob/main/.prettierignore).

-   To automatically verify our contract on etherscan:

```bash
yarn add --dev @nomiclabs/hardhat-etherscan
```

Then, include inside [hardhat.config.js](https://github.com/JMariadlcs/fund-me-dapp/blob/main/helper-hardhat-config.js):

```bash
require("@nomiclabs/hardhat-etherscan");
```

Add `ETHERSCAN_API_KEY` inside `.env` file.

-   Use Hardhat Gas Reporter:

```bash
yarn add --dev hardhat-gas-reporter
```

Then, include inside [hardhat.config.js](https://github.com/JMariadlcs/fund-me-dapp/blob/main/helper-hardhat-config.js):

```bash
require("hardhat-gas-reporter");
```

-   Use Solidity Coverage:

```bash
yarn add --dev solidity-coverage
```

Then, include inside [hardhat.config.js](https://github.com/JMariadlcs/fund-me-dapp/blob/main/helper-hardhat-config.js):

```bash
require("solidity-cove");
```

In order to execute it:

```bash
yarn hardhat coverage
```

-   Use Hardhat Waffle:

```bash
yarn add @nomiclabs/hardhat-waffle
```

Then, include inside [hardhat.config.js](https://github.com/JMariadlcs/fund-me-dapp/blob/main/helper-hardhat-config.js):

```bash
require("@nomiclabs/hardhat-waffle");
```
