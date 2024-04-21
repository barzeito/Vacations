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
import { NavLink, useParams } from "react-router-dom";
import authService from "../../../services/Auth";
import { followStore } from "../../../redux/FollowState";

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
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const [counter, setCounter] = useState<number>(0);

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

    useEffect(() => {
        async function isUserLiked() {
            try {
                if (user) {
                    const likedVacations = await followService.getUserFollows(user.userId);
                    const isLiked = likedVacations.some((follow: FollowModel) => follow.vacationId === props.vacation.vacationId);
                    setLiked(isLiked);
                }
            } catch (error) {
                notifyService.error(error);
            }
        }
        isUserLiked();
    }, [user, props.vacation.vacationId]);

    useEffect(() => {
        async function ifAdmin() {
            if (user) {
                try {
                    const userAdmin = await authService.isAdmin(user.userId);
                    setIsAdmin(userAdmin);
                } catch (error: any) {
                    notifyService.error("Failed to check admin status");
                }
            }
        }
        ifAdmin();
    }, [user]);

    useEffect(() => {
        const token = authStore.getState().token;
        if (token) {
            const user = jwtDecode<{ user: User }>(token).user;
            setUser(user);
        }

        const unsubscribe = authStore.subscribe(() => {
            const token = authStore.getState().token;
            if (token) {
                const user = jwtDecode<{ user: User }>(token).user;
                setUser(user);
            } else {
                setUser(undefined)
            }
        });

        return unsubscribe;
    }, [])

    useEffect(() => {
        async function followCounter() {
            const vacationId = props.vacation.vacationId;
            if (vacationId) {
                const getCounter = await followService.getVacationFollowsNumber(vacationId);
                setCounter(getCounter);
            }
            const unsubscribe = followStore.subscribe(async () => {
                if (vacationId) {
                    try {
                        const getCounter = await followService.getVacationFollowsNumber(vacationId);
                        setCounter(getCounter);
                    } catch (error) {
                        notifyService.error("Failed to check follow status");
                    }
                }
            })
            return unsubscribe;
        }
        followCounter();
    }, [])

    return (
        <div className="Cards">
            <div className="Card">
                <div className="cardTop">
                    {!isAdmin && <label className={`cardFollow ${liked ? 'liked' : ''}`}>
                        <input type="checkbox" checked={liked} onChange={handleLike} />
                        {liked ? 'Liked' : 'Like'}({counter})
                    </label>}
                    {isAdmin && <NavLink to={`/panel/edit`} className="EditNav">Edit</NavLink>}
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
