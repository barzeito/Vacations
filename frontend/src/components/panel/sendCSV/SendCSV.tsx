import followService from "../../../services/Follow";
import notifyService from "../../../services/Notify";
import "./SendCSV.css";

function SendCSV(): JSX.Element {

    async function downloadCSV() {
        try {
            followService.sendCSV();
        } catch (error) {
            notifyService.error(`Error downloading CSV: ${error}`);
        }
    }

    return (
        <div className="SendCSV">
            <div className="CSV-Content">
                <h1>CSV Download</h1>
                <p>Click the download button to get CSV file of the Vacation statistics.</p>
                <button onClick={downloadCSV}>Download CSV</button>
            </div>
        </div>
    );
}

export default SendCSV;
