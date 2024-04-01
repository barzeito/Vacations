import Model from "./model";
import vacations from "./mysql";

export default function getModel(): Model {
    return vacations;
}