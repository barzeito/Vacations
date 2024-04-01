import { createStore } from "redux";
import FollowModel from "../models/FollowModel";

// 1. Global state for products
export class FollowState {
    public followers: FollowModel[] = [];
}

// 2. Action Type
export enum FollowActionType {
    SetFollow = 'SetFollow',
    deleteFollow = 'deleteFollow',
}

// 3. Action Object
export type FollowPayload = FollowModel[] | FollowModel | string;
export interface FollowAction {
    type: FollowActionType,
    payload: FollowPayload
}

// 4. Reducer ()
export function followReducer(currentState = new FollowState(), action: FollowAction): FollowState {
    const newState = { ...currentState };

    switch (action.type) {
        case FollowActionType.SetFollow:
            newState.followers = action.payload as FollowModel[];
            break;
        case FollowActionType.deleteFollow:
            const singleVacation = action.payload as FollowModel;
            newState.followers.push(singleVacation);
            break;
    }

    return newState;
}

// 5. store
export const followStore = createStore(followReducer);