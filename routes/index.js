const express = require('express')
const router = express.Router()

const users = require("@root/routes/user/index");

router.use('/user', users);



module.exports = router;
