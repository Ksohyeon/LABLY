import React, { useState } from "react";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";
import ADD_SIGN from "@/lib/apollo/queries/addSign";

const NewSign = () => {
  const router = useRouter();
  const [formState, setFormState] = useState({});
  const [addSign] = useMutation(ADD_SIGN, {
    onCompleted() {
      router.push("/");
    },
  });

  const handleInput = ({
    e,
    name,
  }: {
    e: React.ChangeEvent<HTMLInputElement>;
    name: string;
  }) => {
    setFormState((prev) => {
      return {
        ...prev,
        [name]: e.target.value,
      };
    });
  };

  return (
    <div>
      <input
        type="text"
        placeholder="name"
        onChange={(e) => handleInput({ e, name: "nickname" })}
      />
      <input
        type="text"
        placeholder="content"
        onChange={(e) => handleInput({ e, name: "content" })}
      />
      <input
        type="text"
        placeholder="country"
        onChange={(e) => handleInput({ e, name: "country" })}
      />
      <button onClick={() => addSign({ variables: formState })}>submit</button>
    </div>
  );
};

export default NewSign;
