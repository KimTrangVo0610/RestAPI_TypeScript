import { db } from "../src/utils/db.server";

type Author = {
  firstName: string;
  lastName: string;
};

type Book = {
  title: string;
  isFiction: boolean;
  datePublished: Date;
};

async function seed() {
  await Promise.all(
    getAuthors().map((author) => {
      return db.author.create({
        data: {
          firstName: author.firstName,
          lastName: author.lastName,
        },
      });
    })
  );
  const author = await db.author.findFirst({
    where: {
      firstName: "Kim A",
    },
  });

  if (author) {
    await Promise.all(
      getBook().map((book) => {
        const { title, isFiction, datePublished } = book;
        return db.book.create({
          data: {
            title,
            isFiction,
            datePublished,
            authorId: author.id,
          },
        });
      })
    );
  }
}

seed();

function getAuthors(): Array<Author> {
  return [
    {
      firstName: "Kim A",
      lastName: "Trang",
    },

    {
      firstName: "Kim B",
      lastName: "Ngân",
    },

    {
      firstName: "Kim C",
      lastName: "Ngọc",
    },
  ];
}

function getBook(): Array<Book> {
  return [
    {
      title: "Trang xinh đẹp",
      isFiction: false,
      datePublished: new Date(),
    },
    {
      title: "Trang không những xinh đẹp mà còn rất là giỏi giang",
      isFiction: false,
      datePublished: new Date(),
    },
    {
      title: "Trang xinh đẹp và giỏi giang rồi thì Trang còn phả siêng năng",
      isFiction: false,
      datePublished: new Date(),
    },
  ];
}
