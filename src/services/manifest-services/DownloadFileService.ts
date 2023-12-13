import { Request, Response } from 'express'
import Manifest from '../../models/manifest.model';
import axios from 'axios';
import cloudinary from 'cloudinary'
import * as fs from 'fs-extra'
cloudinary.v2.config({

    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_APY_KEY,
    api_secret: process.env.CLOUDINARY_APY_SECRET

})


export class DonwloadManifestService {

    static downloadManifest = async (req: Request, res: Response) => {


        const public_id = req.params.public_id
        const options = {
            resource_type: 'image'
        }



    //     try {
    //         const result = await cloudinary.v2.api.resource(public_id, options);
    //         const fileUrl = result.secure_url;
    //         const filePath = result.pathname
    //         const response = await axios({
    //             method: 'GET',
    //             url: fileUrl,
    //             responseType: 'stream'
    //         });

    //         console.log(response.path);
    //         res.json(response);
    //     } catch (error) {
    //         console.error('Error al obtener la información del archivo:', error);
    //         res.status(500).json({ error: error })
    //     }

     }

}