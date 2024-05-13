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

    public async getOne(id: string): Promise<VacationModel | undefined> {
        let vacations = vacationsStore.getState().vacations;
        let vacation = vacations.find(v => v.vacationId === id);
        if (!vacation) {
            await this.getAll();
            vacations = vacationsStore.getState().vacations;
            vacation = vacations.find(v => v.vacationId === id);
        }
        return vacation;
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

    public async editVacation(vacation: VacationModel): Promise<VacationModel> {
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        };
        const response = await axios.patch<VacationModel>(appConfig.vacationsUrl + `/${vacation.vacationId}`, vacation, config);
        const updatedVacation = response.data;
        const action: VacationsAction = {
            type: VacationsActionType.UpdateVacation,
            payload: updatedVacation
        };
        vacationsStore.dispatch(action);
        return updatedVacation;
    }

    public async getVacationByStartDate(date: string): Promise<VacationModel[]> {
        const response = await axios.get<VacationModel[]>(`${appConfig.vacationsUrl}/start-date/${date}`);
        const vacations = response.data;
        return vacations;
    }

    public async getVacationByBetweenDates(date: string): Promise<VacationModel[]> {
        const response = await axios.get<VacationModel[]>(`${appConfig.vacationsUrl}/between-dates`);
        const vacations = response.data;
        return vacations;
    }

    public async getVacationByFollow(userId: string): Promise<VacationModel[]> {
        const response = await axios.get<VacationModel[]>(`${appConfig.vacationsUrl}/follow/${userId}`);
        const vacations = response.data;
        return vacations;
    }
}
const vacationService = new VacationService();
export default vacationService;