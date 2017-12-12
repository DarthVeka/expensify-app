export default (expenses) => {
    const exp = expenses.map(expense => expense.amount );
    const total = exp.reduce((sum, value) => sum + value, 0);
    return total;
}