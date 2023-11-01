// BUDGET CONTROLLER
var budgetController = (function () {
  var Expense = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };
  
  var Income = function (id, description , value)
  {
    this.id = id;
    this.description = description;
    this.value = value;
  }

  var data = {
  allItems:{
  exp: [],
  inc: []
  },
  
  totals : {
    exp: 0,
    inc: 0
  }
  }
  return {
    addItem:function(type , des , val){
      var newItem;
      // Create New ID
      if (data.allItems[type].length > 0){
      ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
      }
      else{
      ID = 0
      }
      // Create New item depened on expenes or Income
      if ( type ==='exp')
      {
        newItem = new Expense(ID, description , value);
      }
      else if (type === 'inc')
      {
        newItem = new Income(ID, description, value)
      }

      // Push into our Data structure
      data.allItems[type].push(newItem)
      // Return the New element
      return newItem;

    }
  }

})();

// UI CONTROLLER
var UIController = (function () {
    var DOMstrings = {
      inputType : '.add__type',
      inputDescription : '.add__description',
      inputvalue : '.add__value',
      inputBtn : '.add__btn'
    }

  return{
    getinput: function()
    {
      return {
       type: document.querySelector(DOMstrings.inputType).value, // Will be eihter inc or exp
       description: document.querySelector(DOMstrings.inputDescription).value,
       value: document.querySelector(DOMstrings.inputvalue).value
      }
    },
    getDOMstrings: function()
    {
      return DOMstrings;
    }
  }
})();

// GLOBAL APP CONTROLLER
var controller = (function (budgetCtrl, UICtrl) {
  var setupEventListeners = function()
  {
    var DOM = UICtrl.getDOMstrings()
    document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

    document.addEventListener('keypress', function (event) {
      if (event.keyCode === 13 || event.which === 13) {
        ctrlAddItem();
      }
  
    });
  }


  

  var ctrlAddItem = function () {
    var input, newItem
    // 1. Get the field input Data
    input = UICtrl.getinput()
    console.log(input)

    // 2. Add the item to the budget controller
    newItem = budgetCtrl.addItem(input.type, input.description, input.value)
    // 3. Add the item to the UI

    // 4. Calculate the budget

    // 5. Display the budget on the UI
  };
    return {
      init: function()
      {
        console.log('The application has started');
        setupEventListeners()
      }
    }

})(budgetController, UIController);

controller.init();
