import { Request, Response } from 'express'

import Manifest from '../../models/manifest.model';

import cloudinary from 'cloudinary'

cloudinary.v2.config({

    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_APY_KEY,
    api_secret: process.env.CLOUDINARY_APY_SECRET

})

export class SearchFilesByProductsIDService {

    /**
      Buscar por ID de productos
      */
    static searchByProductsID = async (req: Request, res: Response) => {

        try {

            const { productId } = req.body;
            const result = await Manifest.find({
                productId: {
                    $in: productId,
                    $ne: [productId[0]]
                }
            });
            if (result.length > 0) {
                return res.status(200).json({
                    message: "Archivos encontrados satisfactoriamente",
                    result
                });
            } else {
                return res.status(404).json({
                    message: "los id ingresados no existen"
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