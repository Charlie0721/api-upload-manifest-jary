import { Request, Response } from 'express'
import Manifest from '../../models/manifest.model';
import cloudinary from 'cloudinary'

cloudinary.v2.config({

    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_APY_KEY,
    api_secret: process.env.CLOUDINARY_APY_SECRET

})

export class GetFileService {

    static getFile = async (req: Request, res: Response):Promise<Response> => {
        try {
            const id: string = req.params._id
            const findFile = await Manifest.findById({
                _id: id
            });
            if (findFile) {
                return res.status(200).json({
                    message: 'File found',
                    findFile
                });
            } else {
                return res.status(404).json({
                    message: 'File not found'
                });
            }
        } catch (error) {
            console.log(error)
            return res.json({
                status: 500,
                error: error
            })
        }
    }


}