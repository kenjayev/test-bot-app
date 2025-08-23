import { totalPrice } from "../../units/total-price";
import Button from "../button/Button";
import "./Cart.css";

const Cart = ({ cartProducts, onCheckout }) => {
  return (
    <div className="cart__container">
      <p className="cart__info">
        Umumiy narx:{" "}
        {totalPrice(cartProducts).toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        })}
      </p>
      <Button
        type={"checkout"}
        text={`${cartProducts.length === 0 ? "Buyurtma berish" : "To'lov"}`}
        disabled={`${cartProducts.length === 0 ? "disabled" : ""}`}
        onClick={onCheckout}
      />
    </div>
  );
};

export default Cart;
