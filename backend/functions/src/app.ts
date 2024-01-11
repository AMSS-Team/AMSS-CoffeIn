import * as cors from "cors";
import * as express from "express";
import {authMiddleware} from "./api/middlewares/AuthMiddleware";
import FollowRoutes from "./api/routes/FollowRoutes";

const expressApp = express();

expressApp.use(cors({origin: "*"}));
expressApp.use(express.json());
expressApp.use(authMiddleware);
expressApp.use("/follow", FollowRoutes);

export default expressApp;
