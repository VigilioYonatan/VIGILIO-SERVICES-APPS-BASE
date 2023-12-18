import VigilioForm from "./Form";
import FormButtonReset from "./FormButtonReset";
import FormButtonSubmit from "./FormButtonSubmit";
import FormControl from "./FormControl";
import FormFile from "./FormFile";
import FormMap from "./FormMap";
import FormSelect from "./FormSelect";
import FormStar from "./FormStar";
import FormTextArea from "./FormTextArea";
import WebFormControl from "./WebFormControl";

const Form = Object.assign(VigilioForm, {
    control: Object.assign(FormControl, {
        file: FormFile,
        select: FormSelect,
        area: FormTextArea,
        web: WebFormControl,
        map: FormMap,
        star: FormStar,
        // markdown: FormControlMarkdown,
    }),
    button: { reset: FormButtonReset, submit: FormButtonSubmit },
});
export default Form;
