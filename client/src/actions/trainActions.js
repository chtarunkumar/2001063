const proxyurl = "https://cors-anywhere.herokuapp.com/"


export const getTrainSchedule = () => {
    return (dispatch) => {
        dispatch({ type: 'LOADING' })
        fetch(`${proxyurl}http://developer.itsmarta.com/RealtimeTrain/RestServiceNextTrain/GetRealtimeArrivals?apikey=${ENV['MARTA_API_KEY']}`)
            .then(res => res.json())
            .then(json => dispatch({ type: 'UPDATE', payload: json }))
            .catch(error => console.log(error))
    }
}

export const updateTrainSchedule = () => {
    return (dispatch) => {
        fetch(`${proxyurl}http://developer.itsmarta.com/RealtimeTrain/RestServiceNextTrain/GetRealtimeArrivals?apikey=${ENV['MARTA_API_KEY']}`)
            .then(res => res.json())
            .then(json => dispatch({ type: 'UPDATE', payload: json }))
            .catch(error => console.log(error))
    }
}
