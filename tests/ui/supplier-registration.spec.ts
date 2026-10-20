
import { test, expect } from '@playwright/test';
import { SupplierRegistrationPage } from '../../src/pages/SupplierRegistrationPage';

test('should display the supplier registration form', async ({ page }) => {
  const supplierRegistrationPage = new SupplierRegistrationPage(page);
  await supplierRegistrationPage.navigate();

  await supplierRegistrationPage.expectRegistrationHeadingVisible();
  await supplierRegistrationPage.expectRequiredCompanyInformationFieldsVisible();

  await expect(supplierRegistrationPage.getValidateAndContinueButton()).toBeVisible();
});

test('should prevent submission when required fields are empty', async ({ page }) => {
  const supplierRegistrationPage = new SupplierRegistrationPage(page);
  await supplierRegistrationPage.navigate();

  await supplierRegistrationPage.clickValidateAndContinue();

  expect(await supplierRegistrationPage.isCompanyNameValid()).toBe(false);
});
