import { useEffect, useReducer } from "react";

const INTERSECTION_THRESHOLD = 5;
const reducer = (state, action) => {
  switch (action.type) {
    case "set": {
      return {
        ...state,
        ...action.payload,
      };
    }
    case "onGrabData": {
      return {
        ...state,
        loading: false,
        data: [...state.data, ...action.payload.data],
      };
    }
    default:
      return state;
  }
};

const useLazyLoad = ({ triggerRef, onGrabData, filters, options }) => {
  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    data: [],
  });


  // const [loading, setLoading] = useState(false);
  // const [data, setData] = useState([]);

  const _handleEntry = async (entry) => {
    const boundingRect = entry.boundingClientRect;
    const intersectionRect = entry.intersectionRect;
    if (
      !state.loading &&
      entry.isIntersecting &&
      intersectionRect.bottom - boundingRect.bottom <= INTERSECTION_THRESHOLD
    ) {
      // setLoading(true);
      // const data = await onGrabData();
      // setData((prev) => [...prev, ...data]);
      // setLoading(false);
      dispatch({ type: "set", payload: { loading: true } });
      const data = await onGrabData();
      dispatch({ type: "onGrabData", payload: { data } });
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

  // return { data, loading };
  return state;
};

export default useLazyLoad;
