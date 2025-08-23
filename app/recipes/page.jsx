import AllRecipes from "@/components/AllRecipes";
import RecipesContainer from "@/components/RecipesContainer";

export const dynamic = "force-dynamic";

const AllRecipePage = () => {
  return (
    <div className="container mx-auto px-4 pt-25 lg:pt-30 pb-20">
      <h1 className="mb-8 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 lg:text-4xl">
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
