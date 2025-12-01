let mongoose = require('mongoose');
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");

let Schema = mongoose.Schema;

let AssignmentSchema = new Schema({
    id: Number,
    dateDeRendu: Date,
    nom: String,
    rendu: Boolean
});

AssignmentSchema.plugin(aggregatePaginate);

module.exports = mongoose.model('Assignment', AssignmentSchema);
