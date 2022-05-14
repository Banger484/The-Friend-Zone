const connection = require("../config/connection");
const { User, Thought } = require("../models");
const { getRandomReactions, getRandomName } = require('./data')



connection.on("error", (err) => err);

connection.once("open", async () => {
  console.log("connected");

  await User.deleteMany({});

  await Thought.deleteMany({});

  // await User.collection.insertOne({
  //   username: "BretBanger",
  //   email: "test@test.com",
  // });

  await Thought.collection.insertOne({
    thoughtText: "something",
    username: "BretBanger",
    reactions: getRandomReactions(5)
  });

  const users = [];

  for (let i = 0; i < 5; i++) {

    const username = getRandomName();
    const email = `${username}@something.com`

    users.push({
      username,
      email,
    });
  }

  // Add students to the collection and await the results
  await User.collection.insertMany(users);




  // Log out the seed data to indicate what should appear in the database
  //   console.table(students);
  console.info("Seeding complete! 🌱");
  process.exit(0);
});
