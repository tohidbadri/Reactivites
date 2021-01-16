import React, { useState, useEffect, Fragment } from 'react';
import { Container} from 'semantic-ui-react';

// import { Cars } from './demo';
// import { CarItems } from './CarItems';
import axios from 'axios';
import { IActivity } from '../models/activity';
import NavBar from '../../fuatures/nav/NavBar';
import ActivityDashboard from '../../fuatures/nav/activities/dashboard/ActivityDashboard';

// export interface IState {
//   activities: IActivity[];
// }

// class App extends Component<{}, IState> {
//  readonly state: IState = {
//     activities: [],
//   };

// componentDidMount() {
//     axios
//       .get<IActivity[]>('http://localhost:5000/api/activities')
//       .then((response) => {
//         this.setState({
//           activities: response.data,
//         });
//       });
//   }

const App = () => {
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(
    null
  );
  const [editMode, setEditMode] = useState(false);

  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities.filter((x) => x.id == id)[0]);
    setEditMode(false);
  };

  const handleOpenCreateForm = () => {
    // setEditMode(false);
    setSelectedActivity(null);
    setEditMode(true);
  };

  const handleCreateActivity = (activity: IActivity) => {
    setActivities([...activities, activity]);
    setSelectedActivity(activity);
    setEditMode(false);
  };

  const handleEditActivity = (activity: IActivity) => {
    setActivities([
      ...activities.filter((x) => x.id !== activity.id),
      activity,
    ]);
    setSelectedActivity(activity);
    setEditMode(false);
  };

  const handleDeleteActivity = (id: string) => {
    setActivities([...activities.filter((x) => x.id !== id)]);
  };

  useEffect(() => {
    axios
      .get<IActivity[]>('http://localhost:5000/api/activities')
      .then((response) => {
        let activities: IActivity[] = [];
        response.data.forEach((activity) => {
          activity.date = activity.date.split('.')[0];
          activities.push(activity);
        });

        setActivities(activities);
      });
  }, []);

  return (
    <Fragment>
      {/* <Header as="h2" icon textAlign="center"> */}
      {/* <Icon name="users" circular />
            <Header.Content>Reactivities</Header.Content> */}
      <NavBar openCreateForm={handleOpenCreateForm} />
      <Container style={{ marginTop: '7em' }}>
        <ActivityDashboard
          activities={activities}
          selectActivity={handleSelectActivity}
          selectedActivity={selectedActivity!}
          editMode={editMode}
          setEditMode={setEditMode}
          setSelectedActivity={setSelectedActivity}
          createActivity={handleCreateActivity}
          editActivity={handleEditActivity}
          deleteActivity={handleDeleteActivity}
        />
      </Container>
      {/* </Header> */}
    </Fragment>
  );
};

// render() {
//   return (
//     <div>
//       {/* <ul>
//         {Cars.map((car) => (
//           // <li>{car.color}</li>
//           <CarItems car={car} />
//         ))}
//       </ul> */}

//       <Header as="h2" icon textAlign="center">
//         <Icon name="users" circular />
//         <Header.Content>Reactivities</Header.Content>

//         <List>
//           {this.state.activities.map((activity) => (
//             <List.Item key={activity.id}>{activity.title}</List.Item>
//           ))}
//         </List>
//       </Header>
//     </div>
//   );
// }
// }

export default App;
