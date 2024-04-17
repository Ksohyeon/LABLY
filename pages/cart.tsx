"use client";

import QuantityInput from "@/components/atoms/QuantityInput";
import graphql from "@/lib/graphql";
import createOrder from "@/lib/graphql/mutations/createOrder";
import createOrderItem from "@/lib/graphql/mutations/createOrderItem";
import {
  CartItem,
  clearCart,
  deleteCartItem,
  getCartItems,
  updateCartItems,
} from "@/store/CartStore";
import { useUser } from "@auth0/nextjs-auth0/client";

import Image from "next/image";
import { useEffect, useState } from "react";
import styled from "styled-components";

type OrderType = "All" | "Selected";

const CartDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  & > h2 {
    margin: 30px 0 20px;
  }
  .flex-div {
    display: flex;
    justify-content: center;
    align-items: center;
    border-right: 10px solid #f0f0f0;
  }
`;
const ItemUl = styled.ul`
  width: 80%;
  padding: 20px;
  background-color: #f0f0f0;
  & > li:not(:nth-child(1)) {
    border-top: 10px solid #f0f0f0;
  }
`;
const ItemLi = styled.li`
  display: flex;
  width: 100%;
  background-color: white;
  position: relative;
  .itme-info {
    padding: 20px;
  }
  .delete-btn {
    position: absolute;
    right: 20px;
    bottom: 20px;
    padding: 10px;
    width: 150px;
    border: 1px solid black;
    font-size: small;
    font-weight: bold;
    background-color: white;
    &:hover {
      cursor: pointer;
      background-color: #efefef;
    }
  }
  .quantity {
    position: absolute;
    bottom: 20px;
  }
`;
const OrderDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 0;
  width: 100vw;
  padding: 20px;
  font-size: medium;
  background-color: #f3d52c;
  &:hover {
    cursor: pointer;
  }
  & > span {
    font-weight: bold;
    font-size: larger;
  }
`;

export default function Cart() {
  const { user } = useUser();
  const [cartItems, setCartItems] = useState<Object>(getCartItems());
  const [selectedItems, setSelectedItems] = useState<CartItem[]>([]);

  const totalCost = () => {
    let items =
      selectedItems.length === 0 ? Object.values(cartItems) : selectedItems;

    const cost = items.reduce(
      (a: CartItem, b: CartItem) => ({
        price: a.price * a.quantity + b.price * b.quantity,
        quantity: 1,
      }),
      { price: 0, quantity: 0 }
    );
    const result = cost.price
      .toString()
      .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    return result;
  };

  const handleDeleteCartItem = (item: CartItem) => {
    setCartItems(deleteCartItem(item));
  };

  const handleSubmitOrder = async (type: OrderType) => {
    if (user === undefined) {
      alert("로그인이 필요합니다.");
      return;
    }
    if (type === "All") {
      const orderItems = [];
      let total = 0;
      for (let item of Object.values(cartItems)) {
        total += item.quantity;
        const orderItem: { createOrderItem: { id: string } } =
          await graphql.request(createOrderItem, {
            total: item.quantity,
            quantity: item.quantity,
            productId: item.id,
          });
        orderItems.push({ id: orderItem.createOrderItem.id });
      }
      const createdOrder = await graphql.request(createOrder, {
        email: user.name,
        total: total,
        orderItems: { connect: orderItems },
      });
    } else if (type === "Selected") {
    }
    clearCart();
    setCartItems({});
  };

  useEffect(() => {
    updateCartItems(cartItems);
    console.log("cartItems: ", cartItems);
  }, [cartItems]);

  return (
    <CartDiv>
      <h2>장바구니</h2>
      <ItemUl>
        {Object.values(cartItems).length === 0 && (
          <div style={{ textAlign: "center" }}>장바구니가 비었습니다.</div>
        )}
        {Object.values(cartItems).map((item: CartItem) => (
          <ItemLi key={item.id}>
            <div className="flex-div">
              <Image
                src={item.images.url}
                width={150}
                height={150}
                alt={item.images.url}
              />
            </div>
            <div>
              <ul className="itme-info">
                <li>{item.name}</li>
                <li>{item.price}원</li>
                <li className="quantity">
                  <QuantityInput item={item} setCartItems={setCartItems} />
                </li>
              </ul>
            </div>
            <button
              className="delete-btn"
              onClick={() => handleDeleteCartItem(item)}
            >
              장바구니에서 삭제
            </button>
          </ItemLi>
        ))}
      </ItemUl>
      <OrderDiv onClick={() => handleSubmitOrder("All")}>
        <span>{totalCost()}원 </span>&nbsp;&nbsp;주문하기
      </OrderDiv>
    </CartDiv>
  );
}
