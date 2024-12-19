import React from 'react';

const Footer = () => {
  return (
    <footer className="border-t border-gray-300 bg-gray-100 py-4">
      <div className="container mx-auto text-center">
        <p className="text-sm text-gray-600">&copy; 2024 Machiken Number. All rights reserved.</p>
        <div className="mt-2 flex justify-center space-x-4">
          <a href="#" className="text-gray-500 hover:text-gray-900">
            Privacy Policy
          </a>
          <a href="#" className="text-gray-500 hover:text-gray-900">
            Terms of Service
          </a>
          <a href="#" className="text-gray-500 hover:text-gray-900">
            Contact Us
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
