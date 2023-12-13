import { Request, Response } from 'express'
import loginUser, { LoginUser } from '../../models/login_user';

export class LoginService {


    static signin = async (req: Request, res: Response) => {

        const findUser: LoginUser = req.body
        if (!findUser.email || !findUser.password) {
            return res.json({
                status: 400,
                message: 'Por favor ingrese un email o contraseña'
            })
        }

        const user = await loginUser.findOne({
            email: findUser.email
        })

        if (!user) {
            return res.status(400).json({ message: "Usuario no existe" });
        }

        const isMatch = await user.comparePassword(findUser.password)

        if (isMatch) {
            return res.status(201).json({ message: "Usuario logueado" });
        } else {
            return res.status(400).json({ message: "Password no valido" });
        }

    }

}