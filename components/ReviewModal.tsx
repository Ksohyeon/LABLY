import styled from "styled-components";
import { AiFillCloseCircle } from "react-icons/ai";
import StarRating from "./atoms/StarRating";
import { useCallback, useRef, useState } from "react";
import graphql from "@/lib/graphql";
import createReview from "@/lib/graphql/mutations/createReview";
import { Product } from "@/pages";
import { OrderedProduct } from "@/pages/order-detail/[id]";
import { useUser } from "@auth0/nextjs-auth0/client";

const ModalWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  height: 500px;
  padding: 30px;
  background-color: #ffe342;
  box-shadow: 0 0 20px black;
  z-index: 99999;
  .close-btn {
    position: absolute;
    right: 30px;
    &:hover {
      cursor: pointer;
      color: gray;
    }
  }
  &:before {
    content: "";
    position: absolute;
    top: calc(-50vh + 250px);
    left: calc(-50vw + 200px);
    width: 100vw;
    height: 100vh;
    z-index: -1;
    background-color: #dddddd9a;
  }
`;
const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  .title {
    height: 30px;
    padding: 0 5px;
    margin-top: 10px;
  }
  .content {
    margin-top: 10px;
    height: 300px;
  }
  button {
    margin-top: 7px;
    align-self: flex-end;
    border: 1px solid black;
    background-color: white;
    padding: 5px;
    &:hover {
      cursor: pointer;
      font-weight: bold;
      border: 2px solid black;
    }
  }
`;

export type StarRate = 1 | 2 | 3 | 4 | 5;

export default function ReviewModal({
  product,
  setIsReviewModalOpen,
}: {
  product: OrderedProduct;
  setIsReviewModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [star, setStar] = useState<StarRate>(4);
  const titleInputRef = useRef<HTMLInputElement>(null);
  const contentTextareaRef = useRef<HTMLTextAreaElement>(null);
  const { user } = useUser();
  const submitHandler = useCallback(() => {
    const data = {
      productId: product.id,
      userName: user?.nickname,
      userEmail: user?.name,
      headline: titleInputRef.current?.value,
      content: contentTextareaRef.current?.value,
      rating: star,
    };
    const newRevie = graphql.request(createReview, data);
    alert("리뷰 등록 완료.");
    setIsReviewModalOpen(false);
  }, [star]);
  return (
    <ModalWrapper>
      <AiFillCloseCircle
        className="close-btn"
        onClick={() => {
          setIsReviewModalOpen(false);
        }}
        size={25}
      />
      <p>{product.name}</p>
      <InputGroup>
        <StarRating star={star} setStar={setStar} />
        <input
          ref={titleInputRef}
          className="title"
          type="text"
          placeholder="제목"
        />
        <textarea ref={contentTextareaRef} className="content" />
        <button onClick={submitHandler}>리뷰 등록</button>
      </InputGroup>
    </ModalWrapper>
  );
}
