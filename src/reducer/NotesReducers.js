
export const initialState = [
   
]


export const reducer = (state,{type,payload}) => {
    switch(type){
        case"Add" :
            return[...state,{id:Math.random(),name:payload.name , phone:payload.phone ,  dob:payload.dob , email:payload.email , color:payload.color}] 

        case"Remove":
        return state.filter((note)=>payload !== note.id)

        case"Update":
            return state.map(record => {
                 if (payload.id === record.id) 
                 return payload
                 else
                 return record
            })
            default:
            return state
        }
   
   
}