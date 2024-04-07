import { useEffect, useState } from "react";
import VacationModel from "../../../models/VacationModel";
import formatDate from "../../../utils/formatDate";
import formatPrice from "../../../utils/formatPrice";
import "./Cards.css";
import followService from "../../../services/Follow";
import FollowModel from "../../../models/FollowModel";
import notifyService from "../../../services/Notify";
import { authStore } from "../../../redux/AuthState";
import { jwtDecode } from "jwt-decode";
import { useParams } from "react-router-dom";

//TODO: Fix followsCounter

interface vacationsCardsProps {
    vacation: VacationModel
}

type User = {
    userId: string,
};

function Cards(props: vacationsCardsProps): JSX.Element {

    const [user, setUser] = useState<User>();
    const [liked, setLiked] = useState(false);
    const [counter, setCounter] = useState(0);

    useEffect(() => {
        const token = authStore.getState().token;
        if (token) {
            const user = jwtDecode<{ user: User }>(token).user;
            setUser(user);
        }
    }, []);


    // Handle the Follow button
    async function handleLike(event: React.ChangeEvent<HTMLInputElement>) {
        const follower: FollowModel = {
            userId: user?.userId,
            vacationId: props.vacation.vacationId
        };

        try {
            if (liked) {
                const vacationId = props.vacation.vacationId;
                if (vacationId) {
                    await followService.unFollow(vacationId);
                    notifyService.success(`UnLiked.`);
                }
            } else {
                await followService.follow(follower);
                notifyService.success(`Liked.`);
            }
            setLiked(!liked);
        } catch (err) {
            notifyService.error(err);
        }
    }

    // Check if user is following a vacation
    useEffect(() => {
        async function isUserLiked() {
            try {
                if (user) {
                    const likedVacations = await followService.getFollowed(user.userId);
                    const isLiked = likedVacations.some((follow: FollowModel) => follow.vacationId === props.vacation.vacationId);
                    setLiked(isLiked);
                }
            } catch (error) {
                notifyService.error(error);
            }
        }
        isUserLiked();
    }, [user, props.vacation.vacationId]);


    // useEffect(() => {
    //     async function usersFollowedCounter() {
    //         try {
    //             if (props.vacation.vacationId) {
    //                 const followsCounter = await followService.getFollowedNumber(props.vacation.vacationId);
    //                 setCounter(followsCounter);
    //             }
    //         } catch (error) {
    //             notifyService.error(error);
    //         }
    //     }
    //     usersFollowedCounter();
    // }, [props.vacation.vacationId]);

    return (
        <div className="Cards">
            <div className="Card">
                <div className="cardTop">
                    <label className={`cardFollow ${liked ? 'liked' : ''}`}>
                        <input type="checkbox" checked={liked} onChange={handleLike} />
                        {liked ? 'Liked' : 'Like'}({counter})
                    </label>
                    <img src={props.vacation.imageUrl} className="cardImage" alt=""></img>
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
