import React from 'react';
import axios from 'axios';
import {CanvasJSChart, CanvasJS} from '../canvasjs.react';


export default class GetGraphic extends React.Component {
    constructor() {
        super();
        this.state = {
            alertName: '',
            url: '',
            method: '',
            period: 0,
            alertStatuses: []
        }
    }
    getMyAlerts = () => {
        //8090 grafik için gerekli.
        axios.get('http://localhost:8090/alertlist/' + this.props.match.params.id)
            .then(obj => {
                this.setState({
                    alertName: obj.data.alertName,
                    period: obj.data.period,
                    url: obj.data.url,
                    alertStatuses: [...obj.data.alertStatuses],
                    method: obj.data.method,
                });
            }).catch(error => {
            console.log(error);
        });
    }
    componentDidMount() {
        setInterval(() => {
            this.getMyAlerts();
        }, 2000);
    }
    render() {
        let dps = this.state.alertStatuses.map((alertStatus) => {
            return {x: new Date(alertStatus.alertDate), y: alertStatus.status}
        });
        let last_25_dps = ((dps.length < 10) ? [...dps] : [...dps.slice(dps.length - 10, dps.length)]);
        let options = {
            title: {
                text: "Graph of " + (this.state.alertName).toUpperCase()
            },
            axisX: {
                crosshair: {
                    enabled: false, //Alttan gostermeli cubuk aktivitesi
                    snapToDataPoint: true,
                    thickness: 2,
                    lineDashType: "longDashDotDot",
                },
                labelFormatter: function (e) {
                    return CanvasJS.formatDate(e.value, "DD MMM YY HH:mm:ss");
                },
                labelAngle: -45,
                title: "Date",
                lineThickness: 2,
                lineColor: "#333",
                lineDashType: "longDash",
            },
            axisY: {
                title: "Alert Status",
                lineThickness: 2,
                lineColor: "#333",
                lineDashType: "longDash"
            },
            data: [{
                xValueFormatString: "HH:mm:ss",
                markerType: "circle",  //"circle", "square", "cross", "none"
                markerSize: 10,
                markerColor: "#333",
                type: "line",
                lineColor: "#333",
                dataPoints: last_25_dps
            }],
            backgroundColor: "whitesmoke"
        }
        return (
            <div>
                <div className="graph-infos mt-20">
                    <h3><i>Alert Name: </i> {this.state.alertName}</h3>
                    <h3><i>Alert URL: </i>{this.state.url}</h3>
                    <h3><i>Alert Period: </i>{this.state.period}</h3>
                    <h3><i>Alert Method: </i>{this.state.method}</h3>
                </div>
                <div className="mt-20">
                    <CanvasJSChart className="myform" options={options}
                                   onRef={ref => this.chart = ref}
                    />
                </div>
                <div className=" mt-10 ">
                    <a href="http://localhost:3000" className="graph-btn mt-20">Back to list</a>
                </div>

                <div className=" mt-10 ">
                    <a href="http://localhost:3000" className="graph-btn">Back to home page</a>
                </div>
                {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
            </div>
        );
    }
}