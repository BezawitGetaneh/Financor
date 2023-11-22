const Transaction = require("../models/transactions.models");
const { transactionValidation } = require("../validation/transactionValidation");

const add_transaction = async (req, res) => {
  
  var transaction= await new Transaction({
    type: req.body.type,
    amount: req.body.amount,
    reason: req.body.reason,
  });

  await transaction.save(function (err, output) {
    if (err) {
      return console.log(err);
    }

    res.status(201).json({
      message: "Created transaction successfully",
      createdProduct: {
        type: transaction.type,
        amount: transaction.amount,
        reason: transaction.reason,
      },
    });
  });
};
const all_transaction = async (req, res) => {
    var insp= await Transaction.find();
    if (!insp) {
      res.status(401).json({
        message: "there is no transaction in the store ",
      });
      return;
    }
  
    res.status(200).json({transactions:insp});
  };
  
  module.exports = {
   
    add_transaction,
    all_transaction,
   
    
  };