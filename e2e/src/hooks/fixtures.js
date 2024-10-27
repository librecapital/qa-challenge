import { chromium } from "@playwright/test";
import initialSetup_pkg from '@synthetixio/synpress/commands/metamask.js';
import setExpectInstance_pkg from '@synthetixio/synpress/commands/playwright.js';
import prepareMetamask_pkg from "@synthetixio/synpress/helpers.js";
import { generateNewSeedPhrase } from "../helpers/seedPhraseGenerator.js";

const { setExpectInstance } = setExpectInstance_pkg;
const { initialSetup } = initialSetup_pkg;
const { prepareMetamask } = prepareMetamask_pkg;

async function metamaskConfig() {
  console.log('Starting Metamask configuration...');

  // required for synpress as it shares same expect instance as playwright
  console.log('Setting expect instance...');
  await setExpectInstance(global.expect);
  console.log('Expect instance set.');

  const seedPhrase = await generateNewSeedPhrase();
  console.log('Generated new seed phrase:', seedPhrase);

  // download metamask
  console.log('Downloading Metamask...');
  const metamaskPath = await prepareMetamask(
    process.env.METAMASK_VERSION || "10.25.0"
  );
  console.log(`Metamask downloaded to path: ${metamaskPath}`);

  // prepare browser args
  const browserArgs = [
    `--disable-extensions-except=${metamaskPath}`,
    `--load-extension=${metamaskPath}`,
    "--remote-debugging-port=9222",
    "--enable-logging",
    "--v=1",
  ];
  
  if (process.env.CI) {
    browserArgs.push("--disable-gpu");
    console.log('Added CI-specific browser arguments.');
  }
  
  if (process.env.HEADLESS_MODE) {
    browserArgs.push("--headless=new");
    console.log('Added headless mode browser arguments.');
  }
  
  // launch browser
  console.log('Launching browser with args:', browserArgs.join(' '));
  try {
    global.context = await chromium.launchPersistentContext("", {
      headless: false,
      args: browserArgs,
      timeout: 180000,
    });
    console.log('Browser launched successfully.');
  } catch (error) {
    console.error('Error launching browser:', error);
    throw error;
  }

  // wait for metamask
  console.log('Waiting for Metamask to load...');
  await context.pages()[0].waitForTimeout(2000);
  console.log('Metamask loaded.');

  // setup metamask
  console.log('Setting up Metamask...');
  await initialSetup(chromium, {
    secretWordsOrPrivateKey: seedPhrase,
    network: "sepolia",
    
    // This can be used when setting up custom networks in config.js
    // network: global.NETWORK,
    
    password: global.PASSWORD,
    enableAdvancedSettings: true,
  });
  console.log('Metamask setup completed.');

  // Uncomment if needed
  // await use(context);
  // await context.close();
  // await resetState();

  console.log('Metamask configuration completed successfully.');
}


export default metamaskConfig;