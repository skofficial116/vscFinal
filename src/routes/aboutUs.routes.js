import { Router } from "express";
import {getAboutUsHTML} from "../controllers/aboutUs.controller.js";
const router = Router();

router.route("/").get(getAboutUsHTML);


export default router;
