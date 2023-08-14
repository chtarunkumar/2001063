import React, { Component } from 'react'

import { withRouter } from 'react-router-dom'

import { connect } from 'react-redux'
import { updateQuickPick } from '../../../../actions/quickPickAction'

import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent';

import Autocomplete from '@material-ui/lab/Autocomplete';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';


class QuickPicksForm extends Component {
    state = {
        stations: this.props.stations.sort((a, b) => {
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
        }),
        alignment: null,
        line: null,
        alignmentDirection: null,
        station: null,
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
        alias: ''
    }

    renderTrainTimes = () => {

        let schedule = this.props.schedules.filter(schedule => schedule.STATION === this.props.stations.filter(station => station.station === this.state.station)[0].stationAPI)
        if (this.state.line) {
            schedule = schedule.filter(schedule => schedule.LINE === this.state.line.toUpperCase())
            if (this.state.direction) {
                schedule = schedule.filter(schedule => schedule.DIRECTION === this.state.direction.charAt(0).toUpperCase())
            }
        } else if (this.state.direction) {
            schedule = schedule.filter(schedule => schedule.DIRECTION === this.state.direction.charAt(0).toUpperCase())
            if (this.state.line) {
                schedule = schedule.filter(schedule => schedule.LINE === this.state.line.toUpperCase())
            }
        }
        return (schedule.map(station => {
            let bgColor = {
                "GOLD": "#E8B813",
                "BLUE": "#00C7F5",
                "RED": "#DB2C1D",
                "GREEN": "#70F51E"
            }

            return (
                <Grid container>
                    <Grid item xs={6}>
                        <Typography align='center' style={{ textTransform: 'uppercase', fontWeight: 'bold' }}>{station.WAITING_TIME}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography align='center' style={{ backgroundColor: bgColor[station.LINE], color: 'white' }}> {station.DIRECTION}</Typography>
                    </Grid>
                </Grid>
            )
        }))

    }



