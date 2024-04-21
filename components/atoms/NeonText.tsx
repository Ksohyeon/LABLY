import styled from "styled-components";

const TextList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  li {
    color: #282828;
    font-size: 80px;
    letter-spacing: 15px;
    animation: lighting 2.7s linear infinite;
  }
  @keyframes lighting {
    0% {
      color: #484848;
      text-shadow: none;
    }
    85% {
      color: #484848;
      text-shadow: none;
    }
    95% {
      color: #ffd000;
      text-shadow: 0 0 7px #ffe100, 0 0 50px #ff6c00;
    }
    100% {
      color: #7c6500;
      text-shadow: 0 0 2px #ffe100dc, 0 0 50px #ff6a00d3;
    }
  }
  li:nth-child(1) {
    animation-delay: 0;
  }
  li:nth-child(2) {
    animation-delay: 0.3s;
  }
  li:nth-child(3) {
    animation-delay: 0.6s;
  }
  li:nth-child(4) {
    animation-delay: 0.9s;
  }
  li:nth-child(5) {
    animation-delay: 1.2s;
  }
  li:nth-child(6) {
    animation-delay: 1.5s;
  }
  li:nth-child(7) {
    animation-delay: 1.8s;
  }
  li:nth-child(8) {
    animation-delay: 2.1s;
  }
`;

export default function NeonText({ text }: { text: string }) {
  return (
    <TextList>
      {text.split("").map((char) => (
        <li>{char}</li>
      ))}
    </TextList>
  );
}
