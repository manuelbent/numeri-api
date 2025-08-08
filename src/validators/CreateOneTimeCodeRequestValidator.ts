import { Request, Response, NextFunction } from 'express'

/**
 * @class CreateOneTimeCodeRequestValidator
 */
export default class CreateOneTimeCodeRequestValidator {
    /**
     * @param {Request} req
     * @param {Response} res
     * @param {NextFunction} next
     */
    async validate(req: Request, res: Response, next: NextFunction) {
        const bearer = req.headers['authorization']?.split(' ')[1]
        if (!bearer) {
            return res.status(401).json({ error: 'Unauthorized.' })
        }

        if (bearer !== process.env.ADMIN_BEARER) {
            return res.status(403).json({ error: 'Forbidden.' })
        }

        next()
    }
}
