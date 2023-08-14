import React, { Component } from 'react'

import NavBar from '../components/navbar/NavBar'

import ScheduleIndex from '../components/schedules/index'

export default class Home extends Component {
    render() {
        return (
            <div>
                <ScheduleIndex />
            </div>
        )
    }
}
