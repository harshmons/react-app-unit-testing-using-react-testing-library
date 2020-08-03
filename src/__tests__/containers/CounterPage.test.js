import React from "react";
import {render} from "@testing-library/react";
import CounterPage from "../../containers/CounterPage";
import CounterCurrentValue from "../../components/CounterCurrentValue";
import CounterUpdater from "../../components/CounterUpdater";
import StoredCounters from "../../components/StoredCounters";

jest.mock('../../components/CounterCurrentValue', () => {
    return jest.fn(() => <div>CounterCurrentValue</div>)
  })

jest.mock('../../components/CounterUpdater', () => {
    return jest.fn(() => <div>CounterUpdater</div>)
  })

jest.mock('../../components/StoredCounters', () => {
    return jest.fn(() => <div>StoredCounters</div>)
  })

const props= {
    dummyKey1:"Dummy Value 1",
    dummyKey2:"Dummy Value 2",
}

test("should render components",()=>{
    const {debug,container} = render(<CounterPage {...props} />)
    expect(CounterCurrentValue).toHaveBeenCalledTimes(1);
    expect(CounterCurrentValue).toHaveBeenCalledWith(props,{});
    
    expect(CounterUpdater).toHaveBeenCalledTimes(1);
    expect(CounterUpdater).toHaveBeenCalledWith(props,{});

    expect(StoredCounters).toHaveBeenCalledTimes(1);
    expect(StoredCounters).toHaveBeenCalledWith(props,{});
    
    expect(container.children[0]).toHaveTextContent("CounterCurrentValue")
    expect(container.children[2]).toHaveTextContent("CounterUpdater")
    expect(container.children[3]).toHaveTextContent("StoredCounters")
})