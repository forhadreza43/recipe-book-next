"use client";

import { useEffect, useState } from "react";
import RecipeCard from "./RecipeCard";
import RecipeFilter from "./RecipeFilter";
import MyRecipeCardSkeleton from "./Skeleton/MyRecipeCardSkeleton";

async function getRecipes() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/recipes`, {
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error("Failed to fetch recipes");
  }
  return response.json();
}

export default function RecipesContainer() {
  const [loading, setLoading] = useState(true);
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  useEffect(() => {
    getRecipes()
      .then((data) => {
        setRecipes(data);
        setFilteredRecipes(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch recipes:", error);
        setLoading(false);
      });
  }, []);

  const handleFilterChange = (cuisine) => {
    if (cuisine === "All") {
      setFilteredRecipes(recipes);
    } else {
      const filtered = recipes.filter((recipe) => recipe.cuisine === cuisine);
      setFilteredRecipes(filtered);
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <MyRecipeCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div>
      <RecipeFilter onFilterChange={handleFilterChange} />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredRecipes.length > 0 ? (
          filteredRecipes.map((recipe) => (
            <RecipeCard key={recipe._id} recipe={recipe} />
          ))
        ) : (
          <div className="col-span-full py-8 text-center text-gray-500">
            No recipes found for this cuisine type
          </div>
        )}
      </div>
    </div>
  );
}
