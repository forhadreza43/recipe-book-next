import RecipeDetails from "@/components/RecipeDetails";
import React from "react";

const RecipeDetailsPage = async ({ params }) => {
  const { id } = await params;
  return <RecipeDetails id={id} />;
};

export default RecipeDetailsPage;
