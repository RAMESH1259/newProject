import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import useLazyLoad from "./useLazyLoad";
import { Card } from "./Card";
import { LoadingPosts } from "./LoadingPosts";
import posts from "./data.json";
import { Form } from "react-bootstrap";

export const Posts = () => {
  const images = posts?.data;
  const triggerRef = useRef(null);
  const [filters, setFilters] = useState([]);
  const [paginatedData, setPaginatedData] = useState([]);

  const onGrabData = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(images);
      }, 3000);
    });
  };
  const handleSelectFilter = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const { data, loading } = useLazyLoad({ triggerRef, onGrabData, filters });

  useEffect(() => {
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
  }, [filters]);

  useEffect(() => {
    setPaginatedData(data);
    setFilters("");
  }, [data && data.length]);

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
      <div className="grid grid-cols-3 gap-4 content-start">
        {paginatedData.map((el) => {
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
