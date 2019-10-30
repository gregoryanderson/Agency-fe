export const opportunityReducer = (state = [], action) => {
  switch(action.type) {
    case 'SET_USER_OPPORTUNITIES':
      return [...action.opportunities]
    // case 'EDIT_OPP':
    //   const opp = state.map(opp => {
    //     if(opp.id === action.opp.id) {
    //      return action.opp
    //     }
    //   })
    case 'ADD_OPP':
      return [...state, action.opp]
    case 'SET_ALL_OPPS':
      return action.opps
    default: 
      return state
  }
}