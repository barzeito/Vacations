import { createStore } from "redux";
import VacationModel from "../models/VacationModel";

// 1. Global state for products
export class VacationsState {
    public vacations: VacationModel[] = [];
}

// 2. Action Type
export enum VacationsActionType {
    SetVacations = 'SetVacations',
    DeleteProduct = 'DeleteProduct',
    UpdateProduct = 'UpdateProduct',
    addVacation = 'AddVacation',
}

// 3. Action Object
export type VacationPayload = VacationModel[] | VacationModel | number;
export interface VacationsAction {
    type: VacationsActionType,
    payload: VacationPayload
}

// 4. Reducer ()
export function vacationsReducer(currentState = new VacationsState(), action: VacationsAction): VacationsState {
    const newState = { ...currentState };

    switch (action.type) {
        case VacationsActionType.SetVacations:
            newState.vacations = action.payload as VacationModel[];
            break;
        case VacationsActionType.addVacation:
            const singleVacation = action.payload as VacationModel;
            newState.vacations.push(singleVacation);
            break;
        case VacationsActionType.DeleteProduct:
            const productId = action.payload as number;
            const indexToDelete = newState.vacations.findIndex(vacation => vacation.vacationId === productId);
            if (indexToDelete !== -1) newState.vacations.splice(indexToDelete, 1);
            break;
        case VacationsActionType.UpdateProduct:
            const productToUpdate = action.payload as VacationModel;
            const indexToUpdate = newState.vacations.findIndex(vacation => vacation.vacationId === productToUpdate.vacationId);
            if (indexToUpdate !== -1) newState.vacations[indexToUpdate] = productToUpdate;
            break;

    }

    return newState;
}

// 5. store
export const vacationsStore = createStore(vacationsReducer);