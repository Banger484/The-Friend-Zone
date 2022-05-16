const connection = require("../config/connection");
const { User, Thought } = require("../models");

const names = [
  'Doug',
  'Carl',
  'Frank',
  'Betsy',
  'Laura',
  'Cindy'
];


connection.on("error", (err) => err);

connection.once("open", async () => {
  console.log("connected");

  await User.deleteMany({});

  await Thought.deleteMany({});

  const users = [];
  const thoughts = []
  const friends = []

  for (let i = 0; i < names.length; i++) {

    const username = names[i];
    const email = `${username}@something.com`
  
    users.push({
      username,
      email,
      friends,
      thoughts,
    });
  }
 
  await User.collection.insertMany(users);

  console.info("Seeding complete! 🌱");
  process.exit(0);
});
