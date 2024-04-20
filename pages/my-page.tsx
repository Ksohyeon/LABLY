import MyOrdersComp from "@/components/MyOrdersComp";
import styled from "styled-components";
import { SlArrowRight } from "react-icons/sl";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import MyLikeProductsComp from "@/components/MyLikeProductsComp";

const PageWapper = styled.div`
  padding-top: 20px;
  margin: 50px auto;
  display: flex;
  justify-content: center;
  & > div {
    margin: 20px;
  }
  & > div:nth-child(2) {
    width: 70vw;
    padding-left: 20px;
  }
  h2 {
    margin: 0 20px;
  }
  & > div > ul > li {
    padding: 10px;
    border: 1px solid #c7c7c7;
    &:hover {
      cursor: pointer;
    }
  }
  & > div > ul > li:nth-child(1) {
    margin-top: 20px;
  }
  & > div > ul > li:not(:nth-child(1)) {
    border-top: 0;
  }
  .nav-option {
    display: flex;
    align-items: center;
    position: relative;
    svg {
      position: absolute;
      right: 10px;
    }
  }
  .selected {
    background-color: #f3d52c;
    font-weight: bolder;
  }
`;

export const TitleWrapper = styled.div`
  position: relative;
  h2:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 5px;
    background-color: #ffd900;
  }
`;

const SideBar = styled.div`
  width: 230px;
`;

type CompType = "OrderList" | "LikeList";

export default function MyPage() {
  const [selectedComp, setSelectedComp] = useState<CompType>("OrderList");
  const likes = useSelector((state: RootState) => state.likes);

  console.log("likes: ", likes);
  return (
    <PageWapper>
      <SideBar>
        <TitleWrapper>
          <h2>나의 쇼핑</h2>
        </TitleWrapper>
        <ul>
          <li
            className={`nav-option ${
              selectedComp === "OrderList" ? "selected" : ""
            }`}
            onClick={() => setSelectedComp("OrderList")}
          >
            주문 내역
            <SlArrowRight size={17} />
          </li>
          <li
            className={`nav-option ${
              selectedComp === "LikeList" ? "selected" : ""
            }`}
            onClick={() => setSelectedComp("LikeList")}
          >
            관심 상품
            <SlArrowRight size={17} />
          </li>
        </ul>
      </SideBar>
      <div>
        {selectedComp === "OrderList" ? (
          <MyOrdersComp />
        ) : (
          <MyLikeProductsComp />
        )}
      </div>
    </PageWapper>
  );
}
