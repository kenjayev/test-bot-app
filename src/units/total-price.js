export const totalPrice = (arr) => {
  return arr.reduce((acc, cur) => acc + cur.price * cur.quantity, 0);
};
