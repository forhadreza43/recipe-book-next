import RecipeCard from "./RecipeCard";

export default async function TopRecipes() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/top-recipes`, {
    cache: "no-store",
  });
  const recipes = await res.json();
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {recipes?.map((recipe) => (
        <RecipeCard key={recipe._id} recipe={recipe} />
      ))}
    </div>
  );
}
