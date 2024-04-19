import "./Panel.css";
import PanelNavigation from "../navigation/Navigation";

function Panel(): JSX.Element {

    return (
        <div className="Panel">
            <PanelNavigation />
            <div className="AnaContent">
                <div className="AnaHeader">
                    <h1 className="AnaTitle">Analytics</h1>
                </div>
                <div className="AnaStats">
                    <div className="statCard">
                        <p>Total Vacations</p>
                        <span>100</span>
                    </div>
                    <div className="statCard">
                        <p>Total Users</p>
                        <span>100</span>
                    </div>
                    <div className="statCard">
                        <p>Total Follows</p>
                        <span>100</span>
                    </div>
                </div>
                <div>Chart
                    {/* {followsCounter.map((follow, index) => (
                        <div key={index}>
                            <p>{follow.destination}</p>
                            <span>{follow.followers}</span>
                        </div>
                    ))} */}
                </div>

            </div>
        </div>

    );
}

export default Panel;
