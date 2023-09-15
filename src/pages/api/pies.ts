import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const code = Array.isArray(req.query.code)
    ? req.query.code[0]
    : req.query.code;

  if (!code) {
    return res.status(400).json({ message: "Code not provided" });
  }

  res.setHeader("Set-Cookie", `code=${code}; path=/; SameSite=Lax`);

  res.redirect("/");
}
