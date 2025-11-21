import { Request, Response } from 'express'

/**
 * @class InsightController
 */
export default class InsightController {
    /**
     * @param {Request} req
     * @param {Response} res
     * @returns {Promise<void>}
     */
    public async retrieve(req: Request, res: Response): Promise<void> {
        res.status(200).json({ insights: [] })
    }
}

