import * as type from '../types'

const initialState = {
    user:[],
    loading:false,
    error:null,
}

export default function user(state=initialState,action){
    switch(action.type){
        case type.USER_REQUESTED:
        return{
            ...state,
            loading:true
        }
        case type.USER_SUCCESS:
        return{
            ...state,
           user:action.user,
           loading:false
        }
        case type.USER_FAILED:
        return{
            ...state,
           loading:false,
           error:action.message
        }
        default:
            return state;
    }
     

}