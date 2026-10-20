import { expect, test } from '@playwright/test';

const API_BASE_URL = process.env.API_BASE_URL ?? 'http://127.0.0.1:3000';

type HealthResponse = {
  status: string;
  message: string;
};

type SupplierValidationResponse = {
  message: string;
  errors: Array<{
    field: string;
    message: string;
  }>;
};

test('GET /health reports that the API is running', async ({ request }) => {
  const response = await request.get(`${API_BASE_URL}/health`);

  expect(response.status()).toBe(200);

  const body = (await response.json()) as HealthResponse;
  expect(body).toEqual({
    status: 'OK',
    message: 'ProcureX API is running',
  });
});

test('POST /api/suppliers rejects invalid supplier data', async ({ request }) => {
  const response = await request.post(`${API_BASE_URL}/api/suppliers`, {
    data: {
      companyName: 'A',
      supplierType: 'domestic',
      taxClassification: 'Corporation',
      taxId: 'TAX-123',
      contactEmail: 'not-an-email',
      contactPhone: '555-0100',
      streetAddress: '1 Test Street',
      city: 'Test City',
      country: 'US',
    },
  });

  expect(response.status()).toBe(400);

  const body = (await response.json()) as SupplierValidationResponse;
  expect(body.message).toBe('Supplier registration validation failed');
  expect(body.errors).toEqual(
    expect.arrayContaining([
      {
        field: 'companyName',
        message: 'Company name must contain at least 2 characters',
      },
      {
        field: 'contactEmail',
        message: 'A valid email address is required',
      },
    ]),
  );
});
