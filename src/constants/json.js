const json1 = [
  {
    books: [
      {
        author: "GRR Martin",
        copiesAvailable: 5,
        copiesExist: 12,
        description:
          "A Clash of Kings transports us to a world of revelry and revenge, wizardry and warfare unlike any you have ever experienced. A CLASH OF KINGS. A comet the color of blood and flame cuts across the sky. And from the ancient citadel of Dragonstone to the forbidding shores of Winterfell, chaos reigns.",
        genre: ["Adventure", "Fantasy"],
        price: 450,
        rating: 4.7,
        title: "A Clash of Kings",
        type: "Fiction",
        imageUrl:
          "https://firebasestorage.googleapis.com/v0/b/librarymanagement-cd0b3.appspot.com/o/cok.jpg?alt=media",
        id: 1,
      },
      {
        author: "GRR Martin",
        copiesAvailable: 5,
        copiesExist: 12,
        description:
          "A Clash of Kings transports us to a world of revelry and revenge, wizardry and warfare unlike any you have ever experienced. A CLASH OF KINGS. A comet the color of blood and flame cuts across the sky. And from the ancient citadel of Dragonstone to the forbidding shores of Winterfell, chaos reigns.",
        price: 400,
        rating: 4.7,
        genre: ["Adventure", "Fantasy"],
        title: "A Game of Thrones",
        type: "Fiction",
        imageUrl:
          "https://firebasestorage.googleapis.com/v0/b/librarymanagement-cd0b3.appspot.com/o/got.jpg?alt=media",
        id: 2,
      },
      {
        author: "GRR Martin",
        copiesAvailable: 5,
        copiesExist: 12,
        description:
          "A Clash of Kings transports us to a world of revelry and revenge, wizardry and warfare unlike any you have ever experienced. A CLASH OF KINGS. A comet the color of blood and flame cuts across the sky. And from the ancient citadel of Dragonstone to the forbidding shores of Winterfell, chaos reigns.",
        genre: ["Adventure", "Fantasy"],
        price: 450,
        rating: 4.7,
        title: "A Feast for Crows",
        type: "Fiction",
        imageUrl:
          "https://firebasestorage.googleapis.com/v0/b/librarymanagement-cd0b3.appspot.com/o/ffc.png?alt=media",
        id: 3,
      },
      {
        author: "GRR Martin",
        copiesAvailable: 5,
        copiesExist: 12,
        description:
          "A Clash of Kings transports us to a world of revelry and revenge, wizardry and warfare unlike any you have ever experienced. A CLASH OF KINGS. A comet the color of blood and flame cuts across the sky. And from the ancient citadel of Dragonstone to the forbidding shores of Winterfell, chaos reigns.",
        genre: ["Adventure", "Fantasy"],
        price: 450,
        rating: 4.7,
        title: "A Storm of Swords",
        type: "Fiction",
        imageUrl:
          "https://firebasestorage.googleapis.com/v0/b/librarymanagement-cd0b3.appspot.com/o/sos.jpg?alt=media",
        id: 4,
      },
      {
        author: "GRR Martin",
        copiesAvailable: 5,
        copiesExist: 12,
        genre: ["Adventure", "Fantasy"],
        description:
          "A Clash of Kings transports us to a world of revelry and revenge, wizardry and warfare unlike any you have ever experienced. A CLASH OF KINGS. A comet the color of blood and flame cuts across the sky. And from the ancient citadel of Dragonstone to the forbidding shores of Winterfell, chaos reigns.",
        price: 450,
        rating: 4.7,
        title: "A Dance With Dragons",
        type: "Fiction",
        imageUrl:
          "https://firebasestorage.googleapis.com/v0/b/librarymanagement-cd0b3.appspot.com/o/dwd.png?alt=media",
        id: 5,
      },
      {
        author: "Patrick Rothfuss",
        copiesAvailable: 5,
        copiesExist: 12,
        description:
          "A Clash of Kings transports us to a world of revelry and revenge, wizardry and warfare unlike any you have ever experienced. A CLASH OF KINGS. A comet the color of blood and flame cuts across the sky. And from the ancient citadel of Dragonstone to the forbidding shores of Winterfell, chaos reigns.",
        genre: ["Adventure", "Fantasy"],
        price: 450,
        rating: 4.7,
        title: "The Name of the Wind",
        type: "Fiction",
        imageUrl:
          "https://firebasestorage.googleapis.com/v0/b/librarymanagement-cd0b3.appspot.com/o/the_name_of_the_wind.jpg?alt=media",
        id: 6,
      },
      {
        author: "Patrick Rothfuss",
        copiesAvailable: 5,
        copiesExist: 12,
        description:
          "A Clash of Kings transports us to a world of revelry and revenge, wizardry and warfare unlike any you have ever experienced. A CLASH OF KINGS. A comet the color of blood and flame cuts across the sky. And from the ancient citadel of Dragonstone to the forbidding shores of Winterfell, chaos reigns.",
        genre: ["Adventure", "Fantasy"],
        price: 450,
        rating: 4.7,
        title: "Wise Man's Fear",
        type: "Fiction",
        imageUrl:
          "https://firebasestorage.googleapis.com/v0/b/librarymanagement-cd0b3.appspot.com/o/wiseMansFear.jpg?alt=media",
        id: 7,
      },
      {
        author: "Robert T. Kiyosaki",
        copiesAvailable: 5,
        copiesExist: 12,
        description:
          "Rich Dad Poor Dad is a 1997 book written by Robert T. Kiyosaki and Sharon Lechter. It advocates the importance of financial literacy, financial independence and building wealth through investing in assets, real estate investing, starting and owning businesses, as well as increasing one's financial intelligence. ",
        genre: ["Self-Help", "Finance"],
        price: 450,
        rating: 2.3,
        title: "Rich Dad, Poor Dad",
        type: "Motivational",
        imageUrl:
          "https://firebasestorage.googleapis.com/v0/b/librarymanagement-cd0b3.appspot.com/o/rich-dad-poor-dad-24.jpg?alt=media",
        id: 8,
      },
      {
        author: "Robin Sharma",
        copiesAvailable: 5,
        copiesExist: 12,
        description:
          "The Monk Who Sold His Ferrari is a self-help book by Robin Sharma, a writer and motivational speaker. The book is a business fable derived from Sharma's personal experiences after leaving his career as a litigation lawyer at the age of 25.",
        genre: ["Self-Help", "Finance"],
        price: 450,
        rating: 2.3,
        title: "The Monk Who Sold His Ferrari",
        type: "Motivational",
        imageUrl:
          "https://firebasestorage.googleapis.com/v0/b/librarymanagement-cd0b3.appspot.com/o/mwshf.jpg?alt=media",
        id: 9,
      },
      {
        author: "Stephen Hawking",
        copiesAvailable: 5,
        copiesExist: 12,
        description:
          "A Brief History of Time: From the Big Bang to Black Holes is a book on theoretical cosmology by English physicist Stephen Hawking. It was first published in 1988. Hawking wrote the book for readers who had no prior knowledge of physics",
        genre: ["Science"],
        price: 450,
        rating: 2.3,
        title: "A Brief History of Time",
        type: "Non-fiction",
        imageUrl:
          "https://firebasestorage.googleapis.com/v0/b/librarymanagement-cd0b3.appspot.com/o/the-illustrated-a-brief-history-of-time-original-imagg6znptrzytje.jpg?alt=media",
        id: 10,
      },
      {
        author: "Jared Diamond",
        copiesAvailable: 5,
        copiesExist: 12,
        description:
          "The book's title is a reference to the means by which farm-based societies conquered populations and maintained dominance though sometimes being vastly outnumbered, so that imperialism was enabled by guns, germs, and steel. Diamond argues geographic, climatic and environmental characteristics which favored early development of stable agricultural societies ultimately led to immunity to diseases endemic in agricultural animals and the development of powerful, organized states capable of dominating others.",
        genre: ["History"],
        price: 450,
        rating: 2.3,
        title: "Guns, Germs, and Steel",
        type: "Non-fiction",
        imageUrl:
          "https://firebasestorage.googleapis.com/v0/b/librarymanagement-cd0b3.appspot.com/o/ggs.jpg?alt=media",
        id: 11,
      },
    ],
    users: {
      an2r5SyADmVbjK99LPXXMQjRD7M2: {
        2: true,
        5: true,
      },
    },
  },
];
export default json1;
