export const generateNumericId = () => {
    const timestamp = Date.now(); // e.g. 1715073801457
    const random = Math.floor(Math.random() * 1000); // 3-digit random
    const id = parseInt(`${timestamp}${random}`, 10); // Combine and ensure base-10 integer
  return id;
  };