import { footerData } from "@/navbar-data/footerData"

import BigLogo from "../../assets/white-logo.svg";

const Footer = () => {
  return (
    <footer className="bg-primaryDark text-white py-12">
      <div className="container mx-auto px-8">
        {/* Desktop Footer */}
        <div className="hidden md:grid md:grid-cols-6 gap-8 mb-12">
          {/* Product Column */}
          <div>
            <h3 className="font-medium text-lg mb-4">Product</h3>
            <ul className="space-y-3">
              {footerData.product.map((item) => (
                <li key={item.name}>
                  <a href={item.href} className="text-gray-300 hover:text-white transition-colors">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Solutions Column */}
          <div>
            <h3 className="font-medium text-lg mb-4">Solutions</h3>
            <ul className="space-y-3">
              {footerData.solutions.map((item) => (
                <li key={item.name}>
                  <a href={item.href} className="text-gray-300 hover:text-white transition-colors">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h3 className="font-medium text-lg mb-4">Resources</h3>
            <ul className="space-y-3">
              {footerData.resources.map((item) => (
                <li key={item.name}>
                  <a href={item.href} className="text-gray-300 hover:text-white transition-colors">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="font-medium text-lg mb-4">Company</h3>
            <ul className="space-y-3">
              {footerData.company.map((item) => (
                <li key={item.name}>
                  <a href={item.href} className="text-gray-300 hover:text-white transition-colors">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media Column */}
          <div>
            <h3 className="font-medium text-lg mb-4">Social Media</h3>
            <ul className="space-y-3">
              {footerData.socialMedia.map((item) => (
                <li key={item.name}>
                  <a href={item.href} className="text-gray-300 hover:text-white transition-colors">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Links Column */}
          <div>
            <h3 className="font-medium text-lg mb-4">Links</h3>
            <ul className="space-y-3">
              {footerData.links.map((item) => (
                <li key={item.name}>
                  <a href={item.href} className="text-gray-300 hover:text-white transition-colors">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* CTA Buttons - Desktop */}
        <div className="hidden md:flex md:justify-end md:space-x-4 mb-12">
          <a
            href="/register"
            className="inline-flex items-center justify-center px-6 py-3 bg-white text-[#0a0b2e] font-medium rounded-md hover:bg-gray-200 transition-colors"
          >
            Start Free Trial
          </a>
          <a
            href="/demo"
            className="inline-flex items-center justify-center px-6 py-3 border border-white text-white font-medium rounded-md hover:bg-gray-800 transition-colors"
          >
            Watch A Demo
          </a>
        </div>

        {/* Mobile Footer */}
        <div className="grid grid-cols-2 gap-8 md:hidden">
          {/* Company Column */}
          <div className="mb-8">
            <h3 className="font-medium text-lg mb-4">Company</h3>
            <ul className="space-y-3">
              <li>
                <a href="/about" className="text-gray-300 hover:text-white transition-colors">
                  About Fivani
                </a>
              </li>
              <li>
                <a href="/features" className="text-gray-300 hover:text-white transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="/recurring-billing" className="text-gray-300 hover:text-white transition-colors">
                  Pricing
                </a>
              </li>
              <li>
                <a href="/testimonials" className="text-gray-300 hover:text-white transition-colors">
                  Testimonials
                </a>
              </li>
              <li>
                <a href="/contact" className="text-gray-300 hover:text-white transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Features Column */}
          <div className="mb-8">
            <h3 className="font-medium text-lg mb-4">Features</h3>
            <ul className="space-y-3">
              <li>
                <a href="/contract" className="text-gray-300 hover:text-white transition-colors">
                  AI Generated Contract
                </a>
              </li>
              <li>
                <a href="/payment" className="text-gray-300 hover:text-white transition-colors">
                  Payment Management
                </a>
              </li>
              <li>
                <a href="/project" className="text-gray-300 hover:text-white transition-colors">
                  Project Management
                </a>
              </li>
            </ul>
          </div>

          {/* Pricing Column */}
          <div className="mb-8">
            <h3 className="font-medium text-lg mb-4">Pricing</h3>
            <ul className="space-y-3">
              <li>
                <a href="/starter" className="text-gray-300 hover:text-white transition-colors">
                  Starter Plan
                </a>
              </li>
              <li>
                <a href="/professional" className="text-gray-300 hover:text-white transition-colors">
                  Professional Plan
                </a>
              </li>
              <li>
                <a href="/business" className="text-gray-300 hover:text-white transition-colors">
                  Business Plan
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div className="mb-8">
            <h3 className="font-medium text-lg mb-4">Contact</h3>
            <ul className="space-y-3">
              <li>
                <a href="/faq" className="text-gray-300 hover:text-white transition-colors">
                  Frequently Asked Questions
                </a>
              </li>
              <li>
                <a href="mailto:Lorem Ipsum@gegmail.com" className="text-gray-300 hover:text-white transition-colors">
                  Lorem Ipsum@gegmail.com
                </a>
              </li>
              <li>
                <a href="tel:+2349045678932" className="text-gray-300 hover:text-white transition-colors">
                  +234 9045 678 9032
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media Column */}
          <div className="mb-8">
            <h3 className="font-medium text-lg mb-4">Social Media</h3>
            <ul className="space-y-3">
              {footerData.socialMedia.map((item) => (
                <li key={item.name}>
                  <a href={item.href} className="text-gray-300 hover:text-white transition-colors">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Links Column */}
          <div className="mb-8">
            <h3 className="font-medium text-lg mb-4">Links</h3>
            <ul className="space-y-3">
              {footerData.links.map((item) => (
                <li key={item.name}>
                  <a href={item.href} className="text-gray-300 hover:text-white transition-colors">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* CTA Buttons - Mobile */}
        <div className="md:hidden space-y-4 mb-8">
          <a
            href="/trial"
            className="block w-full text-center px-6 py-3 bg-white text-[#0a0b2e] font-medium rounded-md hover:bg-gray-200 transition-colors"
          >
            Start Free Trial
          </a>
          <a
            href="/demo"
            className="block w-full text-center px-6 py-3 border border-white text-white font-medium rounded-md hover:bg-gray-800 transition-colors"
          >
            Watch A Demo
          </a>
        </div>

        <div className="border-t border-gray-700 pt-8 mt-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-4 md:mb-0">
              <a href="/" className="text-2xl font-bold text-white">
                {/* Fi<span className="text-cyan-400">v</span>ani */}
                <img src={BigLogo} alt="" />
              </a>
            </div>
            <div className="text-gray-400 text-sm">© 2024 Fivani - All rights Reserved</div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

