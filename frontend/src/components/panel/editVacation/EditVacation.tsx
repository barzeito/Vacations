import { useEffect, useState } from "react";
import "./EditVacation.css";
import VacationModel from "../../../models/VacationModel";
import vacationService from "../../../services/Vacation";
import notifyService from "../../../services/Notify";
import { vacationsStore } from "../../../redux/VacationState";
import EditCards from "../editCards/EditCards";
import Spinner from "../../common/spinner/spinner";

function EditVacation(): JSX.Element {
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

    return (
        <div className="EditVacation">
            <div className="CadsContainer">
                {vacations.length === 0 && <Spinner />}
                {vacations.map(v => <EditCards key={v.vacationId} vacation={v} />)}
            </div>
        </div>
    );
}

export default EditVacation;
