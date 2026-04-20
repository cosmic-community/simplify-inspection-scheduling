export default function Footer() {
  return (
    <footer className="bg-navy-800 text-white mt-16">
      <div className="container-custom py-12">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-3">Baltimore Permits, Inc.</h3>
            <p className="text-navy-100 text-sm">Expert permitting and inspection coordination for the Baltimore area.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-orange-500">Services</h4>
            <ul className="space-y-2 text-sm text-navy-100">
              <li>Inspection Scheduling</li>
              <li>Permit Management</li>
              <li>Project Coordination</li>
              <li>Compliance Review</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-orange-500">Contact</h4>
            <ul className="space-y-2 text-sm text-navy-100">
              <li>baltimorepermits.com</li>
              <li>Baltimore, MD</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-navy-700 mt-8 pt-6 text-center text-sm text-navy-200">
          © {new Date().getFullYear()} Baltimore Permits, Inc. All rights reserved.
        </div>
      </div>
    </footer>
  );
}