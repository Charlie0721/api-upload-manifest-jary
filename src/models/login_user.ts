import { Schema, model, Document } from 'mongoose'
import bcrypt from 'bcrypt';

export interface LoginUser extends Document {

    name: string;
    email: string;
    password: string;
    comparePassword:(password:string) => Promise<boolean>;

}

const userSchema = new Schema({

    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }

});

userSchema.pre<LoginUser>('save', async function (next) {
    const user = this;
    if (!user.isModified('password')) return next();

    const salt = await bcrypt.genSalt(10);
   const hash= await bcrypt.hash(user.password, salt);
    user.password=hash;
    next();
})
 
userSchema.methods.comparePassword= async function (password:string): Promise<boolean>{
    return await bcrypt.compare(password, this.password);
}

export default model<LoginUser>('User', userSchema)