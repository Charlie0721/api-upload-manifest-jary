import { Schema, model, Document } from 'mongoose'
import { SendDataManifest } from '../interfaces/Send_Data.interface'
const manifestPhoto = new Schema({

    manifestPosId: {
        type: [Number],
    },
    manifestName:String,
    imageURL: String,
    public_id: String,
    originalFileName: String,
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
})

export default model<SendDataManifest & Document>('Manifest', manifestPhoto)