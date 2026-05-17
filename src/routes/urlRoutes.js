import { Router } from "express";
import {
  getUrls,
  createAlias,
  aliasRedirect,
} from "../controllers/urlController.js";

const router = Router();

router.get("/urls", getUrls);
router.get("/:alias", aliasRedirect);
router.post("/urls", createAlias);

export default router;
