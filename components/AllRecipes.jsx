"use client";
import { Suspense, useEffect, useState } from "react";
import { cuisineTypes } from "@/utils/utils";
import RecipeCard from "./RecipeCard";
import MyRecipeCardSkeleton from "./Skeleton/MyRecipeCardSkeleton";

const cuisineOptions = ["All", ...cuisineTypes];
export default function AllRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCuisine, setSelectedCuisine] = useState("All");

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/recipes`,
          { cache: "no-store" }
        );
        const data = await response.json();
        setRecipes(data);
        setFilteredRecipes(data);
      } catch (error) {
        console.error("Failed to fetch recipes:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipes();
  }, []);

  useEffect(() => {
    if (selectedCuisine === "All") {
      setFilteredRecipes(recipes);
    } else {
      setFilteredRecipes(
        recipes.filter((recipe) => recipe.cuisine === selectedCuisine)
      );
    }
  }, [selectedCuisine, recipes]);

  // if (loading) {
  //   return <GlobalLoader mini />;
  // }

  return (
    <div className="py-10">
      <div className="flex justify-between">
        <h1 className="mb-6 text-center text-3xl font-bold dark:text-gray-200">
          All Recipes
        </h1>

        <div className="mb-6 text-center">
          <select
            value={selectedCuisine}
            onChange={(e) => setSelectedCuisine(e.target.value)}
            className="rounded border border-orange-300 px-4 py-2 shadow focus:outline-none dark:text-gray-200"
          >
            {cuisineOptions.map((type) => (
              <option
                key={type}
                value={type}
                className="bg-white text-black dark:bg-gray-800 dark:text-gray-200"
              >
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredRecipes.map((recipe) => (
          <Suspense fallback={<MyRecipeCardSkeleton />} key={recipe._id}>
            <RecipeCard key={recipe._id} recipe={recipe} />
          </Suspense>
        ))}
      </div>
    </div>
  );
}
