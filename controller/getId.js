const Counter = require('../model/CounterModel')

const getNextUserID = async () => {
    const counter = await Counter.findOneAndUpdate(
        { name: 'userID' }, // Filter by the 'userID' counter
        { $inc: { value: 1 } }, // Increment the counter by 1
        { new: true, upsert: true } // Return the updated document, create if doesn't exist
    );

    return `#${counter.value}`;
};
module.exports = getNextUserID 