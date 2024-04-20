import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import ThemeContext from "@/store/ThemeContext";
import { useUser } from "@auth0/nextjs-auth0/client";
import styled from "styled-components";
import { FaShoppingCart } from "react-icons/fa";
import { IoPerson } from "react-icons/io5";
import UserInfoModal from "./UserInfoModal";

const NavWarpper = styled.nav<{ scrollDirection: ScrollDirection }>`
  position: fixed;
  top: 0;
  width: 100vw;
  padding: 0 10px;
  background-color: white;
  transform: ${(prop) =>
    prop.scrollDirection === "DOWN" ? "translateY(-80px)" : "translateY(0)"};
  transition: 0.3s ease-in-out;
  z-index: 99;
`;

const NavDiv = styled.div`
  height: 80px;
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
`;
const Logo = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  span {
    font-weight: bolder;
    font-size: xx-large;
  }
`;
const RightElements = styled.div`
  display: flex;
  align-items: center;
  svg {
    margin-right: 20px;
    &:hover {
      cursor: pointer;
    }
  }
`;
const CategoryNav = styled.div`
  height: 50px;
  background-color: #f0f0f0;
  display: flex;
  justify-content: center;
  align-items: center;
  li {
    display: inline-block;
    font-weight: bolder;
    &:hover {
      background-color: #e0e0e0;
      cursor: pointer;
    }
    li {
      &:hover {
        background-color: #d0d0d0;
      }
    }
  }
`;

const CategoryLi = styled.li`
  div:nth-child(1) {
    width: 100px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  div:nth-child(2) {
    width: 100px;
    position: absolute;
    display: none;
    background-color: #dddddddb;
    li {
      padding: 10px;
    }
  }
  &:hover {
    div:nth-child(2) {
      display: block;
    }
    li {
      display: block;
      margin: 0;
    }
  }
`;

type ScrollDirection = "UP" | "DOWN";

function Navbar() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { user } = useUser();
  const [userInfoDropDown, setUserInfoDropDown] = useState<boolean>(false);
  const [scrollDirection, setScrollDirection] = useState<ScrollDirection>("UP");

  const handleScrollEvent = (e: any) => {
    if (e.deltaY < 0) setScrollDirection("UP");
    else setScrollDirection("DOWN");
  };

  const handleClickEvent = (e: any) => {
    if (
      e.target.id !== "user-info" &&
      e.target.id !== "user-icon" &&
      e.target.nodeName !== "path"
    ) {
      setUserInfoDropDown(false);
    }
  };

  useEffect(() => {
    window.addEventListener("wheel", handleScrollEvent);
    window.addEventListener("click", handleClickEvent);
    return () => {
      window.removeEventListener("wheel", handleScrollEvent);
      window.removeEventListener("click", handleClickEvent);
    };
  }, []);

  return (
    <NavWarpper scrollDirection={scrollDirection}>
      <NavDiv>
        <Logo>
          <Link href="/">
            <span>LABLY</span>
          </Link>
        </Logo>
        <div>{/* <button onClick={toggleTheme}>theme</button> */}</div>
        <div>
          <RightElements>
            <Link href={"/cart"}>
              <FaShoppingCart size={25} />
            </Link>
            {user ? (
              <>
                <span>
                  <IoPerson
                    id="user-icon"
                    size={25}
                    onClick={() => {
                      setUserInfoDropDown((prev) => !prev);
                    }}
                  />
                </span>
                {userInfoDropDown && (
                  <UserInfoModal setUserInfoDropDown={setUserInfoDropDown} />
                )}
              </>
            ) : (
              <Link href="/api/auth/login">로그인</Link>
            )}
          </RightElements>
        </div>
      </NavDiv>
      <CategoryNav>
        <ul>
          <CategoryLi>
            <div>
              <Link href={"/category/Outers"}>아우터</Link>
            </div>
            <div>
              <ul>
                <li>
                  <Link href={"/category/Hoodies"}>후드</Link>
                </li>
                <li>
                  <Link href={"/category/Coats"}>코트</Link>
                </li>
                <li>
                  <Link href={"/category/Paddings"}>패딩</Link>
                </li>
              </ul>
            </div>
          </CategoryLi>
          <CategoryLi>
            <div>
              <Link href={"/category/Tops"}>상의</Link>
            </div>
            <div>
              <ul>
                <li>
                  <Link href={"/category/T-Shirts"}>티셔츠</Link>
                </li>
                <li>
                  <Link href={"/category/Tops"}>니트</Link>
                </li>
              </ul>
            </div>
          </CategoryLi>
          <CategoryLi>
            <div>
              <Link href={"/category/Pants"}>하의</Link>
            </div>
            <div>
              <ul>
                <li>
                  <Link href={"/category/Pants"}>청바지</Link>
                </li>
                <li>
                  <Link href={"/category/Pants"}>슬랙스</Link>
                </li>
              </ul>
            </div>
          </CategoryLi>
          <CategoryLi>
            <div>
              <Link href={"/category/Skirts"}>스커트</Link>
            </div>
            <div>
              <ul>
                <li>
                  <Link href={"/category/Skirts"}>롱스커트</Link>
                </li>
                <li>
                  <Link href={"/category/Skirts"}>미니스커트</Link>
                </li>
              </ul>
            </div>
          </CategoryLi>
          <CategoryLi>
            <div>
              <Link href={"/category/Dresses"}>원피스</Link>
            </div>
          </CategoryLi>
          <CategoryLi>
            <div>
              <Link href={"/category/Shoes"}>신발</Link>
            </div>
          </CategoryLi>
          <CategoryLi>
            <div>
              <Link href={"/category/Accessories"}>악세사리</Link>
            </div>
            <div>
              <ul>
                <li>
                  <Link href={"/category/Bags"}>가방</Link>
                </li>
                <li>
                  <Link href={"/category/Hats"}>모자</Link>
                </li>
              </ul>
            </div>
          </CategoryLi>
        </ul>
      </CategoryNav>
      <hr />
    </NavWarpper>
  );
}

export default Navbar;
