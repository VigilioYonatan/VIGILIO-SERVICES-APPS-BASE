import { Injectable } from "@decorators/di";
import { Controller, Get, Res } from "@decorators/express";
import { type Response } from "express";
import { WebService } from "./web.service";

@Injectable()
@Controller("/")
export class WebController {
    constructor(private readonly webService: WebService) {}

    @Get("/")
    async home(@Res() res: Response) {
        const result = await this.webService.home();
        // por defecto ya leer web/home/index
        return res.render("web/home", result);
    }
    @Get("/menu")
    async menu(@Res() res: Response) {
        const result = await this.webService.menu();
        return res.render("web/menu", result);
    }

    @Get("/nosotros")
    async about(@Res() res: Response) {
        const result = await this.webService.about();
        return res.render("web/about", result);
    }

    @Get("/cart")
    async cart(@Res() res: Response) {
        return res.render("web/cart");
    }

    @Get("/politica-de-privacidad")
    async politica(@Res() res: Response) {
        const result = await this.webService.politica();

        if (!result.onlypolitica || !result.onlypolitica.politica.length) {
            return res.redirect("back");
        }
        return res.render("web/politica", result);
    }
}
