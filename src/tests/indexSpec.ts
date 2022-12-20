import { app } from '../index'
import supertest from 'supertest'
import { deleteFolder, fileName, exactResizeExists, resizeImage,} from '../utilities/files';
import sharp from 'sharp'
import appRootPath from 'app-root-path'

describe('Image processing test suite', () => {
    const width = 300
    const height = 100
    const filename = 'ahnnj'

    beforeEach(async () => {
        await deleteFolder('images/thumb')
    });

    it('endpoint should be accessible if everything is ok', async (): Promise<void> => {
        const response = await supertest(app).get(
            `/api/images?filename=${filename}&width=${width}&height=${height}`
        )
        expect(response.status).toEqual(200)
    })

    it('endpoint should fail if resize parameters are not set', async (): Promise<void> => {
        const response = await supertest(app).get(`/api/images`)
        expect(response.status).toEqual(400)
    })

    it('should let transformation take place', async (): Promise<void> => {
        await resizeImage(filename, width, height)
        expect(await exactResizeExists(filename, width, height)).toBeTrue()
    })

    it('should respect specified width and height dimensions', async (): Promise<void> => {
        await resizeImage(filename, width, height)
        const metadata = await sharp(
            `${appRootPath.path}/images/thumb/${await fileName(filename)}`
        ).metadata()
        expect(metadata.width).toEqual(width)
        expect(metadata.height).toEqual(height)
    });

    afterAll(async () => {
        await deleteFolder('images/thumb');
    })
})
