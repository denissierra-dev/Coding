import { Router } from "express";
import { eq } from "drizzle-orm";
import { db } from "../db/index.js";
import { users } from "../db/schema.js";
import { buildAuthorizeUrl, exchangeCode, type Provider } from "../auth/oauth.js";
import { signToken } from "../auth/jwt.js";
import { requireAuth, type AuthedRequest } from "../auth/middleware.js";

export const authRouter = Router();

function isProvider(value: string): value is Provider {
  return value === "google" || value === "github";
}

authRouter.get("/me", requireAuth, (req: AuthedRequest, res) => {
  res.json({ user: req.user });
});

authRouter.get("/:provider", (req, res) => {
  const { provider } = req.params;
  if (!isProvider(provider)) {
    return res.status(400).json({ error: "Provider no soportado" });
  }
  const state = crypto.randomUUID();
  const url = buildAuthorizeUrl(provider, state);
  res.redirect(url);
});

authRouter.get("/:provider/callback", async (req, res) => {
  const { provider } = req.params;
  if (!isProvider(provider)) {
    return res.status(400).json({ error: "Provider no soportado" });
  }
  const code = typeof req.query.code === "string" ? req.query.code : null;
  if (!code) {
    return res.status(400).json({ error: "Falta el código de autorización" });
  }

  try {
    const oauthUser = await exchangeCode(provider, code);

    const existing = db
      .select()
      .from(users)
      .where(eq(users.providerId, oauthUser.providerId))
      .get();

    const user =
      existing ??
      db
        .insert(users)
        .values({
          email: oauthUser.email,
          name: oauthUser.name,
          provider: oauthUser.provider,
          providerId: oauthUser.providerId,
          avatarUrl: oauthUser.avatarUrl,
        })
        .returning()
        .get();

    const token = signToken({
      sub: String(user.id),
      email: user.email,
      name: user.name,
    });

    res.json({ token, user });
  } catch (err) {
    console.error("OAuth error:", err);
    res.status(500).json({ error: "Error al autenticar con el provider" });
  }
});
