import "./AddVacation.css";
import { useForm } from "react-hook-form";
import VacationModel from "../../../models/VacationModel";
import vacationService from "../../../services/Vacation";
import notifyService from "../../../services/Notify";
import PanelNavigation from "../navigation/Navigation";

function AddVacation(): JSX.Element {

    const { register, handleSubmit, setValue, formState } = useForm<VacationModel>();

    async function submitVacation(vacation: VacationModel) {
        try {
            vacation.imageFile = (vacation.imageFile as unknown as FileList)[0];
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
            <PanelNavigation />
            <div className="FormContent">
                <div className="FormHeader">
                    <h1 className="FormTitle">Add Vacation</h1>
                </div>
                <form onSubmit={handleSubmit(submitVacation)} className="AddForm">

                    <label>Destination:</label>
                    <input type="text" {...register('destination', {
                        minLength: { value: 4, message: 'Minimum length is 4 characters' },
                        required: {
                            value: true,
                            message: 'Destination can\'t be empty.'
                        }
                    })} /><span>{formState.errors.destination?.message}</span>

                    <label>Description:</label>
                    <input type="text"{...register('description', {
                        minLength: { value: 6, message: 'Minimum length is 6 characters' },
                        required: {
                            value: true,
                            message: 'Description can\'t be empty.'
                        }
                    })} /><span>{formState.errors.description?.message}</span>

                    <label>Start Date:</label>
                    <input type="date"{...register('startDate', {
                        required: {
                            value: true,
                            message: 'Start Date can\'t be empty.'
                        }
                    })} /><span>{formState.errors.startDate?.message}</span>

                    <label>End Date:</label>
                    <input type="date"{...register('endDate', {
                        required: {
                            value: true,
                            message: 'End Date can\'t be empty.'
                        }
                    })} /><span>{formState.errors.endDate?.message}</span>

                    <label>Price:</label>
                    <input type="number" {...register('price', {
                        min: { value: 1, message: 'Minimum price is $1' },
                        max: { value: 10000, message: 'Maximum price is $10,000' },
                        required: {
                            value: true,
                            message: 'Price can\'t be empty.'
                        }
                    })} /><span>{formState.errors.price?.message}</span>


                    <label>Image:</label>
                    <input type="file" accept="image/*" {...register('imageFile', {
                        required: {
                            value: false,
                            message: ''
                        }
                    })} /><span>{formState.errors.imageFile?.message}</span>


                    <button>Add Vacation</button>

                </form>
            </div>
        </div>
    );
}

export default AddVacation;
