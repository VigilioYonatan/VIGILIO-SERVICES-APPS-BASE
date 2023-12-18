import { signal } from "@preact/signals";
import { InformationSchemaFromServe } from "../schemas/information.schema";

const information = signal<InformationSchemaFromServe>(
    {} as InformationSchemaFromServe
);
function useInformationstore() {
    function onInit(user: InformationSchemaFromServe) {
        information.value = user;
    }
    return {
        state: information.value,
        onInit,
    };
}

export default useInformationstore;
