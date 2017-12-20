import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { 
    startAddExpense, 
    addExpense, 
    editExpense, 
    removeExpense, 
    setExpenses, 
    startSetExpenses, 
    startRemoveExpense, 
    startEditExpense
} from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase';

const createMockStore = configureMockStore([thunk]);
const uid = 'thisismytestuid';
const wdefaultAuthState = {auth: { uid }};

beforeEach((done) => {
    const expensesData = {};
    expenses.forEach(({ id, description, note, amount, createdAt }) => {
        expensesData[id] = { description, note, amount, createdAt };
    });
    
    database.ref(`users/${uid}/expenses`).set(expensesData).then(() => done());
});

test('should setup remove expense action object', () => {
    const action = removeExpense({ expenseId: '123abc' });
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        expenseId: '123abc'
    })
})

test('should remove expense from firebase', (done) => {
    const store = createMockStore( defaultAuthState );
    const id = expenses[1].id;
    store.dispatch(startRemoveExpense({ expenseId: id })).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'REMOVE_EXPENSE',
            expenseId: id
        });
        return database.ref(`users/${uid}/expenses/${id}`).once('value').then((snapshot) => {
            expect(snapshot.val()).toBeFalsy();
            done();
        });
    });
});

test('should setup edit expense action object', () => {
    const action = editExpense('123a', { note: 'new note' });
    expect(action).toEqual({
        type: 'EDIT_EXPENSE',
        expenseId: '123a',
        updates: {
            note: 'new note'
        }
    })
})

test('should edit expense in databese', (done) => {
    const store = createMockStore( defaultAuthState );
    const id = expenses[0].id;
    const newNote = { note: 'new note' };
    store.dispatch(startEditExpense( id, newNote )).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'EDIT_EXPENSE',
            expenseId: id,
            updates: newNote
        });
        return database.ref(`users/${uid}/expenses/${id}`).once('value').then((snapshot) => {
            expect(snapshot.val()).toEqual({ 
                amount: expenses[0].amount,
                createdAt: expenses[0].createdAt,
                description: expenses[0].description,
                note: expenses[0].note,
                ...newNote });
            done();
        })
    });
});

test('should setup add expense action object with provided values', () => {
    const action = addExpense(expenses[2]);
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: expenses[2]
    })
});

test('should add expense to database and store', (done) => {
    const store = createMockStore(defaultAuthState);
    const expenseData = {
        description: 'Mouse',
        amount: 3000,
        note: 'Razor mouse',
        createdAt: 1000
    };

    store.dispatch(startAddExpense(expenseData)).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expenseData
            }
        });

        return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseData);
        done();
    });
});

test('should add expense with defaults to database and store', (done) => {
    const store = createMockStore(defaultAuthState);
    const defaultData = {
        description: '',
        amount: 0,
        note: '',
        createdAt: 0
    };

    store.dispatch(startAddExpense({})).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...defaultData
            }
        });

        return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(defaultData);
        done();
    });
});

test('should setup set expenses action object with data', () => {
    const action = setExpenses(expenses);
    expect(action).toEqual({
        type: 'SET_EXPENSES',
        expenses
    });
});

test('should fetch the expenses from firebase', (done) => {
    const store = createMockStore(defaultAuthState);
    store.dispatch(startSetExpenses()).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'SET_EXPENSES',
            expenses
        });
        done();
    });
});