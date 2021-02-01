const initialState = { message:'',color:'' }

const reducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch(action.type){
  case 'SET_MESSAGE':
    return { message:action.message, color:action.color }
  default:
    return state
  }
}

export const setMessage = (message,color,time) => {
  console.log(time)
  return async dispatch => {
    dispatch({
      type : 'SET_MESSAGE',
      message: message,
      color: color
    })
    setTimeout(() => {
      dispatch({
        type: 'SET_MESSAGE',
        message: '',
        color: ''
      })

    },time*1000)
  }
}

export default reducer