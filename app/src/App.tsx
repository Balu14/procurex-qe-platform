
import { useState } from 'react'
import './App.css'

function App() {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(event: { preventDefault: () => void }) {
  event.preventDefault()
  setSubmitted(true)
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
            <strong>Form validation successful!</strong>
            <p>
              Your information passed the browser's required-field
              validation. Backend submission will be added later.
            </p>
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
                <option value="corporation">Corporation</option>
                <option value="individual">Individual / Sole proprietor</option>
                <option value="partnership">Partnership</option>
                <option value="trust">Trust / Estate</option>
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
                name="email"
                type="email"
                placeholder="name@company.com"
                required
              />
            </label>

            <label className="field">
              Contact phone *
              <input
                name="phone"
                type="tel"
                placeholder="Enter contact number"
                required
              />
            </label>

            <label className="field full-width">
              Street address *
              <input
                name="address"
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
                <option value="IN">India</option>
                <option value="CA">Canada</option>
                <option value="GB">United Kingdom</option>
                <option value="other">Other</option>
              </select>
            </label>
          </div>

          <div className="form-footer">
            <p>Your information will be used for supplier onboarding.</p>
            <button type="submit">Validate and continue →</button>
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
