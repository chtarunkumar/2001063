import React, { Component } from 'react'

import { connect } from 'react-redux'

import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

import { getTrainSchedule, updateTrainSchedule } from '../../actions/trainActions'
import ScheduleCard from './ScheduleCard'
import { Typography } from '@material-ui/core';


class index extends Component {
    state = {
        stations: this.props.stations,
        alignment: null,
        line: null,
        alignmentDirection: null,
        direction: null,
        disableRed: false,
        disableGold: false,
        disableBlue: false,
        disableGreen: false,
        disableNorth: false,
        disableSouth: false,
        disableEast: false,
        disableWest: false,
        checked: false,
        station: null
    }

    intervalId = 0

    renderStations = () => {
        return
    }

    componentWillMount() {
        this.props.getTrainSchedule()
    }

    componentDidMount() {
        this.intervalId = setInterval(() => this.props.updateTrainSchedule(), 10000)
        this.setState({ checked: true })
    }

    componentWillUnmount() {
        clearInterval(this.intervalId)
    }

    handleChangeLine = (event, newAlignment) => {
        this.setState({ alignment: newAlignment })
        if (newAlignment === null) {
            this.setState({ line: null })
            if (this.state.direction !== null) {
                this.setState({ stations: this.props.stations.filter(station => station.directions.includes(this.state.direction)) })
            } else {
                this.setState({ stations: this.props.stations })
            }
        } else {
            const stations = this.props.stations.filter(station => station.lines.includes(event.target.innerText.toLowerCase()))
            this.setState({ line: event.target.innerText.toLowerCase() })
            if (this.state.direction !== null) {
                this.setState({ stations: stations.filter(station => station.directions.includes(this.state.direction)) })
            } else {
                this.setState({ stations: stations })
            }
        }

        if (newAlignment === null) {
            this.setState({ disableSouth: false, disableNorth: false, disableEast: false, disableWest: false })
        } else {
            if (event.target.innerText === 'RED' || event.target.innerText === 'GOLD') {
                this.setState({ disableWest: true, disableEast: true, disableSouth: false, disableNorth: false })
            } else if (event.target.innerText === 'BLUE' || event.target.innerText === 'GREEN') {
                this.setState({ disableSouth: true, disableNorth: true, disableWest: false, disableEast: false })
            }
        }
    }

    handleChangeDirection = (event, newAlignment) => {
        this.setState({ alignmentDirection: newAlignment })
        if (newAlignment === null) {
            this.setState({ direction: null })
            if (this.state.line !== null) {
                this.setState({ stations: this.props.stations.filter(station => station.lines.includes(this.state.line)) })
            } else {
                this.setState({ stations: this.props.stations })
            }
        } else {
            const stations = this.props.stations.filter(station => station.directions.includes(event.target.innerText.toLowerCase()))
            this.setState({ direction: event.target.innerText.toLowerCase() })
            if (this.state.line !== null) {
                this.setState({ stations: stations.filter(station => station.lines.includes(this.state.line)) })
            } else {
                this.setState({ stations: stations })
            }
        }

        if (newAlignment === null) {
            this.setState({ disableRed: false, disableGold: false, disableBlue: false, disableGreen: false })
        } else {
            if (event.target.innerText === 'NORTH' || event.target.innerText === 'SOUTH') {
                this.setState({ disableGreen: true, disableBlue: true, disableRed: false, disableGold: false })
            } else if (event.target.innerText === 'EAST' || event.target.innerText === 'WEST') {
                this.setState({ disableRed: true, disableGold: true, disableBlue: false, disableGreen: false })
            }
        }
    }

    handleClick = () => {
        this.setState({
            disableRed: false,
            disableGold: false,
            disableBlue: false,
            disableGreen: false,
            disableNorth: false,
            disableSouth: false,
            disableEast: false,
            disableWest: false,
            stations: this.props.stations,
            alignment: null,
            line: null,
            alignmentDirection: null,
            direction: null,
            station: null
        })
    }

