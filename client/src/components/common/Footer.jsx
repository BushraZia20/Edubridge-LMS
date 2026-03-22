const Footer = () => {
  return (
    <footer className="bg-linear-to-r from-[#05051A] to-[#0B0B2E] text-gray-300 px-6 md:px-10 py-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          {/* <h2 className="text-white text-xl font-semibold">EdA</h2> */}
          <h1 className="text-2xl text-white font-['Pacifico']!">EduBridge</h1>
          <p className="mt-2 text-gray-400">Learn anywhere, anytime.</p>
        </div>

        <div>
          <h3 className="text-white font-medium mb-3">Explore</h3>
          <ul className="space-y-2 text-gray-400">
            <li>Courses</li>
            <li>Categories</li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-medium mb-3">Support</h3>
          <p className="text-gray-400">Help Center</p>
        </div>
      </div>

      <p className="text-center text-gray-500 mt-12 text-sm">
        © 2026 EdA. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
