import { useEffect, useState } from "react";
import "./Home.css";
import { authStore } from "../../../redux/AuthState";
import notifyService from "../../../services/Notify";
import Cards from "../cards/Cards";
import VacationModel from "../../../models/VacationModel";
import vacationService from "../../../services/Vacation";
import { vacationsStore } from "../../../redux/VacationState";
import { jwtDecode } from "jwt-decode";
import Pagination from "../Pagination/Pagination";
import Spinner from "../../common/spinner/spinner";

type User = {
    userId: string,
};

function Home(): JSX.Element {

    const [user, setUser] = useState<User>();
    const [vacations, setVacations] = useState<VacationModel[]>([]);
    const [followingFilter, setFollowingFilter] = useState<boolean>(false);
    const [notStartedFilter, setNotStartedFilter] = useState<boolean>(false);
    const [startedFilter, setStartedFilter] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const perPage = 10;

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
            let filteredVacations: VacationModel[] = [];

            if (notStartedFilter) {
                resetFilters();
                setNotStartedFilter(false);
            } else {
                filteredVacations = await vacationService.getVacationByStartDate(todayDate);
                setNotStartedFilter(true);
                setStartedFilter(false);
                setFollowingFilter(false);
            }

            setVacations(filteredVacations);
            notifyService.success('Filter applied');
        } catch (error) {
            notifyService.error(error);
        }
    };

    async function getAllByBetweenDatesFilter() {
        try {
            const date = new Date();
            const todayDate = date.toISOString().slice(0, 10);
            let filteredVacations: VacationModel[] = [];

            if (startedFilter) {
                resetFilters();
                setStartedFilter(false);
            } else {
                filteredVacations = await vacationService.getVacationByBetweenDates(todayDate);
                setStartedFilter(true);
                setNotStartedFilter(false);
                setFollowingFilter(false);
            }

            setVacations(filteredVacations);
            notifyService.success('Filter applied');
        } catch (error) {
            notifyService.error(error);
        }
    };

    async function getAllByFollowFilter() {
        try {
            if (user) {
                let filteredVacations: VacationModel[] = [];

                if (followingFilter) {
                    resetFilters();
                    setFollowingFilter(false);
                } else {
                    filteredVacations = await vacationService.getVacationByFollow(user.userId);
                    setFollowingFilter(true);
                    setStartedFilter(false);
                    setNotStartedFilter(false);
                }

                setVacations(filteredVacations);
                console.log(filteredVacations);
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
            setFollowingFilter(false);
            setNotStartedFilter(false);
            setStartedFilter(false);
        } catch (error) {
            notifyService.error(error);
        }
    }

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const start = (currentPage - 1) * perPage;
    const end = start + perPage;
    const totalPages = Math.ceil(vacations.length / perPage);
    const paginatedVacations = vacations.slice(start, end);

    return (
        <div className="Home">
            <div className="Filters">
                <h4>Filters: </h4>
                <label>
                    <input type="checkbox" checked={followingFilter} onChange={getAllByFollowFilter} />
                    Following Vacations
                </label>
                <label>
                    <input type="checkbox" checked={notStartedFilter} onChange={getAllByStartDateFilter} />
                    Not Started Vacations
                </label>
                <label>
                    <input type="checkbox" checked={startedFilter} onChange={getAllByBetweenDatesFilter} />
                    Started Vacations
                </label>
                <button onClick={resetFilters}>Clear Filters</button>
            </div>
            <div className="HomeCards">
                {vacations.length === 0 && <Spinner />}
                {paginatedVacations.map(v => <Cards key={v.vacationId} vacation={v} />)}
            </div>
            <Pagination
                hasNextPage={end < vacations.length}
                hasPrevPage={currentPage > 1}
                currentPage={currentPage}
                totalPages={totalPages}
                setCurrentPage={handlePageChange}
            />
        </div>
    );
}

export default Home;
