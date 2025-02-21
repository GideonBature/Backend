import { Repository } from 'typeorm';
import { RoleEntity } from '../platformEntities/permission.entity';
import AppDataSource from '../../../../config/persistence/data-source';

class _RoleService {
    private roleRepository: Repository<RoleEntity>;

    constructor(roleRepository: Repository<RoleEntity>) {
        this.roleRepository = roleRepository;
    }
}

const roleRepository = AppDataSource.getRepository(RoleEntity);

export const UserService = new _RoleService(roleRepository);

export default roleRepository;
