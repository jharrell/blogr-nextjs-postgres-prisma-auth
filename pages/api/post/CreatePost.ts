// pages/api/post/CreatePost.ts

import { getSession } from "next-auth/react";
import prisma from "../../../lib/prisma";

export default async function handler(req, res) {
  try {
    const { title, content } = req.body;
    const session = await getSession({ req });

    if (!session) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    console.log("session", session);

    const result = await prisma.post.create({
      data: {
        title: title,
        content: content,
        author: { connect: { email: session.user.email } },
      },
    });

    res.json(result);
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ error: "Error creating post" });
  }
}
