/*
  Classes

  Classes are a way to provide structure for otherwise structureless objects. When we define objects on their own, they aren't reusable and don't hold much meaning.

  Without classes:
    let person = {
      fname: 'Jeff',
      lname: 'Patton',
      greet: function(){
        console.log(`Hi, I'm ${this.fname} ${this.lname}`)
      }
    } // Now you must reset all the values on a new object manually if you were to copy it

  With classes:
  // We're able to define the default setup for all objects of this type.
    class Person {
      constructor(fname, lname, city, state){
        this.fname = fname;
        this.lname = lname;
        this.city = city;
        this.state = state;
      }

      greet(){
        console.log(`Hi, I'm ${this.fname} ${this.lname}. \nI am from ${this.city}, ${this.state}`)
      }

    }


*/
