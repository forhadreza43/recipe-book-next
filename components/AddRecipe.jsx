"use client";
import { cuisineTypes } from "@/utils/utils";
import { useSession } from "next-auth/react";
import { useState } from "react";
import toast from "react-hot-toast";
import { LoaderFive } from "./ui/loader";
import {
  ChefHat,
  Clock,
  Image as ImageIcon,
  FileText,
  List,
  Plus,
  X,
} from "lucide-react";

const categories = [
  "Breakfast",
  "Lunch",
  "Dinner",
  "Dessert",
  "Vegan",
  "Snack",
  "Beverage",
  "Appetizer",
];

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

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) newErrors.title = "Recipe title is required";
    if (!formData.ingredients.trim())
      newErrors.ingredients = "Ingredients are required";
    if (!formData.instructions.trim())
      newErrors.instructions = "Instructions are required";
    if (!formData.cuisine) newErrors.cuisine = "Please select a cuisine type";
    if (!formData.time || formData.time <= 0)
      newErrors.time = "Valid preparation time is required";
    if (formData.categories.length === 0)
      newErrors.categories = "Please select at least one category";
    if (!formData.image.trim()) newErrors.image = "Image URL is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

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

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    setIsLoading(true);
    const newRecipe = {
      ...formData,
      userEmail: user.email,
      userName: user.displayName || user.name,
      userPhoto: user.photoURL || user.image,
      createdAt: new Date().toISOString(),
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/recipes`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(newRecipe),
        }
      );

      const result = await response.json();

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
        setErrors({});
      } else {
        toast.error("Failed to add recipe");
      }
    } catch (error) {
      toast.error("Failed to add recipe");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const removeCategory = (categoryToRemove) => {
    setFormData((prev) => ({
      ...prev,
      categories: prev.categories.filter((cat) => cat !== categoryToRemove),
    }));
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <LoaderFive text="Adding Recipe..." />
      </div>
    );
  }

  return (
    <div className="py-18 pt-20 lg:pt-25 lg:pb-20">
      <div className="mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-900/30">
            <ChefHat className="h-8 w-8 text-orange-600 dark:text-orange-400" />
          </div>
          <h1 className="mb-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 lg:text-4xl">
            Add a New Recipe
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Share your culinary masterpiece with the community
          </p>
        </div>

        {/* Form Container */}
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl dark:border-gray-700 dark:bg-gray-800">
          <form onSubmit={handleSubmit} className="p-8">
            <div className="grid gap-8 lg:grid-cols-2">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Recipe Title */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Recipe Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    placeholder="Enter recipe title"
                    value={formData.title}
                    onChange={handleChange}
                    className={`w-full rounded-lg border px-4 py-3 text-gray-900 placeholder-gray-500 transition-colors focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400 ${
                      errors.title
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                        : "border-gray-300"
                    }`}
                    required
                  />
                  {errors.title && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                      {errors.title}
                    </p>
                  )}
                </div>

                {/* Image URL */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Image URL *
                  </label>
                  <div className="relative">
                    <ImageIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                    <input
                      type="url"
                      name="image"
                      placeholder="https://example.com/image.jpg"
                      value={formData.image}
                      onChange={handleChange}
                      className={`w-full rounded-lg border pl-10 pr-4 py-3 text-gray-900 placeholder-gray-500 transition-colors focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400 ${
                        errors.image
                          ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                          : "border-gray-300"
                      }`}
                      required
                    />
                  </div>
                  {errors.image && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                      {errors.image}
                    </p>
                  )}
                </div>

                {/* Cuisine Type */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Cuisine Type *
                  </label>
                  <select
                    name="cuisine"
                    value={formData.cuisine}
                    onChange={handleChange}
                    className={`w-full rounded-lg border px-4 py-3 text-gray-900 transition-colors focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 ${
                      errors.cuisine
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                        : "border-gray-300"
                    }`}
                    required
                  >
                    <option value="">Select Cuisine Type</option>
                    {cuisineTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  {errors.cuisine && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                      {errors.cuisine}
                    </p>
                  )}
                </div>

                {/* Preparation Time */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Preparation Time (minutes) *
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                    <input
                      type="number"
                      name="time"
                      placeholder="30"
                      min="1"
                      value={formData.time}
                      onChange={handleChange}
                      className={`w-full rounded-lg border pl-10 pr-4 py-3 text-gray-900 placeholder-gray-500 transition-colors focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400 ${
                        errors.time
                          ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                          : "border-gray-300"
                      }`}
                      required
                    />
                  </div>
                  {errors.time && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                      {errors.time}
                    </p>
                  )}
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Categories */}
                <div>
                  <label className="mb-3 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Categories *
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {categories.map((cat) => (
                      <label
                        key={cat}
                        className="flex cursor-pointer items-center gap-3 rounded-lg border border-gray-200 p-3 transition-colors hover:border-orange-300 hover:bg-orange-50 dark:border-gray-600 dark:hover:border-orange-500 dark:hover:bg-orange-900/20"
                      >
                        <input
                          type="checkbox"
                          name="categories"
                          value={cat}
                          checked={formData.categories.includes(cat)}
                          onChange={handleChange}
                          className="h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500 dark:border-gray-600"
                        />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {cat}
                        </span>
                      </label>
                    ))}
                  </div>
                  {errors.categories && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                      {errors.categories}
                    </p>
                  )}

                  {/* Selected Categories Display */}
                  {formData.categories.length > 0 && (
                    <div className="mt-3">
                      <p className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                        Selected:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {formData.categories.map((category) => (
                          <span
                            key={category}
                            className="inline-flex items-center gap-1 rounded-full bg-orange-100 px-3 py-1 text-sm font-medium text-orange-800 dark:bg-orange-900/30 dark:text-orange-200"
                          >
                            {category}
                            <button
                              type="button"
                              onClick={() => removeCategory(category)}
                              className="ml-1 rounded-full p-0.5 hover:bg-orange-200 dark:hover:bg-orange-800"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Full Width Fields */}
            <div className="mt-8 space-y-6">
              {/* Ingredients */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Ingredients *
                </label>
                <div className="relative">
                  <List className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <textarea
                    name="ingredients"
                    placeholder="Enter ingredients (one per line)"
                    value={formData.ingredients}
                    onChange={handleChange}
                    rows={4}
                    className={`w-full rounded-lg border pl-10 pr-4 py-3 text-gray-900 placeholder-gray-500 transition-colors focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400 ${
                      errors.ingredients
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                        : "border-gray-300"
                    }`}
                    required
                  />
                </div>
                {errors.ingredients && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {errors.ingredients}
                  </p>
                )}
              </div>

              {/* Instructions */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Instructions *
                </label>
                <div className="relative">
                  <FileText className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <textarea
                    name="instructions"
                    placeholder="Enter step-by-step instructions (one step per line)"
                    value={formData.instructions}
                    onChange={handleChange}
                    rows={6}
                    className={`w-full rounded-lg border pl-10 pr-4 py-3 text-gray-900 placeholder-gray-500 transition-colors focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400 ${
                      errors.instructions
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                        : "border-gray-300"
                    }`}
                    required
                  />
                </div>
                {errors.instructions && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {errors.instructions}
                  </p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-8 flex justify-center">
              <button
                type="submit"
                disabled={isLoading}
                className="inline-flex items-center gap-2 rounded-lg bg-orange-600 px-8 py-4 text-lg font-semibold text-white transition-all duration-200 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:focus:ring-offset-gray-800"
              >
                <Plus className="h-5 w-5" />
                {isLoading ? "Adding Recipe..." : "Add Recipe"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
