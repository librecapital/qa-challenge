import { When, Then } from '@cucumber/cucumber';
import '../../../config/config.js';
import MainPage from "../../pages/main.page.js";


When('the user enters the address {string} in the input address field', async function (tokenAddress) {
  await MainPage.addressInput.fill(tokenAddress);
});

When('the user clicks the Submit button', async function () {
  await MainPage.submitButton.click();
});

When('the user clicks the example token link', async function () {
  await MainPage.exampleToken.click();
});

Then('the submit button is disabled', async function () {
  await expect(MainPage.submitButton).toBeDisabled();
})

Then('the page shows the address balance for the selected token', async function () {
  await expect(MainPage.tokenBalance).toBeVisible();
})

Then('the page shows the table of the deposit history for the selected token', async function () {
  await expect(MainPage.tokenDepositHistoryTable).toBeVisible();
})
