import { CartItem } from "@/store/CartStore";
import React from "react";
import styled from "styled-components";

const QuantityDiv = styled.div`
  button,
  input {
    width: 24px;
    padding: 3px;
    background-color: white;
    border: 1px solid gray;
    font-size: medium;
    text-align: center;
  }
  button {
    &:hover {
      background-color: #e7e7e7;
      cursor: pointer;
    }
  }
`;

export default function QuantityInput({
  quantity,
  setQuantity,
  item,
  setCartItems,
}: {
  quantity?: number;
  setQuantity?: React.Dispatch<React.SetStateAction<number>>;
  item?: CartItem;
  setCartItems?: React.Dispatch<React.SetStateAction<Object>>;
}) {
  return (
    <QuantityDiv>
      {item && setCartItems && (
        <>
          <button
            onClick={() => {
              setCartItems((prev) => ({
                ...prev,
                [item.id]: { ...item, quantity: item.quantity - 1 },
              }));
            }}
          >
            -
          </button>
          <input value={item.quantity}></input>
          <button
            onClick={() => {
              setCartItems((prev) => ({
                ...prev,
                [item.id]: { ...item, quantity: item.quantity + 1 },
              }));
            }}
          >
            +
          </button>
        </>
      )}
      {quantity && setQuantity && (
        <>
          <button
            onClick={() => {
              setQuantity((prev) => prev - 1);
            }}
          >
            -
          </button>
          <input value={quantity}></input>
          <button
            onClick={() => {
              setQuantity((prev) => prev + 1);
            }}
          >
            +
          </button>
        </>
      )}
    </QuantityDiv>
  );
}
