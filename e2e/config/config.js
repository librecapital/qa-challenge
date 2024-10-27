import { fileURLToPath } from 'url';
import path from 'path';
import dotenv from 'dotenv';
import { expect } from "@playwright/test";
import { defineConfig } from '@playwright/test';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.resolve(__dirname, '.env');
dotenv.config({ path: envPath });

const dAppURL = process.env.APP_URL || 'http://localhost:3000';


export default defineConfig({
  use: {
    testIdAttribute: 'data-test'
  }
});

Object.assign(global, {
    expect: expect,
    BASE_URL: dAppURL,
    SECRET: process.env.secretWordsOrPrivateKey,
    PASSWORD: process.env.password,
    TEST_ACCOUNT: process.env.testingAccount,
    ADMIN_ACCOUNT: process.env.adminPKAccount
});
