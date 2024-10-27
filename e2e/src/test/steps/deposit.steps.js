import { Given, When, Then } from '@cucumber/cucumber';
import '../../../config/config.js';
import metamask from "@synthetixio/synpress/commands/metamask.js";
import MainPage from "../../pages/main.page.js";

let initialRowCount;
let initialTotalAmount;
let depositAmount;

Given('A test user with installed Metamask accesses the app page', async function () {
  await metamask.importAccount(`${global.TEST_ACCOUNT}`)
  await page.goto(`${global.BASE_URL}`);
});

When('the token balance is increased', async function () {
  const oldTokenBalance = parseFloat(await MainPage.tokenBalance.textContent());
  const expectedTokenBalance = (oldTokenBalance + 100).toString();
  await expect(MainPage.tokenBalance).toHaveText(expectedTokenBalance, { timeout: 40000 });
});

When('the user clicks the Get more tokens link', async function () {
  await page.waitForTimeout(5000); //for some reason the page needs to wait for few seconds beofre clicking on minting, if done straight away transaction fails
  await MainPage.getMoreTokensButton.click();
});

When('the user accepts the transaction', async function () {
  await metamask.confirmTransaction();
});

When('the user approve the deposit', async function () {  
  await metamask.confirmPermissionToSpend();
  await page.waitForTimeout(5000);
  await metamask.confirmTransaction();
});

When('the userinputs {string} in the deposit field', async function (amount) {  
  await MainPage.tokenDepositInput.fill(amount);
});

Then('the page shows the token balance {string}', async function (expectedBalance) {
  const balanceRegex = new RegExp(`^${expectedBalance}(\\.\\d+)?$`);
  await expect(MainPage.tokenBalance).toHaveText(balanceRegex, { timeout: 40000 });
});

Then('the deposit input shows an error', async function () {
  await expect(MainPage.tokenDepositError).toBeVisible();
});

Then('the deposit button is not visible', async function () {
  await expect(MainPage.tokenDepositButton).not.toBeVisible();
});

Then('the deposit button is disabled', async function () {
  await expect(MainPage.tokenDepositButton).toBeDisabled();
});

Then('the deposit button is visible', async function () {
  await expect(MainPage.tokenDepositButton).toBeVisible();
});

Then('the user enter the max amount of tokens in the amount field', async function () {
// this step contains a workaround for a bug I spoted, the balance cannot be 0, becasue for some reason the ui displays it as "1.6e-15"
  let tokenBalance = parseFloat(await MainPage.tokenBalance.textContent());
  if (tokenBalance < 2) {
    console.log('Token balance is less than 2, getting more tokens...');
    await MainPage.getMoreTokens();
    tokenBalance = parseFloat(await MainPage.tokenBalance.textContent());
  }
  depositAmount = tokenBalance - 1;
  await MainPage.tokenDepositInput.fill(depositAmount.toString());
});

Then('the user clicks the deposit button', async function () {
  await MainPage.tokenDepositButton.click();
});

Then('the user captures the current deposit history', async function () {
  initialRowCount = await page.locator('tbody tr').count();
  initialTotalAmount = parseInt(await page.locator('tfoot tr td.text-right').textContent(), 10);
});

Then('the user confirms the deposit history table was updated', async function () {
  await expect(page.locator('tbody tr')).toHaveCount(initialRowCount + 1, { timeout: 10000 });
  const expectedTotalAmount = initialTotalAmount + depositAmount;
  await expect(page.locator('tfoot tr td.text-right')).toHaveText(expectedTotalAmount.toString(), { timeout: 10000 });
});


