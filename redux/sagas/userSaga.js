import {call,put,takeEvery} from 'redux-saga/effects'
 let apiUrl = "https://jsonplaceholder.typicode.com/todos/"

 function getApi(){
     return fetch(apiUrl,{
         method:'GET',
         headers:{
            'content-Type':'application/json',
        }
     }).then(response => response.json())
     .catch((error) => {throw(error)})
 }

 function* fetchTitle(action){
    try{
        const users= yield call(getApi)
        yield put({type:"USER_SUCCESS",user:users})
    }catch(e){
        yield put({type:"USER_FAILED",message:e.message})
    }
 }

 function* Usersaga(){
     yield takeEvery("USER_REQUESTED",fetchTitle)
 }

 export default Usersaga