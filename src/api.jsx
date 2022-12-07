import axios from "axios";

const api = axios.create({
  baseURL: "https://vast-pink-oyster-ring.cyclic.app/api",
});

export function getReviews() {
  return api
    .get("/reviews")
    .then((res) => {
      return res.data.reviews;
    })
    .catch(console.log);
}

export function getReviewByReviewId(review_id) {
  return api
    .get(`/reviews/${review_id}`)
    .then((res) => {
      return res.data.review;
    })
    .catch(console.log);
}

export function getCommentsByReviewId(review_id) {
  return api
    .get(`/reviews/${review_id}/comments`)
    .then((res) => {
      return res.data.comments;
    })
    .catch(console.log);
}

export function patchVotesByReviewId(review_id, vote) {
  const voteChange = { inc_votes: vote };
  return api
    .patch(`/reviews/${review_id}`, voteChange)
    .then((res) => {
      return res.data.review;
    })
    .catch(console.log);
}
