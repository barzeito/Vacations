import "./Panel.css";
import PanelNavigation from "../navigation/Navigation";
import { useEffect, useState } from "react";
import FollowModel from "../../../models/FollowModel";
import VacationModel from "../../../models/VacationModel"; // Import VacationModel
import followService from "../../../services/Follow";
import vacationService from "../../../services/Vacation"; // Import vacationService
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import authService from "../../../services/Auth";
import UserModel from "../../../models/UserModel";
import Spinner from "../../common/spinner/spinner";

function Panel(): JSX.Element {

    const [followData, setFollowData] = useState<FollowModel[]>([]);
    const [vacationData, setVacationData] = useState<VacationModel[]>([]);
    const [totalUsers, setTotalUsers] = useState<UserModel[]>([]);
    const [totalFollows, setTotalFollows] = useState<FollowModel[]>([]);



    useEffect(() => {
        async function fetchData() {
            try {
                const data = await followService.getAllVacationsFollows();
                setFollowData(data);

                const vacationData = await vacationService.getAll();
                setVacationData(vacationData);

                const usersData = await authService.getAllUsers();
                setTotalUsers(usersData)

                const followData = await followService.getAllFollowed();
                setTotalFollows(followData)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    }, []);

    return (
        <div className="Panel">
            <PanelNavigation />
            <div className="AnaContent">
                <div className="AnaHeader">
                    <h1 className="AnaTitle">Analytics</h1>
                </div>
                <div className="AnaStats">
                    <div className="statCard">
                        <p>Total Vacations</p>
                        <span><i className="bi bi-backpack2"></i> {vacationData.length}</span>
                    </div>
                    <div className="statCard">
                        <p>Total Users</p>
                        <span><i className="bi bi-people"></i> {totalUsers.length}</span>
                    </div>
                    <div className="statCard">
                        <p>Total Follows</p>
                        <span><i className="bi bi-heart"></i>  {totalFollows.length}</span>
                    </div>
                </div>
                <div className="Chart">
                    <h2>Vacations Statistics</h2>
                    {followData.length < 0 && <Spinner/>}
                    <ResponsiveContainer width="100%" height={400}>
                        <BarChart data={followData}>
                            <XAxis
                                dataKey={(destination) =>
                                    (typeof destination.Destination === 'string' ? destination.Destination.split(',')[0].trim() : destination.Destination)}
                                textAnchor="middle"
                                interval={0}
                                tick={{ fill: '#fff', className: 'custom-xaxis-label' }} />
                            <YAxis
                                tick={{ fill: '#fff', className: 'custom-yaxis-label' }} />
                            <Tooltip />
                            <Bar dataKey="Followers" fill="#0083FF" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}

export default Panel;
