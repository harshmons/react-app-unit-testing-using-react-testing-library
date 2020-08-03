import React from 'react';
import { render,fireEvent } from '@testing-library/react';
import CounterUpdater from '../../components/CounterUpdater';

jest.mock("../../HOC/withI18n", () => ({
    __esModule: true,
    default: Component => props => <Component {...props} />
  }));
  
const i18n = {
    buttonIncrement:"buttonIncrement",
    buttonDecrement:"buttonDecrement",
    buttonIncrementBy10:"buttonIncrementBy10",
    buttonDecrementBy5:"buttonDecrementBy5",
    buttonSave:"buttonSave",
}

const props ={
    incrementHandler:jest.fn(),
    decrementHandler:jest.fn(),
    saveHandler:jest.fn(),
}

it('should renders all the buttons', () => {
  const { queryAllByRole } = render(<CounterUpdater i18n={i18n} {...props}/>);
  
  const btnList = queryAllByRole("button");
  
  expect(btnList).toHaveLength(5);

  const btnOrder= [
      i18n.buttonIncrement,
      i18n.buttonDecrement,
      i18n.buttonIncrementBy10,
      i18n.buttonDecrementBy5,
      i18n.buttonSave
    ]
    btnOrder.forEach((text,index)=>{
        expect(btnList[index]).toHaveTextContent(text);
    })
    
    fireEvent.click(btnList[0]);
    expect(props.incrementHandler).toBeCalledTimes(1);
    // can't use toHaveBeenCalledWith because the 2nd argument is the React synthetic event which jest is trying to read
    expect(props.incrementHandler.mock.calls[0][0]).toBe(1);

    fireEvent.click(btnList[1]);
    expect(props.decrementHandler).toBeCalledTimes(1);
    // can't use toHaveBeenCalledWith because the 2nd argument is the React synthetic event which jest is trying to read
    expect(props.decrementHandler.mock.calls[0][0]).toBe(1);

    fireEvent.click(btnList[2]);
    expect(props.incrementHandler).toBeCalledTimes(2);
    // can't use toHaveBeenCalledWith because the 2nd argument is the React synthetic event which jest is trying to read
    expect(props.incrementHandler.mock.calls[1][0]).toBe(10);

    fireEvent.click(btnList[3]);
    expect(props.decrementHandler).toBeCalledTimes(2);
    // can't use toHaveBeenCalledWith because the 2nd argument is the React synthetic event which jest is trying to read
    expect(props.decrementHandler.mock.calls[1][0]).toBe(5);

    fireEvent.click(btnList[4]);
    expect(props.saveHandler).toBeCalledTimes(1);

});

