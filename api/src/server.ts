import { pool } from './db.js';
import { z } from 'zod';
import express from 'express';
import cors from 'cors';

const supplierSchema = z.object({
  companyName: z.string().trim().min(2, 'Company name must contain at least 2 characters'),
  supplierType: z.enum(['domestic', 'international']),
  taxClassification: z.enum([
    'Corporation',
    'Individual / Sole proprietor',
    'Partnership',
    'Trust / Estate',
  ]),
  taxId: z.string().trim().min(1, 'Tax ID is required'),
  contactEmail: z.string().trim().email('A valid email address is required'),
  contactPhone: z.string().trim().min(1, 'Contact phone is required'),
  streetAddress: z.string().trim().min(1, 'Street address is required'),
  city: z.string().trim().min(1, 'City is required'),
  country: z.enum(['US', 'India', 'Canada', 'UK', 'Other']),
});

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(cors());
app.use(express.json());

app.get('/health/db', async (_req, res) => {
  try {
    await pool.query('SELECT 1');
    res.status(200).json({
      status: 'OK',
      message: 'ProcureX database connection is healthy',
    });
  } catch (error) {
    console.error('Database connection check failed:', error);
    res.status(503).json({
      status: 'ERROR',
      message: 'Database connection failed',
    });
  }
});

app.get('/health', (_req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'ProcureX API is running',
  });
});



app.post('/api/suppliers', async (req, res) => {
  const result = supplierSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      message: 'Supplier registration validation failed',
      errors: result.error.issues.map((issue) => ({
        field: issue.path.join('.'),
        message: issue.message,
      })),
    });
  }

  const supplier = result.data;

  try {
    const dbResult = await pool.query(
      `INSERT INTO suppliers (
        company_name,
        supplier_type,
        tax_classification,
        tax_id,
        contact_email,
        contact_phone,
        street_address,
        city,
        country
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING id, company_name, contact_email, created_at`,
      [
        supplier.companyName,
        supplier.supplierType,
        supplier.taxClassification,
        supplier.taxId,
        supplier.contactEmail,
        supplier.contactPhone,
        supplier.streetAddress,
        supplier.city,
        supplier.country,
      ],
    );

    return res.status(201).json({
      message: 'Supplier registered successfully',
      supplier: dbResult.rows[0],
    });
  } catch (error) {
    console.error('Supplier registration failed:', error);

    return res.status(500).json({
      message: 'Unable to register supplier at this time',
    });
  }
});

app.listen(PORT, () => {
  console.log(`ProcureX API running at http://localhost:${PORT}`);
});
