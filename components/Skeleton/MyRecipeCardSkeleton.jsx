const MyRecipeCardSkeleton = () => {
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

      {/* Recipe Content */}
      <div className="p-4">
        {/* Recipe Title Skeleton */}
        <div className="mb-3 h-6 w-3/4 rounded bg-gray-200 dark:bg-gray-700"></div>

        {/* Recipe Meta Information Skeleton */}
        <div className="mb-4 space-y-2">
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded bg-gray-200 dark:bg-gray-700"></div>
            <div className="h-4 w-20 rounded bg-gray-200 dark:bg-gray-700"></div>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded bg-gray-200 dark:bg-gray-700"></div>
            <div className="h-4 w-24 rounded bg-gray-200 dark:bg-gray-700"></div>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded bg-gray-200 dark:bg-gray-700"></div>
            <div className="h-4 w-16 rounded bg-gray-200 dark:bg-gray-700"></div>
          </div>
        </div>

        {/* Categories Skeleton */}
        <div className="mb-4">
          <div className="flex gap-1">
            <div className="h-6 w-16 rounded-full bg-gray-200 dark:bg-gray-700"></div>
            <div className="h-6 w-20 rounded-full bg-gray-200 dark:bg-gray-700"></div>
            <div className="h-6 w-14 rounded-full bg-gray-200 dark:bg-gray-700"></div>
          </div>
        </div>

        {/* Recipe Preview Skeleton */}
        <div className="mb-4 space-y-2">
          <div>
            <div className="mb-1 h-3 w-20 rounded bg-gray-200 dark:bg-gray-700"></div>
            <div className="h-3 w-full rounded bg-gray-200 dark:bg-gray-700"></div>
          </div>
          <div>
            <div className="mb-1 h-3 w-24 rounded bg-gray-200 dark:bg-gray-700"></div>
            <div className="h-3 w-3/4 rounded bg-gray-200 dark:bg-gray-700"></div>
          </div>
        </div>

        {/* Action Buttons Skeleton (Mobile) */}
        <div className="flex gap-2 md:hidden">
          <div className="flex-1 h-10 rounded-lg bg-gray-200 dark:bg-gray-700"></div>
          <div className="flex-1 h-10 rounded-lg bg-gray-200 dark:bg-gray-700"></div>
        </div>
      </div>
    </div>
  );
};

export default MyRecipeCardSkeleton;
