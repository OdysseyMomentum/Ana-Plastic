import { createHistory } from "history";

export default createHistory({
  basename: process.env.PUBLIC_URL,
});
