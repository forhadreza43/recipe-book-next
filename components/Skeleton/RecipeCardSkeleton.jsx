const RecipeCardSkeleton = () => {
  return (
    <div className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800 animate-pulse">
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden">
        {/* Image Skeleton */}
        <div className="h-full w-full bg-gray-200 dark:bg-gray-700"></div>

        {/* Recipe Type Badge Skeleton */}
        <div className="absolute top-3 left-3">
          <div className="h-6 w-16 rounded-full bg-gray-300 dark:bg-gray-600"></div>
        </div>

        {/* Likes Badge Skeleton */}
        <div className="absolute top-3 right-3">
          <div className="h-6 w-12 rounded-full bg-gray-300 dark:bg-gray-600"></div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Recipe Title Skeleton */}
        <div className="mb-2 h-6 w-3/4 rounded bg-gray-200 dark:bg-gray-700"></div>

        {/* Recipe Meta Skeleton */}
        <div className="mb-4 space-y-2">
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded bg-gray-200 dark:bg-gray-700"></div>
            <div className="h-4 w-20 rounded bg-gray-200 dark:bg-gray-700"></div>
          </div>
          {/* <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded bg-gray-200 dark:bg-gray-700"></div>
            <div className="h-4 w-16 rounded bg-gray-200 dark:bg-gray-700"></div>
          </div> */}
        </div>

        {/* Action Button Skeleton */}
        <div className="h-10 w-full rounded-lg bg-gray-200 dark:bg-gray-700"></div>
      </div>
    </div>
  );
};

export default RecipeCardSkeleton;
