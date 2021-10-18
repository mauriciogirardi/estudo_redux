import { ActionType, IProduct } from "./types";

export function addProductToCartRequest(product: IProduct) {
  return {
    type: ActionType.addProductToCartRequest,
    payload: {
      product,
    },
  };
}

export function addProductToCartSuccess(product: IProduct) {
  return {
    type: ActionType.addProductToCartSuccess,
    payload: {
      product,
    },
  };
}

export function addProductToCartFailure(productId: number) {
  return {
    type: ActionType.addProductToCartFailure,
    payload: {
      productId,
    },
  };
}

export function addMoreProduct(product: IProduct) {
  return {
    type: ActionType.addMoreProductToCart,
    payload: {
      product,
    },
  };
}

export function addLessProduct(product: IProduct) {
  return {
    type: ActionType.addLessProductToCart,
    payload: {
      product,
    },
  };
}
