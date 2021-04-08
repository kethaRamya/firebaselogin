
import * as type from '../types'
export function getUser(user){
    return{
        type:type.USER_REQUESTED,
        payload:user
    }
}
