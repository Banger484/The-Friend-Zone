const router = require("express").Router();
const {
  getUsers,
  getSingleUser,
  addUser,
  updateUser,
  deleteUser,
  addFriend
} = require("../../controllers/userController");

router.route("/").get(getUsers).post(addUser);
router.route("/:userId").get(getSingleUser).post(updateUser).delete(deleteUser);
router.route('/:userId/friends/:friendId').post(addFriend)

module.exports = router;
