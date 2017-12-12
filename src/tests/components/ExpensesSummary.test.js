import React from 'react';
import { shallow } from 'enzyme';
import { ExpensesSummary }  from '../../components/ExpensesSummary';

test('Should correctly render expensesSummary with one expense', () => {
    const wrapper = shallow(<ExpensesSummary expenseCount={1} expensesTotal={1300} />);
    expect(wrapper).toMatchSnapshot();
});

test('Should correctly render expensesSummary with multiple expense', () => {
    const wrapper = shallow(<ExpensesSummary expenseCount={23} expensesTotal={20451423} />);
    expect(wrapper).toMatchSnapshot();
});