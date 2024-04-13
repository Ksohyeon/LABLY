import Link from "next/link";
import { useContext } from "react";
import ThemeContext from "./ThemeContext";
import { useUser } from "@auth0/nextjs-auth0/client";
import Image from "next/image";

function Navbar() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const newThemeName = theme === "light" ? "dark" : "light";
  const { user } = useUser();
  console.log("user: ", user);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 25,
      }}
    >
      <div>
        <Link href="/">LABLY</Link>
      </div>
      <div>
        <button onClick={toggleTheme}></button>
      </div>
      <div>
        {user ? (
          <div>
            <Image
              alt="user-img"
              src={user.picture || ""}
              width={100}
              height={100}
            />
            <Link href="/api/auth/logout">Logout</Link>
          </div>
        ) : (
          <Link href="/api/auth/login">Login</Link>
        )}
      </div>
    </div>
  );
}

export default Navbar;
