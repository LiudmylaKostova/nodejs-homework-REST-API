const express = require("express");
const router = express.Router();
const ctrl = require("../../../controllers/users");
const guard = require("../../../helpers/guard");
const { validateUser, validateSubscription } = require("./userValidation");

router.post("/register", validateUser, ctrl.reg);
router.post("/login", validateUser, ctrl.login);
router.post("/logout", guard, ctrl.logout);
router.patch("/:userId/subscription", guard, validateSubscription, ctrl.patch);
router.get("/current", guard, ctrl.getCurrentUser);
module.exports = router;
