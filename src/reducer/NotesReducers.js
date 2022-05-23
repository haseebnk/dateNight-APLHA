
export const initialState = [
   
]


export const reducer = (state,{type,payload}) => {
    switch(type){
        case"Add" :
            return[...state,{id:Math.random(),name:payload.name , number:payload.number ,  dateb:payload.dateb , email:payload.email , color:payload.color}] 

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