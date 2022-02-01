import { useRef } from "react";
import clsx from "clsx";
import useLazyLoad from "./useLazyLoad";
import { Card } from "./Card";
import { LoadingPosts } from "./LoadingPosts";
import posts from "./data.json";

export const Posts = () => {
  const images = posts?.data;
  const triggerRef = useRef(null);

  const onGrabData = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(images);
      }, 3000);
    });
  };

  const { data, loading } = useLazyLoad({ triggerRef, onGrabData });
  return (
    <>
      <div className="grid grid-cols-3 gap-4 content-start">
        {data.map((el) => {
          return <Card name={el?.name} image={el?.image} />;
        })}
      </div>
      {/* loading post */}
      <div ref={triggerRef} className={clsx("trigger", { visible: loading })}>
        <LoadingPosts />
      </div>
    </>
  );
};
