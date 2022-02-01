import { useEffect, useState } from "react";

const INTERSECTION_THRESHOLD = 5;

const useLazyLoad = ({ triggerRef, onGrabData, options }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const _handleEntry = async (entry) => {
    const boundingRect = entry.boundingClientRect;
    const intersectionRect = entry.intersectionRect;
    if (
      !loading &&
      entry.isIntersecting &&
      intersectionRect.bottom - boundingRect.bottom <= INTERSECTION_THRESHOLD
    ) {
      setLoading(true);
      const data = await onGrabData();
      setData((prev) => [...prev, ...data]);
      setLoading(false);
    }
  };

  const onIntersect = (entries) => {
    _handleEntry(entries[0]);
  };

  useEffect(() => {
    if (triggerRef.current) {
      const container = triggerRef.current;
      const observer = new IntersectionObserver(onIntersect, options);

      observer.observe(container);

      return () => {
        observer.disconnect();
      };
    }
  }, [triggerRef, onIntersect, options]);

  return { data, loading };
};

export default useLazyLoad;
