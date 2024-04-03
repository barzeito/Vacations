import axios from "axios";
import appConfig from "../utils/AppConfig";
import VacationModel from "../models/VacationModel";
import { VacationsAction, VacationsActionType, vacationsStore } from "../redux/VacationState";

class VacationService {

    public async getAll(): Promise<VacationModel[]> {
        let vacations = vacationsStore.getState().vacations;
        if (vacations.length === 0) {
            const response = await axios.get<VacationModel[]>(appConfig.vacationsUrl);
            vacations = response.data;
            const action: VacationsAction = {
                type: VacationsActionType.SetVacations,
                payload: vacations
            }
            vacationsStore.dispatch(action);
        }
        return vacations;
    }

    public async addVacation(vacation: VacationModel): Promise<VacationModel> {
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
        const response = await axios.post<VacationModel>(appConfig.vacationsUrl, vacation, config);
        const addedVacation = response.data;
        const action: VacationsAction = {
            type: VacationsActionType.AddVacation,
            payload: addedVacation
        }
        vacationsStore.dispatch(action);
        return addedVacation;
    }

    public async deleteVacation(id: string): Promise<void> {
        await axios.delete(appConfig.vacationsUrl + `/${id}`);
        const action: VacationsAction = {
            type: VacationsActionType.DeleteVacation,
            payload: id
        }
        vacationsStore.dispatch(action);
    }
}
const vacationService = new VacationService();
export default vacationService;