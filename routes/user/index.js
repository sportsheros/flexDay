const express = require("express");
const router = express.Router();
const UserController = require("@controllers/api/user/user");
const Validation = require('@validation/index')
const Responder = require('@service/responder')



router.post("/create",Validation.AddValidation(), Responder.validate.bind(Responder),UserController.CreateUser.bind(UserController));
router.get("/users-list",UserController.GetUserLists.bind(UserController));
router.get("/get-user",UserController.GetUserById.bind(UserController));
router.delete("/remove", UserController.RemoveUser.bind(UserController));
router.put("/update", Validation.AddValidation(), Responder.validate.bind(Responder),UserController.UpdateUser.bind(UserController));



module.exports = router;
