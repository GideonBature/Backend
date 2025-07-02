"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const permission_entity_1 = require("../platformEntities/permission.entity");
const data_source_1 = __importDefault(require("../../../../config/persistence/data-source"));
class _RoleService {
    roleRepository;
    constructor(roleRepository) {
        this.roleRepository = roleRepository;
    }
}
const roleRepository = data_source_1.default.getRepository(permission_entity_1.RoleEntity);
exports.UserService = new _RoleService(roleRepository);
exports.default = roleRepository;
