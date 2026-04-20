export default function HelpPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-6">Help Center</h1>

      <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>

      <div className="space-y-4">
        <div>
          <h3 className="font-semibold">What is Mirai CV AI?</h3>
          <p>A modern AI-powered resume builder that creates ATS-friendly resumes.</p>
        </div>

        <div>
          <h3 className="font-semibold">Is my resume ATS-friendly?</h3>
          <p>Yes, our templates are designed to pass Applicant Tracking Systems.</p>
        </div>

        <div>
          <h3 className="font-semibold">Can I download my resume?</h3>
          <p>Yes, you can export your resume in PDF format.</p>
        </div>

        <div>
          <h3 className="font-semibold">Do you store my data?</h3>
          <p>Yes, securely. You can delete it anytime.</p>
        </div>

        <div>
          <h3 className="font-semibold">How do payments work?</h3>
          <p>We use Stripe for secure subscription and payment processing.</p>
        </div>
      </div>
    </main>
  );
}