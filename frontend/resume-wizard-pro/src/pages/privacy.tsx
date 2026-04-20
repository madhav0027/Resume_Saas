export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted/30 px-6 py-16">
      
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight mb-4">
            Privacy Policy
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Your privacy matters. Here’s how Mirai CV AI collects, uses, and protects your data.
          </p>
        </div>

        {/* Card Container */}
        <div className="space-y-6">
          
          {/* Section */}
          <div className="rounded-xl border bg-background/70 backdrop-blur p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-3">1. Information We Collect</h2>
            <ul className="list-disc ml-6 space-y-1 text-muted-foreground">
              <li>Account details (name, email, password)</li>
              <li>Resume content you create</li>
              <li>Payment details (processed securely via Stripe)</li>
            </ul>
          </div>

          {/* Section */}
          <div className="rounded-xl border bg-background/70 backdrop-blur p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-3">2. How We Use Your Data</h2>
            <p className="text-muted-foreground">
              We use your information to provide our services, generate resumes,
              improve user experience, and manage your account securely.
            </p>
          </div>

          {/* Section */}
          <div className="rounded-xl border bg-background/70 backdrop-blur p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-3">3. Payments & Billing</h2>
            <p className="text-muted-foreground">
              All payments are handled securely by Stripe. We do not store your
              card or banking details on our servers.
            </p>

            <div className="mt-4 p-4 rounded-lg bg-accent/10 text-sm text-accent">
              🔒 Your payment information is encrypted and processed securely.
            </div>
          </div>

          {/* Section */}
          <div className="rounded-xl border bg-background/70 backdrop-blur p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-3">4. Data Storage</h2>
            <p className="text-muted-foreground">
              Your resumes and personal data are stored securely. You can delete
              your data at any time from your account settings.
            </p>
          </div>

          {/* Section */}
          <div className="rounded-xl border bg-background/70 backdrop-blur p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-3">5. Data Sharing</h2>
            <p className="text-muted-foreground">
              We do not sell your data. We only share it with trusted third-party
              services like Stripe to operate essential features.
            </p>
          </div>

          {/* Section */}
          <div className="rounded-xl border bg-background/70 backdrop-blur p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-3">6. Security</h2>
            <p className="text-muted-foreground">
              We use industry-standard security measures to protect your data from
              unauthorized access, loss, or misuse.
            </p>
          </div>

          {/* Section */}
          <div className="rounded-xl border bg-background/70 backdrop-blur p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-3">7. Your Rights</h2>
            <p className="text-muted-foreground">
              You have the right to access, update, or delete your personal data
              at any time. Contact us if you need assistance.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-sm text-muted-foreground">
          Last updated: April 2026
        </div>
      </div>
    </main>
  );
}