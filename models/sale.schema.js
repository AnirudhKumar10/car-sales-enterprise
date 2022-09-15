const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamp");
const mongoosePaginate = require("mongoose-paginate");

const saleSchema = mongoose.Schema({
  sales_id: { type: Number, unique: true, required: true },
  date_of_purchase: { type: String, required: true },
  customer_id: { type: Number, required: true },
  fuel: { type: String, enum: ["CNG", "Petrol", "Diesel"], required: true },
  premium: { type: Number, required: true },
  vehicle_segment: {
    type: String,
    enum: ["A", "B", "C"],
    required: true,
  },
  selling_price: { type: Number, max: 1000000, required: true },
  power_steering: { type: Number, min: 0, max: 1, default: 0 },
  airbags: { type: Number, min: 0, max: 1, default: 0 },
  sunroof: { type: Number, min: 0, max: 1, default: 0 },
  matt_finish: { type: Number, min: 0, max: 1, default: 0 },
  music_system: { type: Number, min: 0, max: 1, default: 0 },
  customer_gender: {
    type: String,
    enum: ["Male", "Female"],
    default: "Female",
  },
  customer_income_group: {
    type: String,
    enum: ["0-$25K", "$25-$70K", ">$70K"],
    required: true,
  },
  customer_region: {
    type: String,
    enum: ["North", "South", "East", "West"],
    required: true,
  },
  customer_marital_status: { type: Number, min: 0, max: 1, default: 0 },
});

saleSchema.plugin(timestamps);
saleSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Sale", saleSchema, "sales");
