import axios from "axios";
import { env } from "../config/env.js";

export type Provider = "google" | "github";

export interface OAuthUser {
  provider: Provider;
  providerId: string;
  email: string | null;
  name: string;
  avatarUrl: string | null;
}

const configs = {
  google: {
    authorizeUrl: "https://accounts.google.com/o/oauth2/v2/auth",
    tokenUrl: "https://oauth2.googleapis.com/token",
    userInfoUrl: "https://www.googleapis.com/oauth2/v2/userinfo",
    clientId: env.GOOGLE_CLIENT_ID,
    clientSecret: env.GOOGLE_CLIENT_SECRET,
    redirectUri: env.GOOGLE_REDIRECT_URI,
    scope: "openid email profile",
  },
  github: {
    authorizeUrl: "https://github.com/login/oauth/authorize",
    tokenUrl: "https://github.com/login/oauth/access_token",
    userInfoUrl: "https://api.github.com/user",
    clientId: env.GITHUB_CLIENT_ID,
    clientSecret: env.GITHUB_CLIENT_SECRET,
    redirectUri: env.GITHUB_REDIRECT_URI,
    scope: "read:user user:email",
  },
} as const;

export function buildAuthorizeUrl(provider: Provider, state: string): string {
  const c = configs[provider];
  const params = new URLSearchParams({
    client_id: c.clientId,
    redirect_uri: c.redirectUri,
    response_type: "code",
    scope: c.scope,
    state,
  });
  return `${c.authorizeUrl}?${params.toString()}`;
}

export async function exchangeCode(
  provider: Provider,
  code: string,
): Promise<OAuthUser> {
  const c = configs[provider];

  if (provider === "github") {
    const tokenRes = await axios.post(
      c.tokenUrl,
      {
        client_id: c.clientId,
        client_secret: c.clientSecret,
        code,
        redirect_uri: c.redirectUri,
      },
      { headers: { Accept: "application/json" } },
    );
    const accessToken = tokenRes.data.access_token as string;
    const userRes = await axios.get(c.userInfoUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "User-Agent": "deepwork",
      },
    });
    const u = userRes.data;
    return {
      provider,
      providerId: String(u.id),
      email: u.email ?? null,
      name: u.name ?? u.login ?? "GitHub user",
      avatarUrl: u.avatar_url ?? null,
    };
  }

  const tokenRes = await axios.post(c.tokenUrl, {
    client_id: c.clientId,
    client_secret: c.clientSecret,
    code,
    redirect_uri: c.redirectUri,
    grant_type: "authorization_code",
  });
  const accessToken = tokenRes.data.access_token as string;
  const userRes = await axios.get(c.userInfoUrl, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  const u = userRes.data;
  return {
    provider,
    providerId: u.id,
    email: u.email ?? null,
    name: u.name ?? "Google user",
    avatarUrl: u.picture ?? null,
  };
}
