import express from "express";
import router from "./router";
import {clientDist} from "./paths";

const port = 8080;
const app = express();

app.use(express.static(clientDist))
app.use(router);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});