import { Injectable } from "@decorators/di";
import { type File } from "formidable";
import {
    validateUpload,
    type ValidationProps,
} from "@vigilio/express-core/helpers";
import { BadRequestException } from "@vigilio/express-core";
import { usersFotoQualities } from "@/users/libs";
import { categoriesImageQualities } from "@/categories/lib";
import { UsersService } from "@/users/services/users.service";
import {
    removeFile,
    uploadFiles,
    UploadsEntities,
    UploadsProperties,
} from "../libs/helpers";
import { productsImagesQualities } from "@/products/lib";
import { informationLogoQualities } from "@/information/lib";
import { InformationService } from "../../information/services/information.service";
import { reviewsFotoQualities } from "@/reviews/lib";
import { ProductsService } from "@/products/services/products.service";
@Injectable()
export class UploadsService {
    constructor(
        private readonly usersService: UsersService,
        private readonly informationService: InformationService,
        private readonly productsService: ProductsService
    ) {}
    async store(props: {
        files: File[];
        name?: string;
        entity: UploadsEntities;
        property: UploadsProperties;
    }) {
        const { entity, files, name, property } = props;
        let qualities: number[] = [];

        switch (entity) {
            case "users":
                if (property === "foto") {
                    qualities = await this.customUpload(
                        files,
                        { maxFiles: 1, required: false },
                        usersFotoQualities
                    );
                }
                break;
            case "products":
                if (property === "images") {
                    qualities = await this.customUpload(
                        files,
                        {
                            minFiles: 1,
                            maxFiles: 12,
                            required: true,
                        },
                        productsImagesQualities
                    );
                }
                break;
            case "categories":
                if (property === "image") {
                    qualities = await this.customUpload(
                        files,
                        {
                            minFiles: 1,
                            maxFiles: 1,
                            required: true,
                        },
                        categoriesImageQualities
                    );
                }
                break;
            case "information":
                if (property === "logo") {
                    qualities = await this.customUpload(
                        files,
                        {
                            minFiles: 1,
                            maxFiles: 1,
                            required: true,
                        },
                        informationLogoQualities
                    );
                }
                break;
            case "reviews":
                if (property === "foto") {
                    qualities = await this.customUpload(
                        files,
                        {
                            minFiles: 1,
                            maxFiles: 1,
                        },
                        reviewsFotoQualities
                    );
                }
                break;
            default:
                throw new BadRequestException(
                    "Error server, comunicarse con desarrollador"
                );
        }
        const images = await uploadFiles({ files, entity, name, qualities });
        return {
            success: true,
            images,
        };
    }
    async update(props: {
        files: File[];
        name?: string;
        id: string;
        entity: UploadsEntities;
        property: UploadsProperties;
    }) {
        const { entity, files, name, id, property } = props;
        let entidad;
        switch (entity) {
            case "users": {
                const { user } = await this.usersService.show(id);
                entidad = user;
                if (user.foto) {
                    removeFile(user.foto, entity);
                }
                break;
            }
            case "products": {
                const { product } = await this.productsService.show(id);
                entidad = product;
                if (product.images) {
                    removeFile(product.images, entity);
                }
                break;
            }
            case "reviews": {
                const { user } = await this.usersService.show(id);
                entidad = user;
                if (user.foto) {
                    removeFile(user.foto, entity);
                }
                break;
            }
            case "information": {
                const { information } = await this.informationService.show(id);
                entidad = information;
                if (information.logo) {
                    removeFile(information.logo, entity);
                }
                break;
            }

            default:
                throw new BadRequestException(
                    "Error server, comunicarse con desarrollador"
                );
        }
        let filesFoto = null;
        if (files) {
            const { images } = await this.store({
                entity,
                files,
                property,
                name,
            });
            filesFoto = images;
        }
        /*
        type here is so difficult but  i know that you understand me
        */
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        (entidad as any)[property] = filesFoto;
        await entidad.save();
        return {
            success: true,
            message: "Imagen Editado correctamente",
        };
    }
    async customUpload(
        files: File[],
        validation: ValidationProps,
        qualities: number[]
    ) {
        try {
            await validateUpload(files, validation);
            return qualities;
        } catch (error) {
            throw new BadRequestException(error as string);
        }
    }
}
