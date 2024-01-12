import * as cors from "cors";
import * as express from "express";
import {authMiddleware} from "./api/middlewares/AuthMiddleware";
import FollowRoutes from "./api/routes/FollowRoutes";
import LocationRoutes from "./api/routes/LocationRoutes";
import NotificationRoutes from "./api/routes/NotificationRoutes";

const expressApp = express();

expressApp.use(cors({origin: "*"}));
expressApp.use(express.json());
expressApp.use(authMiddleware);
expressApp.use("/follow", FollowRoutes);
expressApp.use("/location", LocationRoutes);
expressApp.use("/notification", NotificationRoutes);

export default expressApp;
