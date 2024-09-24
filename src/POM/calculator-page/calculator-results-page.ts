import { Locator, Page } from "@playwright/test";
export class CalculatorResultPage {
  readonly page: Page;
  readonly concludeContractButton: Locator;
  readonly totalSum: Locator;

  constructor(page: Page) {
    this.page = page;
    this.concludeContractButton = page.getByRole("button", {
      name: "Заключить договор",
    });
    this.totalSum = page.locator(
      '//div/p[@class ="CalculatorSection_sum__cOCAT"]',
    );
  }

  // чтобы не писать аналогичный длинный локатор на каждую цифру в первой колонке
  async getNumberByTitle1stColumn(title: string): Promise<Locator> {
    return await this.page.locator(
      `//div/p[contains(text(),'${title}')]/parent::div/p[contains(@class, "CalculatorSection_noWrap__HijGN")]`,
    );
  }

  // чтобы не писать аналогичный длинный локатор на каждую цифру во второй колонке
  async getNumberByTitle2ndColumn(title: string): Promise<Locator> {
    return await this.page.locator(
      `//div/p[contains(text(),'${title}')]/ancestor::div[contains(@class, "CalculatorSection_item__860wt")]/p[contains(@class, "CalculatorSection_noWrap__HijGN")]`,
    );
  }
}
