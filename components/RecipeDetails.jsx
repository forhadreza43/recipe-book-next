"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Image from "next/image";
import { Clock, ChefHat, User, Heart, Calendar } from "lucide-react";
import { generateBlurDataURL } from "@/utils/utils";

export default function RecipeDetails({ id }) {
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [likeCount, setLikeCount] = useState(0);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/recipes/${id}`
        );
        const data = await response.json();
        setRecipe(data);
        setLikeCount(data.likes || 0);
      } catch (error) {
        console.error("Error fetching recipe:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipe();
  }, [id]);

  const handleLike = async () => {
    if (session?.user?.email === recipe.userEmail) {
      toast.error("You can't like your own recipe!");
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/recipes/${id}`,
        {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
          },
        }
      );
      if (response.ok) {
        const updatedRecipe = await response.json();
        setLikeCount(updatedRecipe.likes);
        toast.success("You liked the recipe!");
      } else {
        toast.error("Failed to like the recipe.");
      }
    } catch (error) {
      console.error("Error liking recipe:", error);
      toast.error("Something went wrong.");
    }
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-10">
        <div className="animate-pulse space-y-6">
          <div className="h-8 w-3/4 rounded bg-gray-200 dark:bg-gray-700"></div>
          <div className="h-96 w-full rounded-lg bg-gray-200 dark:bg-gray-700"></div>
          <div className="space-y-3">
            <div className="h-6 w-1/2 rounded bg-gray-200 dark:bg-gray-700"></div>
            <div className="h-4 w-3/4 rounded bg-gray-200 dark:bg-gray-700"></div>
            <div className="h-4 w-2/3 rounded bg-gray-200 dark:bg-gray-700"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-10 text-center">
        <div className="rounded-lg bg-red-50 p-8 dark:bg-red-900/20">
          <h2 className="mb-2 text-2xl font-bold text-red-800 dark:text-red-200">
            Recipe Not Found
          </h2>
          <p className="text-red-600 dark:text-red-300">
            The recipe you're looking for doesn't exist or has been removed.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto pt-20 lg:pt-25 py-10">
      {/* Recipe Header */}
      <div className="mb-8">
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 lg:text-5xl">
          {recipe.title}
        </h1>

        {/* Recipe Meta Information */}
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex items-center gap-3 rounded-lg bg-orange-50 p-3 dark:bg-orange-900/20">
            <ChefHat className="h-5 w-5 text-orange-600 dark:text-orange-400" />
            <div>
              <p className="text-sm font-medium text-orange-800 dark:text-orange-200">
                Cuisine
              </p>
              <p className="text-sm text-orange-600 dark:text-orange-300">
                {recipe.cuisine || "International"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-lg bg-blue-50 p-3 dark:bg-blue-900/20">
            <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <div>
              <p className="text-sm font-medium text-blue-800 dark:text-blue-200">
                Prep Time
              </p>
              <p className="text-sm text-blue-600 dark:text-blue-300">
                {recipe.prepTime || "N/A"} min
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-lg bg-green-50 p-3 dark:bg-green-900/20">
            <Heart className="h-5 w-5 text-green-600 dark:text-green-400" />
            <div>
              <p className="text-sm font-medium text-green-800 dark:text-green-200">
                Likes
              </p>
              <p className="text-sm text-green-600 dark:text-green-300">
                {likeCount}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-lg bg-purple-50 p-3 dark:bg-purple-900/20">
            <User className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            <div>
              <p className="text-sm font-medium text-purple-800 dark:text-purple-200">
                Author
              </p>
              <p className="text-sm text-purple-600 dark:text-purple-300">
                {recipe.user?.name || "Anonymous"}
              </p>
            </div>
          </div>
        </div>

        {/* Categories */}
        {recipe.categories && recipe.categories.length > 0 && (
          <div className="mb-6">
            <p className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              Categories:
            </p>
            <div className="flex flex-wrap gap-2">
              {recipe.categories.map((category, index) => (
                <span
                  key={index}
                  className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                >
                  {category}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Recipe Image */}
      <div className="mb-8 overflow-hidden rounded-2xl shadow-lg">
        <div className="relative aspect-[16/9] w-full lg:h-120">
          <Image
            src={recipe.image}
            alt={recipe.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 800px"
            className="object-cover"
            placeholder="blur"
            blurDataURL={generateBlurDataURL()}
            priority
          />
        </div>
      </div>

      {/* Recipe Content */}
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Ingredients Section */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold text-gray-900 dark:text-gray-100">
              <ChefHat className="h-5 w-5 text-orange-500" />
              Ingredients
            </h2>
            <div className="space-y-3">
              {recipe.ingredients.split("\n").map(
                (ingredient, index) =>
                  ingredient.trim() && (
                    <div key={index} className="flex items-start gap-3">
                      <div className="mt-2 h-2 w-2 rounded-full bg-orange-500"></div>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        {ingredient.trim()}
                      </p>
                    </div>
                  )
              )}
            </div>
          </div>
        </div>

        {/* Instructions Section */}
        <div className="lg:col-span-2">
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold text-gray-900 dark:text-gray-100">
              <Clock className="h-5 w-5 text-orange-500" />
              Instructions
            </h2>
            <div className="prose prose-gray max-w-none dark:prose-invert">
              {recipe.instructions.split("\n").map(
                (instruction, index) =>
                  instruction.trim() && (
                    <div key={index} className="mb-4">
                      <div className="mb-2 flex items-center gap-3">
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-100 text-sm font-bold text-orange-600 dark:bg-orange-900/30 dark:text-orange-400">
                          {index + 1}
                        </span>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                          Step {index + 1}
                        </h3>
                      </div>
                      <p className="ml-11 text-gray-700 dark:text-gray-300 leading-relaxed">
                        {instruction.trim()}
                      </p>
                    </div>
                  )
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Action Section */}
      <div className="mt-8 flex flex-col items-center gap-4 rounded-xl border border-gray-200 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-800/50">
        <div className="text-center">
          <p className="text-lg font-medium text-gray-900 dark:text-gray-100">
            {likeCount} people are interested in this recipe
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Show your appreciation by liking this recipe
          </p>
        </div>

        <button
          onClick={handleLike}
          disabled={session?.user?.email === recipe.userEmail}
          className="inline-flex items-center gap-2 rounded-lg bg-orange-500 px-6 py-3 text-white transition-all duration-200 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:focus:ring-offset-gray-800"
        >
          <Heart className="h-5 w-5" />
          {session?.user?.email === recipe.userEmail
            ? "Your Recipe"
            : "Like Recipe"}
        </button>

        {session?.user?.email === recipe.userEmail && (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            You can't like your own recipe
          </p>
        )}
      </div>
    </div>
  );
}
