import VacationModel from "../../../models/VacationModel";
import formatDate from "../../../utils/formatDate";
import formatPrice from "../../../utils/formatPrice";
import "./EditCards.css";
import vacationService from "../../../services/Vacation";
import notifyService from "../../../services/Notify";
import { NavLink } from "react-router-dom";

interface vacationsCardsProps {
    vacation: VacationModel
}

function EditCards(props: vacationsCardsProps): JSX.Element {

    const vacationId = props.vacation.vacationId;

    async function deleteVacation(): Promise<void> {
        if (window.confirm('Are you sure you want to delete this Vacation?')) {
            try {
                if (vacationId) {
                    await vacationService.deleteVacation(vacationId);
                    notifyService.success('Vacation deleted successfully');
                }
            } catch (error) {
                notifyService.error(error);
            }
        }
    }
    return (
        <div className="EditCards">
            <div className="EditCard">
                <div className="EditCardTop">
                    <div className="EditOptions">
                        <NavLink to={`/panel/edit/${vacationId}`} className="Edit">Edit</NavLink>
                        <button className="Delete" onClick={deleteVacation}>Delete</button>
                    </div>
                    <img src={props.vacation.imageUrl} className="cardImage" alt=""></img>
                    <div className="EditCardName">{props.vacation.destination}</div>
                    <div className="EditCardDates">{props.vacation.startDate && formatDate(props.vacation.startDate)} - {props.vacation.endDate && formatDate(props.vacation.endDate)}</div>
                </div>
                <div className="EditCardDescription">{props.vacation.description}</div>
                <div className="EditCardPrice">{formatPrice(props.vacation.price !== undefined ? props.vacation.price.toString() : undefined)}</div>
            </div>
        </div>
    );
}

export default EditCards;
