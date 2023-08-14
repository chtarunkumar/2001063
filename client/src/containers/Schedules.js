import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import NavBar from '../components/navbar/NavBar'

import ScheduleIndex from '../components/schedules/index'


export default class Schedules extends Component {
    render() {
        return (
            <Switch>
                <div>
                    <Route exact path="/schedules">
                        <NavBar component={<ScheduleIndex />} />
                    </Route>
                    {/* <Route exact path="/schedules" >
            {this.props.login ? <Redirect to='/' /> : <SignInForm />}
          </Route> */}
                </div>
            </Switch>
        )
    }
}
