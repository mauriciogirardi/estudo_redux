import { useCallback } from "react";
import { IProduct } from "../store/modules/cart/types";
import { useDispatch, useSelector } from "react-redux";

import {
  addProductToCartRequest,
  addLessProduct,
  addMoreProduct,
} from "../store/modules/cart/actions";
import { IState } from "../store";

interface CatalogItemProps {
  product: IProduct;
}

const CatalogItem = ({ product }: CatalogItemProps) => {
  const dispatch = useDispatch();

  const hasFailedStockCheck = useSelector<IState, boolean>((state) => {
    return state.cart.failedStockCheck.includes(product.id);
  });

  const handleAddProductToCart = useCallback(() => {
    dispatch(addProductToCartRequest(product));
  }, [dispatch, product]);

  const handleAddMoreProduct = useCallback(() => {
    dispatch(addMoreProduct(product));
  }, [dispatch, product]);

  const handleAddLessProduct = useCallback(() => {
    dispatch(addLessProduct(product));
  }, [dispatch, product]);

  return (
    <>
      <article
        key={product.id}
        style={{
          display: "flex",
          width: "500px",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 10,
        }}
      >
        <strong>{product.title}</strong>
        <span style={{ display: "block" }}>
          {product.price.toLocaleString("pt-BR", {
            currency: "BRL",
            style: "currency",
          })}
        </span>

        <button type="button" onClick={handleAddProductToCart}>
          Comprar
        </button>

        <button type="button" onClick={handleAddMoreProduct}>
          +
        </button>
        <button type="button" onClick={handleAddLessProduct}>
          -
        </button>

        {hasFailedStockCheck && (
          <span style={{ color: "red" }}>Falta de estoque</span>
        )}
      </article>
    </>
  );
};

export default CatalogItem;
