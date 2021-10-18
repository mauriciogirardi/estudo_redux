import { useSelector } from "react-redux";
import { IState } from "../store";
import { ICartItem } from "../store/modules/cart/types";

const Cart = () => {
  const cart = useSelector<IState, ICartItem[]>((state) => state.cart.items);

  const total = cart
    .reduce((acc, item) => {
      return item.product.price * item.quantity + acc;
    }, 0)
    .toLocaleString("pt-BR", {
      currency: "BRL",
      style: "currency",
    });

  return (
    <div style={{ width: "600px" }}>
      <h1>Cart</h1>

      <table style={{ width: "100%" }}>
        <thead>
          <tr style={{ textAlign: "left" }}>
            <th>Produto</th>
            <th>Preço</th>
            <th>Quantidade</th>
            <th>Total</th>
          </tr>
        </thead>

        <tbody>
          {cart.map((item) => (
            <tr key={item.product.id}>
              <td>{item.product.title}</td>
              <td>
                {item.product.price.toLocaleString("pt-BR", {
                  currency: "BRL",
                  style: "currency",
                })}
              </td>
              <td>{item.quantity}</td>
              <td>
                {(item.product.price * item.quantity).toLocaleString("pt-BR", {
                  currency: "BRL",
                  style: "currency",
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h4 style={{ textAlign: "right", marginRight: 50 }}>TOTAL: {total}</h4>
    </div>
  );
};

export default Cart;
