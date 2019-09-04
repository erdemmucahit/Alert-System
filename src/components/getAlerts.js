import React from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";

class GetAlerts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            alerts: []
        };
        this.getMyAlerts();
    }
    getMyAlerts = () => {
        axios.get('http://localhost:8090/alertlist')
            .then(obj => {
                this.setState(
                    {alerts: [...obj.data]});
            })
    }
    componentDidMount = () => {
        this.getMyAlerts();
    }
    componentDidUpdate = () => {
        this.getMyAlerts();
    }
    render() {
        let alertComponentMap = this.state.alerts.map((alertInfo, alertIndex) => {
            return (
                <tr key={alertIndex}>
                    <td>{alertInfo.alertName}</td>
                    <td>{alertInfo.url}</td>
                    <td>{alertInfo.method}</td>
                    <td>{alertInfo.period}</td>
                    <td><Link to={{pathname: "/alertlist/" + alertInfo.id}} className="show-button">
                        <div className="show-button-link-div">...</div>
                    </Link></td>
                </tr>
            );
        });
        let writeDatas = (
            <table className="getAlerts-table">
                <thead>
                <tr>
                    <th className="getAlerts-table-title">Alert Name</th>
                    <th className="getAlerts-table-title">URL</th>
                    <th className="getAlerts-table-title">Method</th>
                    <th className="getAlerts-table-title">Period</th>
                    <th className="getAlerts-table-title">Details</th>
                </tr>
                </thead>
                <tbody>
                {alertComponentMap}
                </tbody>
            </table>
        );
        return (  //Return of render
            <div className="getAlerts-div">
                {writeDatas}
            </div>
        );
    }

}

export default GetAlerts;
