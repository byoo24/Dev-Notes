# *Table of Contents*
1. [Object Create](#object-create)
2. [ES6 Prototypal Inheritance](#es6-prototypal-inheritance)
3. [ES6 Class Inheritance](#es6-class-inheritance)


# Object Create
```javascript
function Animal (name) {
  this.name = name;
};

Animal.prototype.sayHello = function () {
  console.log("Hello, my name is " + this.name);
};

function Dog () {};

Dog.prototype = Object.create(Animal.prototype); // Dog now inherits from Animal

Dog.prototype.constructor = Dog // otherwise instances of Dog will have 'instance.constructor === Animal'

Dog.prototype.bark = function () {
  console.log("Bark!");
};

const liesel = new Dog("Liesel");

liesel.bark();
liesel.sayHello();

```


# ES6 Prototypal Inheritance

```javascript
function inherits(parent, child) {
    function Surrogate() {};
    Surrogate.prototype = parent.prototype;
    child.prototype = new Surrogate();
    child.prototype.constructor = child;
}
```


# ES6 Class Inheritance

```javascript
class Bicycle {
    constructor(color, model) {
        this.color = color;
        this.model = model;
    }

    action() {
        return "rolls along";
    }
}

class RaceBicycle extends Bicycle {
    constructor(color, model, gears) {
        super(color, model);
        this.gears = gears;
    }

    action() {
        const oldAction = super.action();
        return `${oldAction} at a blistering pace!`;
    }
}

```