    handleChangeAutocomplete = (event) => {
        if (event.target.innerText) {
            const station = this.props.stations.filter(station => station.station.toUpperCase() === event.target.innerText.toUpperCase())
            this.setState({ station: station[0] })
            if (event.target.innerText !== 'Five Points') {
                if (station[0].lines.includes('red')) {
                    this.setState({ disableBlue: true, disableGreen: true })
                    if (!station[0].lines.includes('gold')) {
                        this.setState({ disableGold: true, disableRed: false })
                    } else {
                        this.setState({ disableGold: false, disableRed: false })
                    }
                }
                if (station[0].lines.includes('gold')) {
                    this.setState({ disableBlue: true, disableGreen: true })
                    if (!station[0].lines.includes('red')) {
                        this.setState({ disableRed: true, disableGold: false })
                    } else {
                        this.setState({ disableRed: false, disableGold: false })
                    }
                }
                if (station[0].lines.includes('blue')) {
                    this.setState({ disableRed: true, disableGold: true })
                    if (!station[0].lines.includes('green')) {
                        this.setState({ disableGreen: true, disableBlue: false })
                    } else {
                        this.setState({ disableGreen: false, disableBlue: false })
                    }
                }
                if (station[0].lines.includes('green')) {
                    this.setState({ disableRed: true, disableGold: true })
                    if (!station[0].lines.includes('blue')) {
                        this.setState({ disableBlue: true, disableGreen: false })
                    } else {
                        this.setState({ disableBlue: false, disableGreen: false })
                    }
                }
                if (station[0].directions.includes('north')) {
                    this.setState({ disableEast: true, disableWest: true })
                    if (!station[0].directions.includes('south')) {
                        this.setState({ disableNorth: false, disableSouth: true })
                    } else {
                        this.setState({ disableNorth: false, disableSouth: false })
                    }
                }
                if (station[0].directions.includes('south')) {
                    this.setState({ disableEast: true, disableWest: true })
                    if (!station[0].directions.includes('north')) {
                        this.setState({ disableSouth: false, disableNorth: true })
                    } else {
                        this.setState({ disableNorth: false, disableSouth: false })
                    }
                }
                if (station[0].directions.includes('east')) {
                    this.setState({ disableNorth: true, disableSouth: true })
                    if (!station[0].directions.includes('west')) {
                        this.setState({ disableEast: false, disableWest: true })
                    } else {
                        this.setState({ disableEast: false, disableWest: false })
                    }
                }
                if (station[0].directions.includes('west')) {
                    this.setState({ disableNorth: true, disableSouth: true })
                    if (!station[0].directions.includes('east')) {
                        this.setState({ disableEast: true, disableWest: false })
                    } else {
                        this.setState({ disableEast: false, disableWest: false })
                    }
                }
            }
        } else {
            this.setState({
                stations: this.props.stations.sort((a, b) => {
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
                }), disableEast: false, disableWest: false, disableNorth: false, disableSouth: false, disabelRed: false, disableGold: false, disableBlue: false, disableGreen: false, station: null
            })
        }

        this.setState({ station: event.target.innerText })

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
            station: null,
            qp: ''
        })
        document.getElementById('trainFilter').value = ' '
    }

    componentWillMount() {
        const qp = this.props.qp.filter(qp => qp.id === this.props.id)[0]
        this.setState({
            qp: qp,
            direction: qp.direction,
            station: this.props.stations.filter(station => station.stationAPI === qp.station)[0].station,
            line: qp.rail_line,
            alias: qp.alias
        })

        if (qp.direction) {
            if (qp.direction === 'north') {
                this.setState({ alignmentDirection: 'left' })
            } else if (qp.direction === 'south') {
                this.setState({ alignmentDirection: 'center' })
            } else if (qp.direction === 'east') {
                console.log('in east')
                this.setState({ alignmentDirection: 'right' })
            } else if (qp.direction === 'west') {
                this.setState({ alignmentDirection: 'justify' })
            }
        }

        if (qp.rail_line) {

            if (qp.rail_line === 'red') {
                this.setState({ alignment: 'left' })
            } else if (qp.rail_line === 'gold') {
                this.setState({ alignment: 'center' })
            } else if (qp.rail_line === 'blue') {
                this.setState({ alignment: 'right' })
            } else if (qp.rail_line === 'green') {

                this.setState({ alignment: 'justify' })
            }
        }

    }

    handleChange = (event) => {
        this.setState({ alias: event.target.value })
    }

    handleClickQP = () => {
        const userData = {
            alias: this.state.alias,
            direction: this.state.direction,
            line: this.state.line,
            station: this.state.station.stationAPI,
            userId: this.props.userId,
            id: this.props.id
        }

        this.props.updateQuickPick(userData)

        this.props.history.push('/users/quickpicks')
    }

    render() {
        return (
            <Container component="main">
                <Paper elevation={1}>
                    <Container>
                        <Grid container>

                            <Grid item xs={12}>
                                <Typography align='center' variant='h3'>Edit QuickPick</Typography>
                            </Grid>




                            <Grid item xs={12} md={6} lg={4} align='center'>
                                <ToggleButtonGroup size="medium" style={{ marginTop: 10 }} value={this.state.alignment} exclusive onChange={this.handleChangeLine}>
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



                            <Grid item xs={12} md={6} lg={4} align='center' >
                                <ToggleButtonGroup size="medium" style={{ marginTop: 10 }} value={this.state.alignmentDirection} exclusive onChange={this.handleChangeDirection}>
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

                            <Grid item xs={12} md={6} lg={4} >
                                <Autocomplete
                                    id="trainFilter"
                                    options={this.state.stations.map(station => station.station)}
                                    onChange={this.handleChangeAutocomplete}
                                    style={{ width: 300, marginTop: 10, align: 'center' }}
                                    renderInput={(params) => <TextField {...params} label="Pick a Station" variant="outlined" />}
                                    value={this.state.station}
                                />
                            </Grid>

                            <Grid lg={4}></Grid>


                            <Grid item xs={6} md={3} lg={2} align='right'>
                                <Button variant="contained" color="primary" style={{ marginTop: 10 }} onClick={this.handleClick}>
                                    Remove Filter
                                </Button>
                            </Grid>

                            <Grid item xs={6} md={3} lg={2} align='center'>
                                <Button variant="contained" color="primary" style={{ marginTop: 10 }} onClick={this.handleClickQP}>
                                    Save
                                </Button>
                            </Grid>

                            <Grid item xs={12} lg={4} style={{ textAlign: 'center' }}>
                                <TextField id="alias" label="Nickname" variant="outlined" style={{ marginTop: 10 }} placeholder='Station Nickname' value={this.state.alias} onChange={this.handleChange} />

                            </Grid>

                            <Grid item xs={12}>
                                <hr />
                            </Grid>

                            <Card style={{ minWidth: 275, width: '100%' }} variant='outlined'>
                                <CardContent>
                                    <Typography variant='h2' style={{ fontWeight: 'bold' }}>
                                        {this.state.alias && this.state.alias}
                                    </Typography>
                                    <Typography variant={this.state.alias ? 'h4' : 'h3'} style={{ fontWeight: 'bold' }}>
                                        Station: {this.state.station ? this.state.station : 'No Station Specified'}
                                    </Typography>
                                    <Typography variant='h4'>
                                        Line: {this.state.line ? this.state.line.toUpperCase() : 'No Line Specified'}
                                    </Typography>
                                    <Typography variant='h4'>
                                        Direction: {this.state.direction ? this.state.direction.toUpperCase() : 'No Direction Specified'}
                                    </Typography>
                                    <hr />

                                    {this.state.station ? this.renderTrainTimes() : 'No Station'}
                                </CardContent>
                            </Card>

                        </Grid>
                    </Container>
                </Paper>
            </Container>
        )
    }
}

const mapStateToProps = state => {
    return {
        stations: state.trains.stations,
        schedules: state.trains.schedules,
        qp: state.users.quickPicks,
        userId: state.users.id
    }
}

export default connect(mapStateToProps, { updateQuickPick })(withRouter(QuickPicksForm))
