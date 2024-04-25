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
                        <span>{vacationData.length}</span>
                    </div>
                    <div className="statCard">
                        <p>Total Users</p>
                        <span>{totalUsers.length}</span>
                    </div>
                    <div className="statCard">
                        <p>Total Follows</p>
                        <span>{totalFollows.length}</span>
                    </div>
                </div>
                <div className="Chart">
                    <h2>Vacations Statistics</h2>
                    <ResponsiveContainer>
                        <BarChart data={followData}>
                            <XAxis
                                dataKey={(destination) => (typeof destination.Destination === 'string' ? destination.Destination.split(',')[0].trim() : destination.Destination)}
                                textAnchor="middle"
                                interval={0} />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="Followers" fill="#2D8FCD" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}

export default Panel;
