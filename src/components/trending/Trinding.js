import { React, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTrend } from "../../store/actions/trendindAction";

function Trinding() {
  const dispatch = useDispatch();
  const trendingItems = useSelector((state) => state.trending);

  useEffect(() => {
    getTrend(dispatch);
  }, [dispatch]);

  return (
    (
      <div>
        <h1>Trinding</h1>
        {trendingItems.trendItems.map((item) => {
          return (
            <div>
              <p>{item.itemTitle}</p>
              <p>{item.itemDescription}</p>
              <p>{item.initialPrice}</p>
              <img src={item.itemImage} alt="itemImage" />
            </div>
          );
        })}
      </div>
    )
  );
}

export default Trinding;
