import React from "react";
import {render} from "@testing-library/react";
import CounterContainer from "../../containers/CounterContainer";
import CounterPage from "../../containers/CounterPage";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import thunk from "redux-thunk";

jest.mock('../../containers/CounterPage', () => {
    return jest.fn(() => <div>CounterPage</div>)
})

jest.mock('../../actions/Counters', () => ({
    getStoredCounters:jest.fn(()=>({type:"DUMMY1"})),
    increment:jest.fn((value)=>({type:"DUMMY2",value})),
    decrement:jest.fn((value)=>({type:"DUMMY3",value})),
    saveCounter:jest.fn(()=>({type:"DUMMY4"})), 
}))

const defaultState = {
    counterValue:1,
    values:[2],
}
test("should render components",()=>{
    const mockStore = configureStore([thunk]);
    const store = mockStore(defaultState);
    const tree = (
        <Provider store={store}>
            <CounterContainer />
        </Provider>
    )
    const {debug,container} = render(tree);
    expect(CounterPage).toHaveBeenCalledTimes(1);
    expect(container).toHaveTextContent("CounterPage")
    expect(store.getActions()).toEqual([{type:"DUMMY1"}])
    
    store.clearActions();
    
    const props = CounterPage.mock.calls[0][0];
    expect(props).toMatchObject(defaultState);
    
    props.incrementHandler(5)
    expect(store.getActions()).toEqual([{type:"DUMMY2",value:5}])
    store.clearActions();

    props.decrementHandler(50)
    expect(store.getActions()).toEqual([{type:"DUMMY3",value:50}])
    store.clearActions();
   
    props.saveHandler(50)
    expect(store.getActions()).toEqual([{type:"DUMMY4"}])
})