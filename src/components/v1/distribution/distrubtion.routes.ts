import EnhancedRouter from "../../../utils/enhancedRouter"
import policyMiddleware from "../../../appMiddlewares/policy.middleware"
import { createDistributionSchema } from "./distribution.validation"
import {
  createDistribution,
} from "./distribution.controller"

const distributionRouter = new EnhancedRouter()

distributionRouter.post("/distributions", policyMiddleware(createDistributionSchema), createDistribution)

export default distributionRouter.getRouter()
