# VIGILIO/EXPRESS-CORE

<img src="./public/images/settings/vigilio-express.png" width="150">
<br>
by Yonatan Vigilio Lavado

-   Como inializar

1. Configura tus variables de entorno .env en bd

2. Correr servidor de cliente y servidor

```bash
pnpm dev
pnpm serve
```

3. ejecutar seed en postman en el navegador o postman.
   En app\services\seeders\ más información
   http://localhost:4000/api/seeders

4. Si deseas entrar a modo admin.
    - correo: admin@admin.com
    - contraseña: 123456

## BOT con whatsapp

1. Descomenta en el constructor en app\config\server.ts this.bot()
2. En el terminal tendrás que escanear con tu whatsapp para probar el bot
3. Con otro celular puedes enviar mensaje y probar el bot

## Biome

-   compando para checkear si hay errores en nuestro codigo - errores de no estar programando con la convención de la empresa

```bash
pnpm biome:check
```

-   Para formatear y se limpien errores

```bash
pnpm biome:format
```

Se verá que ya hay menos errores. hay errores que tienes que arreglar a tu cuenta

## Production

-   comando para production en server

```bash
pnpm serve
```

-   comando para production en cliente

```bash
pnpm dev
```
