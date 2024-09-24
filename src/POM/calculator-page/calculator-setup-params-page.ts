import { Locator, Page } from "@playwright/test";

export class CalculatorSetupPage {
  readonly page: Page;
  readonly oficialIncomeDropdownList: Locator;
  readonly monthlyPaymentInputField: Locator;
  readonly transferOPSSavingsInputField: Locator;
  readonly taxRefundInvestingDropdownList: Locator;
  readonly currentAgeInputField: Locator;
  readonly ageStartReceivegPaymentsInputField: Locator;
  readonly paymentDueYearInputField: Locator;
  readonly proceedCalculationButton: Locator;
  readonly investOPSSavingsCheckbox: Locator;

  constructor(page: Page) {
    this.page = page;
    this.oficialIncomeDropdownList = page.locator(
      '//*[@id="Ваш официальный доход"]',
    );
    this.monthlyPaymentInputField = page.getByLabel(
      "Сумма взносов в Программу в месяц",
    );
    this.transferOPSSavingsInputField = page.getByLabel(
      "Перевод накоплений ОПС в Программу",
    );
    this.taxRefundInvestingDropdownList = page.getByRole("button", {
      name: "Налоговый вычет",
    });
    this.currentAgeInputField = page
      .locator("div")
      .filter({ hasText: /^Ваш возраст$/ })
      .locator("input");

    this.ageStartReceivegPaymentsInputField = page
      .locator("div")
      .filter({ hasText: /^Возраст начала получения выплат$/ })
      .locator("input");

    this.paymentDueYearInputField = page
      .locator("div")
      .filter({ hasText: /^Срок срочной выплаты$/ })
      .locator("input");

    this.proceedCalculationButton = page.getByRole("button", {
      name: "Рассчитать",
    });

    this.investOPSSavingsCheckbox = page.getByLabel("Учитывать накопления ОПС");
  }

  async chooseIncomeOption(option: string) {
    await this.oficialIncomeDropdownList.click();
    await this.page.getByText(option).click();
  }

  async setMonthlyPayment(sum: string) {
    await this.monthlyPaymentInputField.fill(sum);
  }

  async setTransferOPSSavings(sum: string) {
    await this.transferOPSSavingsInputField.fill(sum);
  }

  async chooseTaxRefundInvestingOption(option: string) {
    await this.taxRefundInvestingDropdownList.click();
    await this.page.getByText(option, { exact: true }).last().click();
  }

  async chooseGender(gender: string) {
    await this.page
      .locator("label")
      .filter({ hasText: `${gender}` })
      .click();
  }

  async setCurrentAge(age: string) {
    await this.currentAgeInputField.fill(age);
  }

  async setAgeStartReceivePayments(age: string) {
    await this.ageStartReceivegPaymentsInputField.fill(age);
  }

  async setPaymentDueYears(years: string) {
    await this.paymentDueYearInputField.fill(years);
  }

  async clickProceedCalculationButton() {
    await this.proceedCalculationButton.click();
  }

  async checkInvestOPSSavingsCheckbox() {
    await this.investOPSSavingsCheckbox.check();
  }

  async uncheckInvestOPSSavingsCheckbox() {
    await this.investOPSSavingsCheckbox.uncheck();
  }

  async isCheckedInvestOPSSavingsCheckbox() {
    return (await this.investOPSSavingsCheckbox.isChecked()) ? true : false;
  }
}
