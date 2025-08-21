import AllRecipes from "@/components/AllRecipes";
import RecipesContainer from "@/components/RecipesContainer";

export const dynamic = "force-dynamic";

const AllRecipePage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold dark:text-gray-200">
        All Recipes
      </h1>
      <RecipesContainer />
    </div>
    // <>
    //   <AllRecipes />
    // </>
  );
};

export default AllRecipePage;
