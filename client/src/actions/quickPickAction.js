export const createQuickPick = (userData) => {
    return dispatch => {
        let formData = {
            quick_picks: {
                alias: userData.alias,
                direction: userData.direction,
                rail_line: userData.line,
                station: userData.station,
                user_id: userData.id
            }
        }
        let configObj = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(formData)
        }
        fetch('/api/v1/quick_picks', configObj)
            .then(res => res.json())
            .then(json => dispatch({ type: 'ADD_QUICK_PICK', payload: json.data }))
            .catch(err => console.log(err))

    }
}

export const deleteQuickPick = (id) => {
    return dispatch => {
        let formData = {
            id
        }
        let configObj = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(formData)
        }
        fetch('/api/v1/quick_picks', configObj)
            .then(res => res.json())
            .then(json => dispatch({ type: 'DELETE_QUICK_PICK', payload: { id } }))
            .catch(err => console.log(err))
    }
}

export const updateQuickPick = (userData) => {
    return dispatch => {
        let formData = {
            quick_picks: {
                alias: userData.alias,
                direction: userData.direction,
                rail_line: userData.line,
                station: userData.station,
                user_id: userData.userId,
            },
            id: userData.id
        }
        let configObj = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'applicaiton/json'
            },
            body: JSON.stringify(formData)
        }
        fetch('/api/v1/quick_picks', configObj)
            .then(res => res.json())
            .then(json => dispatch({ type: 'EDIT_QUICK_PICK', payload: json.data }))
            .catch(err => console.log(err))
    }
}
