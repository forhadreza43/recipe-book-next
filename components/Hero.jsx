import Link from "next/link";
import { ChefHat, Search, Users, Clock, Star } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-orange-50 via-white to-orange-100 dark:from-gray-900 dark:via-gray-800 dark:to-orange-900/20">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

      {/* Hero Content */}
      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-32">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left Column - Text Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full bg-orange-100 px-4 py-2 text-sm font-medium text-orange-800 dark:bg-orange-900/30 dark:text-orange-200">
              <ChefHat className="h-4 w-4" />
              <span>Discover Amazing Recipes</span>
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl dark:text-white">
                Your Culinary
                <span className="block bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                  Adventure Awaits
                </span>
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 sm:text-xl">
                Explore thousands of delicious recipes, share your culinary
                creations, and join a community of passionate food lovers. From
                quick weeknight dinners to gourmet masterpieces.
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Users className="h-4 w-4 text-orange-500" />
                <span>10K+ Recipes</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Clock className="h-4 w-4 text-orange-500" />
                <span>Quick & Easy</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Star className="h-4 w-4 text-orange-500" />
                <span>Top Rated</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <ChefHat className="h-4 w-4 text-orange-500" />
                <span>Expert Tips</span>
              </div>
            </div>

            {/* Call to Action Buttons */}
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                href="/recipes"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-orange-600 px-8 py-4 text-base font-semibold text-white shadow-lg transition-all duration-200 hover:bg-orange-700 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
              >
                <Search className="h-5 w-5" />
                Browse Recipes
              </Link>
              <Link
                href="/dashboard/addRecipe"
                className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-orange-600 bg-transparent px-8 py-4 text-base font-semibold text-orange-600 transition-all duration-200 hover:bg-orange-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 dark:text-orange-400 dark:border-orange-400 dark:hover:bg-orange-400 dark:hover:text-white dark:focus:ring-offset-gray-800"
              >
                <ChefHat className="h-5 w-5" />
                Share Recipe
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center gap-6 pt-4">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="h-8 w-8 rounded-full border-2 border-white bg-gray-300 dark:border-gray-700 dark:bg-gray-600"
                  ></div>
                ))}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                <span className="font-semibold text-gray-900 dark:text-white">
                  5,000+
                </span>{" "}
                happy chefs already cooking
              </div>
            </div>
          </div>

          {/* Right Column - Hero Image */}
          <div className="relative">
            <div className="relative mx-auto max-w-md lg:mx-0">
              {/* Main Image Container */}
              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                <img
                  src="/hero.png"
                  alt="Delicious homemade recipes showcase"
                  className="h-auto w-full object-cover"
                />
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
              </div>

              {/* Floating Recipe Cards */}
              <div className="absolute -left-4 -top-4 rounded-xl bg-white p-4 shadow-lg dark:bg-gray-800">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-orange-100 dark:bg-orange-900/30"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      Pasta Carbonara
                    </p>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        4.9 (120)
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-4 -right-4 rounded-xl bg-white p-4 shadow-lg dark:bg-gray-800">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/30"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      Chicken Curry
                    </p>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3 text-gray-400" />
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        25 min
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave/Divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          className="h-16 w-full text-white dark:text-gray-900"
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
    </section>
  );
};

export default Hero;
