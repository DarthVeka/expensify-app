import { createStore, combineReducers } from 'redux';
import uuid from 'uuid';

const addExpense = (
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

const removeExpense = ({ expenseId } = {}) => ({
    type: 'REMOVE_EXPENSE',
    expenseId
});

const editExpense = (expenseId, updates) => ({
    type: 'EDIT_EXPENSE',
    expenseId,
    updates
});

const setTextFilter = (text = '') => ({
    type: 'SET_TEXT_FILTER',
    text
});

const sortByAmount = () => ({
    type: 'SORT_BY_AMOUNT'
})

const sortByDate = () => ({
    type: 'SORT_BY_DATE'
})

const setStartDate = (startDate = undefined) => ({
    type: 'SET_START_DATE',
    startDate
})

const setEndDate = (endDate = undefined) => ({
    type: 'SET_END_DATE',
    endDate
})

//
// Expenses Reducer
//
const expencesDefaultState = [];

const expencesReducer = (state = expencesDefaultState, action) => {
    switch (action.type) {
        case 'ADD_EXPENSE':
            return [
                ...state,
                action.expense
            ];

        case 'REMOVE_EXPENSE':
            return state.filter(({ id }) => id !== action.expenseId);

        case 'EDIT_EXPENSE':
            return state.map((expense) => {
                if (expense.id === action.expenseId) {
                    return {
                        ...expense,
                        ...action.updates
                    }
                } else {
                    return expense
                }
            });

        default:
            return state;
    }
};

//
// Filters Reducer
//
const filtersDefaultState = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
}

const filtersReducer = (state = filtersDefaultState, action) => {
    switch (action.type) {
        case 'SET_TEXT_FILTER':
            return {
                ...state,
                ...action
            };

        case 'SORT_BY_AMOUNT':
            return {
                ...state,
                sortBy: 'amount'
            }

        case 'SORT_BY_DATE':
            return {
                ...state,
                sortBy: 'date'
            }

        case 'SET_START_DATE':
            return {
                ...state,
                startDate: action.startDate
            }

        case 'SET_END_DATE':
            return {
                ...state,                
                endDate: action.endDate
            }

        default:
            return state;
    }
};

//
// Get visible expences
//

const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
    return expenses.filter((expense) => {
        const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
        const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
        const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());

        return startDateMatch && endDateMatch && textMatch;
    }).sort((a, b) => {
        if(sortBy === 'date') {
            return a.createdAt < b.createdAt ? 1 : -1;
        } else if(sortBy === 'amount') {
            return a.amount < b.amount ? 1 : -1;
        }
    });
};

//
// Store creation
//
const store = createStore(
    combineReducers({
        expences: expencesReducer,
        filters: filtersReducer
    })
);

store.subscribe(() => {
    const state = store.getState();
    const visibleExpenses = getVisibleExpenses(state.expences, state.filters);
    console.log(visibleExpenses);
});

const expenseOne = store.dispatch(addExpense({ description: 'rent', amount: 100, createdAt: -1000 }));
const expenseTwo = store.dispatch(addExpense({ description: 'coffee', amount: 1000, createdAt: 1000 }));

// store.dispatch(removeExpense({ expenseId: expenseOne.expense.id }));

// store.dispatch(editExpense(expenseTwo.expense.id, { amount: 500 }));

// store.dispatch(setTextFilter('rent'));
// store.dispatch(setTextFilter(''));

store.dispatch(sortByAmount());
// store.dispatch(sortByDate());

// store.dispatch(setStartDate(-1000));
// store.dispatch(setStartDate());
// store.dispatch(setEndDate(1000));

const demoState = {
    expences: [{
        id: 'skojlfoisah',
        description: 'January rent',
        note: 'Final payment for this address',
        amount: 50000,
        createdAt: 0
    }],
    filters: {
        text: 'rent',
        sortBy: 'amount', // Date or amount
        startDate: undefined,
        endDate: undefined
    }
}