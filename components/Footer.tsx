import styled from "styled-components";
import { ImFacebook2 } from "react-icons/im";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";

const FooterWrapper = styled.div`
  width: 100vw;
  height: 200px;
  padding: 30px;
  color: white;
  background-color: black;
  .info-group {
    margin: 20px 0;
    & > div {
      display: inline-block;
      margin-right: 20px;
      font-size: medium;
      &:hover {
        cursor: pointer;
        color: #ffd500;
      }
    }
  }
  .sns-icons {
    float: right;
    margin: 10px 30px;
    & > svg {
      margin-left: 27px;
    }
  }
`;

export default function Footer() {
  return (
    <FooterWrapper>
      <div className="sns-icons">
        <ImFacebook2 size={24} />
        <FaTwitter size={24} />
        <FaInstagram size={24} />
      </div>
      <div className="info-group">
        <div>이용약관</div>
        <div>개인정보처리방침</div>
        <div>이용안내</div>
      </div>
      <h2>LABLY</h2>
    </FooterWrapper>
  );
}
