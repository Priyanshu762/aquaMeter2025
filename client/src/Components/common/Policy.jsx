import Footer from './Footer';

const Policy = () => (
  <>
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-950 px-6 py-16 text-gray-800 dark:text-gray-200">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 transition-all duration-300">
        <h1 className="text-4xl font-extrabold mb-6 text-center">🔐 Privacy Policy</h1>
        <p className="text-lg mb-6 text-center text-gray-700 dark:text-gray-300">
          At <span className="font-semibold text-blue-600 dark:text-blue-400">AQUAMETER</span>, we are committed to safeguarding your personal data. This policy explains how we collect, use, and store your information.
        </p>

        <Section title="📋 Information We Collect">
          <li><strong>User Account Data:</strong> Name, email, and role (Admin, NGO, Citizen).</li>
          <li><strong>Sensor Data:</strong> Water quality metrics like turbidity, temperature, pH, and TDS.</li>
          <li><strong>Complaints & Reports:</strong> Environmental reports and complaint data.</li>
          <li><strong>Usage Data:</strong> Interaction history such as visited pages and clicked features.</li>
        </Section>

        <Section title="🔐 How We Use Your Data">
          <li>To manage personalized dashboards (Admins, NGOs, Citizens).</li>
          <li>To analyze water trends and send real-time alerts.</li>
          <li>To display live conditions on maps and analytics pages.</li>
          <li>To verify NGOs and process environmental applications.</li>
          <li>To improve platform performance and features.</li>
        </Section>

        <Section title="🛡️ Data Security">
          <p>
            We use encryption and secure servers to store your data. Only authorized personnel have access to sensitive information.
          </p>
        </Section>

        <Section title="🤝 Data Sharing & Third Parties">
          <li>We <strong>do not sell</strong> or share data with advertisers.</li>
          <li>Data may be shared with verified government bodies or NGOs for environmental purposes.</li>
          <li>Anonymized data may be used for academic research.</li>
        </Section>

        <Section title="🎯 Your Rights">
          <li>Update/delete your profile in the <strong>Settings</strong> page.</li>
          <li>Opt out of alerts or communication anytime.</li>
          <li>For deletion or data inquiries, email: <a href="mailto:support@aquameter.io" className="text-blue-600 dark:text-blue-400 underline">support@aquameter.io</a></li>
        </Section>

        <p className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
          This Privacy Policy is effective as of {new Date().getFullYear()} and may be updated with changes in law or services. Check back for updates.
        </p>
      </div>
    </div>
    <Footer />
  </>
);

const Section = ({ title, children }) => (
  <section className="mb-8">
    <h2 className="text-2xl font-bold mb-4">{title}</h2>
    <ul className="list-disc pl-6 space-y-2 text-base text-gray-700 dark:text-gray-300">
      {children}
    </ul>
  </section>
);

export default Policy;
