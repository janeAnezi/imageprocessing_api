import express, { Request, Response } from 'express';
import { fileName, resizeImage } from '../utilities/files';
import appRootPath from 'app-root-path';

const routes = express.Router()

// Resize an existing file
routes.get('/images', async (req: Request, res: Response): Promise<void> => {
    const queryParameters = req.query

    const filename = queryParameters.filename as string
    const width = parseInt(queryParameters.width as string)
    const height = parseInt(queryParameters.height as string)

    try {
        await resizeImage(filename, width, height)
        const exactName = await fileName(filename)
        res.sendFile(`${appRootPath.path}/images/thumb/${exactName}`)
    } catch (e) {
        res.status(400).send({
            status: 'error',
            message: 'Failed resizing image',
        })
    }
})

export default routes
