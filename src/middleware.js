import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
// import { verify } from "jsonwebtoken";

// La siguiente función es un middleware que se ejecutará en cualquier petición al servidor
export async function middleware(request) {
  try {
    // Recuperar info del JWT almacenado en la Cookie
    const jwt = request.cookies.get("miTokenDeNext")?.value;
    // Redireccionar si no hay cookie
    if (jwt === undefined)
      return NextResponse.redirect(new URL("/login", request.url));
    // Comprobar que el Token sea válido
    const { payload } = await jwtVerify(
      jwt,
      new TextEncoder().encode("misecreto")
    );
    
    // La librería de jsonwebtoken hace uso de APIS de NodeJS, pero los middlewares se ejecutan en un ambiente Edge, donde NodeJS no está presente de forma completa (v8), por tanto se debe reemplazar la librería por un pollifyl
    //verify(jwt, process.env.JWT_SECRET)

    return NextResponse.next();
  } catch (error) {
    // No dejar pasar si no hay un token válido
    console.log(error);
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

// Especificar en que rutas funcionará el middleware
export const config = {
  matcher: ["/dashboard", "/"],
};
