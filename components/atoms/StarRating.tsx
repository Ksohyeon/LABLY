import React from "react";
import { FaStar } from "react-icons/fa";
import { StarRate } from "../ReviewModal";
import styled from "styled-components";

const StarDiv = styled.div<{ star: StarRate }>`
  .start1 {
    color: ${(props) => (props.star >= 1 ? "#ffc800" : "#adadad")};
  }
  .start2 {
    color: ${(props) => (props.star >= 2 ? "#ffc800" : "#adadad")};
  }
  .start3 {
    color: ${(props) => (props.star >= 3 ? "#ffc800" : "#adadad")};
  }
  .start4 {
    color: ${(props) => (props.star >= 4 ? "#ffc800" : "#adadad")};
  }
  .start5 {
    color: ${(props) => (props.star === 5 ? "#ffc800" : "#adadad")};
  }
`;

export default function StarRating({
  star,
  setStar,
}: {
  star: StarRate;
  setStar?: React.Dispatch<React.SetStateAction<StarRate>>;
}) {
  return (
    <StarDiv star={star}>
      <FaStar
        size={20}
        className={"start1"}
        onClick={() => {
          if (setStar) setStar(1);
        }}
      />
      <FaStar
        size={20}
        className={"start2"}
        onClick={() => {
          if (setStar) setStar(2);
        }}
      />
      <FaStar
        size={20}
        className={"start3"}
        onClick={() => {
          if (setStar) setStar(3);
        }}
      />
      <FaStar
        size={20}
        className={"start4"}
        onClick={() => {
          if (setStar) setStar(4);
        }}
      />
      <FaStar
        size={20}
        className={"start5"}
        onClick={() => {
          if (setStar) setStar(5);
        }}
      />
    </StarDiv>
  );
}
