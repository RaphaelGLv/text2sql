export const generateRandomId = () => {
  try {
    const g = globalThis as unknown as {
      crypto?: { randomUUID?: () => string };
    };
    if (g.crypto && typeof g.crypto.randomUUID === "function") {
      return g.crypto.randomUUID();
    }
  } catch {}

  return (
    "id-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2)
  );
};
