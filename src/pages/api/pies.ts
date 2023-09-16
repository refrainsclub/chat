import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const code = Array.isArray(req.query.code)
    ? req.query.code[0]
    : req.query.code;

  res.setHeader(
    "Set-Cookie",
    `code=${code ?? "deleted"}; path=/; SameSite=Strict; Secure; HttpOnly`,
  );
  res.redirect("/");
}
