import { BeforeAll, AfterAll, Before, After, setDefaultTimeout, Status } from "@cucumber/cucumber";
import metamaskConfig from "./fixtures.js";
import pkg from 'allure-cucumberjs';
import fs from 'fs';
import path from 'path';
import resetState_pkg from '@synthetixio/synpress/commands/synpress.js';
import { selectors } from "@playwright/test";

const { resetState } = resetState_pkg;
const { AllureRuntime } = pkg;
const allure = new AllureRuntime({ resultsDir: './allure-results' });

setDefaultTimeout(120 * 1000);

BeforeAll(async function () {
});

Before(async function () {
    selectors.setTestIdAttribute("data-test");
    await metamaskConfig();
    global.page = await global.context.pages()[0];
    const mainWindow = global.page;
    await mainWindow.bringToFront();
});

function cleanMessage(message) {
    if (!message) return '';
    return message
        .replace(/\x1b\[.*?m/g, '') 
        .replace(/[\u001b\u009b][[()#;?]*(?:(?:[a-zA-Z\d]*(?:;[-a-zA-Z\d\/#&.:=?%@~_]*)?)?\u0007)/g, '')  
        .trim();
}

After(async function (testCase) {
    console.log('Starting After hook...');
    if (testCase.result.status === Status.FAILED) {
        try {
            const screenshotPath = path.resolve(`./allure-results/${testCase.pickle.name}.png`);
            await global.page.screenshot({ path: screenshotPath, fullPage: true });

            if (fs.existsSync(screenshotPath)) {
                const screenshotContent = fs.readFileSync(screenshotPath);
                this.attach(screenshotContent, "image/png");
                fs.unlinkSync(screenshotPath);
            }

            const errorMessage = cleanMessage(testCase.result.message || testCase.result.toString());
            console.error('Test case failed:', errorMessage);

            if (testCase.result.exception) {
                this.attach(`Stack Trace: ${testCase.result.exception.stack}`, "text/plain");
            }

        } catch (error) {
            console.error("Error during screenshot handling:", error);
        }
    }
    await global.page.close();
    await resetState();
    await global.context.close();
});

AfterAll(async function () {
});
