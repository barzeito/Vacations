import Model from "./model";
import users from "./mysql";

export default function getModel(): Model {
    return users;
}