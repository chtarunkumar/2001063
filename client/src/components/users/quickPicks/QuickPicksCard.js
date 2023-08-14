import React from 'react';

import { connect } from 'react-redux'
import { deleteQuickPick } from '../../../actions/quickPickAction'

import { withRouter } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid'

const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

function OutlinedCard(props) {

    const classes = useStyles();

    const renderTrainTimes = () => {
        let schedule = props.schedules.filter(schedule => schedule.STATION === props.qp.station)
        if (props.qp.rail_line) {
            schedule = schedule.filter(schedule => schedule.LINE === props.qp.rail_line.toUpperCase())
            if (props.qp.direction) {
                schedule = schedule.filter(schedule => schedule.DIRECTION === props.qp.direction.charAt(0).toUpperCase())
            }
        } else if (props.qp.direction) {
            schedule = schedule.filter(schedule => schedule.DIRECTION === props.qp.direction.charAt(0).toUpperCase())
            if (props.qp.rail_line) {
                schedule = schedule.filter(schedule => schedule.LINE === props.qp.rail_line.toUpperCase())
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

    const handleClickEditBtn = () => {
        props.history.push(`/users/quickpicks/${props.qp.id}/edit`)
    }

    const handleClickDeleteBtn = () => {
        props.deleteQuickPick(props.qp.id)
    }
    return (
        <Grid item xs={12} md={6} lg={4}>
            <Card className={classes.root} variant="outlined">
                <CardContent>
                    <Typography variant='h3' style={{ fontWeight: 'bold' }}>
                        {props.qp.alias && props.qp.alias}
                    </Typography>
                    <Typography variant={props.alias ? 'h5' : 'h3'} style={{ fontWeight: 'bold' }}>
                        Station: {props.qp.station ? props.qp.station : 'No Station Specified'}
                    </Typography>
                    <Typography variant='h5'>
                        Line: {props.qp.rail_line ? props.qp.rail_line.toUpperCase() : 'No rail_line Specified'}
                    </Typography>
                    <Typography variant='h5'>
                        Direction: {props.qp.direction ? props.qp.direction.toUpperCase() : 'No Direction Specified'}
                    </Typography>
                    <hr />

                    {props.qp.station ? renderTrainTimes() : 'No Station'}
                </CardContent>
                <CardActions>
                    <Button size="small" variant='contained' onClick={handleClickEditBtn}>Edit</Button>
                    <Button size="small" variant='contained' onClick={handleClickDeleteBtn}>Delete</Button>
                </CardActions>
            </Card>
        </Grid>
    );
}

const mapStateToProps = (state) => {
    return {
        schedules: state.trains.schedules,
    }
}

export default connect(mapStateToProps, { deleteQuickPick })(withRouter(OutlinedCard))
