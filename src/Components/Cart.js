import React from "react";
import { useAppContext } from "./Appcontext";
import "./Cart.css";

function Cart() {
  const { cart, dispatch } = useAppContext();

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty!</p>
      ) : (
        <ul>
          {cart.map((movie) => (
            <li key={movie.id}>
              {movie.title || movie.name}{" "}
              <button
                onClick={() =>
                  dispatch({ type: "REMOVE_MOVIE", payload: movie }) // Dispatch REMOVE_MOVIE
                }
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
      {cart.length > 0 && (
        <button
          onClick={() => dispatch({ type: "CLEAR_CART" })} // Dispatch CLEAR_CART
        >
          Clear Cart
        </button>
      )}
    </div>
  );
}

export default Cart;
