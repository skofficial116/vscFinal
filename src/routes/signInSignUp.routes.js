import { Router } from "express";
import {aboutUsHTML} from "../controllers/aboutUs.controller.js";
const router = Router();

router.route("/").get(aboutUsHTML);


export default router;
