// routes/meetingRoutes.js
import { Router } from "express";
const router = Router();
import { startMeeting, joinMeeting } from "../controllers/meetingController.js";

router.get("/start-meeting", startMeeting); // generate new meeting ID
router.post("/join", joinMeeting);  // join existing meeting

export default router;
