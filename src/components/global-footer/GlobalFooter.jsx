const GlobalFooter = () => {
  return (
    <footer className="bg-slate-50 text-slate-700 mt-6">
      <div className="container mx-auto px-6 py-6">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h4 className="font-bold text-lg mb-2">Company Info</h4>
            <p>About Us</p>
            <p>Contact</p>
            <p>Privacy Policy</p>
          </div>
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h4 className="font-bold text-lg mb-2">Support</h4>
            <p>FAQs</p>
          </div>
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h4 className="font-bold text-lg mb-2">Newsletter</h4>
            <p>Stay updated with our latest trends</p>
            <form>
              <input
                type="email"
                placeholder="Enter email"
                className="p-2 rounded"
              />
              <button className="ml-2 p-2 bg-brand text-white rounded">
                Subscribe
              </button>
            </form>
          </div>
        </div>
        <div className="text-center mt-10">
          <p>Designed and styled by izoogood</p>
          <p>
            &copy; {new Date().getFullYear()} izoogood. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default GlobalFooter;
