import VacationModel from "../../../models/VacationModel";
import formatDate from "../../../utils/formatDate";
import formatPrice from "../../../utils/formatPrice";
import "./EditCards.css";
import vacationService from "../../../services/Vacation";
import notifyService from "../../../services/Notify";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import noImage from '../../../assets/images/image-not-found.jpeg';

interface vacationsCardsProps {
    vacation: VacationModel
}

function EditCards(props: vacationsCardsProps): JSX.Element {

    const vacationId = props.vacation.vacationId;
    const [showDelete, setShowDelete] = useState(false);

    async function deleteVacation(): Promise<void> {
        try {
            if (vacationId) {
                await vacationService.deleteVacation(vacationId);
                notifyService.success('Vacation deleted successfully');
            }
        } catch (error) {
            notifyService.error(error);
        }
        setShowDelete(false);
    }

    return (
        <div className="EditCards">
            <div className="EditCard">
                <div className="EditCardTop">
                    <div className="EditOptions">
                        <NavLink to={`/panel/edit/${vacationId}`} className="Edit"><i className="bi bi-pencil-square"></i>Edit</NavLink>
                        <button className="Delete" onClick={() => setShowDelete(true)}><i className="bi bi-trash3"></i>
                            Delete</button>
                    </div>
                    <img
                        src={props.vacation.imageUrl ? props.vacation.imageUrl : noImage}
                        className="cardImage"
                        alt="Vacation Image"
                        onError={(e) => {
                            const image = e.target as HTMLImageElement;
                            image.src = noImage;
                        }}
                    />
                    <div className="EditCardName">{props.vacation.destination}</div>
                    <div className="EditCardDates"><i className="bi bi-calendar2-minus"></i>{props.vacation.startDate && formatDate(props.vacation.startDate)} - {props.vacation.endDate && formatDate(props.vacation.endDate)}</div>
                </div>
                <div className="EditCardDescription">{props.vacation.description}</div>
                <div className="EditCardPrice">{formatPrice(props.vacation.price !== undefined ? props.vacation.price.toString() : undefined)}</div>
            </div>
            {showDelete && (
                <div className="DeleteContainer">
                    <div className="Delete-PopUp">
                        <span>Delete Vacation</span>
                        <p>Are you sure you want to delete this vacation?</p>
                        <div className="delete-btn">
                            <button onClick={deleteVacation}>Delete</button>
                            <button onClick={() => setShowDelete(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default EditCards;
