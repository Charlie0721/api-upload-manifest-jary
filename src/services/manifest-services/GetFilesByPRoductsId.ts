
import { Request, Response } from 'express'
import Manifest from '../../models/manifest.model';
import cloudinary from 'cloudinary'

cloudinary.v2.config({

  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_APY_KEY,
  api_secret: process.env.CLOUDINARY_APY_SECRET

})

export class GetFilesByManifestId {

  static getFiles = async (req: Request, res: Response) => {
    const manifestPosId: string[] = (req.params.manifestPosId as string).split(",");
 
    const manifestPosIdNumbers: number[] = manifestPosId.map((id: string) => {
      const parsedId = Number(id);
      return isNaN(parsedId) ? 0 : parsedId;
    });
    
    if (manifestPosIdNumbers.length === 0) {
      res.status(400).send('Invalid manifestPosId parameter');
      return;
    }
    
    try {
      const response = await Manifest.find({
        manifestPosId: { $in: manifestPosIdNumbers.map(String) }
      }).exec();
      res.send(response);
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    } 

   
  }

}