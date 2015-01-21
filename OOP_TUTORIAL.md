# Object Oriented Programming Overview

We're creating a class called MAMMAL.Person from which we can churn out multiple Person objects quite easily.

```javascript
    // declare a class name
    var MAMMAL = MAMMAL || {};
    
    // Build a class constructor.
    // A constructor is invoked to create objects from the class blueprint. 
    // Constructor declarations look like method declarations—except that 
    // they use the name of the class and have no return type. For example, Bicycle has one constructor:
    MAMMAL.Person = function (name, height, weight) {
    
      // declare each of the initial object parameters
      this.name = name;
      this.height = height;
      this.weight = weight;
      
      // we'll also start his miles off at 0
      this.miles = 0;
      
    }
    
    // let's add some functionality to Person. just having an object 
    // with a list of parameters means nothing if you can't do anything with it.
    // this is the same as creating a simple function, but this is known as an object method
    MAMMAL.Person.prototype.run = function(miles) {
      
      // add the number of miles suplied to 
      // this person's miles parameter.
      // note: "=" assigns a value, while "+=" adds to the current value
      this.miles += miles;
      
    }
    
    // let's create our first object based on the Person class.
    // the constructor is used to establish the object.
    var james = new MAMMAL.Person("James", 66, 165);
    var guy_fawkes = new MAMMAL.Person("Guy", 67, 174);
    
    // now, let's change an object parameter value
    console.log(guy_fawkes);
    guy_fawkes.weight = 170;
    console.log(guy_fawkes);
    
    // use a Class method
    james.run(5);
    console.log(james); // returns 5
    
    james.run(4);
    console.log(james); // returns 9
```
