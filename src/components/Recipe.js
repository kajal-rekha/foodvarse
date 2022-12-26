import { Link } from "react-router-dom";

const Recipe = ({ recipe }) => {
  return (
    <div className=" recipe w-80 overflow-hidden rounded-2xl bg-white/75 shadow-xl shadow-rose-100 border-2 border-white p-5 flex flex-col gap-5">
      <img
        src={recipe.image_url}
        alt={recipe.title}
        className="w-full h-40 object-cover rounded-lg"
      />

      <div className="texts">
        <span className=" publisher text-xs uppercase text-sky-400 font-semibold tracking-widest">
          {recipe.publisher}
        </span>
        <h2 className="title text-2xl capitalize truncate font-semibold">
          {recipe.title}
        </h2>
        <Link
          to={`recipe-item/${recipe.id}`}
          className="bg-gradient-to-br from-rose-400 to-rose-600 self-start text-rose-50 text-sm uppercase font-medium tracking-wider p-3 px-8 rounded-lg mt-2 shadow-md shadow-rose-200 hover:shadow-lg hover:shadow-rose-300 duration-300"
        >
          view recipe
        </Link>
      </div>
    </div>
  );
};

export default Recipe;
