import Link from "next/link";
import Image from "next/image";
import { Clock, Heart, ChefHat } from "lucide-react";

const RecipeCard = ({ recipe }) => {


  // Generate a simple blur data URL for the placeholder
  const generateBlurDataURL = () => {
    const base64 =
      "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PC9zdmc+";
    return base64;
  };

  return (
    <div className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800">
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden">
        
          <Image
            src={recipe.image}
            alt={recipe.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            placeholder="blur"
            blurDataURL={generateBlurDataURL()}
            priority={false}
          />

          <div className="flex h-full w-full items-center justify-center bg-gray-200 dark:bg-gray-700">
            <ChefHat className="h-12 w-12 text-gray-400" />
          </div>


        {/* Recipe Type Badge */}
        <div className="absolute top-3 left-3">
          <span className="rounded-full bg-orange-500 px-3 py-1 text-xs font-medium text-white shadow-sm">
            {recipe.cuisine || "Recipe"}
          </span>
        </div>

        {/* Likes Badge */}
        <div className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-black/50 px-2 py-1 text-white backdrop-blur-sm">
          <Heart className="h-3 w-3 fill-current" />
          <span className="text-xs font-medium">{recipe.likes || 0}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="mb-2 line-clamp-2 text-lg font-semibold text-gray-900 transition-colors group-hover:text-orange-600 dark:text-gray-100">
          {recipe.title}
        </h3>

        {/* Recipe Meta */}
        <div className="mb-4 space-y-2 text-sm text-gray-600 dark:text-gray-300">
          <div className="flex items-center gap-2">
            <ChefHat className="h-4 w-4 text-orange-500" />
            <span>{recipe.cuisine || "International"}</span>
          </div>
          {recipe.cookingTime && (
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-orange-500" />
              <span>{recipe.cookingTime} min</span>
            </div>
          )}
        </div>

        {/* Action Button */}
        <Link
          href={`/recipes/${recipe._id}`}
          className="inline-flex w-full items-center justify-center rounded-lg bg-orange-500 px-4 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
        >
          View Recipe
          <svg
            className="ml-2 h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default RecipeCard;
