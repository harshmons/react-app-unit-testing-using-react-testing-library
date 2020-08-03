import React from 'react';
import { render, queryByRole } from '@testing-library/react';
import StoredCounters from '../../components/StoredCounters';

const props ={
    values:[3,4,1]
}

it('should renders the stored values', () => {
  const { queryByRole,getByText,debug,container } = render(<StoredCounters {...props}/>);

  expect(container.firstChild.childNodes[1]).toHaveTextContent("Stored Counters :")    
  const list = queryByRole("list");
  
  expect(container.firstChild.childNodes[3]).toBe(list)
  expect(list.children).toHaveLength(3);
  expect(list.children[0]).toHaveTextContent(3);
  expect(list.children[1]).toHaveTextContent(4);
  expect(list.children[2]).toHaveTextContent(1);

});

