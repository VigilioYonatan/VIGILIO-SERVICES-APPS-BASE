import { Controller, Get, Params, Res } from "@decorators/express";
import { type Response, type Request } from "express";

@Controller("/change-money")
export class MoneyController {
    @Get("/:money")
    changeMoney(@Res() res: Response, @Params("money") money: string) {
        if (!["USD", "PEN"].includes(money)) {
            res.cookie("money", "", { expires: new Date(0) });
        } else {
            res.cookie("money", money, { maxAge: 315360000 });
        }
        res.redirect("back");
    }
}
