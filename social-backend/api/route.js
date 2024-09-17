import authRouter from "./auth.js";
import friendRouter from "./friend.js";
import followRouter from "./follow.js";
import postRouter from "./post.js";
export default function route(app) {
  app.use("/api/v1", authRouter);
  app.use("/api/v1", friendRouter);
  app.use("/api/v1", followRouter);
  app.use("/api/v1", postRouter);

}
