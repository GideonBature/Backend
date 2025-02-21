import EnhancedRouter from '../../utils/enhancedRouter';

import platformRoutes from './platform/platform.routes';
import walletRoutes from './wallet/wallet.routes';

const routerV1 = new EnhancedRouter();

routerV1.use('/platform', platformRoutes);
routerV1.use('/wallets', walletRoutes);

export default routerV1.getRouter();
