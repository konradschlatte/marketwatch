import * as React from 'react';
import Chart from './Chart';
const axios = require('axios');

export default class StockForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stock: '',
      period: '1d',
      list: [],
      id: 0,
      counter: 0
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.getDataFromDb();
  };

  getDataFromDb = () => {
    fetch('http://localhost:3001/getData')
      .then((data) => data.json())
      .then((res) => this.setState({ list: res.data }));
  };

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let currentIds = this.state.list.map((data) => data.id);
    let newId = 0;
    while (currentIds.includes(newId)) {
      ++newId;
    }
    this.setState((state) => {
      return { [name]: value, id: newId };
    });
  };

  onAddItem = () => {
    let id = this.state.id;
    let stock = this.state.stock;
    let period = this.state.period;
    this.putData(id, stock, period)
    const values = this.state.list.concat({ stock: stock, period: period, id: id });
    this.setState((state) => {
    return { list: values };
    });
  };

  putData = (id, stock, period) => {
    axios.post('http://localhost:3001/putData', {
      id: id,
      stock: stock,
      period: period
    });
  };

  handleSubmit(event) {
    event.preventDefault();
    this.onAddItem();
  }

  deleteChart = (key) => {
    this.deleteFromDB(key);
    let charts = this.state.list.filter(item => item.id !== key);
    this.setState({ list: charts });
  };

  deleteFromDB = idTodelete => {
    let objIdToDelete = null;
    this.state.list.forEach(dat => {
      if (dat.id === idTodelete) {
        objIdToDelete = dat._id;
      }
    });
    axios.delete("http://localhost:3001/deleteData", {
      data: {
        id: objIdToDelete
      }
    });
  };

  render() {
    return (
      <section>
      <form onSubmit={this.handleSubmit}>
        <label>
        Stock:
        </label>
          <input
            id="first"
            name="stock"
            type="text"
            placeholder = "Symbol"
            value={this.state.value}
            onChange={this.handleInputChange} />

        <label>
          Period:
        </label>
            <select name = "period" type = "select" value={this.state.value} onChange={this.handleInputChange}>
              <option value="1d">1 day</option>
              <option value="1m">1 month</option>
              <option value="3m">3 months</option>
              <option value="6m">6 months</option>
              </select>

        <input id="submit" type="submit" value="submit"/>
      </form>
      <div>
      { (this.state.list || []).map(item => (
          <Chart key = { item.id } delEvent = {() => this.deleteChart(item.id) }
            uri = { 'https://api.iextrading.com/1.0/stock/' + item.stock.toUpperCase() + '/chart/' + item.period }
            legend = { item.stock + ' ' + item.period }/>
        )) }
       </div>
      </section>
    );
  }
}
