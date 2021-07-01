import { Router } from "express";

import AuthenticatedUserController from "../../../controllers/AuthenticatedUserController";

const authenticatedRoutes = Router();

authenticatedRoutes.post("/", AuthenticatedUserController.handle);

export default authenticatedRoutes;

