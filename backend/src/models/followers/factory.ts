import Model from "./model";
import followers from "./mysql";

export default function getModel(): Model {
    return followers;
}