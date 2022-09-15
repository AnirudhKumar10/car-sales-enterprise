const Sale = require("../models/sale.schema");
const path = require("path");
const fs = require("fs");

exports.searchSales = async (req, res) => {
  const { id, sales_id, customer_id, pageSize, pageNumer } = req.query;

  Sale.paginate(
    {
      ...(id && { _id: id }),
      ...(sales_id && { sales_id }),
      ...(customer_id && { customer_id }),
    },
    {
      limit: pageSize,
      page: pageNumer,
      sort: { sales_id: 1 },
      select: [
        "sales_id",
        "date_of_purchase",
        "customer_id",
        "fuel",
        "premium",
        "vehicle_segment",
        "selling_price",
        "power_steering",
        "airbags",
        "sunroof",
        "matt_finish",
        "music_system",
        "customer_gender",
        "customer_income_group",
        "customer_region",
        "customer_marital_status",
      ],
    },
    function (err, result) {
      if (err) {
        return res.status(404).json({ message: "There was some error." });
      }

      return res.status(200).json({
        salesResponse: result.docs,
        totalItems: result.total,
      });
    }
  );
};

exports.addSale = (req, res) => {
  const sale = new Sale({ ...req.body });
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
      res.status(400).json({ message: "There was error updating.", err });
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

exports.downloadCSVFile = async (req, res) => {
  const { id, sales_id, customer_id } = req.query;

  const data = await Sale.find({
    ...(id && { _id: id }),
    ...(sales_id && { sales_id }),
    ...(customer_id && { customer_id }),
  })
    .select([
      "sales_id",
      "date_of_purchase",
      "customer_id",
      "fuel",
      "premium",
      "vehicle_segment",
      "selling_price",
      "power_steering",
      "airbags",
      "sunroof",
      "matt_finish",
      "music_system",
      "customer_gender",
      "customer_income_group",
      "customer_region",
      "customer_marital_status",
    ])
    .exec();

  const csvContentHeader =
    "sales id," +
    "date of purchase," +
    "customer id," +
    "fuel," +
    "premium," +
    "vehicle segment," +
    "selling price," +
    "power steering," +
    "airbags," +
    "sunroof," +
    "matt finish," +
    "music system," +
    "customer gender," +
    "customer income group," +
    "customer region," +
    "customer marital status";

  const csvContentData = data
    .map((ob) => {
      return Object.values(ob._doc).join(",");
    })
    .join("\n");

  const date = new Date();

  fs.writeFile(
    `${__basedir}/files/sales.csv`,
    csvContentHeader + "\n" + csvContentData,
    (err) => {
      if (err) {
        return res.json({ err });
      }

      res.download(__basedir + `/files/sales.csv`, (err) => {
        if (err) {
          res.status(500).send({
            message: "Could not download the file. " + err,
          });
        }
      });
    }
  );
};
