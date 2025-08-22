import Image from "next/image";
import { Clock, ChefHat, Heart, Edit, Trash2, Eye } from "lucide-react";

const MyRecipeCard = ({ recipe, setSelectedRecipe, handleDelete }) => {
  return (
    <div className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800">
      {/* Recipe Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={recipe.image}
          alt={recipe.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />

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

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="flex h-full items-center justify-center gap-3">
            <button
              onClick={() => setSelectedRecipe(recipe)}
              className="flex items-center gap-2 rounded-lg bg-orange-500 px-4 py-2 text-sm font-medium text-white transition-all duration-200 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
            >
              <Edit className="h-4 w-4" />
              Edit
            </button>
            <button
              onClick={() => handleDelete(recipe._id)}
              className="flex items-center gap-2 rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white transition-all duration-200 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
            >
              <Trash2 className="h-4 w-4" />
              Delete
            </button>
          </div>
        </div>
      </div>

      {/* Recipe Content */}
      <div className="p-4">
        {/* Recipe Title */}
        <h3 className="mb-3 line-clamp-2 text-lg font-semibold text-gray-900 transition-colors group-hover:text-orange-600 dark:text-gray-100">
          {recipe.title}
        </h3>

        {/* Recipe Meta Information */}
        <div className="mb-4 space-y-2 text-sm text-gray-600 dark:text-gray-300">
          <div className="flex items-center gap-2">
            <ChefHat className="h-4 w-4 text-orange-500" />
            <span>{recipe.cuisine || "International"}</span>
          </div>

          {recipe.time && (
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-orange-500" />
              <span>{recipe.time} minutes</span>
            </div>
          )}

          {recipe.likes !== undefined && (
            <div className="flex items-center gap-2">
              <Heart className="h-4 w-4 text-orange-500" />
              <span>{recipe.likes} likes</span>
            </div>
          )}
        </div>

        {/* Categories */}
        {recipe.categories && recipe.categories.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-1">
              {recipe.categories.slice(0, 3).map((category, index) => (
                <span
                  key={index}
                  className="rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                >
                  {category}
                </span>
              ))}
              {recipe.categories.length > 3 && (
                <span className="rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700 dark:bg-gray-700 dark:text-gray-300">
                  +{recipe.categories.length - 3}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Recipe Preview */}
        <div className="mb-4 space-y-2 text-xs text-gray-500 dark:text-gray-400">
          {recipe.ingredients && (
            <div>
              <p className="font-medium text-gray-700 dark:text-gray-300">
                Ingredients:
              </p>
              <p className="line-clamp-2">{recipe.ingredients}</p>
            </div>
          )}

          {recipe.instructions && (
            <div>
              <p className="font-medium text-gray-700 dark:text-gray-300">
                Instructions:
              </p>
              <p className="line-clamp-2">{recipe.instructions}</p>
            </div>
          )}
        </div>

        {/* Action Buttons (Visible on Mobile) */}
        <div className="flex gap-2 md:hidden">
          <button
            onClick={() => setSelectedRecipe(recipe)}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-orange-500 px-3 py-2 text-sm font-medium text-white transition-all duration-200 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
          >
            <Edit className="h-4 w-4" />
            Edit
          </button>
          <button
            onClick={() => handleDelete(recipe._id)}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-red-500 px-3 py-2 text-sm font-medium text-white transition-all duration-200 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
          >
            <Trash2 className="h-4 w-4" />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyRecipeCard;
