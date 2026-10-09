import express from "express";
import prisma from "../prisma/client.js";

const router = express.Router();

// GET /threads
router.get("/", async (req, res, next) => {
  try {
    const threads = await prisma.thread.findMany();

    res.status(200).json(threads);
  } catch (error) {
    next(error);
  }
});

// POST /threads
router.post("/", async (req, res, next) => {
  try {
    const thread = await prisma.thread.create({
      data: {
        title: req.body.title,
        body: req.body.body,
      },
    });

    res.status(201).json(thread);
  } catch (error) {
    next(error);
  }
});

// PUT /threads/:id
router.put("/:id", async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);

    const thread = await prisma.thread.update({
      where: {
        id,
      },
      data: {
        title: req.body.title,
        body: req.body.body,
      },
    });

    res.status(200).json(thread);
  } catch (error) {
    next(error);
  }
});

// DELETE /threads/:id
router.delete("/:id", async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);

    const thread = await prisma.thread.delete({
      where: {
        id,
      },
    });

    res.status(200).json(thread);
  } catch (error) {
    next(error);
  }
});

export default router;