export async function isElementVisible(element, timeout = 3000) {
    try {
        await element.waitFor({ state: 'visible', timeout: timeout });
        return true;
    } catch {
        return false;
    }
}
