import { Repository } from 'typeorm';
import PlatformEntity from '../platformEntities/platform.entity';
import AppDataSource from '../../../../config/persistence/data-source';

class _PlatformService {
    private platformRepository: Repository<PlatformEntity>;

    constructor(platformRepository: Repository<PlatformEntity>) {
        this.platformRepository = platformRepository;
    }
}

const platformRepository = AppDataSource.getRepository(PlatformEntity);

export const PlatformService = new _PlatformService(platformRepository);

export default platformRepository;
