import { useState } from "react";
import Button from "../button/Button";
import "./Card.css";

const Card = (props) => {
  const { product, onAddProduct, onRemoveProduct } = props;
  const [productCount, setProductCount] = useState(0);

  const addProduct = () => {
    setProductCount((count) => count + 1);
    onAddProduct(product);
  };
  const removeProduct = () => {
    setProductCount((count) => count - 1);
    onRemoveProduct(product);
  };

  return (
    <div className="card">
      <img
        src={product.Image}
        alt={product.title}
        width={"100%"}
        height={"230px"}
      />
      <div
        className={`card__badge ${productCount <= 0 && `card__badge-hidden`}`}
      >
        <span>{productCount}</span>
      </div>
      <div className="card__body">
        <h2 className="card__title">{product.title}</h2>
        <span className="card__price">
          {product.price.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </span>
      </div>
      <div className="hr"></div>
      <div className="btn__container">
        <Button type="add" text="+" onClick={addProduct} />

        {productCount > 0 && (
          <Button
            type="remove"
            disabled={productCount <= 0 && "disabled"}
            text="-"
            onClick={removeProduct}
          />
        )}
      </div>
    </div>
  );
};

export default Card;
