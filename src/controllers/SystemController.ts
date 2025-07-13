import { Request, Response } from 'express'
import { version } from '../../package.json'

export default class SystemController {
    public async home(_: Request, res: Response) {
        res.status(200).json({
            message: 'Welcome to numeri!',
            version,
        })
    }

    public async healthcheck(_: Request, res: Response) {
        res.status(200).json({
            status: 'ok'
        })
    }
}
