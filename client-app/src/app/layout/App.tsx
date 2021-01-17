import React, { useState, useEffect, Fragment, SyntheticEvent } from 'react';
import { Container } from 'semantic-ui-react';

// import { Cars } from './demo';
// import { CarItems } from './CarItems';

import { IActivity } from '../models/activity';
import NavBar from '../../fuatures/nav/NavBar';
import ActivityDashboard from '../../fuatures/nav/activities/dashboard/ActivityDashboard';
import agent from '../api/agent';
import { LoadingComponent } from './LoadingComponent';

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
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [target, setTarget] = useState('');

  const handleSelectActivity = (id: string) => {
    agent.Activities.details(id).then(() => {
      setSelectedActivity(activities.filter((x) => x.id == id)[0]);
      setEditMode(false);
    });
  };

  const handleOpenCreateForm = () => {
    setSelectedActivity(null);
    setEditMode(true);
  };

  const handleCreateActivity = (activity: IActivity) => {
    setSubmitting(true);
    agent.Activities.create(activity)
      .then(() => {
        setActivities([...activities, activity]);
        setSelectedActivity(activity);
        setEditMode(false);
      })
      .then(() => setSubmitting(false));
  };

  const handleEditActivity = (activity: IActivity) => {
    setSubmitting(true);
    agent.Activities.update(activity)
      .then(() => {
        setActivities([
          ...activities.filter((x) => x.id !== activity.id),
          activity,
        ]);
        setSelectedActivity(activity);
        setEditMode(false);
      })
      .then(() => setSubmitting(false));
  };

  const handleDeleteActivity = (
    event: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) => {
    setSubmitting(true);
    setTarget(event.currentTarget.name);
    agent.Activities.delete(id)
      .then(() => {
        setActivities([...activities.filter((x) => x.id !== id)]);
      })
      .then(() => setSubmitting(false))
      .then(() => setSelectedActivity(null));
  };

  useEffect(() => {
    // axios
    //   .get<IActivity[]>('http://localhost:5000/api/activities')
    agent.Activities.list()
      .then((response) => {
        let activities: IActivity[] = [];
        response.forEach((activity) => {
          activity.date = activity.date.split('.')[0];
          activities.push(activity);
        });
        setActivities(activities);
      })
      .then(() => setLoading(false));
  }, []);

  if (loading) {
    return <LoadingComponent content="Loading Activities..." />;
  }

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
          deleteActivity={(handleDeleteActivity)}
          submitting={submitting}
          target={target}
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
