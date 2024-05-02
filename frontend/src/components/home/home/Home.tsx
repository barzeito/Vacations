import { useEffect, useState } from "react";
import "./Home.css";
import { authStore } from "../../../redux/AuthState";
import notifyService from "../../../services/Notify";
import Cards from "../cards/Cards";
import VacationModel from "../../../models/VacationModel";
import vacationService from "../../../services/Vacation";
import { vacationsStore } from "../../../redux/VacationState";
import followService from "../../../services/Follow";
import { jwtDecode } from "jwt-decode";

type User = {
    userId: string,
};

function Home(): JSX.Element {


    //TODO: Fix getAllByFollow function
    //TODO: Add on Vacations filter
    //TODO: Fix Pagination

    const [user, setUser] = useState<User>();
    const [vacations, setVacations] = useState<VacationModel[]>([]);
    const [isChecked, setIsChecked] = useState<boolean>(false);

    useEffect(() => {
        const token = authStore.getState().token;
        if (token) {
            const user = jwtDecode<{ user: User }>(token).user;
            setUser(user);
        }
    }, []);

    useEffect(() => {
        vacationService.getAll()
            .then(vacationsFromServer => setVacations(vacationsFromServer))
            .catch(error => notifyService.error(error));

        const unsubscribe = vacationsStore.subscribe(() => {
            setVacations([...vacationsStore.getState().vacations])
        })

        return unsubscribe;

    }, []);

    async function getAllByStartDateFilter() {
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

    async function getAllByBetweenDatesFilter() {
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

    async function getAllByFollowFilter() {
        try {
            if (user) {
                const vacations = await followService.getUserFollows(user.userId);
                console.log(vacations);
                setVacations(vacations);
                notifyService.success('Filter applied');
            }
        } catch (error) {
            notifyService.error(error);
        }
    }


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

    return (
        <div className="Home">
            <div className="Filters">
                <h4>Filters: </h4>
                <label><input type="checkbox" onChange={getAllByFollowFilter} />Following Vacations</label>
                <label><input type="checkbox" onChange={getAllByStartDateFilter} />Not Started Vacations</label>
                <label><input type="checkbox" onChange={getAllByBetweenDatesFilter} />Started Vacations</label>
                <button onClick={resetFilters}>Clear Filters</button>
            </div>
            <div className="HomeCards">
                {vacations.map(v => <Cards key={v.vacationId} vacation={v} />)}
            </div>
        </div>
    );
}

export default Home;
