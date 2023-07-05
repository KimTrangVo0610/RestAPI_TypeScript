import express from "express";
import type { Request, Response } from "express";
import { body, validationResult } from "express-validator";

import * as AuthorService from "./author.server";

export const authorRouter = express.Router();

// GET: List of all Authors
authorRouter.get("/", async (request: Request, response: Response) => {
  try {
    const authors = await AuthorService.listAuthors();
    console.log("authors", authors);
    return response.status(200).json(authors);
  } catch (error: any) {
    return response.status(500).json({
      error: error.message,
    });
  }
});
