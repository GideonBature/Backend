import EnhancedRouter from '../../../utils/enhancedRouter';
import policyMiddleware from '../../../appMiddlewares/policy.middleware';

import {
    addPermissionSchema,
    addRoleSchema,
    deletePermissionSchema,
    deleteRoleSchema,
    editdRoleSchema,
} from './platform.validations';

import {
    addRole,
    getRoles,
    deleteRole,
    getPermissions,
    addPermissions,
    deletePermission,
    editRole,
} from './platformControllers/permission.controller';

const platformRouter = new EnhancedRouter();

export default platformRouter.getRouter();
