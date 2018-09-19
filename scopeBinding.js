/*
  call / apply / bind
  
  These methods are a way to redefine the scope of 'this' within a method.

  Call - Invokes the method immediately, redefining 'this' to be the first parameter, then 2nd+ parameters are used as normal parameters to the method.

  class Person{
    constructor(fname, lname){
      this.fname = fname;
      this.lname = lname;
    }

    getName(message){
      return this.fname + ' ' + this.lname + ' ' + message;
    }
  }

  let me = new Person('Jeff', 'Patton');
  let someoneElse = new Person('John', 'Doe');

  me.getName('Hello!'); // "Jeff Patton Hello!"
  someoneElse.getName('Hello!'); // "John Doe Hello!"

  me.getName.call(someoneElse, 'Hello!') 
  // Here we redefine 'this' to be someoneElse. Even though we're using 'me' to call the method, 'this' gets redefined.

  Apply works the same way only instead of taking in a list of parameters like a normal method, it takes in an array of arguments


  Bind - 
    Bind stores a method to be used later, with the new scope of 'this' AND the parameters passed in.

    let sayHelloForSomeoneElse = me.getName.bind(someoneElse, 'Hello!'); // Stores the parameter and new scope
    sayHelloForSomeoneElse() // Invokes the method with the new scope

*/
