import React from "react";
import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import { useUser } from "@auth0/nextjs-auth0/client";
import { AiFillCloseCircle } from "react-icons/ai";

const UserInfo = styled.div`
  position: absolute;
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
  border: 1px solid gray;
  box-shadow: 0 0 10px gray;
  padding: 20px;
  background-color: #ffffff;
  transform: translate(-75%, 70%);
  &:after {
    content: "";
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    border-radius: 10px;
  }
  svg {
    margin: 0;
  }
  div:nth-child(1) {
    position: absolute;
    padding: 0 20px;
  }
  div:not(:nth-child(1)) {
    margin-top: 10px;
  }
  .close {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    svg {
      &:hover {
        cursor: pointer;
      }
    }
  }
  .zindex-2 {
    position: relative;
    z-index: 999;
    &:hover {
      font-weight: bolder;
      transform: scale(1.5);
    }
  }
  .margint-bottom {
    margin-bottom: 20px;
  }
`;
const UserImg = styled.div`
  display: inline-block;
  margin: 0;
  img {
    border-radius: 50%;
  }
  div {
    position: absolute;
  }
`;

export default function UserInfoModal({
  setUserInfoDropDown,
}: {
  setUserInfoDropDown: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { user = {} } = useUser();
  return (
    <>
      <UserInfo id="user-info">
        <div className="close">
          <span>
            <AiFillCloseCircle
              className="zindex-2"
              size={25}
              onClick={() => {
                setUserInfoDropDown(false);
              }}
            />
          </span>
        </div>
        <UserImg>
          <Image
            alt="user-img"
            src={user.picture || ""}
            width={70}
            height={70}
          />
        </UserImg>
        <div>
          <b>{user.nickname}</b>
        </div>
        <div>{user.name}</div>
        <br />
        <div className="margint-bottom">
          <Link className="zindex-2" href={"/my-page"}>
            마이페이지
          </Link>
        </div>
        <div className="margint-bottom">
          <Link className="zindex-2" href="/api/auth/logout">
            로그아웃
          </Link>
        </div>
      </UserInfo>
    </>
  );
}
