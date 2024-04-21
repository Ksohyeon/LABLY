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
  padding: 0 30px;
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
    font-weight: bold;
    &:hover {
      cursor: pointer;
    }
  }
  a {
    width: 100px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const CategoryLi = styled.li`
  position: relative;

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
    background-color: #ffffffdb;
    box-shadow: 0 0 2px #b7b7b7db;
    li {
      display: block;
      margin: 0;
      &:hover {
        color: #ffc400;
      }
    }
  }
  &:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 0;
    height: 3px;
    transform: translateX(-50%);
    transition: all 0.5s;
    background-color: #ffcc00;
    z-index: 99999;
  }
  &:hover {
    div:nth-child(2) {
      display: block;
    }
    &:after {
      width: 100%;
    }
  }
`;

const categoris = [
  {
    category: "아우터",
    link: "/category/Outers",
    children: [
      {
        category: "후드",
        link: "/category/Hoodies",
      },
      {
        category: "코트",
        link: "/category/Coats",
      },
      {
        category: "패딩",
        link: "/category/Paddings",
      },
    ],
  },
  {
    category: "상의",
    link: "/category/Tops",
    children: [
      {
        category: "티셔츠",
        link: "/category/T-Shirts",
      },
      {
        category: "니트",
        link: "/category/Tops",
      },
    ],
  },
  {
    category: "하의",
    link: "/category/Pants",
    children: [],
  },
  {
    category: "스커트",
    link: "/category/Skirts",
    children: [],
  },
  {
    category: "원피스",
    link: "/category/Dresses",
    children: [],
  },
  {
    category: "신발",
    link: "/category/Shoes",
    children: [],
  },
  {
    category: "악세사리",
    link: "/category/Accessories",
    children: [
      {
        category: "가방",
        link: "/category/Bags",
      },
      {
        category: "모자",
        link: "/category/Hats",
      },
    ],
  },
];

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
          {categoris.map((category) => (
            <CategoryLi key={category.category}>
              <div>
                <Link href={`${category.link}`}>{category.category}</Link>
              </div>
              <div>
                <ul>
                  {category.children.map((child) => (
                    <li key={child.category}>
                      <Link href={`${child.link}`}>{child.category}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </CategoryLi>
          ))}
        </ul>
      </CategoryNav>
      <hr />
    </NavWarpper>
  );
}

export default Navbar;
