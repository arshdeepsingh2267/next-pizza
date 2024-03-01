import { createContext, useMemo, useReducer } from "react";

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return [
        ...state,
        {
          id: action.id,
          tempId: action.tempId,
          name: action.name,
          price: action.price,
          qty: action.qty,
          size: action.priceOption,
          img: action.img,
        },
      ];
    case "UPDATE":
      let arr = [...state];
      arr.find((food, index) => {
        if (food.tempId === action.tempId) {
          arr[index] = {
            ...food,
            qty: parseInt(action.qty) + parseInt(food.qty),
            price: action.price + food.price,
          };
        }
      });
      return arr;

    case "REMOVE":
      let newArr = [...state];
      newArr.splice(action.index, 1);
      return newArr;

    case "INCREMENT":
      let incArr = [...state];
      incArr.find((food, index) => {
        if (food.tempId === action.tempId) {
          incArr[index] = {
            ...food,
            qty: parseInt(food.qty) + 1,
            price: food.price + action.unitPrice,
          };
        }
      });
      return incArr;

    case "DECREMENT":
      let decArr = [...state];
      decArr.find((food, index) => {
        if (food.tempId === action.tempId) {
          decArr[index] = {
            ...food,
            qty: parseInt(food.qty) - 1,
            price: food.price - action.unitPrice,
          };
        }
      });
      return decArr;

    case "DROP":
      let emptyArr = [];
      return emptyArr;
    default:
      console.log("Action type");
  }
};

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, []);
  const contextValue = useMemo(() => {
    return { state, dispatch };
  }, [state, dispatch]);

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};
