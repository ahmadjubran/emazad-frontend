import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getItems } from "../store/actions/itemActions";
import { selectItems } from "../store/features/itemSlicer";

function Categories() {
  const dispatch = useDispatch();
  const items = useSelector(selectItems);

  console.log(items);

  return (
    <div>
      <h2>Categories</h2>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", placeItems: "center", gridGap: "1rem" }}>
        <card onClick={() => getItems(dispatch, "active", "electronics")} style={{ cursor: "pointer" }}>
          <img src="https://picsum.photos/350/250" alt="random" />
          <h3>Category 1</h3>
          <p>Category 1 description</p>
        </card>
        <card onClick={() => getItems(dispatch, "active", "clothes")} style={{ cursor: "pointer" }}>
          <img src="https://picsum.photos/350/250" alt="random" />
          <h3>Category 2</h3>
          <p>Category 2 description</p>
        </card>
        <card onClick={() => getItems(dispatch, "active", "realestate")} style={{ cursor: "pointer" }}>
          <img src="https://picsum.photos/350/250" alt="random" />
          <h3>Category 3</h3>
          <p>Category 3 description</p>
        </card>
        <card onClick={() => getItems(dispatch, "active", "pets")} style={{ cursor: "pointer" }}>
          <img src="https://picsum.photos/350/250" alt="random" />
          <h3>Category 4</h3>
          <p>Category 4 description</p>
        </card>
        <card onClick={() => getItems(dispatch, "active", "vehicles")} style={{ cursor: "pointer" }}>
          <img src="https://picsum.photos/350/250" alt="random" />
          <h3>Category 5</h3>
          <p>Category 5 description</p>
        </card>
        <card onClick={() => getItems(dispatch, "active", "others")} style={{ cursor: "pointer" }}>
          <img src="https://picsum.photos/350/250" alt="random" />
          <h3>Category 6</h3>
          <p>Category 6 description</p>
        </card>
      </div>
    </div>
  );
}

export default Categories;
