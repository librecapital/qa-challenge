
## Installation

- Clone the project

- Install dependencies `npm i` in the terminal or run the `npm:install` script

- Create a `.env` file inside `config` folder containing your MetaMask wallet address information (seed & password) as follows. Example:

```
secretWordsOrPrivateKey=test test test test test test test test test test test junk
password=Tester@1234
testingAccount={paste PK for a wallet with sepolia test token balance}
```

* Please note that this is sensitive information, even if it is stored locally in the `.env` file. If shared anyhow you could potentially loose all your funds. Ensure the provided wallet is for testing purposes only.

- Metamask version can be provided either in the `.env` file or in the `src/hooks/fixtures.js` file as follows:

```    
const metamaskPath = await prepareMetamask(
    process.env.METAMASK_VERSION || "10.25.0"
);
```

## Running Tests 🚀  

- Execute `npm run test` script to run the tests using chromium

- Running tests with @tags  `npm run test -- --tags @test`

## Reporting 📊
- Generated reports will be located at `allure-report` folder


