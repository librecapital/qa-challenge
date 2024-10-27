import metamask from "@synthetixio/synpress/commands/metamask.js";
class MainPage {

	// LOCATORS
	
	//base locators
	get pageDiv() {
		return page.getByTestId('AppPage__Div__content');
	}

	// //error state locators
	get switchNetworkConnectorButton() {
		return page.getByTestId('MetaMaskConnector__Button__connect');
	}
	
	get networkError() {
		return page.getByTestId('MetaMaskConnector__Div__error');
	}
	
	// Logged-in state locators
	get connectedAsAddress() {
		return page.getByTestId('MetaMaskConnector__Div__connect');
	}
	
	get addressForm() {
		return page.getByTestId('InputAddress__Form__address');
	}
	
	get addressInput() {
		return page.getByTestId('InputAddress__Input__addressValue');
	}
	
	get submitButton() {
		return page.getByTestId('InputAddress__Button__submit');
	}
	
	get exampleToken() {
		return page.getByTestId('InputAddress__Span__exampleTokenLink');
	}

	get tokenBalance() {
		return page.getByTestId('TokenBalance__Div__balanceAmount');
	}

	get tokenDepositInput() {
		return page.getByTestId('DepositToken__Input__depositAmount');
	}

	get tokenDepositButton() {
		return page.getByTestId('DepositToken__Button__deposit');
	}

	get tokenDepositError() {
		return page.getByTestId('DepositToken__Div__error');
	}

	get tokenDepositHistoryTable() {
		return page.getByTestId('DepositHistory__Table__history');
	}

	get getMoreTokensButton() {
		return page.getByTestId('TokenBalance__Div__getMoreExampleTokensAction');
	}

	get totalHisoryTable() {
		return page.locator('tfoot tr td.text-right');
	}

	 // Methods

	 async verifyElementsVisibleForState(state) {
		const baseElements = [
			this.pageDiv
		];
		const stateElements = {
			loggedInState: [
				this.connectedAsAddress,
				this.addressForm,
				this.addressInput,
				this.submitButton,
				this.exampleToken
			],
			errorState: [
				this.switchNetworkConnectorButton,
				this.networkError
			]
		};
		if (!stateElements[state]) {
			throw new Error(`Unknown state: ${state}`);
		}
		const elementsToVerify = [...baseElements, ...stateElements[state]];
		for (const element of elementsToVerify) {
			await expect(element).toBeVisible();
		}
	}

    async getMoreTokens() {
		await page.waitForTimeout(5000);
        await this.getMoreTokensButton.click();
		await metamask.confirmTransaction();
        const oldTokenBalance = parseFloat(await this.tokenBalance.textContent());
  		const expectedTokenBalance = (oldTokenBalance + 100).toString();
  		await expect(this.tokenBalance).toHaveText(expectedTokenBalance, { timeout: 40000 });
    }
}

export default new MainPage();