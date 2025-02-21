import { Response } from 'express';

import walletRepository from './wallet.services';
import { handleResponse } from '../../../utils/helper';
import { IRequest } from '../../../types/global';

export const listWallets = async (req: IRequest, res: Response) => {
    const queryObject = {};

    const wallets = await walletRepository.findBy(queryObject);

    return handleResponse(res, {
        data: wallets,
    });
};
