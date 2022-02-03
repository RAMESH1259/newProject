import { useDrag } from "react-dnd";
export const Card = ({
  image,
  id,
  paginatedData,
  name,
}) => {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: "image",
      item: {
        id,
        paginatedData,
      },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    [paginatedData, id]
  );
  return (
    <div class="w-full rounded overflow-hidden shadow-lg m-2" ref={drag}>
      <img
        class="w-full h-64 object-center"
        src={image}
        alt=""
        style={{ border: isDragging ? "5px solid black" : "0px" }}
      />
      <div class="px-6 py-4">
        <div class="font-regular text-xl mb-2">{name}</div>
      </div>
    </div>
  );
};
