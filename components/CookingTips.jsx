const tips = [
  {
    title: "Prep Before You Cook",
    description:
      "Read the recipe, gather ingredients, and measure everything before turning on the heat.",
    icon: "✅",
  },
  {
    title: "Season As You Go",
    description:
      "Build layers of flavor by seasoning at each stage rather than only at the end.",
    icon: "🧂",
  },
  {
    title: "Control the Heat",
    description:
      "Let the pan preheat, avoid overcrowding, and adjust heat to maintain sizzle not smoke.",
    icon: "🔥",
  },
  {
    title: "Use Sharp Knives",
    description:
      "A sharp knife is safer and faster. Hone regularly and keep blades clean and dry.",
    icon: "🔪",
  },
  {
    title: "Taste and Iterate",
    description:
      "Taste frequently and fine-tune with acid, salt, fat, or sweetness for balance.",
    icon: "👅",
  },
  {
    title: "Clean As You Go",
    description:
      "Rinse tools, wipe surfaces, and manage dishes while cooking for a smoother finish.",
    icon: "🧽",
  },
];

export default function CookingTips({
  heading = "Cooking Tips",
  items = tips,
}) {
  return (
    <section className="py-15 lg:py-20">
      <h2 className="mb-6 text-center text-2xl font-bold dark:text-gray-200">
        {heading}
      </h2>
      <ul
        className="mx-auto grid  grid-cols-1 gap-4 text-gray-700 dark:text-gray-200 sm:grid-cols-2"
        role="list"
        aria-label={heading}
      >
        {items.map((tip, index) => (
          <li
            key={`${tip.title}-${index}`}
            className="flex items-start gap-3 rounded-lg border border-orange-200 bg-white p-4 shadow-sm dark:border-gray-600 dark:bg-gray-800"
          >
            <span aria-hidden className="text-xl" title={tip.title}>
              {tip.icon}
            </span>
            <div>
              <h3 className="text-base font-semibold">{tip.title}</h3>
              <p className="mt-1 text-sm opacity-90">{tip.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
