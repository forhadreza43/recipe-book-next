import Link from "next/link";

const RecipeCard = ({ recipe }) => {
  return (
    <>
      <div
        key={recipe._id}
        className="flex dark:bg-gray-800 flex-col justify-between rounded-xl border border-orange-300 p-4 shadow"
      >
        <img
          src={recipe.image}
          alt={recipe.title}
          className="mb-3 h-40 w-full rounded-md object-cover"
        />
        <h2 className="text-xl font-semibold dark:text-gray-200">
          {recipe.title}
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-200">
          Cuisine: {recipe.cuisine}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-200">
          Likes: {recipe.likes || 0}
        </p>
        <Link
          href={`/recipes/${recipe._id}`}
          className="mt-3 rounded bg-orange-500 py-2 text-center text-white hover:bg-orange-600"
        >
          See Details
        </Link>
      </div>
    </>
  );
};

export default RecipeCard;
