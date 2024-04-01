import { UploadedFile } from "express-fileupload";

export default interface DTO {
    vacationId: string;
    destination: string;
    description: string;
    startDate: string;
    endDate: string;
    price: number;
    imageFile: UploadedFile;
    image: string,
}