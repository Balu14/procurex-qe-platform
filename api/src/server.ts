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

app.get('/health', (_req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'ProcureX API is running',
  });
});


app.post('/api/suppliers', (req, res) => {
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

  return res.status(201).json({
    message: 'Supplier registration validated successfully',
    supplier: result.data,
  });
});

app.listen(PORT, () => {
  console.log(`ProcureX API running at http://localhost:${PORT}`);
});
