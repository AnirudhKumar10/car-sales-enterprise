var express = require("express");
var router = express.Router();
const {
  searchSales,
  addSale,
  updateSale,
  deleteSale,
  downloadCSVFile,
} = require("../controllers/sales.controller");

router.get("/search", searchSales);

router.get("/files", downloadCSVFile);

router.post("/add", addSale);

router.delete("/delete", deleteSale);

router.patch("/update", updateSale);

module.exports = router;
