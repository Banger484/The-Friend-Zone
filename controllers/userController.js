const { ObjectId } = require("mongoose").Types;
const { User } = require('../models')


module.exports = {
  // get all users
  getUsers(req, res) {
    User.find()
        .then(async (users) => {
            const userObj = {
                users
            }
            return res.json(userObj)
        })
        .catch((err) => {
            return res.status(500).json(err)
        })
  },
  getSingleUser(req, res) {
      User.findOne({ _id: req.params.userId })
      .then( async (user) => 
        !user
            ? res.status(404).json({ message: 'No user with that ID'})
            : res.json(user)
      )
  },
  addUser(req, res) {
      User.create(req.body)
        .then((user) => res.json(user))
        .catch((err) => res.status(500).json(err))
  },
  updateUser(req, res) {
      User.findOneAndUpdate(
          { _id: ObjectId(req.params.userId) },
          { $set: req.body },
          { runValidators: true, new: true }
      )
      .then((user) =>
      !user
        ? res.status(404).json({ message: 'No user has that ID.'})
        : res.json(user)
      )
      .catch((err) => res.status(500).json(err));

  },
  deleteUser(req, res) {
      User.findOneAndDelete({ _id: req.params.userId})
      .then((user) =>
      !user
        ? res.status(404).json({ message: 'No user has that ID.'})
        : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  addFriend(req, res) {  
    User.findOne({ _id: req.params.friendId})
        .then((friend) => 
        !friend
            ? res.status(404).json({ message: 'No user has that ID.' })
            :User.findOneAndUpdate(
            { _id: req.params.userId},
            { $addToSet: { friends: friend }},
            { runValidators: true, new: true }
        ))
        .then((user) => res.json({ message: 'friend added!' }))
        .catch((err) => res.status(500).json(err));
},
removeFriend(req, res) {  
    User.findOne({ _id: req.params.friendId})
        .then((friend) => 
        !friend
            ? res.status(404).json({ message: 'No user has that ID.' })
            :User.findOneAndDelete(
            { _id: req.params.userId},
            { $pull: { friends: friend }}
        ))
        .then((user) => res.json({ message: 'friend removed!' }))
        .catch((err) => res.status(500).json(err));
}
}
