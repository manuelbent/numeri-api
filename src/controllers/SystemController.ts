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
            name: 'numeri',
            version: '0.0.0.0', // This should be replaced with the actual version from package.json or similar
            description: 'Lightweight analytics tool. No overkill, no fuss, just the essentials.',
        })
    }

    /**
     * Responds with a health check status.
     * @param {Request} _
     * @param {Response} res
     */
    public async healthcheck(_: Request, res: Response) {
        res.status(200).json({
            status: 'ok',
        })
    }

    /**
     * Responds with a 404 Not Found status.
     * @param {Request} _
     * @param {Response} res
     */
    public async notFound(_: Request, res: Response) {
        res.status(404).json({
            message: 'Looks like there is nothing here. 🔎',
        })
    }
}
