import { Repository } from 'typeorm';

import AppDataSource from '../../../../config/persistence/data-source';
import { PermissionEntity } from '../platformEntities/permission.entity';

class _PermissionService {
    private permissionRepository: Repository<PermissionEntity>;

    constructor(permissionRepository: Repository<PermissionEntity>) {
        this.permissionRepository = permissionRepository;
    }
}

const permissionRepository = AppDataSource.getRepository(PermissionEntity);

export const PermissionService = new _PermissionService(permissionRepository);

export default permissionRepository;
