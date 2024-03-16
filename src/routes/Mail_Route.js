import express from "express";
const router = express.Router();
import {
  sendmailwithattachment,
  sendmailwithoutattachent,
} from "../controllers/mail.controller.js";
import { upload } from "../middlewares/mutter.middleware.js";

// route for sending mail regarding job and internship application
router.post(
  "/sendmailwithattachment",
  upload.single("Resume"),
  sendmailwithattachment
);
// route for sending mail regarding contactus form
router.post("/sendmailwithoutattachent", sendmailwithoutattachent);

export default router;
