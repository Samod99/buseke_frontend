import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#2b241a] text-white py-20 mt-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Us */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <p className="mb-4">Call Us: +3256-8954-3345</p>
            <p className="mb-4">Whatsapp Us: +3256-8954-3345</p>
            <p className="mb-4">Email: Support@Readease.co.uk</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Link</h3>
            <ul>
              <li className="mb-2">
                <a href="#" className="hover:text-yellow-500">
                  Our Partners
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:text-yellow-500">
                  Sponsors
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:text-yellow-500">
                  Administration
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-bold mb-4">Support</h3>
            <ul>
              <li className="mb-2">
                <a href="#" className="hover:text-yellow-500">
                  FAQ
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:text-yellow-500">
                  Conditions
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:text-yellow-500">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* Logo and Social Media */}
      <div className="container flex grid grid-cols-1 md:grid-cols-3 gap-8 my-5">
        {/* Logo */}
        <div className="">
          <img
            src="https://godare.net/wp-content/uploads/2024/12/wahanalk-3-1.png"
            alt="Logo"
            className="w-20"
          />
        </div>
        <div>
            
        </div>
        {/* Social Media Icons */}
        <div className="flex space-x-4">
          <a href="#" className="text-blue-500 hover:text-white text-xl">
            <FaFacebookF />
          </a>
          <a href="#" className="text-pink-500 hover:text-white text-xl">
            <FaInstagram />
          </a>
          <a href="#" className="text-blue-400 hover:text-white text-xl">
            <FaTwitter />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
