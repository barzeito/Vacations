import { useEffect, useState } from "react";
import "./Home.css";
import { authStore } from "../../../redux/AuthState";
import { useNavigate } from "react-router-dom";
import notifyService from "../../../services/Notify";
import Cards from "../cards/Cards";
import VacationModel from "../../../models/VacationModel";
import vacationService from "../../../services/Vacation";
import { vacationsStore } from "../../../redux/VacationState";

function Home(): JSX.Element {

    const navigate = useNavigate();
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
        if (!token) {
            notifyService.error('You must be logged in to continue.')
            navigate('/login');
        }
    })

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
                <label><input type="checkbox" />Following</label>
                <label><input type="checkbox" checked={isChecked} onChange={getAllByStartDate} />Started Vacations</label>
                <label><input type="checkbox" />Ended Vacations</label>
                <button onClick={resetFilters}>Clear Filters</button>
            </div>
            <div className="HomeCards">
                {vacations.map(v => <Cards key={v.vacationId} vacation={v} />)}
            </div>
        </div>
    );
}

export default Home;
