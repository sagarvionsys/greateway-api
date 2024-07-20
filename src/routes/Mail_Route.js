import express from "express";
const router = express.Router();
import {
  AddVisitor,
  sendmailwithattachment,
  sendmailwithoutattachent,
} from "../controllers/mail.controller.js";
import { upload } from "../middlewares/mutter.middleware.js";

// route for sending mail regarding job and internship application
router.post(
  "/sendmailwithattachment",
  upload.single("resume"),
  sendmailwithattachment
);
// route for sending mail regarding contactus form
router.post("/sendmailwithoutattachent", sendmailwithoutattachent);

router.get("/visitors", AddVisitor);
export default router;
