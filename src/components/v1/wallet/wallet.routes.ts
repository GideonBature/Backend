import EnhancedRouter from '../../../utils/enhancedRouter';

import { listWallets } from './wallet.controller';

const walletRouter = new EnhancedRouter();

// walletRouter.get('/');

export default walletRouter.getRouter();