    handleChangeAutocomplete = (e) => {
        if (e.target.innerText === undefined) {
            if (this.state.line !== null) {
                const stations = this.props.stations.filter(station => station.lines.includes(this.state.line))
                if (this.state.direction !== null) {
                    this.setState({ stations: stations.filter(station => station.directions.includes(this.state.direction)) })
                } else {
                    this.setState({ stations: stations })
                }
            } else if (this.state.direction !== null) {
                const stations = this.props.stations.filter(station => station.directions.includes(this.state.direction))
                if (this.state.line !== null) {
                    this.setState({ stations: stations.filter(station => station.lines.includes(this.state.line)) })
                } else {
                    this.setState({ stations: stations })
                }
            } else {
                this.setState({ stations: this.props.stations })
            }
        } else {
            this.setState({ stations: this.props.stations.filter(station => station.station === e.target.innerText) })
        }

        this.setState({ station: e.target.innerText })
    }

    render() {
        return (
            <div>
                {this.props.loading ? <CircularProgress size={200} /> : <Grid container spacing={1}>
                    <Grid item xs={12} sm={12} md={4} lg={3} style={{ marginTop: 10 }}>
                        <Button variant="contained" color="primary" onClick={this.handleClick}>
                            No Filter
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3} style={{ marginTop: 10 }}>
                        <ToggleButtonGroup size="medium" value={this.state.alignment} exclusive onChange={this.handleChangeLine}>
                            <ToggleButton value="left" disabled={this.state.disableRed}>
                                <Typography>Red</Typography>
                            </ToggleButton>
                            <ToggleButton value="center" disabled={this.state.disableGold}>
                                <Typography>Gold</Typography>
                            </ToggleButton>
                            <ToggleButton value="right" disabled={this.state.disableBlue}>
                                <Typography>Blue</Typography>
                            </ToggleButton>
                            <ToggleButton value="justify" disabled={this.state.disableGreen}>
                                <Typography>Green</Typography>
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3} lg={3} style={{ marginTop: 10 }}>
                        <ToggleButtonGroup size="medium" value={this.state.alignmentDirection} exclusive onChange={this.handleChangeDirection}>
                            <ToggleButton value="left" disabled={this.state.disableNorth}>
                                <Typography>North</Typography>
                            </ToggleButton>
                            <ToggleButton value="center" disabled={this.state.disableSouth}>
                                <Typography>South</Typography>
                            </ToggleButton>
                            <ToggleButton value="right" disabled={this.state.disableEast}>
                                <Typography>East</Typography>
                            </ToggleButton>
                            <ToggleButton value="justify" disabled={this.state.disableWest}>
                                <Typography>West</Typography>
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </Grid>
                    <Grid item xs={12} sm={6} md={12} lg={3} style={{ textAlign: 'center' }}>
                        <Autocomplete
                            id="trainFilter"
                            options={this.state.stations.map(station => station.station)}
                            onChange={this.handleChangeAutocomplete}
                            style={{ width: 300, marginTop: 10 }}
                            value={this.state.station}
                            renderInput={(params) => <TextField {...params} label="Pick a Station" variant="outlined" />}
                        />
                    </Grid>
                    <Grid item xs={12}><hr /></Grid>

                    {this.state.stations.map(station => <ScheduleCard station={station.station} schedule={this.props.schedules.filter(schedule => schedule.STATION === station.stationAPI)} />)}
                </Grid>}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        schedules: state.trains.schedules,
        loading: state.trains.loading,
        stations: state.trains.stations.sort((a, b) => {
            var nameA = a.station.toUpperCase(); // ignore upper and lowercase
            var nameB = b.station.toUpperCase(); // ignore upper and lowercase
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }
            // names must be equal
            return 0;
        })
    }
}

export default connect(mapStateToProps, { getTrainSchedule, updateTrainSchedule })(index)
