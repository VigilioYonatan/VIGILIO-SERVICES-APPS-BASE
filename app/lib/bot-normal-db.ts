import { MessageMedia, type Client, type Message } from "whatsapp-web.js";
import { Products } from "@/products/entities/products.entity";
import { Information } from "@/information/entities/information.entity";
import { Op } from "sequelize";

let chats: {
    phoneNumber: string;
    chats: string[];
}[] = [];

export async function botNormalDB(client: Client, message: Message) {
    const chat = chats.find((chat) => chat.phoneNumber === message.from);
    const body = message.body.toLowerCase();
    if (chat) {
        if (body === "0") {
            chat.chats = chat.chats.slice(0, -1);
        }

        if (!chat.chats.length) {
            await client.sendMessage(
                message.from,
                "Estas son nuestras opciones 😃:\n 1. Buscar Producto 🪔 \n 2. Nuestra web 🌐 \n 3. Nosotros \n"
            );
            chat.chats = [...chat.chats, "BIENVENIDO"];
            return;
        }
        if (chat.chats.at(-1) === "BIENVENIDO") {
            if (body === "0") {
                await client.sendMessage(
                    message.from,
                    "Estas son nuestras opciones 😃:\n 1. Buscar Producto 🪔 \n 2. Nuestra web 🌐 \n 3. Nosotros \n"
                );
                return;
            }
            if (body === "1") {
                chat.chats = [...chat.chats, "SEARCH"];
                await client.sendMessage(
                    message.from,
                    "Digite el producto que desee buscar 😃"
                );
                return;
            }
            if (body === "2") {
                client.sendMessage(message.from, "web");
                return;
            }
            if (body === "3") {
                chat.chats = [...chat.chats, "NOSOTROS"];
                const information = await Information.findByPk(1);
                await client.sendMessage(
                    message.from,
                    `Bienvenido a ${
                        information!.name
                    }, donde la excelencia culinaria se encuentra con la calidez de un ambiente acogedor. Nuestra cocina fusiona sabores auténticos con ingredientes frescos, ofreciendo una experiencia gastronómica única. Con un servicio excepcional y un menú diverso, cada visita a Pio Ricco es una invitación a disfrutar de momentos inolvidables. ¡Te esperamos para compartir contigo nuestra pasión por la buena comida! \n \n Numero de telefono: *934-434-343*\n Dirección: MZ-U3 LT 17 CARABAYLLO`
                );
                // if (information!.logo) {
                //     await client.sendMessage(
                //         message.from,
                //         await MessageMedia.fromUrl(
                //             printFileWithDimension(
                //                 information!.logo,
                //                 "information",
                //                 500
                //             )[0]
                //         )
                //     );
                // }
                await client.sendMessage(
                    message.from,
                    "Digite \n 0. Regresar atrás "
                );
                return;
            }
        }

        if (chat.chats.at(-1) === "SEARCH") {
            const product = await Products.findOne({
                limit: 6,
                where: {
                    name: {
                        [Op.iLike]: `%${body}%`,
                    },
                },
            });

            if (!product) {
                return await client.sendMessage(
                    message.from,
                    `No se encontró producto ${body}`
                );
            }

            await client.sendMessage(
                message.from,
                // enviar imagen y convertir en sticker
                await MessageMedia.fromUrl(
                    "https://mac-center.com.pe/cdn/shop/products/IMG-6206281_823x.jpg"
                ),
                { sendMediaAsSticker: true }
            );
            await client.sendMessage(
                message.from,
                `*Nombre*: ${product.name}\n *Precio*: ${
                    product.price
                }\n *Cantidad*: ${product.stock} unidades\n ${
                    product.enabled
                        ? "_Este producto no se encuentra disponible_"
                        : ""
                }`
            );
            await client.sendMessage(
                message.from,
                "Digite \n 0.  Regresar atrás"
            );
            return;
        }

        chats = chats.map((chat) =>
            chat.phoneNumber === message.from
                ? { ...chat, chats: chat.chats }
                : chat
        );
    } else {
        chats = [
            ...chats,
            {
                phoneNumber: message.from,
                chats: ["BIENVENIDO"],
            },
        ];
        await client.sendMessage(
            message.from,
            "¡Hola! Bienvenido a Pio Riccos, tu destino gastronómico de excelencia, Estamos encantando en atenderte  😊."
        );
        await client.sendMessage(
            message.from,
            "Estas son nuestras opciones 😃:\n 1. Buscar Producto 🪔 \n 2. Nuestra web 🌐 \n 3. Nosotros \n"
        );
    }
}
