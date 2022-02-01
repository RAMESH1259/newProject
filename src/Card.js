export const Card = ({ name, image }) => {
  return (
    <div class="w-full rounded overflow-hidden shadow-lg m-2">
      <img class="w-full h-64 object-center" src={image} alt="" />
      <div class="px-6 py-4">
        <div class="font-regular text-xl mb-2">{name}</div>
      </div>
    </div>
  );
};
