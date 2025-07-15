import { Request, Response } from 'express'

/**
 * Handles system-related requests.
 * @class SystemController
 */
export default class SystemController {
    /**
     * Responds with a welcome message and the current version of the application.
     * @param {Request} _
     * @param {Response} res
     */
    public async home(_: Request, res: Response) {
        res.status(200).json({
            message: 'Welcome to numeri!',
        })
    }

    /**
     * Responds with a health check status.
     * @param {Request} _
     * @param {Response} res
     */
    public async healthcheck(_: Request, res: Response) {
        res.status(200).json({
            status: 'ok'
        })
    }
}
