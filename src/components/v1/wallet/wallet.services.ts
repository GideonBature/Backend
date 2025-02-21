import { Repository } from 'typeorm';
import WalletEntity from './wallet.entity';
import AppDataSource from '../../../config/persistence/data-source';

class _WalletService {
    private walletRepository: Repository<WalletEntity>;

    constructor(walletRepository: Repository<WalletEntity>) {
        this.walletRepository = walletRepository;
    }
}

const walletRepository = AppDataSource.getRepository(WalletEntity);

export const WalletService = new _WalletService(walletRepository);

export default walletRepository;
