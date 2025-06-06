import { Router } from "express";
import { getBGChapterHTML, getBGShlokaHTML, getBGHomeHTML, getLibraryHTML, getCategoryHTML} from "../controllers/library.controller.js";
const router = Router();

router.route("/bg/:chapter/:shloka").get(getBGShlokaHTML);
router.route("/bg/:chapter").get(getBGChapterHTML);
router.route("/bg").get(getBGHomeHTML);
router.route("/").get(getLibraryHTML);
router.route("/category").get(getCategoryHTML);


export default router;
