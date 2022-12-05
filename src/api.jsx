import axios from "axios";

const api = axios.create({
  baseURL: "https://vast-pink-oyster-ring.cyclic.app/api",
});

export function getReviews() {
  return api
    .get("/reviews")
    .then((res) => {
      console.log(res.data.reviews);
      return res.data.reviews;
    })
    .catch(function (err) {
      console.log(err);
    });
}
