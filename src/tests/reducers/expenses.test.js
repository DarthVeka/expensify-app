import expensesReducer from '../../reducers/expenses';
import expenses from '../fixtures/expenses';

test('should set default state', () => {
    const state = expensesReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual([]);
});

test('should add an expense', () => {
    const expense = {
        id: '4',
        description: 'gum',
        note: '',
        amount: 666,
        createdAt: 2000
    }
    const action = {
        type: 'ADD_EXPENSE',
        expense
    }
    const state = expensesReducer(expenses, action);
    expect(state).toEqual([...expenses, expense]);
});

test('should remove expense by id', () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        expenseId: expenses[1].id
    };
    const state = expensesReducer(expenses, action);
    expect(state).toEqual([expenses[0], expenses[2]]);
});

test('should not remove expense when id does not exist', () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        expenseId: '-1'
    };
    const state = expensesReducer(expenses, action);
    expect(state).toEqual(expenses);
});

test('should update an existing expense by id', () => {
    const updates = {
        description: 'gummm'
    }
    const action = {
        expenseId: expenses[0].id,
        type: 'EDIT_EXPENSE',
        updates
    }
    const state = expensesReducer(expenses, action);
    expect(state[0].description).toBe(updates.description);
});

test('should not edit expense if expense not found', () => {
    const updates = {
        description: 'gummmaa',
        amount: 20000
    }
    const action = {
        expenseId: '-1',
        type: 'EDIT_EXPENSE',
        updates
    }
    const state = expensesReducer(expenses, action);
    expect(state).toEqual([ ...expenses ]);
});

test('should set expenses', () => {
      const action = {
          type: 'SET_EXPENSES',
          expenses: [expenses[1]]
      };
    const state = expensesReducer(expenses, action);
    expect(state).toEqual([expenses[1]]);
});

