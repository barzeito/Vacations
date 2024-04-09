import { useEffect, useState } from "react";
import "./Home.css";
import { authStore } from "../../../redux/AuthState";
import { useNavigate, useParams } from "react-router-dom";
import notifyService from "../../../services/Notify";
import Cards from "../cards/Cards";
import VacationModel from "../../../models/VacationModel";
import vacationService from "../../../services/Vacation";
import { vacationsStore } from "../../../redux/VacationState";
import followService from "../../../services/Follow";
import FollowModel from "../../../models/FollowModel";
import { jwtDecode } from "jwt-decode";
import Pagination from "../Pagination/Pagination";

type User = {
    userId: string,
};

function Home(): JSX.Element {

    const params = useParams();
    const vacationId = String(params.vacationId);

    const navigate = useNavigate();
    const [user, setUser] = useState<User>();
    const [vacations, setVacations] = useState<VacationModel[]>([]);
    const [isChecked, setIsChecked] = useState<boolean>(false);


    useEffect(() => {
        vacationService.getAll()
            .then(vacationsFromServer => setVacations(vacationsFromServer))
            .catch(error => notifyService.error(error));

        const unsubscribe = vacationsStore.subscribe(() => {
            setVacations([...vacationsStore.getState().vacations])
        })

        return unsubscribe;

    }, []);

    useEffect(() => {
        const token = authStore.getState().token;
        // const user = jwtDecode<{ user: User }>(token).user;
        // setUser(user);
        if (!token) {
            notifyService.error('You must be logged in to continue.')
            navigate('/login');
        }
    }, [])


    async function getAllByStartDate() {
        try {
            const date = new Date();
            const todayDate = date.toISOString().slice(0, 10);
            const vacations = await vacationService.getVacationByStartDate(todayDate);
            setVacations(vacations);
            notifyService.success('Filter applied')
            setIsChecked(true);
        } catch (error) {
            notifyService.error(error);
        }
    };

    async function getAllByBetweenDates() {
        try {
            const date = new Date();
            const todayDate = date.toISOString().slice(0, 10);
            const vacations = await vacationService.getVacationByBetweenDates(todayDate);
            setVacations(vacations);
            notifyService.success('Filter applied')
            setIsChecked(true);
        } catch (error) {
            notifyService.error(error);
        }
    };

    //TODO: Fix getAllByFollow function
    //TODO: Add on Vacations filter
    //TODO: Fix Pagination
    async function getAllByFollow() {
        try {
            if (user) {
                console.log(user);
                const vacations = await followService.getUserFollows(user?.userId);
                const followedVacations = vacations.filter((follow: FollowModel) => follow.vacationId === vacationId);
                setVacations(followedVacations);
                notifyService.success('Filter applied')
            }
            // setIsChecked(true);
        } catch (error) {
            notifyService.error(error);
        }
    };

    async function resetFilters() {
        try {
            const vacations = await vacationService.getAll()
            setVacations(vacations);
            notifyService.success('Filters Cleared')
            setIsChecked(false);
        } catch (error) {
            notifyService.error(error);
        }
    }

    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(10);

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = vacations.slice(indexOfFirstRecord, indexOfLastRecord);
    const nPages = Math.ceil(vacations.length / recordsPerPage)

    return (
        <div className="Home">
            <div className="Filters">
                <h4>Filters: </h4>
                <label><input type="checkbox" onChange={getAllByFollow} />Following Vacations</label>
                <label><input type="checkbox" onChange={getAllByStartDate} />Not Started Vacations</label>
                <label><input type="checkbox" onChange={getAllByBetweenDates} />Started Vacations</label>
                <button onClick={resetFilters}>Clear Filters</button>
            </div>
            <div className="HomeCards">
                {vacations.map(v => <Cards key={v.vacationId} vacation={v} />)}
            </div>
            <Pagination
                nPages={nPages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
        </div>
    );
}

export default Home;
