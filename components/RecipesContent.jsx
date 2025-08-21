import RecipeCard from "./RecipeCard";

async function getRecipes() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/recipes`, {
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error("Failed to fetch recipes");
  }
  return response.json();
}

export default async function RecipesContent() {
  const recipes = await getRecipes();

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe._id} recipe={recipe} />
      ))}
    </div>
  );
}
