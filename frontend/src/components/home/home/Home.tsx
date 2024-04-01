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

    return (
        <div className="Home">
            {vacations.map(v => <Cards key={v.vacationId} vacation={v} />)}
        </div>
    );
}

export default Home;
