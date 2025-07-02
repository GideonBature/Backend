"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionService = void 0;
const data_source_1 = __importDefault(require("../../../../config/persistence/data-source"));
const permission_entity_1 = require("../platformEntities/permission.entity");
class _PermissionService {
    permissionRepository;
    constructor(permissionRepository) {
        this.permissionRepository = permissionRepository;
    }
}
const permissionRepository = data_source_1.default.getRepository(permission_entity_1.PermissionEntity);
exports.PermissionService = new _PermissionService(permissionRepository);
exports.default = permissionRepository;
