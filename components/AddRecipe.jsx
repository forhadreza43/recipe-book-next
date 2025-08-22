"use client";
import { cuisineTypes } from "@/utils/utils";
import { useSession } from "next-auth/react";
import { useState } from "react";
import toast from "react-hot-toast";
import { LoaderFive } from "./ui/loader";
const categories = ["Breakfast", "Lunch", "Dinner", "Dessert", "Vegan"];

export default function AddRecipe() {
  const { data: session } = useSession();
  const user = session?.user;
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    image: "",
    title: "",
    ingredients: "",
    instructions: "",
    cuisine: "",
    time: "",
    categories: [],
    likes: 0,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        categories: checked
          ? [...prev.categories, value]
          : prev.categories.filter((cat) => cat !== value),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const newRecipe = {
      ...formData,
      userEmail: user.email,
      userName: user.displayName,
      userPhoto: user.photoURL,
      createdAt: new Date().toISOString(),
    };

    try {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/recipes`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(newRecipe),
      })
        .then((res) => res.json())
        .then((result) => {
          if (result.insertedId) {
            toast.success("Recipe added successfully!");
            setFormData({
              image: "",
              title: "",
              ingredients: "",
              instructions: "",
              cuisine: "",
              time: "",
              categories: [],
              likes: 0,
            });
          }
          setIsLoading(false);
        });
    } catch (error) {
      toast.error("Failed to add recipe");
      console.error(error);
      setIsLoading(false);
    }
  };

  return isLoading ? (
    <div className="flex items-center justify-center h-screen">
      <LoaderFive text="Adding..." />
    </div>
  ) : (
    <div className="pt-25 lg:pt-30">
      <div className="mx-auto  max-w-3xl rounded  p-6 shadow dark:bg-gray-800">
        <div className="border  border-orange-300 p-6 rounded">
          <h2 className="mb-4 text-2xl font-bold dark:text-gray-200">
            Add a New Recipe
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="image"
              placeholder="Image URL"
              value={formData.image}
              onChange={handleChange}
              className="input-field"
              required
            />
            <input
              type="text"
              name="title"
              placeholder="Recipe Title"
              value={formData.title}
              onChange={handleChange}
              className="input-field"
              required
            />
            <textarea
              name="ingredients"
              placeholder="Ingredients"
              value={formData.ingredients}
              onChange={handleChange}
              className="input-field"
              required
            />
            <textarea
              name="instructions"
              placeholder="Instructions"
              value={formData.instructions}
              onChange={handleChange}
              className="input-field"
              required
            />
            <select
              name="cuisine"
              value={formData.cuisine}
              onChange={handleChange}
              className="input-field dark:text-gray-200"
              required
            >
              <option value="">Select Cuisine Type</option>
              {cuisineTypes.map((type) => (
                <option
                  key={type}
                  className="bg-white text-black dark:bg-gray-800 dark:text-gray-200"
                >
                  {type}
                </option>
              ))}
            </select>
            <input
              type="number"
              name="time"
              placeholder="Preparation Time (minutes)"
              value={formData.time}
              onChange={handleChange}
              className="input-field"
              required
            />
            <div>
              <p className="mb-2 font-medium dark:text-gray-200">Categories:</p>
              <div className="flex flex-wrap gap-4">
                {categories.map((cat) => (
                  <label
                    key={cat}
                    className="flex items-center gap-2 dark:text-gray-200"
                  >
                    <input
                      type="checkbox"
                      name="categories"
                      className=""
                      value={cat}
                      checked={formData.categories.includes(cat)}
                      onChange={handleChange}
                    />
                    {cat}
                  </label>
                ))}
              </div>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="cursor-pointer rounded bg-orange-600 px-4 py-2 text-white hover:bg-orange-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                  Adding...
                </div>
              ) : (
                "Add Recipe"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
