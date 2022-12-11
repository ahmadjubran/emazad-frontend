import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addBid } from "../../store/actions/bidActions";
import { selectItems } from "../../store/features/itemSlicer";
import { selectUser } from "../../store/features/authSlicer";

export default function ListOfItems() {
  const dispatch = useDispatch();
  const items = useSelector(selectItems);
  const user = useSelector(selectUser);

  const timeLeft = (item) => {
    const timeLeft = new Date(item.endDate) - new Date();
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((timeLeft / 1000 / 60) % 60);
    const seconds = Math.floor((timeLeft / 1000) % 60);
    return { days, hours, minutes, seconds };
  };

  return (
    <div>
      <h2>Items</h2>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", placeItems: "center", gridGap: "1rem" }}>
        {items.map((item) => (
          <card key={item.id}>
            <img src={item.itemImage} alt={item.title} />
            <p>{item.User.fullName}</p>
            <img
              src={item.User.image}
              alt={item.User.fullName}
              style={{ width: "50px", height: "50px", borderRadius: "50%" }}
            />
            <h3>{item.itemTitle}</h3>
            <p>{item.itemDescription}</p>
            <p>{item.latestBid ? item.latestBid : item.initialPrice}</p>
            <p>{item.category}</p>
            <p>{item.subCategory}</p>
            <p>{item.itemCondition}</p>
            <p>
              {timeLeft(item).days} days {timeLeft(item).hours} hours {timeLeft(item).minutes} minutes{" "}
              {timeLeft(item).seconds} seconds left
            </p>
            <button onClick={() => addBid(dispatch, item.id, item.latestBid + item.initialPrice * 0.1)}>
              Place Bid
            </button>
          </card>
        ))}
      </div>
    </div>
  );
}
