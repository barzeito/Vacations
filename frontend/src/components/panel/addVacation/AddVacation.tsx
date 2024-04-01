import { NavLink } from "react-router-dom";
import "./AddVacation.css";
import { useForm } from "react-hook-form";
import VacationModel from "../../../models/VacationModel";
import vacationService from "../../../services/Vacation";
import notifyService from "../../../services/Notify";
import PanelNavigation from "../navigation/Navigation";

function AddVacation(): JSX.Element {

    const { register, handleSubmit, formState, setValue } = useForm<VacationModel>();

    async function submitVacation(vacation: VacationModel) {
        try {
            vacation.image = (vacation.image as unknown as FileList)[0];
            await vacationService.addVacation(vacation);
            notifyService.success(`New vacation added successfully.`);
            setValue('destination', '')
            setValue('description', '')
            setValue('startDate', undefined)
            setValue('endDate', undefined)
            setValue('price', undefined)
        } catch (err) {
            notifyService.error(err);
        }
    }


    return (
        <div className="AddVacation">
            {/* <div className="navBar">
                <h2>Hey User</h2>
                <p className="roleName">Admin</p>
                <ul>
                    <li><NavLink to="/">Home</NavLink></li>
                    <li><NavLink to="">Dashboard</NavLink></li>
                    <li><NavLink to="/panel/add">Add Vacation</NavLink></li>
                    <li><NavLink to="">Edit Vacation</NavLink></li>
                </ul>
            </div> */}
            <PanelNavigation />
            <div className="FormContent">
                <div className="FormHeader">
                    <h1 className="FormTitle">Add Vacation</h1>
                </div>
                <form onSubmit={handleSubmit(submitVacation)} className="AddForm">

                    <label>Destination:</label>
                    <input type="text" {...register('destination')} />

                    <label>Description:</label>
                    <input type="text"{...register('description')} />

                    <label>Start Date:</label>
                    <input type="date"{...register('startDate')} />

                    <label>End Date:</label>
                    <input type="date"{...register('endDate')} />

                    <label>Price:</label>
                    <input type="number" {...register('price')} />

                    <label>Image:</label>
                    <input type="file" accept="image/*" {...register('image')} />

                    <button>Add Vacation</button>

                </form>
            </div>
        </div>
    );
}

export default AddVacation;
