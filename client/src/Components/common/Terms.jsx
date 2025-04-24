import Footer from "./Footer";

const Terms = () => (
  <>
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-950 px-6 py-16 text-gray-800 dark:text-gray-200">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 transition-all duration-300">
        <h1 className="text-4xl font-extrabold mb-6 text-center">📄 Terms of Service</h1>
        <p className="text-lg mb-6 text-gray-700 dark:text-gray-300 text-center">
          By using AQUAMETER, you agree to our terms. Please read carefully.
        </p>

        <Section title="1. User Responsibilities">
          <li>You must be at least 13 years old to use AQUAMETER.</li>
          <li>Use the platform for lawful and ethical purposes only.</li>
          <li>You are responsible for maintaining the confidentiality of your login credentials.</li>
          <li>Do not misuse or attempt to disrupt our services.</li>
        </Section>

        <Section title="2. Data Submission">
          <li>All data you submit must be accurate and free of malicious content.</li>
          <li>You retain ownership of your data but grant us a license to use it for analytics, research, and improvements.</li>
          <li>Misuse (false reports, spam) may lead to suspension.</li>
        </Section>

        <Section title="3. Environmental Data Disclaimer">
          <li>Sensor data provided is for informational purposes only.</li>
          <li>We do not guarantee accuracy. Use at your own risk.</li>
        </Section>

        <Section title="4. Intellectual Property">
          <li>All AQUAMETER content (logos, graphics, code) is owned/licensed by us.</li>
          <li>Don't copy, distribute, or modify without consent.</li>
        </Section>

        <Section title="5. Account Termination">
          <li>We may suspend/terminate accounts violating terms or acting maliciously.</li>
          <li>You can request account/data deletion anytime.</li>
        </Section>

        <Section title="6. Changes to These Terms">
          <p>
            We may update these terms occasionally. Significant changes will be notified via email or in-app.
          </p>
        </Section>

        <p className="mt-8 text-center text-lg font-medium">
          Questions? Reach us at <span className="text-blue-600 dark:text-blue-400">legal@aquameter.io</span>
        </p>
      </div>
    </div>
    <Footer />
  </>
);

const Section = ({ title, children }) => (
  <section className="mb-8">
    <h2 className="text-2xl font-bold mb-3">{title}</h2>
    <ul className="list-disc pl-6 space-y-2 text-base text-gray-700 dark:text-gray-300">
      {children}
    </ul>
  </section>
);

export default Terms;
