import { Route, Switch, useRouteMatch } from "react-router-dom";
import Birthday from "./Birthdays/Birthday";
import Burial from "./Burial/Burial";
import OutReachPrograms from "./Outreach/Outreach";
import Programs from "./Programs";
import Services from "./Services/Services";
import SocialPrograms from "./SocialPrograms/SocialPrograms";
import Wedding from "./Wedding/Wedding";

const Container = () => {
  const match = useRouteMatch();
  return (
    <Switch>
      <Route exact path={`${match.url}`} render={() => <Programs />} />
      <Route exact path={`${match.url}/services`} render={() => <Services />} />
      <Route exact path={`${match.url}/burials`} render={() => <Burial />} />
      <Route exact path={`${match.url}/outreach`} render={() => <OutReachPrograms />} />
      <Route exact path={`${match.url}/social_programs`} render={() => <SocialPrograms />} />
      <Route exact path={`${match.url}/birthdays`} render={() => <Birthday />} />
      <Route exact path={`${match.url}/weddings`} render={() => <Wedding />} />
    </Switch>
  )
}

export default Container;