var express = require('express');
var router = express.Router();
let userController=require("../controllers/userController")


router.get('/',userController.getAllUsers);
//router.get('/init',userController.initUsers);//initial data from a file located on a remote server -For the first time
router.get('/:id',userController.getOneUser);
router.post('/',userController.addUser);
router.put('/:id',userController.updateUser);
router.delete('/:id',userController.deleteUser);

module.exports = router;
