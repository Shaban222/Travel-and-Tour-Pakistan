import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';



const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-10 ">
      <div className="container mx-auto flex justify-between gap-10">
        
        {/* Company Info Section */}
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-bold -ml-20">TourandTravelPakistan</h3>
          <p className="text-lg -ml-20 pr-10">
            At TourandTravelPakistan, we believe that every journey is an opportunity for adventure, discovery, and unforgettable experiences.
          </p>
        </div>

        {/* Navigation Section */}
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-bold">Navigation</h3>
          <ul>
            <li><a href="#" className="hover:underline">Services</a></li>
            <li><a href="#" className="hover:underline">Products</a></li>
            <li><a href="#" className="hover:underline">About</a></li>
          </ul>
        </div>

        {/* Tools Section */}
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-bold">Tools</h3>
          <ul>
            <li><a href="#" className="hover:underline">Visual Sales</a></li>
            <li><a href="#" className="hover:underline">Trend Analysis</a></li>
            <li><a href="#" className="hover:underline">Customer Segmentation</a></li>
            <li><a href="#" className="hover:underline">Real-Time Dashboard</a></li>
          </ul>
        </div>

        {/* Address Section
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-bold">Address</h3>
          <ul>
            <li>8502 Preston Rd.</li>
            <li>Inglewood, Maine 98380</li>
          </ul>
        </div> */}

        {/* Contact Section */}
        <div className="flex flex-col gap-2 ">
          <h3 className="text-lg font-bold">Contact</h3>
          <ul>
            <li><a href="mailto:hello@tourandtravelpakistan.com" className="hover:underline">hello@tourandtravelpakistan.com</a></li>
            <li><a href="tel:+322123456789" className="hover:underline">+32 (2) 123 456 789</a></li>
          </ul>
        </div>
      </div>

      {/* Copyright Notice */}
      <div className="container mx-auto mt-4 text-sm text-center">
        <p>&copy; Copyright TourandTravelPakistan {new Date().getFullYear()}</p>
        <div className="flex justify-center mt-2">
          <a href="#" className="text-sm mr-2 hover:underline">Privacy Policy</a>
          <a href="#" className="text-sm hover:underline">Terms Of Use</a>
        </div>
      </div>

      {/* Social Media Icons */}
      <div className="container mx-auto mt-4 flex justify-center space-x-4">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
          <FaFacebookF className="text-white hover:text-blue-500 transition duration-300" />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <FaTwitter className="text-white hover:text-blue-400 transition duration-300" />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <FaInstagram className="text-white hover:text-pink-500 transition duration-300" />
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
          <FaLinkedinIn className="text-white hover:text-blue-700 transition duration-300" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
