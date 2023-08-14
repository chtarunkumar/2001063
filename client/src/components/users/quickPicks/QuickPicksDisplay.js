import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { connect } from 'react-redux'
import { updateTrainSchedule } from '../../../actions/trainActions'

import QuickPicksCard from './QuickPicksCard'

import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'

class QuickPicksDisplay extends Component {

    renderQuickPicks = () => {
        return (
            this.props.quickPicks.map(qp => <QuickPicksCard qp={qp} />)
        )
    }

    componentDidMount() {
        this.intervalId = setInterval(() => this.props.updateTrainSchedule(), 10000)
        this.setState({ checked: true })
    }

    componentWillUnmount() {
        clearInterval(this.intervalId)
    }

    handleClickNewQP = (e) => {
        this.props.history.push('/users/quickpicks/new')
    }

    render() {

        return (
            <div>
                <Button variant="contained" color="primary" disableElevation onClick={this.handleClickNewQP}>
                    Create New
                </Button>
                <Grid container spacing={1}>
                    {this.renderQuickPicks()}
                </Grid>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        quickPicks: state.users.quickPicks
    }
}

export default connect(mapStateToProps, { updateTrainSchedule })(withRouter(QuickPicksDisplay))
