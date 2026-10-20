import { expect, type Locator, type Page } from '@playwright/test';

export class SupplierRegistrationPage {
  private readonly page: Page;
  private readonly registrationHeading: Locator;
  private readonly companyInformationHeading: Locator;
  private readonly companyNameField: Locator;
  private readonly supplierTypeField: Locator;
  private readonly contactEmailField: Locator;
  private readonly countryField: Locator;
  private readonly validateAndContinueButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.registrationHeading = page.getByRole('heading', {
      name: 'Register your company',
    });
    this.companyInformationHeading = page.getByRole('heading', {
      name: 'Company information',
    });
    this.companyNameField = page.getByLabel('Company name *');
    this.supplierTypeField = page.getByLabel('Supplier type *');
    this.contactEmailField = page.getByLabel('Contact email *');
    this.countryField = page.getByLabel('Country *');
    this.validateAndContinueButton = page.getByRole('button', {
      name: /Validate and continue/,
    });
  }

  async navigate(): Promise<void> {
    await this.page.goto('/');
  }

  async expectRegistrationHeadingVisible(): Promise<void> {
    await expect(this.registrationHeading).toBeVisible();
  }

  async expectRequiredCompanyInformationFieldsVisible(): Promise<void> {
    await expect(this.companyInformationHeading).toBeVisible();
    await expect(this.companyNameField).toBeVisible();
    await expect(this.supplierTypeField).toBeVisible();
    await expect(this.contactEmailField).toBeVisible();
    await expect(this.countryField).toBeVisible();
  }

  async clickValidateAndContinue(): Promise<void> {
    await this.validateAndContinueButton.click();
  }

  async isCompanyNameValid(): Promise<boolean> {
    return this.companyNameField.evaluate((element) =>
      (element as HTMLInputElement).validity.valid,
    );
  }

  getValidateAndContinueButton(): Locator {
    return this.validateAndContinueButton;
  }
}
