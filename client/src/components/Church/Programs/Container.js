import { Route, Switch, useRouteMatch } from "react-router-dom";
import Burial from "./Burial";
import OutReachPrograms from "./Outreach";
import Programs from "./Programs";
import Services from "./Services";
import SocialPrograms from "./SocialPrograms";

const Container = () => {
  const match = useRouteMatch();
  return (
    <Switch>
      <Route exact path={`${match.url}`} render={() => <Programs />} />
      <Route exact path={`${match.url}/services`} render={() => <Services />} />
      <Route exact path={`${match.url}/burials`} render={() => <Burial />} />
      <Route exact path={`${match.url}/outreach`} render={() => <OutReachPrograms />} />
      <Route exact path={`${match.url}/social_programs`} render={() => <SocialPrograms />} />
    </Switch>
  )
}

export default Container;