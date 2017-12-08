import uuid from 'uuid';

export const addExpense = (
    {
        description = '',
        note = '',
        amount = 0,
        createdAt = 0
    } = {}
) => ({
    type: 'ADD_EXPENSE',
    expense: {
        id: uuid(),
        description,
        note,
        amount,
        createdAt
    }
});

export const removeExpense = ({ expenseId } = {}) => ({
    type: 'REMOVE_EXPENSE',
    expenseId
});

export const editExpense = (expenseId, updates) => ({
    type: 'EDIT_EXPENSE',
    expenseId,
    updates
});