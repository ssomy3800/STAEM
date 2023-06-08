import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserStorage } from "../../store/carteditemreducer";

const StoragePage = () => {
  const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
  const id = currentUser ? currentUser.id : null;
  const dispatch = useDispatch();

  const games = useSelector((state) => state.games.list);

  useEffect(() => {
    if (id) {
      dispatch(fetchUserStorage(id));
    }
  }, [dispatch, id]);

  return (
    <div>
      <h2>Storage</h2>
      {games.map((game) => (
        <div key={game.id}>
          <h3>{game.title}</h3>
        </div>
      ))}
    </div>
  );
};

export default StoragePage;
