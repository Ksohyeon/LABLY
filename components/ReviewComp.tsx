import { Review } from "@/pages/product/[slug]";
import styled from "styled-components";
import StarRating from "./atoms/StarRating";

const ReviewCreateDiv = styled.div`
  width: 70vw;
  & > p {
    margin: 20px 0;
    text-align: center;
    font-size: larger;
    font-weight: bold;
  }
  .review {
    border: 1px solid gray;
    padding: 15px 20px;
    background-color: #f0f0f0;
    & > ul > li {
      margin: 5px 0;
    }
  }
  .content {
    padding: 10px;
    border: 1px solid #e8e8e8;
    background-color: white;
  }
`;

export default function ReviewComp({ reviews }: { reviews: Review[] }) {
  return (
    <ReviewCreateDiv className="review-wrapper">
      <p>REVIEW</p>
      <ul>
        {reviews.map((review) => (
          <li className="review" key={review.id}>
            <ul>
              <li>제목| {review.headline}</li>
              <li>작성자| {review.name}</li>
              <li>
                <StarRating star={review.rating} />
              </li>
              <li className="content" style={{ border: "1px solid gray" }}>
                {review.content}
              </li>
            </ul>
          </li>
        ))}
      </ul>
    </ReviewCreateDiv>
  );
}
