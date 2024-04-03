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

    public async getLiked(userId: string): Promise<FollowModel[]> {
        const response = await axios.get<FollowModel[]>(`${appConfig.followUrl}/${userId}`);
        const likedVacations = response.data;
        return likedVacations;
    }
}
const followService = new FollowService();
export default followService;