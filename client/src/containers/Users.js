import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import { connect } from 'react-redux'

import NavBar from '../components/navbar/NavBar'
import SignInForm from '../components/users/signin/SignInForm'
import SignUpForm from '../components/users/signUp/signUpForm'
import QuickPicksDisplay from '../components/users/quickPicks/QuickPicksDisplay'
import QuickPicksForm from '../components/users/quickPicks/new/QuickPicksForm'
import QuickPicksFormEdit from '../components/users/quickPicks/edit/QuickPicksForm'

class Users extends Component {
    render() {
        const { loggedIn } = this.props
        return (
            <Switch>
                <div>
                    <Route exact path="/users/login">
                        {loggedIn ? <Redirect to='/schedules' /> : <NavBar component={<SignInForm />} />}
                    </Route>
                    <Route exact path="/users/signup" >
                        {loggedIn ? <Redirect to='/schedule' /> : <NavBar component={<SignUpForm />} />}
                    </Route>
                    <Route exact path="/users/quickpicks">
                        {loggedIn ? <NavBar component={<QuickPicksDisplay />} /> : <Redirect to='/users/login' />}
                    </Route>
                    <Route exact path="/users/quickpicks/new">
                        {loggedIn ? <NavBar component={<QuickPicksForm />} /> : <Redirect to='/users/login' />}
                    </Route>
                    <Route exact path="/users/quickpicks/:id/edit" component={({ match }) => {
                        return (loggedIn ? <NavBar component={<QuickPicksFormEdit id={Number(match.params.id)} />} /> : <Redirect to='/schedules' />)
                    }} />

                </div>
            </Switch>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loggedIn: state.users.loggedIn
    }
}

export default connect(mapStateToProps)(Users)
