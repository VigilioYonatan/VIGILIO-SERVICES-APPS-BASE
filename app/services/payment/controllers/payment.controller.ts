import { Controller, Get, Post, Req, Res } from "@decorators/express";
import { Request, Response } from "express";
import { MercadoPagoConfig, Preference } from "mercadopago";
const client = new MercadoPagoConfig({
    accessToken:
        "TEST-4614378919971304-121218-c87e7a3322f2d23bf1dc9f841d75eaac-1589234897",
});
const payment = new Preference(client);

@Controller("/payment")
export class PaymentController {
    @Post("/create-order")
    async createOrder(@Res() _res: Response) {
        try {
            const result = await payment.create({
                body: {
                    items: [
                        {
                            id: "1",
                            currency_id: "PEN",
                            title: "LAPTOP LENOVO",
                            unit_price: 500,
                            quantity: 2,
                        },
                    ],
                    back_urls: {
                        success: "/success",
                        failure: "/failure",
                        pending: "/pending",
                    },
                    // ngrok - ./ngrok.exe http 4000
                    notification_url:
                        "https://60db-201-218-157-100.ngrok-free.app/payment/webhook",
                },
            });
            console.log(result);

            // return res.render(JSON.stringify(result));
        } catch (error) {
            console.log(error);
        }
    }

    @Get("/success")
    success(@Res() res: Response) {
        return res.send("success");
    }

    @Get("/failure")
    failure(@Res() res: Response) {
        return res.send("failure");
    }

    @Get("/pending")
    pending(@Res() res: Response) {
        return res.send("pending");
    }

    @Post("/webhook")
    async webhook(
        @Req()
        req: Request,
        @Res() res: Response
    ) {
        const query = req.query as {
            "data-id": string;
            type: "payment" | "merchant_order";
        };

        if (query.type === "payment") {
            try {
                const result = await payment.get({
                    preferenceId: query["data-id"],
                });
                console.log(result);
            } catch (error) {
                console.log(error);
                return res
                    .status(500)
                    .json({ message: "Error payment", isSuccess: false });
            }
        }
        // return res.send("webhook");
    }
}
