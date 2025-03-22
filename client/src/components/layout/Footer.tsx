import { Link } from "wouter";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <h3 className="text-white text-lg font-bold mb-4 font-heading">Galeeleeway</h3>
            <p className="mb-4">Empowering students with innovative education solutions since 2010.</p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="text-gray-300 hover:text-white">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-gray-300 hover:text-white">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-gray-300 hover:text-white">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-gray-300 hover:text-white">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-white text-md font-bold mb-4 font-heading">Quick Links</h4>
            <ul>
              <li className="mb-2">
                <Link href="/" className="text-gray-300 hover:text-white">Home</Link>
              </li>
              <li className="mb-2">
                <Link href="/about" className="text-gray-300 hover:text-white">About Us</Link>
              </li>
              <li className="mb-2">
                <Link href="/courses" className="text-gray-300 hover:text-white">Courses</Link>
              </li>
              <li className="mb-2">
                <Link href="/contact" className="text-gray-300 hover:text-white">Contact</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white text-md font-bold mb-4 font-heading">Our Courses</h4>
            <ul>
              <li className="mb-2">
                <Link href="/courses" className="text-gray-300 hover:text-white">Comprehensive Education</Link>
              </li>
              <li className="mb-2">
                <Link href="/courses" className="text-gray-300 hover:text-white">Digital Marketing</Link>
              </li>
              <li className="mb-2">
                <Link href="/courses" className="text-gray-300 hover:text-white">Web Development</Link>
              </li>
              <li className="mb-2">
                <Link href="/courses" className="text-gray-300 hover:text-white">Professional Skills</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white text-md font-bold mb-4 font-heading">Contact Info</h4>
            <p className="mb-2">
              <i className="fas fa-map-marker-alt mr-2"></i> 123 Education St, Mumbai, India
            </p>
            <p className="mb-2">
              <i className="fas fa-phone mr-2"></i> +91 98765 43210
            </p>
            <p className="mb-2">
              <i className="fas fa-envelope mr-2"></i> info@galeeleeway.edu
            </p>
            <p className="mb-2">
              <i className="fas fa-clock mr-2"></i> Mon-Sat: 9AM - 6PM
            </p>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>© {new Date().getFullYear()} Galeeleeway Educational Institute. All rights reserved.</p>
            <div className="mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white mr-4">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
