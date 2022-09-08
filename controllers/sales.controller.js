const Sale = require("../models/sale.schema");

exports.searchSales = (req, res) => {
  const { id, sales_id, customer_id, pageSize, pageNumer } = req.query;

  Sale.find({
    ...(id && { _id: id }),
    ...(sales_id && { sales_id }),
    ...(customer_id && { customer_id }),
  })
    .skip(pageNumer * pageSize)
    .limit(pageSize)
    .then((salesResponse) => {
      res.status(200).json({ salesResponse });
    })
    .catch(() => {
      res.status(404).json({ message: "There was some error." });
    });
};

exports.addSale = (req, res) => {
  const sale = new Sale({ ...req.body });
  console.log(sale, req.body);
  sale
    .save()
    .then((result) => {
      res.status(200).json({ message: "Sale added successfully.", result });
    })
    .catch((err) => {
      res.status(400).json({ message: "Bad Request.", err });
    });
};

exports.updateSale = (req, res, next) => {
  const { id, sales_id } = req.query;

  Sale.findOneAndUpdate(
    { ...(id && { _id: id }), ...(sales_id && { sales_id: sales_id }) },
    req.body
  )
    .then((sale) => {
      res.status(200).json({ sale: sale });
    })
    .catch((err) => {
      res.status(404).json({ message: "There was error updating." });
    });
};

exports.deleteSale = (req, res, next) => {
  const { id, sales_id } = req.query;

  Sale.findOneAndRemove({
    ...(id && { _id: id }),
    ...(sales_id && { sales_id: sales_id }),
  })
    .then((sale) => {
      res.status(200).json({ sale: sale });
    })
    .catch((err) => {
      res.status(404).json({ message: "There was error deleting." });
    });
};
