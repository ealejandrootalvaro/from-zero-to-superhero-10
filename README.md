# from zero to superhero

---------

Clase 8

TAREA:

1. Agregar al .env la variable JWT_SECRET_KEY. Usar `.env.example` como ejemplo
2. En el controller `src/controllers/authController.js` implementar la funcion Login sera un request tipo POST, donde en el body vamos a tener el email del usuario

    ``` const { email } = req.body; ```

    Creal el JWT

    ```js
    token = jwt.sign(
        { email: email },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "1h" }
    )
    ```

    Y retornar el token en la respuesta (Lo necesitaremos mas adelante)

    ```js
    res
        .status(200)
        .json({
        success: true,
        data: {
            token: token,
        },
        });
    ```

3. En el controller `src/controllers/authController.js` implementar la funcion restrictedView. Esta sera una vista protegida donde solo los usuarios autenticados pueden ingresar

    ```js
    res.status(200)
    .send("Confidential View")
    ```
4. Implementar el middleware `isAuth` que validara el token del usuario `src/middlewares/handlers.js`

    Se usa el header `Authorization` para enviar el token
    ```js
    const auth = req.headers.authorization;
    ```

    Usar la libreria `jsonwebtoken` para verificar el token. Si el token no es valido (ha sido alterado, esta expirado o simplemente no existe) se retorna un codigo http 401  

    ```js
    let decodedToken;

    try {
        decodedToken = jwt.verify(auth, process.env.JWT_SECRET_KEY);
    } catch(err) {
        console.log(err);
        res.status(401);
        res.send(err.message || 'Access forbidden');
        return;
    }
    ```

    Validar el token decodificado y continuar

    ```js
    if (decodedToken) {
        next();
    } else {
        res.status(401);
        res.send('Access forbidden');
        return;
    }
    ```

5. Realizar pruebas. Usando una herramienta de API realizar una peticion `POST` al endpoint `/login`. Recuerda agregar en el body el valor para `email`. Si la peticion es exitosa toma el valor del `token` e ingresalo en https://jwt.io/. Valida que el token tenga en su payload el email que enviaste en el `POST`

6. Realiza una peticion `GET` al endpoint `/auth/confidential`. Recuerda usar el header `Authorization` con el token obtenido anteriormente. Deberias ver `Confidential View` 

7. Realiza pruebas usando JWT invalidos. Ingresa en https://jwt.io/ y genera tokens (o modifica el payload de uno de los obtenidos en el `login`). En este caso al usar un token invalido debes obtener un codigo de error 401 y un mensaje de error explicando porque fallo la validacion

