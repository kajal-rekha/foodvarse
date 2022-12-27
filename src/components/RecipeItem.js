import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";

const RecipeItem = ({ favouriteHandler, savedItems }) => {
  const [itemSavedStatus, setItemSavedStatus] = useState(null);
  const { id } = useParams();

  const { data: recipe, loading, error } = useFetch(id);

  const durationCalc = (duration) => {
    if (!duration) return;

    if (!String(duration).includes(".")) {
      return duration + "h";
    }

    if (String(duration).includes(".")) {
      const splittedDuration = String(duration).split(".");
      const hour = splittedDuration[0] + "h";
      const splitterMinutes = "." + splittedDuration[1];
      const minutes = +splitterMinutes * 60 + "min";

      return hour + minutes;
    }
  };

  useEffect(() => {
    if (!recipe) return;

    setItemSavedStatus(savedItems.some((item) => item.id === recipe.id));
  }, [recipe]);

  return (
    <div className="recipe-item-section container mx-auto px-5 py-8 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:px-0">
      <div className="left row-start-2 lg:row-start-auto">
        <div className="img overflow-hidden rounded-xl border shadow-md lg:h-96 group">
          <img
            src={recipe?.image_url}
            alt={recipe?.title}
            className="w-full h-full object-cover group-hover:scale-105 duration-300"
          />
        </div>
        <div className="ings mt-10">
          <span className="ing-title text-3xl font-medium mb-5 inline-block">
            Ingredients:
          </span>
          <ul className="flex flex-col gap-2">
            {recipe?.ingredients?.map((ing, i) => (
              <li key={i}>
                ✓ {ing.quantity}
                {ing.unit} {ing.description}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="right flex flex-col gap-5">
        <span className="publisher text-sky-400 font-semibold uppercase tracking-widest">
          {recipe?.publisher}
        </span>
        <h2 className="title capitalize text-4xl lg:text-6xl">
          {recipe?.title}
        </h2>
        <div className="servings-cooking-time flex flex-col justify-between gap-5 lg:flex-row font-semibold tracking-widest text-rose-500 uppercase">
          <div className="servings">Servings: {recipe?.servings} people</div>
          <div className="cooking-time">
            Cooking time:{" "}
            {recipe?.cooking_time < 60
              ? String(recipe?.cooking_time) + "min"
              : durationCalc(recipe?.cooking_time / 60)}
          </div>
        </div>
        <div className="btns flex flex-col gap-5 items-start lg:flex-row lg:justify-center">
          <button
            onClick={() => favouriteHandler(recipe?.id)}
            className={`bg-gradient-to-br p-3 px-8 rounded-lg text-sm uppercase font-medium tracking-wider mt-2 inline-block shadow-md hover:shadow-lg  duration-300 ${
              itemSavedStatus
                ? "from-orange-400 to-orange-600 text-orange-50 shadow-orange-200 hover:shadow-orange-300"
                : "from-sky-400 to-sky-600 text-sky-50 shadow-sky-200 hover:shadow-sky-300"
            }`}
          >
            {itemSavedStatus
              ? "- Remove from favourites"
              : "+ Save as favourite"}
          </button>
          <a
            href={recipe?.source_url}
            target="_blank"
            rel="noreferrer"
            className="bg-gradient-to-br from-sky-400 to-sky-600 text-sky-50 p-3 px-8 rounded-lg text-sm uppercase font-bold tracking-wider mt-2 inline-block shadow-md shadow-sky-200 hover:shadow-lg hover:shadow-sky-300 duration-300 outline-none text-center"
          >
            Get directions
          </a>
          <Link
            to="/"
            className="bg-gradient-to-br from-rose-400 to-rose-600 text-rose-50 p-3 px-8 rounded-lg text-sm uppercase font-bold tracking-wider mt-2 inline-block shadow-md shadow-rose-200 hover:shadow-lg hover:shadow-rose-300 duration-300 outline-none text-center"
          >
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RecipeItem;
