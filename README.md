# from zero to superhero

---------

Clase 10

Como agregar Typescript.

TAREA:

1. Instalar typescript
    ```npm install typescript --save-dev```
2. Instalar los types de node
    ```npm install @types/node --save-dev```
3. Crear el archivo de configuracion de typescript
    ``` 
    npx tsc --init --rootDir src --outDir build \
    --esModuleInterop --resolveJsonModule --lib es6 \
    --module commonjs --allowJs true --noImplicitAny true 
    ``` 
4. Instalar nodemon. Nodemon nos ayuda con el watch mode
    ``` npm install --save-dev ts-node nodemon rimraf ```
5. Agregar la configuracion de nodemon. Crear el archivo en la carpeta principal y nombrarlo `nodemon.json`. El archivo debe tener el siguiente codigo
    ``` 
    {
        "watch": ["src"],
        "ext": ".ts,.js",
        "ignore": [],
        "exec": "npx ts-node -r dotenv/config ./src/app.ts"
    }
    ```
6. Ir al archivo `package.json` y modificar el comando `dev` para que sea `npx nodemon`
    ```
        "scripts": {
            "build": "rimraf ./build && tsc",
            "start": "npm run build && node -r dotenv/config build/app.js",
            "dev": "npx nodemon -r dotenv/config",
            "test": "echo \"Error: no test specified\" && exit 1"
        }
    ```
7. Cambiar la extension del archivo `src/app.js` para que sea `src/app.ts`
8. Cambiar los imports que se hacen con `require(...)` por `import from '...'` para obtener los types de los modulos importados
    ```js
        ///Antes
        const express = require("express");

        // Cambiar por
        import express from "express";
    ```

    EJEMPLO COMPLETO

    ```js
    import { config } from 'dotenv';
    import express from 'express';
    import mongoose from 'mongoose';
    import { errorHandler, notFoundHandler } from './middlewares/handlers';
    import routes from './routes';

    config();

    const PORT = process.env.PORT || 3000,
        app = express();

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use("/", routes);
    app.use(notFoundHandler);
    app.use(errorHandler);

    const start = async () => {
        try {
            app.listen(PORT, () => {
                console.log(`Server started on port ${PORT}...`);
            });
        } catch (error) {
            console.error(error);
            process.exit(1);
        }
    };

    start();
    ```

9. Agregar la carpeta `build` al archivo `.gitignore`
    ```
    build

    logs
    *.log
    npm-debug.log*
    yarn-debug.log*
    yarn-error.log*
    lerna-debug.log*
    .pnpm-debug.log*
    ```