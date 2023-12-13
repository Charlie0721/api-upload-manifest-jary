import { Request, Response } from 'express'
import loginUser from '../../models/login_user';
import { LoginUser } from '../../models/login_user';
export class SignupService {


    static signUp = async (req: Request, res: Response) => {
        try {

            const userData: LoginUser = req.body;
            if (!userData.name || !userData.email || !userData.password) {
                return res.json({
                    status: 400,
                    message: 'Por favor ingrese el nombre, email o contraseña'
                })
            }

            const user = await loginUser.findOne({
                email: userData.email
            });
            if (user) {
                return res.status(400).json({
                    status: 400,
                    message: `Ya existe un usuario con el correo ${userData.email}`
                })
            }

            const newUser = new loginUser({
                name: userData.name,
                email: userData.email,
                password: userData.password
            })

            await newUser.save()
            return res.json({
                status: 201,
                message: `user created successfully`,
                newUser
            })
        } catch (error) {
            console.log(error)
            return res.json({
                status: 500,
                error: error
            })
        }

    }

}
