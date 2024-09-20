import { Router } from "express";
import { getState } from "./handlers";
import express from "express"
import path from "path";

export const router = Router()
const imgDirPath = path.join(__dirname + "/../images")


router.get("/", getState)
router.use("/images/", express.static(imgDirPath))
export default router;
