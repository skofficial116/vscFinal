import { Router } from "express";
import {getHomeHTML} from "../controllers/home.controller.js";
const router = Router();

router.route("/").get(getHomeHTML);


export default router;
