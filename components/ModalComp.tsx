import Link from "next/link";
import styled from "styled-components";

const ModalWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  box-shadow: 0 0 10px black;
  border-radius: 10px;
  z-index: 1000;
  #modal-header {
    position: relative;
    width: 100%;
    height: 30px;
    background-color: #eeeeee;
    border-radius: 10px 10px 0;
    span {
      position: absolute;
      right: 10px;
    }
  }
  #close {
    &:hover {
      cursor: pointer;
    }
  }
  .message {
    width: 170px;
    text-align: center;
    font-weight: bold;
    word-wrap: break-word;
    word-break: keep-all;
    padding: 20px 0;
  }
  .btn-group {
    margin-bottom: 20px;
    & > button {
      border: 1px solid black;
      padding: 10px 20px;
      font-size: medium;
      font-weight: bold;
      background-color: white;
      margin: 0 5px;
      &:hover {
        background-color: #dddddd;
        cursor: pointer;
      }
    }
  }
`;

export default function ModalComp({
  message,
  setIsModalOpen,
}: {
  message: string;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <ModalWrapper>
      <div id="modal-header">
        <span id="close" onClick={() => setIsModalOpen(false)}>
          X
        </span>
      </div>
      <p className="message">{message}</p>
      <div className="btn-group">
        <button>
          <Link href={"/cart"}>장바구니로 이동</Link>
        </button>
        <button onClick={() => setIsModalOpen(false)}>계속 쇼핑하기</button>
      </div>
    </ModalWrapper>
  );
}
