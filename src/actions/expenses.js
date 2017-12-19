import uuid from 'uuid';
import database from '../firebase/firebase';

// ADD EXPENSE
export const addExpense = (expense) => ({
    type: 'ADD_EXPENSE',
    expense
});

export const startAddExpense = (expenseData = {}) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        const {
            description = '',
            note = '',
            amount = 0,
            createdAt = 0
        } = expenseData;
        const expense = { description, note, amount, createdAt };

        return database.ref(`users/${uid}/expenses`).push(expense).then((ref) => {
            dispatch(addExpense({
                id: ref.key,
                ...expense
            }));
        });
    };
};

// REMOVE_EXPENSE
export const removeExpense = ({ expenseId } = {}) => ({
    type: 'REMOVE_EXPENSE',
    expenseId
});

export const startRemoveExpense = ({ expenseId } = {}) => {
    return(dispatch, getState) => {
        const uid = getState().auth.uid;        
        return database.ref(`users/${uid}/expenses/${expenseId}`).remove().then(() => {
            dispatch(removeExpense({expenseId}));
        });
    }
}

// EDIT_EXPENSE
export const editExpense = (expenseId, updates) => ({
    type: 'EDIT_EXPENSE',
    expenseId,
    updates
});

export const startEditExpense = (expenseId, updates) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;        
        return database.ref(`users/${uid}/expenses/${expenseId}`).update({ ...updates }).then(() => {
            dispatch(editExpense(expenseId, updates));
        })
    }
}

// SET_EXPENSE
export const setExpenses = (expenses) => ({
    type: 'SET_EXPENSES',
    expenses
});

export const startSetExpenses = () => {
    return (dispatch, getState) => {
        const expenses = [];
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}/expenses`)
            .once('value')
            .then((snapshot) => {
                snapshot.forEach((childSnapshot) => {
                    expenses.push({
                        id: childSnapshot.key,
                        ...childSnapshot.val()
                    });
                    dispatch(setExpenses(expenses));
                });
            });
    };
};