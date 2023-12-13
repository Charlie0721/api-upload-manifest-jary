import { Request, Response } from 'express'
import Manifest from '../../models/manifest.model';

import cloudinary from 'cloudinary'

cloudinary.v2.config({

    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_APY_KEY,
    api_secret: process.env.CLOUDINARY_APY_SECRET

})

export class DeleteFileService {


    /**
    Eliminar archivo por ID
    */
    static deleteFile = async (req: Request, res: Response): Promise<Response> => {

        try {

            const { _id } = req.params

            const sendFile = await Manifest.findOne({
                _id
            })

            if (sendFile) {

                const file = await Manifest.findByIdAndDelete(_id);
                //@ts-ignore
                const result = await cloudinary.v2.uploader.destroy(file.public_id)


                return res.status(200).json({
                    result,
                    message: "Manifiesto eliminado satisfactoriamente"
                })
            } else {
                return res.json({ message: "archivo no encontrado" })
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