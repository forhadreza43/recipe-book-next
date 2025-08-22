import Link from "next/link";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaHeart,
  FaChevronUp,
} from "react-icons/fa";
import { ChefHat, Users, Clock, Star } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Top Wave/Divider */}
      <div className="absolute top-0 left-0 right-0 -translate-y-full">
        <svg
          className="h-16 w-full text-gray-900"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            opacity=".25"
            fill="currentColor"
          />
          <path
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.71,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
            opacity=".5"
            fill="currentColor"
          />
          <path
            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
            fill="currentColor"
          />
        </svg>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid gap-8 lg:grid-cols-4">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-500">
                <ChefHat className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Recipe Book</h2>
                <p className="text-sm text-gray-400">
                  Your Culinary Adventure Awaits
                </p>
              </div>
            </div>
            <p className="mb-6 text-gray-300 leading-relaxed">
              Discover thousands of delicious recipes, share your culinary
              creations, and join a community of passionate food lovers. From
              quick weeknight dinners to gourmet masterpieces.
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 text-orange-400 mb-1">
                  <Users className="h-4 w-4" />
                </div>
                <p className="text-lg font-semibold text-white">5K+</p>
                <p className="text-xs text-gray-400">Happy Chefs</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 text-orange-400 mb-1">
                  <ChefHat className="h-4 w-4" />
                </div>
                <p className="text-lg font-semibold text-white">10K+</p>
                <p className="text-xs text-gray-400">Recipes</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 text-orange-400 mb-1">
                  <Clock className="h-4 w-4" />
                </div>
                <p className="text-lg font-semibold text-white">24/7</p>
                <p className="text-xs text-gray-400">Access</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 text-orange-400 mb-1">
                  <Star className="h-4 w-4" />
                </div>
                <p className="text-lg font-semibold text-white">4.9</p>
                <p className="text-xs text-gray-400">Rating</p>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-6 text-lg font-semibold text-white">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-gray-300 transition-colors hover:text-orange-400"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/recipes"
                  className="text-gray-300 transition-colors hover:text-orange-400"
                >
                  Browse Recipes
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/addRecipe"
                  className="text-gray-300 transition-colors hover:text-orange-400"
                >
                  Share Recipe
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/myRecipe"
                  className="text-gray-300 transition-colors hover:text-orange-400"
                >
                  My Recipes
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h3 className="mb-6 text-lg font-semibold text-white">
              Get In Touch
            </h3>

            {/* Contact Info */}
            <div className="mb-6 space-y-3">
              <div className="flex items-center gap-3 text-gray-300">
                <FaEnvelope className="h-4 w-4 text-orange-400" />
                <a
                  href="mailto:support@recipebook.com"
                  className="hover:text-orange-400 transition-colors"
                >
                  forhad.bimt@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <FaPhone className="h-4 w-4 text-orange-400" />
                <span>+880 123456-0000</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <FaMapMarkerAlt className="h-4 w-4 text-orange-400" />
                <span>Dhaka Bangladesh</span>
              </div>
            </div>

            {/* Social Media */}
            <div>
              <h4 className="mb-3 text-sm font-medium text-gray-400">
                Follow Us
              </h4>
              <div className="flex gap-3">
                <a
                  href="https://facebook.com/forhadreza000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-700 text-gray-300 transition-all duration-200 hover:bg-blue-600 hover:text-white"
                  aria-label="Facebook"
                >
                  <FaFacebookF className="h-4 w-4" />
                </a>
                <a
                  href="https://twitter.com/forhadreza111"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-700 text-gray-300 transition-all duration-200 hover:bg-sky-500 hover:text-white"
                  aria-label="Twitter"
                >
                  <FaTwitter className="h-4 w-4" />
                </a>
                <a
                  href="mailto:forhad.bimt@gmail.com"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-700 text-gray-300 transition-all duration-200 hover:bg-orange-500 hover:text-white"
                  aria-label="Email"
                >
                  <FaEnvelope className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
