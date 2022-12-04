import { Request, Response } from 'express';

export type protectedEndpointHandler = (
    request: Request,
    response: Response,
    user: user
) => void;

const protectedEndpoint = (callback: protectedEndpointHandler) => {
    return (req: Request, res: Response) => {
        const user: user = {
            id: '1',
            name: 'Sam',
            email: 'samridh.anand.paatni@gmail.com'
        };
        callback(req, res, user);
    };
};

export default protectedEndpoint;
