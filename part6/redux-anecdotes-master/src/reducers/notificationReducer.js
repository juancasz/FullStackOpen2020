const initialState = ""

const reducer = (state = initialState, action) => {
    console.log('state now: ', state)
    console.log('action', action)
  
    switch(action.type){
      case "SET_MESSAGE":
        return action.message
      default:
        return state
    }
}

export const setMessage = (message,time) => {
    return async dispatch => {
      dispatch({
        type : 'SET_MESSAGE',
        message
      })
      setTimeout(() => {
        dispatch({
          type: 'SET_MESSAGE',
          message: ""
        })
      },time*1000)
    }
}

export default reducer