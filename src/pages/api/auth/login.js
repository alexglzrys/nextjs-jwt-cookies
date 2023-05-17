import jwt from "jsonwebtoken";
import { serialize } from "cookie";

// Controlador de petición
const LoginHandle = (req, res) => {
  // Recuperar credenciales de acceso enviadas en el cuerpo de la petición
  const { email, password } = req.body;

  // Simular autenticación y consulta a base de datos
  if (email === "admin@localhost.io" && password === "administrador") {
    // Generar un token con información básica para este usuario
    // Expira en 30 dias a partir de su creación
    const token = jwt.sign(
      {
        email,
        username: "webmaster",
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "30 days",
      }
    );

    // El token se puede enviar adjunto en la respuesta, o en una cabecera adicional
    // En la respuesta - El cliente lo toma y guarda en LocalStorage
    // En la cabecera - Podemos enviarlo en una Cookie y el navegador se encarga automàticamente de guardarlo

    // Generar una cookie a partir del Token generado
    const serialized = serialize("miTokenDeNext", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
    });

    // Adjuntar la nueva cookie en la cabecera de respuesta
    res.setHeader("Set-Cookie", serialized);

    return res.status(200).json({
      message: "Autenticación exitosa",
    });
  }

  return res.status(401).json({
    message: "Credenciales de acceso incorrectas",
  });
};

export default LoginHandle;
