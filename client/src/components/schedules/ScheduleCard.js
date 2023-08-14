import React, { useEffect } from 'react'

import { connect } from 'react-redux'

import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Slide from '@material-ui/core/Slide';


import { makeStyles } from '@material-ui/core/styles'

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
    direction: {
        align: 'right'
    }
});

function ScheduleCard(props) {
    const classes = useStyles()

    const [checked, setChecked] = React.useState(false);

    const renderTrainTimes = () => {
        return (
            props.schedule.map(station => {
                let bgColor = {
                    "GOLD": "#E8B813",
                    "BLUE": "#00C7F5",
                    "RED": "#DB2C1D",
                    "GREEN": "#70F51E"
                }
                // if (station.LINE === 'GOLD') {
                //     bgColor = '#E8B813'
                // } else if (station.LINE === 'BLUE') {
                //     bgColor = '#00C7F5'
                // } else if (station.LINE === 'RED') {
                //     bgColor = '#DB2C1D'
                // } else if (station.LINE === 'GREEN') {
                //     bgColor = '#70F51E'
                // }
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
            })
        )
    }

    useEffect(() => {
        setChecked(true)
    }, [])

    return (

        <Grid item xs={12} sm={6} md={4} lg={3}>
            <Slide direction="up" in={checked} mountOnEnter unmountOnExit>
                <Card className={classes.root} variant='outlined'>
                    <CardContent>
                        <Typography variant='h4' align='center'>
                            {props.station}
                        </Typography>
                        <hr />

                        {renderTrainTimes()}

                    </CardContent>
                </Card>
            </Slide>
        </Grid>

    )

}

const mapStateToProps = state => {
    return {
        loading: state.loading
    }
}

export default connect(mapStateToProps)(ScheduleCard)
