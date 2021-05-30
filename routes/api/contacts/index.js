const express = require("express");
const router = express.Router();
const ctrl = require("../../../controllers/contacts");
const guard = require("../../../helpers/guard");

const {
  addValidContact,
  updateValidContact,
  updateValidStatusContact,
} = require("./validation");

router.get("/", guard, ctrl.getAll);

router.get("/:contactId", guard, ctrl.getById);

router.post("/", guard, addValidContact, ctrl.add);

router.delete("/:contactId", guard, ctrl.remove);

router.put("/:contactId", guard, updateValidContact, ctrl.update);

router.patch(
  "/:contactId/favorite",
  guard,
  updateValidStatusContact,
  ctrl.update
);

module.exports = router;
