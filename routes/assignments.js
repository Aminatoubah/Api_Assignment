let express = require('express');
let router = express.Router();

let Assignment = require('../model/assignment');

// Récupérer les assignments paginés
function getAssignments(req, res) {
    var aggregateQuery = Assignment.aggregate();

    Assignment.aggregatePaginate(
        aggregateQuery,
        {
            page: parseInt(req.query.page) || 1,
            limit: parseInt(req.query.limit) || 10,
        },
        (err, result) => {
            if (err) return res.status(500).send(err);
            res.json(result);
        }
    );
}

// Récupérer un assignment par ID
async function getAssignment(req, res) {
    try {
        const assignmentId = parseInt(req.params.id);
        const assignment = await Assignment.findOne({ id: assignmentId });
        if (!assignment) return res.status(404).json({ message: "Assignment non trouvé" });
        res.json(assignment);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}

// POST
async function postAssignment(req, res) {
    try {
        const assignment = new Assignment(req.body);
        await assignment.save();
        res.status(201).json({ message: "Assignment ajouté !" });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}

// PUT
async function updateAssignment(req, res) {
    try {
        await Assignment.findByIdAndUpdate(req.body._id, req.body, { new: true });
        res.json({ message: "updated" });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}

// DELETE
async function deleteAssignment(req, res) {
    try {
        const id = parseInt(req.params.id);
        const assignment = await Assignment.findOneAndDelete({ id });
        if (!assignment) return res.status(404).json({ message: "Assignment non trouvé" });
        res.json({ message: `${assignment.nom} supprimé` });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}

// 👉 EXPORT UNIQUE, LE SEUL QUI DOIT RESTER
module.exports = {
    getAssignments,
    getAssignment,
    postAssignment,
    updateAssignment,
    deleteAssignment
};
