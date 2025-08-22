"use client";
import { useEffect, useState } from "react";
import UpdateRecipeModal from "./UpdateRecipeModal";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import NoRecipesFound from "./NoRecipesFound";
import MyRecipeCard from "./MyRecipeCard";
import { useSession } from "next-auth/react";
import MyRecipeCardSkeleton from "./Skeleton/MyRecipeCardSkeleton";

export default function MyRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { data: session } = useSession();
  const user = session?.user;

  useEffect(() => {
    const fetchUserRecipes = async () => {
      if (!user?.email) {
        setIsLoading(false);
        return;
      }
      try {
        setIsLoading(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/recipes`
        );
        const data = await response.json();
        const usersData = data.filter((rec) => rec.userEmail === user?.email);
        setRecipes(usersData);
      } catch (error) {
        toast.error("Failed to fetch your recipes.");
        console.log(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserRecipes();
  }, [user?.email]);

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/recipes/${id}`,
            {
              method: "DELETE",
            }
          );
          if (res.ok) {
            setRecipes((prev) => prev.filter((r) => r._id !== id));
            toast.success("Recipe deleted.");
          } else {
            toast.error("Failed to delete recipe.");
          }
        } catch {
          toast.error("Something went wrong.");
        }
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };

  const handleUpdate = (updatedRecipe) => {
    setRecipes((prev) =>
      prev.map((r) => (r._id === updatedRecipe._id ? updatedRecipe : r))
    );
    setSelectedRecipe(null);
  };

  return (
    <div className="py-10 pt-25 lg:pt-30">
      <>
        <h1 className="mb-6 text-center text-3xl font-bold dark:text-gray-200">
          My Recipes
        </h1>
        {isLoading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <MyRecipeCardSkeleton key={i} />
            ))}
          </div>
        ) : recipes.length === 0 ? (
          <NoRecipesFound />
        ) : (
          <>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {recipes.map((recipe) => (
                <MyRecipeCard
                  key={recipe._id}
                  recipe={recipe}
                  setSelectedRecipe={setSelectedRecipe}
                  handleDelete={handleDelete}
                />
              ))}
            </div>
            {selectedRecipe && (
              <UpdateRecipeModal
                recipe={selectedRecipe}
                onClose={() => setSelectedRecipe(null)}
                onUpdate={handleUpdate}
              />
            )}
          </>
        )}
      </>
    </div>
  );
}
