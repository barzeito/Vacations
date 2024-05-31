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
        });

        return unsubscribe;
    }, []);
    
    // Filters Handler
    useEffect(() => {
        applyFilter();
    }, [followingFilter, notStartedFilter, startedFilter, user]);

    async function applyFilter() {
        try {
            let filteredVacations: VacationModel[] = [];
            const todayDate = new Date().toISOString().slice(0, 10);

            if (user) {
                if (followingFilter) {
                    const followingVacations = await vacationService.getVacationByFollow(user.userId);
                    filteredVacations = [...filteredVacations, ...followingVacations];
                }
                if (notStartedFilter) {
                    const notStartedVacations = await vacationService.getVacationByStartDate(todayDate);
                    filteredVacations = [...filteredVacations, ...notStartedVacations];
                }
                if (startedFilter) {
                    const startedVacations = await vacationService.getVacationByBetweenDates(todayDate);
                    filteredVacations = [...filteredVacations, ...startedVacations];
                }
                // If no filters are selected show all vacations
                if (!followingFilter && !notStartedFilter && !startedFilter) {
                    filteredVacations = await vacationService.getAll();
                } else {
                    // Remove vacation duplicates if more then 2 filters applied
                    const vacationSet = new Set(filteredVacations.map(v => v.vacationId));
                    filteredVacations = Array.from(vacationSet).map(id => filteredVacations.find(v => v.vacationId === id)!);
                }
            }
            setVacations(filteredVacations);
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

    const handleFilterToggle = (filterType: string) => {
        switch (filterType) {
            case "following":
                setFollowingFilter(!followingFilter);
                break;
            case "notStarted":
                setNotStartedFilter(!notStartedFilter);
                break;
            case "started":
                setStartedFilter(!startedFilter);
                break;
            default:
                break;
        }
    };

    // Pagination Handler
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
                    <input type="checkbox" checked={followingFilter} onChange={() => handleFilterToggle("following")} />
                    Following Vacations
                </label>
                <label>
                    <input type="checkbox" checked={notStartedFilter} onChange={() => handleFilterToggle("notStarted")} />
                    Not Started Vacations
                </label>
                <label>
                    <input type="checkbox" checked={startedFilter} onChange={() => handleFilterToggle("started")} />
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