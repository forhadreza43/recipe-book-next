import { Suspense } from "react";
import Hero from "./Hero";
import Link from "next/link";
import TopRecipes from "./TopRecipes";
import MyRecipeCardSkeleton from "./Skeleton/MyRecipeCardSkeleton";
import CookingTips from "./CookingTips";
import WhyWe from "./WhyWe";

export default function Home() {
  return (
    <div className="pt-25 lg:pt-30">
      <Hero />

      <section className="py-12">
        <h2 className="mb-8 text-center text-3xl font-bold dark:text-gray-200">
          Top Recipes
        </h2>
        <Suspense
          fallback={
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[...Array(3)].map((_, i) => (
                <MyRecipeCardSkeleton key={i} />
              ))}
            </div>
          }
        >
          <TopRecipes />
        </Suspense>
        <div className="mt-10 text-center">
          <Link
            href="/recipes"
            className="inline-block rounded bg-orange-600 px-6 py-3 text-lg text-white hover:bg-orange-700"
          >
            See All Recipes
          </Link>
        </div>
      </section>

      <WhyWe />
      <CookingTips />
    </div>
  );
}
