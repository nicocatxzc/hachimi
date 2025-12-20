import Input from "./Input";
import Textarea from "./Textarea";
import Editor from "./CodeEditor.vue";
import Select from "./Select";
import Checkbox from "./Checkbox";
import CheckboxGroup from "./CheckboxGroup";
import ColorPicker from "./ColorPicker";
import RadioGroup from "./RadioGroup";
import Slider from "./Slider";
import Switch from "./Switch";
import Sortable from "./SortableList.vue";

export const elText = createInput(Input);
export const elTextarea = createInput(Textarea);
export const CodeEditor = createInput(Editor, {
    props: ["language"],
});
export const elSelect = createInput(Select);
export const elCheckbox = createInput(Checkbox);
export const elCheckboxGroup = createInput(CheckboxGroup);
export const elColorPicker = createInput(ColorPicker);
export const elRadioGroup = createInput(RadioGroup);
export const elSlider = createInput(Slider);
export const elSwitch = createInput(Switch);
export const SortableList = createInput(Sortable, { props: ["innerSchema"]});
