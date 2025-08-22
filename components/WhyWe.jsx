import React from "react";
import { IoIosTimer } from "react-icons/io";
import { MdOutlineFamilyRestroom } from "react-icons/md";
import { PiChefHat } from "react-icons/pi";

const defaultItems = [
  {
    title: "Expert-Approved Recipes",
    description:
      "All recipes are reviewed and tested by experienced chefs for reliability.",
    Icon: PiChefHat,
  },
  {
    title: "Quick & Easy",
    description:
      "Streamlined steps and smart tips help you cook great food faster.",
    Icon: IoIosTimer,
  },
  {
    title: "Family-Friendly",
    description:
      "Balanced flavors and portions that work for every table and occasion.",
    Icon: MdOutlineFamilyRestroom,
  },
];

export default function WhyWe({
  heading = "Why Choose Us?",
  items = defaultItems,
}) {
  return (
    <section className="rounded-2xl bg-gradient-to-br from-orange-50 to-white px-6 py-12 dark:from-gray-800 dark:to-gray-700 dark:text-gray-200">
      <h2 className="mb-8 text-center text-3xl font-bold tracking-tight">
        {heading}
      </h2>
      <ul
        className="mx-auto grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3"
        role="list"
        aria-label={heading}
      >
        {items.map(({ title, description, Icon }, idx) => (
          <li
            key={`${title}-${idx}`}
            className="group rounded-xl border border-orange-200/60 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-gray-600 dark:bg-gray-800"
          >
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-orange-100 text-orange-600 ring-1 ring-orange-200/70 group-hover:bg-orange-200 dark:bg-gray-700 dark:text-orange-300 dark:ring-gray-600">
              <Icon size={36} aria-hidden />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
              {title}
            </h3>
            <p className="text-sm leading-6 text-gray-600 dark:text-gray-300">
              {description}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
