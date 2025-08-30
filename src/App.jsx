import Card from "./components/card/card";
import { getData } from "./constants/db";
import "./App.css";
import { useCallback, useEffect, useState } from "react";
import Cart from "./components/cart/Cart";

const products = getData();

const telegram = window.Telegram.WebApp;

function App() {
  const [cartProducts, setCartProducts] = useState([]);

  useEffect(() => {
    telegram.ready();
  });

  const onAddProduct = (product) => {
    const existData = cartProducts.find((item) => item.id === product.id);

    if (existData) {
      const newData = cartProducts.map((item) =>
        item.id === product.id
          ? { ...existData, quantity: existData.quantity + 1 }
          : item
      );

      setCartProducts(newData);
    } else {
      setCartProducts((prev) => [...prev, { ...product, quantity: 1 }]);
    }
  };

  const onRemoveProduct = (product) => {
    const existData = cartProducts.find((item) => item.id === product.id);
    if (existData.quantity === 1) {
      const newData = cartProducts.filter((item) => item.id !== product.id);
      setCartProducts(newData);
      if (newData.length === 0) {
        telegram.MainButton.hide();
      }
    } else {
      const newData = cartProducts.map((item) =>
        item.id === product.id
          ? { ...existData, quantity: existData.quantity - 1 }
          : item
      );

      setCartProducts(newData);
    }
  };

  const onCheckout = () => {
    telegram.MainButton.text = "Sotib olish :)";
    telegram.MainButton.show();
  };

  const onSendData = useCallback(() => {
    telegram.sendData(JSON.stringify(cartProducts));
  }, [cartProducts]);

  useEffect(() => {
    telegram.onEvent("mainButtonClicked", onSendData);

    return () => telegram.offEvent("mainButtonClicked", onSendData);
  }, [onSendData]);
  return (
    <>
      <h1 className="hidden">Sammi kurslari</h1>
      <Cart cartProducts={cartProducts} onCheckout={onCheckout} />
      <div className="cards__container">
        {products.map((course) => (
          <Card
            product={course}
            key={course.id}
            onAddProduct={onAddProduct}
            onRemoveProduct={onRemoveProduct}
          />
        ))}
      </div>
    </>
  );
}

export default App;
