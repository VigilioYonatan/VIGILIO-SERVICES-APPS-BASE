import { MoneyController } from "@/money/controllers/money.controller";
import { PaymentController } from "@/payment/controllers/payment.controller";
import { WebController } from "@/web/web.controller";
import { Type } from "@decorators/di/lib/src/types";

export const webRouters: Type[] = [WebController, MoneyController,PaymentController];
