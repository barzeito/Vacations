import { Control, useForm, useWatch } from "react-hook-form";
import "./EditVacationPanel.css";
import VacationModel from "../../../models/VacationModel";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import vacationService from "../../../services/Vacation";
import notifyService from "../../../services/Notify";

function EditVacationPanel(): JSX.Element {

    const params = useParams();
    const vacationId = String(params.vacationId);

    const [src, setSrc] = useState<string>('');
    const { handleSubmit, setValue, register, control } = useForm<VacationModel>();
    const navigate = useNavigate();

    function ImageWatched({ control }: { control: Control<VacationModel> }) {
        const imageSrc = useWatch({
            control,
            name: 'image',
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
            vacation.image = (vacation.image as unknown as FileList)[0];
            vacation.vacationId = vacationId;
            const updatedVacation = await vacationService.editVacation(vacation);
            console.log(updatedVacation)
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
                <input type="text" {...register('destination')} />

                <label>Description:</label>
                <textarea {...register('description')} />

                <label>Start Date:</label>
                <input type="date"{...register('startDate')} />

                <label>End Date:</label>
                <input type="date"{...register('endDate')} />

                <label>Price:</label>
                <input type="number" {...register('price')} />

                <label>Image:</label>
                <input type="file" accept="image/*" {...register('image')} />

                <ImageWatched control={control} />
                <button>Update Vacation</button>

            </form>
        </div>
    );
}

export default EditVacationPanel;
