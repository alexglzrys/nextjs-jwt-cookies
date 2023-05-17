import jwt from 'jsonwebtoken';

const ProfileHandle = (req, res) => {
    // Recuperar Cookie enviada en la petición (verificar el nombre asignado al momento de serializar la cookie)
    // Las cookies almacenadas por el navegador, siempre se envian en cada petición al servidor
    const {miTokenDeNext} = req.cookies;
   
    try {
        // La Cookie realmente almacena un JWT con la data básica del usuario
        // Verificar si el Token es correcto 
        const user = jwt.verify(miTokenDeNext, process.env.JWT_SECRET);
        return res.status(200).json(user);
    } catch (err) {
        return res.status(401).json({message: 'Token no válido'})
    }
}

export default ProfileHandle;