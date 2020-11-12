import React, { Component } from 'react';
import { Header, Icon, List } from 'semantic-ui-react';
import './App.css';
import { Cars } from './demo';
import { CarItems } from './CarItems';
import axios from 'axios';

class App extends Component {
  state = {
    values: [],
  };

  componentDidMount() {
    axios.get('http://localhost:5000/api/Values').then((response) => {
      this.setState({
        values: response.data,
      });
    });
  }

  render() {
    return (
      <div>
        {/* <ul>
          {Cars.map((car) => (
            // <li>{car.color}</li>
            <CarItems car={car} />
          ))}
        </ul> */}

        <Header as="h2" icon textAlign="center">
          <Icon name="users" circular />
          <Header.Content>Reactivities</Header.Content>

          <List>
            {this.state.values.map((value: any) => (
              <List.Item key={value.id}>{value.name}</List.Item>
            ))}
          </List>
        </Header>
      </div>
    );
  }
}

export default App;
