import React, { createContext , useReducer } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {reducer as NotesReduder , initialState} from "../reducer/NotesReducers"

export const NotesContext = createContext()




export const NotesProvider =({ children })=> {
    const [state,dispatch]=useReducer(NotesReduder,initialState)
    return (
        <NotesContext.Provider value={{state, dispatch}}>
            {children}
        </NotesContext.Provider>
    )
}