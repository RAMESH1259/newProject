import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import useLazyLoad from "./useLazyLoad";
import { Card } from "./Card";
import { LoadingPosts } from "./LoadingPosts";
import posts from "../data.json";
import { Form } from "react-bootstrap";
import { useDrop } from "react-dnd";

export const Posts = () => {
  const images = posts?.data;
  const triggerRef = useRef(null);
  const [filters, setFilters] = useState([]);
  const [flag, setFlag] = useState(true);
  const [paginatedData, setPaginatedData] = useState([]);
  const [board, setBoard] = useState([
    {
      id: 7,
      image: "https://source.unsplash.com/user/c_v_r/1900x800",
      name: "Dummy data",
      type: "natural",
      status: "inActive",
      assign: "Gautam_Sir",
    },
  ]);

  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: "image",
      drop: (item) => {
        addImageBoard(item.id, true);
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    [paginatedData]
  );

  const [{ isOver1 }, drop2] = useDrop(
    () => ({
      accept: "image",
      drop: (item) => {
        addImageBoard(item.id, false);
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    [board]
  );

  const onGrabData = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(images);
      }, 0);
    });
  };

  const handleSelectFilter = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  
  useEffect(() => {
    // if (filters) {
    const result = Object.values(filters);
    const result12 = Object.keys(filters);
    let temp = data;
    for (let i = 0; i < result.length; i++) {
      let key = result12[i];
      temp = temp.filter(
        (item) => item[key] === result[i]
        // item?.assign == result[i] ||
        // item?.type == result[i]
      );
    }
    setPaginatedData(temp);
    // }
  }, [filters]);

  const { data, loading } = useLazyLoad({ triggerRef, onGrabData });

  useEffect(() => {
    if (data && data.length) {
      setPaginatedData(data);
      // setFilters("");    v
    }
  }, [data && data.length]);

  
  const addImageBoard = (id, flag1) => {
    debugger;
    if (flag1) {
      const Pictures = paginatedData.filter((picture) => id == picture.id);
      setBoard((board) => [...board, Pictures[0]]);
      const remaining = paginatedData.filter((el) => id != el.id);
      setPaginatedData(remaining);
    } else {
      const Pictures = board.filter((picture) => id == picture.id);
      setPaginatedData((paginatedData) => [...paginatedData, Pictures[0]]);
      const remaining = board.filter((el) => id != el.id);
      setBoard(remaining);
    }
  };

  return (
    <>
      <div className="row mb-4 data-table-header">
        <div className="row-md mt-1  d-flex justify-content-between">
          <div className="col-md-8 d-flex">
            <div className="col-md-3 ms-3">
              <Form.Group>
                <Form.Label>Image Type</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  className="custom_select"
                  name="type"
                  value={filters?.type}
                  onChange={handleSelectFilter}
                >
                  <option hidden>Select Status</option>
                  <option value="natural">natural</option>
                  <option value="artificial">artificial</option>
                  <option value="man_made">man_made</option>
                </Form.Select>
              </Form.Group>
            </div>
            <div className="col-md-3 ms-3">
              <Form.Group>
                <Form.Label>Image Status</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  className="custom_select"
                  name="status"
                  onChange={handleSelectFilter}
                  value={filters?.status}
                >
                  <option hidden>Select Journey</option>
                  <option value="active">active</option>
                  <option value="inActive">inActive</option>
                </Form.Select>
              </Form.Group>
            </div>
            <div className="col-md-3 ms-1">
              <Form.Group>
                <Form.Label>Assignee</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  className="custom_select"
                  value={filters?.assign}
                  name="assign"
                  onChange={handleSelectFilter}
                >
                  <option hidden>Select Assignee</option>
                  <option value="Gautam_Sir">Gautam_Sir</option>
                  <option value="Amit_Sir">Amit_Sir</option>
                </Form.Select>
              </Form.Group>
            </div>
          </div>
        </div>
      </div>
      <div className="row d-flex justify-content-between ">
        <div className="col-md-5 ">
          <div
            className="grid grid-cols-3 gap-4 content-start"
            ref={drop2}
          >
            {paginatedData.map((el) => {
              return (
                <Card
                  image={el?.image}
                  name={el?.name}
                  id={el.id}
                  paginatedData={paginatedData}
                  flag={flag}
                />
              );
            })}
          </div>
        </div>
        <div className="col-md-5">
          <div className="grid grid-cols-3 gap-4 content-start" ref={drop}>
            {board.map((el) => {
              return (
                <Card
                  image={el?.image}
                  id={el?.id}
                  name={el?.name}
                  paginatedData={board}
                  flag={!flag}
                />
              );
            })}
          </div>
        </div>
      </div>
      {/* loading post */}
      <div ref={triggerRef} className={clsx("trigger", { visible: loading })}>
        <LoadingPosts />
      </div>
    </>
  );
};
