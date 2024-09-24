import { test, expect } from "@playwright/test";
import { CalculatorSetupPage } from "../POM/calculator-page/calculator-setup-params-page";
import { CalculatorResultPage } from "../POM/calculator-page/calculator-results-page";

const baseURL = "https://npfsberbanka.ru";
const calculatorURL = "/pds#calc";

test("Проверка корректности расчетов калькулятора", async ({ page }) => {
  const setupPage = new CalculatorSetupPage(page);
  const resultsPage = new CalculatorResultPage(page);
  await page.goto(`${baseURL}${calculatorURL}`);
  await setupPage.chooseIncomeOption("от 150 000 ₽");
  await setupPage.setMonthlyPayment("40 000 ₽");
  await setupPage.setTransferOPSSavings("100 000 ₽");
  await setupPage.chooseTaxRefundInvestingOption("Не вкладывать в Программу");
  await setupPage.chooseGender("Ж");
  await setupPage.setCurrentAge("40");
  await setupPage.setAgeStartReceivePayments("57");
  await setupPage.setPaymentDueYears("15");
  await setupPage.clickProceedCalculationButton();

  //проверки теста
  await expect.soft(resultsPage.totalSum).toHaveText("16 473 379 ₽");
  await expect
    .soft(await resultsPage.getNumberByTitle1stColumn("Ваши личные взносы"))
    .toHaveText("8 160 000 ₽");
  await expect
    .soft(
      await resultsPage.getNumberByTitle1stColumn(
        "Перевод пенсионных накоплений (ОПС)",
      ),
    )
    .toHaveText("100 000 ₽");
  await expect
    .soft(
      await resultsPage.getNumberByTitle1stColumn(
        "Софинансирование от государства",
      ),
    )
    .toHaveText("360 000 ₽");
  await expect
    .soft(await resultsPage.getNumberByTitle1stColumn("Инвестиционный доход"))
    .toHaveText("7 853 379 ₽");
  await expect
    .soft(await resultsPage.getNumberByTitle2ndColumn("Срочная"))
    .toHaveText("91 518 ₽");
  await expect
    .soft(await resultsPage.getNumberByTitle2ndColumn("Единовременная"))
    .toHaveText("16 473 379 ₽");
  await expect
    .soft(await resultsPage.getNumberByTitle2ndColumn("Пожизненная"))
    .toHaveText("46 451 ₽");
});

test("Проверка работы чек-бокса 'Учитывать накопления ОПС'", async ({
  page,
}) => {
  const setupPage = new CalculatorSetupPage(page);
  await test.step("Проверка базовых настроек страницы", async () => {
    await page.goto(`${baseURL}${calculatorURL}`);
    await expect(await setupPage.investOPSSavingsCheckbox).toBeChecked();
    await expect(await setupPage.transferOPSSavingsInputField).toBeEnabled();
  });
  await test.step("Проверка настроек при отжатом чекбоксе", async () => {
    await setupPage.uncheckInvestOPSSavingsCheckbox();
    await expect(await setupPage.investOPSSavingsCheckbox).not.toBeChecked();
    await expect(await setupPage.transferOPSSavingsInputField).toBeDisabled();
  });
  await test.step("Проверка работы повторного нажатия чекбокса", async () => {
    await setupPage.checkInvestOPSSavingsCheckbox();
    await expect(await setupPage.investOPSSavingsCheckbox).toBeChecked();
    await expect(await setupPage.transferOPSSavingsInputField).toBeEnabled();
  });
});
