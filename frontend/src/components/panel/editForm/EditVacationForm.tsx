import { Control, useForm, useWatch } from "react-hook-form";
import "./EditVacationForm.css";
import VacationModel from "../../../models/VacationModel";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import vacationService from "../../../services/Vacation";
import notifyService from "../../../services/Notify";

function EditVacationPanel(): JSX.Element {

    const params = useParams();
    const vacationId = String(params.vacationId);

    const [src, setSrc] = useState<string>('');
    const { handleSubmit, setValue, register, control, formState, getValues } = useForm<VacationModel>();
    const navigate = useNavigate();

    function ImageWatched({ control }: { control: Control<VacationModel> }) {
        const imageSrc = useWatch({
            control,
            name: 'imageFile',
        })
        if (imageSrc) {
            const file = ((imageSrc as unknown as FileList))[0]
            if (file) {
                const newSrc = window.URL.createObjectURL(file);
                return <img src={newSrc} alt="" />
            }
        }
        return <img src={src} alt="" />
    }

    function formatOriginalDate(dateTimeString: string | undefined) {
        if (!dateTimeString) {
            return;
        }
        const dateTime = new Date(dateTimeString);
        const year = dateTime.getFullYear();
        const month = String(dateTime.getMonth() + 1).padStart(2, '0');
        const day = String(dateTime.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    useEffect(() => {
        vacationService.getOne(vacationId)
            .then(vacationFromServer => {
                setValue('destination', vacationFromServer?.destination);
                setValue('description', vacationFromServer?.description);
                setValue('startDate', formatOriginalDate(vacationFromServer?.startDate));
                setValue('endDate', formatOriginalDate(vacationFromServer?.endDate));
                setValue('price', vacationFromServer?.price);
                setSrc(vacationFromServer?.imageUrl || '');
            })
            .catch(error => notifyService.error(error));
    })

    async function submitUpdate(vacation: VacationModel) {
        try {
            vacation.imageFile = (vacation.imageFile as unknown as FileList)[0];
            vacation.vacationId = vacationId;
            const updatedVacation = await vacationService.editVacation(vacation);
            notifyService.success(`updated ${updatedVacation.vacationId}`);
            console.log(`updated ${updatedVacation.vacationId}`)
            navigate('/panel/edit');
        } catch (error) {
            notifyService.error(error);
        }
    }

    return (
        <div className="EditVacationPanel">
            <h2>Edit Vacation</h2>
            <form onSubmit={handleSubmit(submitUpdate)}>

                <label>Destination:</label>
                <input type="text" {...register('destination', {
                    minLength: { value: 4, message: 'Minimum length is 4 characters' },
                    required: {
                        value: true,
                        message: 'Destination can\'t be empty.'
                    }
                })} /><span>{formState.errors.destination?.message}</span>

                <label>Description:</label>
                <textarea {...register('description', {
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
                    },
                    validate: value => {
                        const startDateValue = getValues('startDate');
                        if (!startDateValue) return 'Start date is required.';
                        if (!value) return 'End date is required.';
                        const startDate = new Date(startDateValue);
                        const endDate = new Date(value);
                        return endDate > startDate || 'End date must be after the start date.';
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

                <ImageWatched control={control} />
                <button>Update Vacation</button>
                <NavLink to="/panel/edit" className="back-btn">Back</NavLink>

            </form>
        </div>
    );
}

export default EditVacationPanel;
