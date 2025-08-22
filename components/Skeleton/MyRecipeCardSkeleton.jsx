const MyRecipeCardSkeleton = () => {
  return (
    <div className="flex flex-col justify-between rounded-lg border border-orange-300 p-4 shadow dark:bg-gray-800 animate-pulse">
      <div>
        <div className="h-40 w-full rounded bg-gray-300 dark:bg-gray-700"></div>
        <div className="mt-2 h-6 w-3/4 rounded bg-gray-300 dark:bg-gray-700"></div>
        <div className="mt-2 h-4 w-1/2 rounded bg-gray-300 dark:bg-gray-700"></div>
        <div className="mt-1 h-4 w-1/3 rounded bg-gray-300 dark:bg-gray-700"></div>
        <div className="mt-1 h-4 w-1/4 rounded bg-gray-300 dark:bg-gray-700"></div>
      </div>
      <div className="mt-3 flex ">
        <div className="h-8 w-full rounded bg-gray-300 dark:bg-gray-700"></div>
      </div>
    </div>
  );
};

export default MyRecipeCardSkeleton;
