# Object Oriented Programming Review

We're creating a class called MAMMAL.Person from which we can churn out multiple Person objects quite easily.

    // declare a class name
    var MAMMAL = MAMMAL || {};
    
    // build the class constructor function
    MAMMAL.Person = function (name, height, weight) {
    
      // declare each of the initial object parameters
      this.name = name;
      this.height = height;
      this.weight = weight;
      
      //we'll also start his miles off at 0
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
    var james = new MAMMAL.Person("James", 66, 165);
    var guy_fawkes = new MAMMAL.Person("Guy", 67, 174);
    
    // change a parameter value
    console.log(guy_fawkes);
    guy_fawkes.weight = 170;
    console.log(guy_fawkes);
    
    // use a Class method
    james.run(5);
    console.log(james); // 5
    james.run(4);
    console.log(james); // 9

