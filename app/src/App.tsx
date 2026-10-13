
import { useState, type FormEvent } from 'react'
import './App.css'

type ApiResponse = {
  message?: string
  errors?: Array<{
    field: string
    message: string
  }>
}

function App() {
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [validationErrors, setValidationErrors] = useState<
    Array<{ field: string; message: string }>
  >([])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    setSubmitted(false)
    setErrorMessage('')
    setValidationErrors([])
    setSubmitting(true)

    const formData = new FormData(event.currentTarget)

    const payload = {
      companyName: String(formData.get('companyName') ?? ''),
      supplierType: String(formData.get('supplierType') ?? ''),
      taxClassification: String(
        formData.get('taxClassification') ?? '',
      ),
      taxId: String(formData.get('taxId') ?? ''),
      contactEmail: String(formData.get('contactEmail') ?? ''),
      contactPhone: String(formData.get('contactPhone') ?? ''),
      streetAddress: String(formData.get('streetAddress') ?? ''),
      city: String(formData.get('city') ?? ''),
      country: String(formData.get('country') ?? ''),
    }

    try {
      const response = await fetch(
        'http://localhost:3000/api/suppliers',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        },
      )

      const result = (await response.json()) as ApiResponse

      if (!response.ok) {
        setErrorMessage(
          result.message ?? 'Supplier registration failed.',
        )
        setValidationErrors(result.errors ?? [])
        return
      }

      setSubmitted(true)
    } catch {
      setErrorMessage(
        'Unable to connect to the server. Please check that the ProcureX API is running and try again.',
      )
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="page">
      <header className="topbar">
        <a className="brand" href="/" aria-label="ProcureX home">
          <span className="brand-mark">P</span>
          <span>ProcureX</span>
        </a>
        <span className="portal-label">SUPPLIER PORTAL</span>
      </header>

      <section className="welcome">
        <p className="eyebrow">SUPPLIER ONBOARDING</p>
        <h1>Register your company</h1>
        <p>
          Provide your company information to begin the supplier
          registration process.
        </p>
      </section>

      <section className="form-card">
        <div className="form-heading">
          <div>
            <h2>Company information</h2>
            <p>Fields marked with * are required.</p>
          </div>
          <span className="step-label">STEP 1 OF 2</span>
        </div>

        {submitted && (
          <div className="success-message" role="status">
            <strong>Supplier registration validated successfully!</strong>
            <p>
              The ProcureX API accepted your supplier information.
              Database saving will be added in a later step.
            </p>
          </div>
        )}

        {errorMessage && (
          <div className="error-message" role="alert">
            <strong>{errorMessage}</strong>

            {validationErrors.length > 0 && (
              <ul>
                {validationErrors.map((error, index) => (
                  <li key={`${error.field}-${index}`}>
                    <strong>{error.field}:</strong> {error.message}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <label className="field">
              Company name *
              <input
                name="companyName"
                type="text"
                placeholder="Enter your registered company name"
                required
                minLength={2}
              />
            </label>

            <label className="field">
              Supplier type *
              <select name="supplierType" defaultValue="" required>
                <option value="" disabled>Select supplier type</option>
                <option value="domestic">Domestic</option>
                <option value="international">International</option>
              </select>
            </label>

            <label className="field">
              Tax classification *
              <select name="taxClassification" defaultValue="" required>
                <option value="" disabled>Select classification</option>
                <option value="Corporation">Corporation</option>
                <option value="Individual / Sole proprietor">
                  Individual / Sole proprietor
                </option>
                <option value="Partnership">Partnership</option>
                <option value="Trust / Estate">Trust / Estate</option>
              </select>
            </label>

            <label className="field">
              Tax ID *
              <input
                name="taxId"
                type="text"
                placeholder="Enter tax identification number"
                required
              />
            </label>

            <label className="field">
              Contact email *
              <input
                name="contactEmail"
                type="email"
                placeholder="name@company.com"
                required
              />
            </label>

            <label className="field">
              Contact phone *
              <input
                name="contactPhone"
                type="tel"
                placeholder="Enter contact number"
                required
              />
            </label>

            <label className="field full-width">
              Street address *
              <input
                name="streetAddress"
                type="text"
                placeholder="Enter street address"
                required
              />
            </label>

            <label className="field">
              City *
              <input
                name="city"
                type="text"
                placeholder="Enter city"
                required
              />
            </label>

            <label className="field">
              Country *
              <select name="country" defaultValue="" required>
                <option value="" disabled>Select country</option>
                <option value="US">United States</option>
                <option value="India">India</option>
                <option value="Canada">Canada</option>
                <option value="UK">United Kingdom</option>
                <option value="Other">Other</option>
              </select>
            </label>
          </div>

          <div className="form-footer">
            <p>Your information will be used for supplier onboarding.</p>
            <button type="submit" disabled={submitting}>
              {submitting ? 'Submitting...' : 'Validate and continue →'}
            </button>
          </div>
        </form>
      </section>

      <footer className="footer">
        ProcureX QE Platform · Supplier Registration
      </footer>
    </main>
  )
}

export default App
