import { Error_msg } from "../utils/CatchError.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import fs from "fs";
import {
  SendMailWithAttachment,
  SendMailWithOutAttachment,
} from "../utils/email.js";
import { redisClient } from "../utils/redis.js";

// function to send job and intership appliction form
async function sendmailwithattachment(req, res) {
  try {
    const { name, email, number, role } = req.body;
    if (!name || !email || !number || !role) {
      throw new ApiError(400, "All details are required!");
    }

    const filename = req?.file?.originalname;
    const ResumePath = req?.file?.path;
    if (!filename || !ResumePath) {
      throw new ApiError(400, "Resume not found! Please try again.");
    }

    const email_status = await SendMailWithAttachment({
      name,
      email,
      number,
      role,
      ResumePath,
      filename,
    });

    // Delete the file after sending email
    if (email_status) {
      fs.unlinkSync(ResumePath);
    }
    res
      .status(200)
      .json(new ApiResponse(200, "mail is Submitted", { file: filename }));
  } catch (error) {
    // Delete the file after error
    Error_msg(res, error);
    // fs.unlinkSync(ResumePath);
  }
}

// function to send contact us form
async function sendmailwithoutattachent(req, res) {
  try {
    const { name, email, number, subject, message } = req.body;
    if (!name || !email || !number || !subject || !message) {
      throw new ApiError(400, "please provide all details");
    }
    await SendMailWithOutAttachment({ name, email, number, subject, message });

    res.status(200).json(new ApiResponse(200, "mail is Submitted"));
  } catch (error) {
    Error_msg(res, error);
  }
}
// function to add visitor count to redis
async function AddVisitor(req, res) {
  try {
    const visitorCount = await redisClient.incr("visitors");
    res
      .status(200)
      .json(new ApiResponse(200, "thanks for visit..", visitorCount));
  } catch (error) {
    Error_msg(res, error);
  }
}

export { sendmailwithattachment, sendmailwithoutattachent, AddVisitor };
