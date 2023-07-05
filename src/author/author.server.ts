import { db } from "../utils/db.server";

type Author = {
  id: number;
  firstName: string;
  lastName: string;
};

export const listAuthors = async (): Promise<Author[]> => {
  const authors = await db.author.findMany({
    select: {
      id: true,
      firstName: true,
      lastName: true,
    },
  });

  return authors.map((author) => ({
    id: author.id,
    firstName: author.firstName!,
    lastName: author.lastName!,
  }));
};
