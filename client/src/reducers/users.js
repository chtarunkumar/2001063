export default function users(state = { loggedIn: false, username: '', email: '', id: '', quickPicks: [], errors: [] }, action) {
    switch (action.type) {
        case 'SIGN_UP':
            return { ...state, loggedIn: true, username: action.payload.username, email: action.payload.email, id: action.payload.id, errors: [] }
        case 'SIGN_IN':
            return { ...state, loggedIn: true, username: action.payload.username, email: action.payload.email, id: action.payload.id, quickPicks: [...action.payload.quick_picks], errors: [] }
        case 'ERRORS':
            return { ...state, errors: [...action.payload.errors] }
        case 'RESET_ERRORS':
            return { ...state, errors: [] }
        case 'SIGN_OUT':
            return { loggedIn: false, username: '', email: '', id: '', quickPicks: '', errors: [] }
        case 'CONFIRM_JWT':
            return { ...state, loggedIn: true, username: action.payload.user.username, email: action.payload.user.email, id: action.payload.user.id, quickPicks: [...action.payload.quick_picks] }
        case 'ADD_QUICK_PICK':
            return { ...state, quickPicks: [...state.quickPicks, action.payload.form] }
        case 'DELETE_QUICK_PICK':
            return { ...state, quickPicks: [...state.quickPicks.filter(qp => qp.id !== action.payload.id)] }
        case 'EDIT_QUICK_PICK':
            let qp = state.quickPicks.filter(qp => qp.id !== action.payload.form.id)
            return { ...state, quickPicks: [...qp, action.payload.form] }
        default:
            return state
    }
}
