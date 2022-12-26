import Recipe from "./Recipe";

const Favourites = ({ savedItems }) => {
  return (
    <div className="favourite-section">
      {savedItems.length === 0 ? (
        <p className="text-2xl lg:text-4xl font-semibold text-rose-300 text-center pt-10">
          Your favourite list is empty!
        </p>
      ) : (
        <p className="text-2xl lg:text-4xl font-semibold text-rose-300 text-center pt-10">
          Your favourite recipe!
        </p>
      )}
      <div className="favourite-items-container container mx-auto py-10 flex flex-wrap gap-10 justify-center">
        {savedItems.map((recipe) => (
          <Recipe key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
};

export default Favourites;
