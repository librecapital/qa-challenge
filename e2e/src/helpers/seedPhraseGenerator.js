import { english, generateMnemonic } from 'viem/accounts';

export async function generateNewSeedPhrase() {
    return generateMnemonic(english);
}