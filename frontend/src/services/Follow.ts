import axios from "axios";
import appConfig from "../utils/AppConfig";
import FollowModel from "../models/FollowModel";
import { FollowAction, FollowActionType, followStore } from "../redux/FollowState";

class FollowService {

    public async follow(follower: FollowModel): Promise<string> {
        const response = await axios.post<string>(appConfig.followUrl, follower);
        const addedFollow = response.data;
        const action: FollowAction = {
            type: FollowActionType.SetFollow,
            payload: addedFollow
        }
        followStore.dispatch(action);

        return addedFollow;
    }

    public async unFollow(vacationId: string): Promise<void> {
        await axios.delete(appConfig.followUrl + `/${vacationId}`);
        const action: FollowAction = {
            type: FollowActionType.deleteFollow,
            payload: vacationId
        }
        followStore.dispatch(action);
    }

    public async getUserFollows(userId: string): Promise<FollowModel[]> {
        const response = await axios.get<FollowModel[]>(`${appConfig.followUrl}/follows/${userId}`);
        const likedVacations = response.data;
        return likedVacations;
    }

    public async getVacationFollowsNumber(vacationId: string): Promise<number> {
        const response = await axios.get<FollowModel[]>(`${appConfig.followUrl}/counter/${vacationId}`);
        const followsCounter = response.data.length;
        return followsCounter;
    }

    public async getAllVacationsFollows(): Promise<FollowModel[]> {
        const response = await axios.get<FollowModel[]>(`${appConfig.followUrl}/statistics`);
        const followsCounter = response.data;
        return followsCounter;
    }

    public async sendCSV(): Promise<void> {

            const response = await axios.get(`${appConfig.followUrl}/csv`, {
                responseType: 'blob', // Set the response type to blob to handle binary data
            });
            // Create a blob object from the response data
            const blob = new Blob([response.data], { type: 'text/csv' });
            // Create a temporary URL for the blob object
            const url = window.URL.createObjectURL(blob);
            // Create a temporary link element
            const link = document.createElement('a');
            // Set the link's href attribute to the temporary URL
            link.href = url;
            // Set the link's download attribute to specify the file name
            link.setAttribute('download', 'Vacations.csv');
            // Append the link to the document body
            document.body.appendChild(link);
            // Programmatically trigger a click event on the link
            link.click();
            // Remove the link from the document body
            document.body.removeChild(link);
    }
}
const followService = new FollowService();
export default followService;