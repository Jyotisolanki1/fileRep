const { getUser,registerUser,loginUser,logoutUser,update} = require('../controller/userController');
const authMiddleware = require('../middleware/authMiddleware');
const multer = require("multer");
const path =  require('path')

const router = require('express').Router();

const  storage = multer.diskStorage({
    destination :(req,file,cb)=>{
     cb(null,'public/images')
    },
    filename:(req, file, cb)=> {
     cb(null,file.fieldname+ '_'+Date.now() + path.extname(file.originalname)) 
   }
   })
   
   
   const upload = multer({
       storage: storage
   })


router.get('/',authMiddleware, getUser)
router.post('/register' ,upload.single('file'), registerUser)
router.post('/login',loginUser)
router.post('/logout' ,logoutUser)
router.put('/update',upload.single('file'),authMiddleware,update);
module.exports = router;