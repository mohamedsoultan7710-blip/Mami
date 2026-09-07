// Authentification admin très simple, sans base de données de sessions.
// Le cookie stocké dans le navigateur ne contient jamais le mot de passe :
// il contient un jeton dérivé (hachage SHA-256) que seul le serveur peut
// recalculer et vérifier, à partir de variables d'environnement.

export const ADMIN_COOKIE_NAME = "admin_session";

async function sha256Hex(input: string): Promise<string> {
  const data = new TextEncoder().encode(input);
  const digestBuffer = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digestBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function computeAdminToken(): Promise<string> {
  const password = process.env.ADMIN_PASSWORD ?? "";
  const salt = process.env.ADMIN_SESSION_SECRET ?? "sel-par-defaut-a-changer";
  return sha256Hex(`${password}::${salt}`);
}

export async function checkAdminPassword(candidate: string): Promise<boolean> {
  const expected = process.env.ADMIN_PASSWORD ?? "";
  if (!expected) return false;
  return candidate === expected;
}

export async function isValidAdminToken(token: string | undefined | null): Promise<boolean> {
  if (!token) return false;
  const expected = await computeAdminToken();
  return token === expected;
}
