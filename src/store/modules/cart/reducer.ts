import { Reducer } from "redux";
import produce from "immer";
import { ActionType, ICartState } from "./types";

const INITIAL_STATE: ICartState = {
  items: [],
  failedStockCheck: [],
};

const cart: Reducer<ICartState> = (state = INITIAL_STATE, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case ActionType.addProductToCartSuccess: {
        const { product } = action.payload;

        const productInCartIndex = draft.items.findIndex(
          (item) => item.product.id === product.id
        );

        if (productInCartIndex >= 0) {
          break;
        } else {
          draft.items.push({
            product,
            quantity: 1,
          });
        }

        break;
      }
      case ActionType.addProductToCartFailure: {
        draft.failedStockCheck.push(action.payload.productId);
        break;
      }
      case ActionType.addMoreProductToCart: {
        const { product } = action.payload;

        const productInCartIndex = draft.items.findIndex(
          (item) => item.product.id === product.id
        );

        if (productInCartIndex >= 0) {
          draft.items[productInCartIndex].quantity++;
        }

        break;
      }
      case ActionType.addLessProductToCart: {
        const { product } = action.payload;
        const productInCartIndex = draft.items.findIndex(
          (item) => item.product.id === product.id
        );

        if (productInCartIndex >= 0) {
          if (draft.items[productInCartIndex].quantity === 1) {
            draft.items.splice(productInCartIndex, 1);
            return;
          }

          if (draft.items[productInCartIndex].quantity <= 0) return;

          draft.items[productInCartIndex].quantity--;
        }
        break;
      }
      default: {
        return draft;
      }
    }
  });
};

export default cart;

// return {
//   ...state,
//   items: [
//     ...state.items,
//     {
//       product,
//       quantity: 1,
//     },
//   ],
// };
