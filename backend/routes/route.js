const express = require('express')
const router = express.Router();

const laptopController = require("../controller/laptopController");


router.post("/addemplaptop",laptopController.addempLaptopDetails);
router.get("/getemplaptop",laptopController.getemplaptopDetails);
router.put("/updateemplaptop",laptopController.updateempLaptopDeatils);
router.delete("/deleteemplaptop",laptopController.deleteempLaptopDetails);
router.get("/getallempdetails",laptopController.getempLaptopAllDetails);







module.exports = router;

