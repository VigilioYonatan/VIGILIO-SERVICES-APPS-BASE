import { Client, Message, MessageMedia } from "whatsapp-web.js";
import { openai } from "./chatgpt";
import { productsSeeder } from "@/products/seeders/products.seeder";
const threadByUser: Record<string, string> = {}; // Store thread IDs by user

async function botNormalnoDB(client: Client, message: Message) {
    const userId = message.from;
    if (!threadByUser[userId]) {
        const myThread = await openai.beta.threads.create();
        // biome-ignore lint/suspicious/noConsoleLog: <explanation>
        console.log("New thread created with ID: ", myThread.id, "\n");
        threadByUser[userId] = myThread.id; // Store the thread ID for this user
    }
    try {
        await openai.beta.threads.messages.create(threadByUser[userId], {
            role: "user",
            content: message.body,
        });
    } catch (error) {
        // si hay algun error. igual que imprima el siguiente mensaje
        // biome-ignore lint/suspicious/noConsoleLog: <explanation>
        console.log(error);
    }
    /* SI usas base de datos */
    // const products = await Products.findAll();
    // const productsMapped = products.map((prod) => ({
    //     id: prod.id,
    //     name: prod.name,
    //     cantidad: `Quedan ${prod.stock} unidades`,
    //     precio: prod.price,
    //     category: (prod.categories as any).name,
    //     disponible: prod.enabled,
    //     page: `https://www.pioricco/product/${prod.slug}`,
    // }));

    const myRun = await openai.beta.threads.runs.create(threadByUser[userId], {
        assistant_id: "token.que-viene-de-openaiapi",
        instructions: `eres una tienda de celulares llamado PHONES VISION y ofrece estos articulos ${JSON.stringify(
            productsSeeder
        )} cuando quieran pagar o confirmar pedido mandales la url de pageinformation en formato normal no en formato de markdown  para que compren desde la web.Recuerda que si la cantidad cambió es por que se agregó o ya se vendió dicho producto Y usa emojis de vez en cuando y no responder preguntas que no sea del tema. empezemos`,
        tools: [],
        model: "gpt-3.5-turbo-1106",
    });
    let keepRetrievinRun;
    while (myRun.status !== "completed") {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        keepRetrievinRun = await openai.beta.threads.runs.retrieve(
            threadByUser[userId],
            myRun.id
        );
        if (keepRetrievinRun.status === "completed") {
            break;
        }
    }

    const allMessages = await openai.beta.threads.messages.list(
        threadByUser[userId]
    );
    if (allMessages.data[0].content[0].type === "text") {
        await client.sendMessage(
            message.from,
            allMessages.data[0].content[0].text.value
        );
        for (const prod of productsSeeder) {
            const expresionRegular = new RegExp(prod.name, "i"); // La "i" hace que la búsqueda sea insensible a mayúsculas/minúsculas

            if (
                expresionRegular.test(allMessages.data[0].content[0].text.value)
            ) {
                await client.sendMessage(
                    message.from,
                    await MessageMedia.fromUrl(prod.images[0].file),
                    { sendMediaAsSticker: true }
                );
                await client.sendMessage(message.from, prod.name);
            }
        }
    }
}
