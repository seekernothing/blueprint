import type { Puter } from "@heyputer/puter.js";

let puterPromise: Promise<Puter> | null = null;

const getPuter = async (): Promise<Puter> => {
  if (typeof window === "undefined") {
    throw new Error("Puter sirf browser me chalta hai");
  }

  if (!puterPromise) {
    puterPromise = import("@heyputer/puter.js").then((mod) => mod.default);
  }

  return puterPromise;
};

export const signIn = async () => {
  const puter = await getPuter();
  const result = await puter.auth.signIn();
  return result.success;
};

export const signOut = async () => {
  const puter = await getPuter();
  puter.auth.signOut();
  return true;
};

export const getCurrentUser = async () => {
  try {
    const puter = await getPuter();

    if (!puter.auth.isSignedIn()) {
      return null;
    }

    return await puter.auth.getUser();
  } catch (error) {
    console.error("getCurrentUser fail hua:", error);
    return null;
  }
};
