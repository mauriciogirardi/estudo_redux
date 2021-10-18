import { all, takeLatest, select, call, put } from "redux-saga/effects";
import { AxiosResponse } from "axios";
import api from "../../../services/api";
import { IState } from "../../index";
import {
  addMoreProduct,
  addProductToCartFailure,
  addProductToCartRequest,
  addProductToCartSuccess,
} from "./actions";
import { ActionType } from "./types";

type CheckProductStockRequest = ReturnType<typeof addProductToCartRequest>;

interface iStockResponse {
  id: number;
  quantity: number;
}

function* checkProductStock({ payload }: CheckProductStockRequest) {
  const { product } = payload;

  const currentQuantity: number = yield select((state: IState) => {
    return (
      state.cart.items.find((item) => item.product.id === product.id)
        ?.quantity ?? 0
    );
  });

  const availableStockRequest: AxiosResponse<iStockResponse> = yield call(
    api.get,
    `stock/${product.id}`
  );

  if (availableStockRequest.data.quantity > currentQuantity) {
    yield put(addProductToCartSuccess(product));
  } else {
    yield put(addProductToCartFailure(product.id));
  }
}

export default all([
  takeLatest(ActionType.addProductToCartRequest, checkProductStock),
  takeLatest(ActionType.addLessProductToCart, checkProductStock),
]);
