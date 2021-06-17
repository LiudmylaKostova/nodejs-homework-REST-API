const express = require("express");
const router = express.Router();
const ctrl = require("../../../controllers/users");
const guard = require("../../../helpers/guard");
const { validateUser, validateSubscription } = require("./userValidation");
const upload = require("../../../helpers/upload");

router.get("/verify/:token", ctrl.verify);
router.post("/verify", ctrl.repeatSendEmailVerify);
router.post("/register", validateUser, ctrl.reg);
router.post("/login", validateUser, ctrl.login);
router.post("/logout", guard, ctrl.logout);
router.patch("/:userId/subscription", guard, validateSubscription, ctrl.patch);
router.patch("/avatars", [guard, upload.single("avatar")], ctrl.avatars);
router.get("/current", guard, ctrl.getCurrentUser);
module.exports = router;
