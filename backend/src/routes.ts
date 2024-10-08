import { Router } from "express";
import { getImage, getKey, getState, setKey, verify } from "./handlers";
import express from "express"
import path from "path";

export const router = Router();
const imgDirPath = path.join(__dirname + "/../images");


router.get("/", getState);
router.use("/images/", express.static(imgDirPath));

router.get("/getimage", getImage);

router.post("/verify", verify);

router.post("/setkey", setKey);
router.get("/getkey", getKey);
export default router;
