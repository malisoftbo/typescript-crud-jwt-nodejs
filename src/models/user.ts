import { Schema, model, Document } from "mongoose"
import bcrypt from "bcryptjs"
//Implementa una interface y lo hace que los documentos de la base de datos tengan este tipo al hacer un select
export interface IUser extends Document {
    username: string,
    email: string,
    password: string,
    encryptPassword(password:string):Promise<string>,
    validatePassword(password:string):Promise<boolean>,
}

const userSchema = new Schema({
    username: { type: String, required: true, min: 4, lowercase: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true }
})

userSchema.methods.encryptPassword = async (password: string): Promise<string> => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
}

userSchema.methods.validatePassword=async function(password:string):Promise<boolean>{
    return await bcrypt.compare(password,this.password);
}

export default model<IUser>('user', userSchema);