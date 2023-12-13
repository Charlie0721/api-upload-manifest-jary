import { Request, Response } from 'express'
import { SendDataManifest } from '../../interfaces/Send_Data.interface'
import Manifest from '../../models/manifest.model'
import multer from 'multer';
import dotenv from 'dotenv';
dotenv.config();
import * as fs from 'fs-extra'

import cloudinary from 'cloudinary'

cloudinary.v2.config({

    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_APY_KEY,
    api_secret: process.env.CLOUDINARY_APY_SECRET

})


export class UploadFileToCloudinaryService {
    static uploadFiles = async (req: Request, res: Response): Promise<Response> => {
        try {
            const newFile: SendDataManifest = req.body;


            const fileBase64 = req.body.fileBase64;
            const fileBuffer = Buffer.from(fileBase64, 'base64');
            const tempFilePath = './temp-file';
            fs.writeFileSync(tempFilePath, fileBuffer);
            if (!newFile.fileBase64) {
                return res.status(400).json({ error: 'Debe proporcionar un archivo en formato Base64' });
            }

            const result = await cloudinary.v2.uploader.upload(tempFilePath, {
                resource_type: 'auto',
            });

            const newManifest = new Manifest({
                manifestPosId: newFile.manifestPosId,
                manifestName: newFile.manifestName,
                imageURL: result.url,
                public_id: result.public_id,
                originalFileName: result.original_filename,
            });


            await newManifest.save();
            fs.unlinkSync(tempFilePath)
            return res.status(200).json({
                status: 200,
                message: 'Archivo subido exitosamente a Cloudinary',
                newManifest,
            });
        } catch (error: any) {
            console.log(error);
            return res.status(500).json({
                error: 'Error en el servidor',
                errorAPI: error.message
            });
        }
    };
}
