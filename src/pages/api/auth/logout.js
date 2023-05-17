import jwt from 'jsonwebtoken';
import cookie from 'cookie';

const LogoutHandler = (req, res) => {
    // Recuperar la cookie enviada por el servidor (dónde se encuentra almacenado el JWT)
    const {miTokenDeNext} = req.cookies;

    // Si no existe la cookie, significa que no se ha logeado
    if (!miTokenDeNext) return res.status(401).json({message: 'Acceso no autorizado'});

    // Verificar que el Token sea valido y proceder a eliminar la cookie del navegador
    try {
        jwt.verify(miTokenDeNext, process.env.JWT_SECRET);
        // Se envía la misma cookie, pero sin JWT y fecha de expiración a 0, para que el navegador proceda a eliminarla de inmediato
        const myCookie = cookie.serialize('miTokenDeNext', null, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 0,
            path: "/",
        });
        res.setHeader('Set-Cookie', myCookie);
        return res.status(200).json({message: 'Sesión cerrada satisfactoriamente'})
    } catch (err) {
        return res.status(401).json({message: 'Token no válido'})
    }
}

export default LogoutHandler;