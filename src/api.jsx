import axios from "axios";

const api = axios.create({
  baseURL: "https://vast-pink-oyster-ring.cyclic.app/api",
});

export function getReviews(category_name) {
  let queryStr = "/reviews";
  if (category_name) {
    queryStr += `?category=${category_name}`;
  }
  return api
    .get(queryStr)
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

export function getUsers() {
  return api
    .get(`/users`)
    .then((res) => {
      return res.data.users;
    })
    .catch(console.log);
}

export function postComment(review_id, name, text) {
  const newComment = { username: name, body: text };
  return api
    .post(`/reviews/${review_id}/comments`, newComment)
    .then((res) => {
      return res.data.users;
    })
    .catch(console.log);
}

export function getCategories() {
  return api
    .get("/categories")
    .then((res) => {
      return res.data.categories;
    })
    .catch(console.log);
}
