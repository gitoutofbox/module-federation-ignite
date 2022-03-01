const express = require("express");
const router = express.Router();
const accountController = require("../controllers/account.controller");
const reportController = require("../controllers/report.controller");
const eventController = require("../controllers/event.controller");

router.get("/", (req, res) => {
    res.send("dashboard")
});
router.get("/accounts", accountController.getAccounts);
router.get("/account/:id", accountController.getAccountDetails);

router.get("/reports", reportController.get);
router.get("/report/:id", reportController.details);

router.get("/events", eventController.get);
router.get("/event/:id", eventController.details)

module.exports = router;