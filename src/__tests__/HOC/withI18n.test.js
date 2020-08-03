import React from 'react';
import { render, queryByRole } from '@testing-library/react';
import withI18n,{i18nContext} from '../../HOC/withI18n';

const DummyComponent = (props)=><div>{`Props Value : ${props.i18n.dummyI18nKey}-${props.dummyPropsKey}`}</div>;
const WrappedComponent = withI18n(DummyComponent);

const i18n={
    dummyI18nKey:"Dummy I18n Value"
}

const props ={
    dummyPropsKey:"Dummy Props Value"
}

it('should renders the passed Wrapped component', () => {
  const { getByText } = render(<i18nContext.Provider value={i18n}><WrappedComponent {...props}/></i18nContext.Provider>);
  expect(getByText(/Props Value :/i)).toHaveTextContent(`Props Value : ${i18n.dummyI18nKey}-${props.dummyPropsKey}`);
});

