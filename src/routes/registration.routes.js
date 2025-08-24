import { Router } from "express";
import {getRegistrationHTML} from "../controllers/registration.controller.js";
const router = Router();

router.route("/").get(getRegistrationHTML);


export default router;
