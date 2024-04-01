import { useState } from "react";
import VacationModel from "../../../models/VacationModel";
import formatDate from "../../../utils/formatDate";
import formatPrice from "../../../utils/formatPrice";
import "./Cards.css";

interface vacationsCardsProps {
    vacation: VacationModel
}

function Cards(props: vacationsCardsProps): JSX.Element {

    const [liked, setLiked] = useState(false);

    const handleLike = () => {
        setLiked(!liked);
    };

    return (
        <div className="Cards">
            <div className="Card">
                <div className="cardTop">
                    <label className={`cardFollow ${liked ? 'liked' : ''}`}>
                        <input type="checkbox" checked={liked} onChange={handleLike} />
                        {liked ? 'Liked' : 'Like'}
                        <i className="fas fa-heart"></i>
                    </label>
                    <img src={props.vacation.imageUrl} className="cardImage"></img>
                    <div className="cardName">{props.vacation.destination}</div>
                    <div className="cardDates">{props.vacation.startDate && formatDate(props.vacation.startDate)} - {props.vacation.endDate && formatDate(props.vacation.endDate)}</div>
                </div>
                <div className="cardDescription">{props.vacation.description}</div>
                <div className="cardPrice">{formatPrice(props.vacation.price !== undefined ? props.vacation.price.toString() : undefined)}</div>
            </div>
        </div>
    );
}

export default Cards;
