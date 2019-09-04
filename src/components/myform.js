import React from 'react';
import axios from "axios";

class Myform extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            alertName: '',
            url: '',
            selectedOne: 'POST',
            period: 0
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    handleSubmit = (event) => {
        event.preventDefault();
        //Sayfayı yenileme
        this.axiosPost();
    }
    axiosPost = () => {
        // AXIOS POST
        axios.post('http://localhost:8090/alerts', {
            alertName: this.state.alertName,
            url: this.state.url,
            method: this.state.selectedOne,
            period: this.state.period,
            checkPeriod: 0
        }).then(obj => {
            console.log(obj.data);
        });
    }
    render() {
        return (
            <form className="myform">
                <div>
                    <label className="form-line">
                        Alert Name:
                        <input className="form-input" id="alertName" name="alertName"
                               value={this.state.alertName}
                               onChange={this.handleChange}/>
                    </label>
                </div>
                <div>
                    <label className="form-line">
                        URL:
                        <input className="form-input" id="url" name="url" type="url"
                               value={this.state.url}
                               onChange={this.handleChange}/>
                    </label>
                </div>
                <div>
                    <label className="form-line">
                        Method:
                        <select className="form-select" name="selectedOne"
                                value={this.state.selectedOne}
                                onChange={this.handleChange}>
                            <option value="POST">POST</option>
                            <option value="GET">GET</option>
                        </select>
                    </label>
                </div>
                <div>
                    <label className="form-line">
                        Period:
                        <input className="form-input" id="period" name="period"
                               type="number" placeholder="Second"
                               onChange={this.handleChange}/>
                    </label>
                </div>
                <div>
                    <button className="form-btn" onClick={this.handleSubmit}>Submit</button>
                </div>
                <div>
                    <button className="form-btn" onClick={() => {
                    }}>Alert list
                    </button>
                </div>
            </form>
        );
    }
}
export default Myform;