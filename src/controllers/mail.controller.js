import { Error_msg } from "../utils/CatchError.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import fs from "fs";
import {
  SendMailWithAttachment,
  SendMailWithOutAttachment,
} from "../utils/email.js";

// function to send job and intership appliction form
async function sendmailwithattachment(req, res) {
  try {
    const { name, email, number, role } = req.body;
    if (!name || !email || !number || !role) {
      throw new ApiError(400, "All details are required!");
    }
    if (!req.file || !req.file.path) {
      throw new ApiError(400, "Resume not found! Please try again.");
    }

    const filename = req.file.originalname;
    const ResumePath = req.file.path;

    await SendMailWithAttachment({
      name,
      email,
      number,
      role,
      ResumePath,
      filename,
    });

    // Delete the file after sending email
    fs.unlinkSync(ResumePath);
    res
      .status(200)
      .json(new ApiResponse(200, "mail is Submitted", { file: filename }));
  } catch (error) {
    // Delete the file after error
    fs.unlinkSync(ResumePath);
    Error_msg(res, error);
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

    res.status(200).json(new ApiResponse(200, " contact us mail is Submitted"));
  } catch (error) {
    Error_msg(res, error);
  }
}

export { sendmailwithattachment, sendmailwithoutattachent };
