import {useReducer} from "react";


function reducer(state, action) {
    console.log(state,action)
    if (action.type2 === 'increment') {
        console.log("increment")
        return {count : state.count + 1,count1 : state.count1 + 1}
    } else if (action.type2 === 'decrement') {
        console.log("decrement")
        return {count : state.count - 1,count1 : state.count1 - 1}
    }
}

const Test = () => {
    const [state, dispatch] = useReducer(reducer, {count:0,count1 : 0});
    // const test = () => {
    //
    // }
    return (
        <>
            Count: {state.count} ---     Count1: {state.count1}
            <button onClick={() => dispatch({type2: "increment"})}>increment +
            </button>
            <button onClick={() => dispatch({type2: "decrement"})}>decrement -
            </button>
        </>
    );
}

export default Test;