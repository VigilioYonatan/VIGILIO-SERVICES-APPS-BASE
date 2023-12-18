import { AuthApiController } from "@/auth/controllers/auth.api.controller";
import { CategoriesController } from "@/categories/controllers/categories.controller";
import { PaginatorApiController } from "@/common/paginator/controllers/paginator.api.controller";
import { InformationController } from "@/information/controllers/information.controller";
import { ProductsController } from "@/products/controllers/products.controller";
import { ReviewsController } from "@/reviews/controllers/reviews.controller";
import { RolesController } from "@/roles/controllers/roles.controller";
import { SeederController } from "@/seeders/controllers/seeders.controller";
import { UploadsController } from "@/uploads/controllers/uploads.controller";
import { UsersController } from "@/users/controllers/users.controller";
import { Type } from "@decorators/di/lib/src/types";

export const apiRouters: Type[] = [
    PaginatorApiController,
    UsersController,
    ProductsController,
    CategoriesController,
    SeederController,
    RolesController,
    InformationController,
    AuthApiController,
    ReviewsController,
    UploadsController,
];
