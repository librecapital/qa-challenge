import { Given, When, Then } from '@cucumber/cucumber';
import '../../../config/config.js';
import metamask from "@synthetixio/synpress/commands/metamask.js";
import MainPage from "../../pages/main.page.js";

Given('A randomly generated user with installed Metamask accesses the app page', async function () {
  await page.goto(`${global.BASE_URL}`);
});

Given('A user swithces network to {string}', async function (networkName) {
  await metamask.changeNetwork(networkName);
})

When('the user accepts connection notifications', async function () {
  await metamask.acceptAccess();
});

When('the user clicks the switch network button', async function () {
  await MainPage.switchNetworkConnectorButton.click();
});

When('the user confirms the switch network', async function () {
  await metamask.allowToSwitchNetwork();
});

Then('the page shows the account address', async function () {
  await expect(MainPage.connectedAsAddress).toBeVisible();
  let actualAccountAddress = (await metamask.getWalletAddress()).toLowerCase();
  let expectedAccountAddress = (await MainPage.connectedAsAddress.textContent()).toLowerCase();
  expectedAccountAddress = expectedAccountAddress.replace("connected as: ", "").trim();
  expect(actualAccountAddress).toEqual(expectedAccountAddress);
})

Then('the page shows the input address field', async function () {
  await expect(MainPage.addressInput).toBeVisible();
})

Then('the page doesnt show the input address field', async function () {
  await expect(MainPage.addressInput).not.toBeVisible();
})

Then('the page doesnt show a network error message', async function () {
  await expect(MainPage.networkError).not.toBeVisible();
})

Then('the page shows a network error message', async function () {
  await expect(MainPage.networkError).toBeVisible();
})

Then('the page shows the switch network button', async function () {  
  await expect(MainPage.switchNetworkConnectorButton).toBeVisible();
})
