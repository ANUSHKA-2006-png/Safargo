export async function withRetry<T>(
  operation: () => Promise<T>,
  attempts = 3,
  baseDelayMs = 350
): Promise<T> {
  let lastError: unknown;
  for (let index = 0; index < attempts; index += 1) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;
      const isLast = index === attempts - 1;
      if (isLast) break;
      const delay = baseDelayMs * 2 ** index;
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
  throw lastError;
}
