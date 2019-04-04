# **Ruby Advanced Notes**

# *Table of Contents*
1. [init.rb](#init)
2. [Class Template](#class-template)
3. [Class Inheritance](#class-inheritance)
4. [Modules](#modules)
    1. [Namespacing](#namespacing)
    2. [Mixins](#mixins)
5. [Exceptions](#exceptions)
    1. [Custom Exceptions](#custom-exceptions)



<a name="init"></a>
# init.rb

```ruby
#!/usr/bin/env ruby

require_relative 'classes/person'
require_relative 'classes/animal'

person = Person.new
person.first_name = "Bob"
person.last_name = "Smith"
puts person.full_name
puts person.initial_and_last_name

pig = Animal.new
pig.noise = "Oink!"
puts pig.make_noise
```


<a name="class-template"></a>
# Class Template

* initialize => Instance Method
* @var_1 => Instance Variables


## *Method Access Control*
| Type | Description |
| --- | --- |
| public | anyone can access (default) |
| protected | can only be called by instances of the class and its subclasses |
| private | can only be called by instances of a class |


```ruby
class Example1

  # Getter Methods
  attr_reader :var_1, :var_2

  # Setter Methods
  attr_writer :var_3, :var_4

  # Getter and Setter Methods
  attr_accessor :var_5, :var_6

  # initialize == Instance Method
  # @var_1 == Instance Variable
  def initialize(:var_1, :var_2)
    @var_1 = var_1
    @var_2 = var_2
  end

  # Manually create Getter Method
  def var_1
    @var_1
  end

  # Manually create Setter Method
  def var_2=(value)
    @var_2 = value
  end

  # Class Method:
  def self.method_name
    # Code Here
  end

protected

  def protected_method
    # Code Here
  end

private

  def private_method
    # Code Here
  end

end
```



<a name="class-inheritance"></a>
# Class Inheritance

* A class needs to modify or extend the behavior of another class

```ruby
class Parent
  attr_accessor :var_1

  def method_1
    puts "some code"
  end
end

class Child1 < Parent
  def initialize
    @var_1 = value
  end

  def method_1
    if bool
      puts "I override Parent's method_1"
    else
      super
      puts "'super' calls Parent's method_1"
    end
  end

end
```



<a name="modules"></a>
# Modules

* Wrappers around Ruby code
* Different from classes: cannot be instantiated
* Two different modules: `Namespacing and Mixins`



<a name="namespacing"></a>
## *Namespacing*

* Prevents conflicts when code has similarly named classes and methods
* Frequently used to namespace classes in open-source plugins

```ruby
# MakeSparks: online dating website

module MarkSparks
  class Date # used for "going on a date"
    #...
  end
end

dinner = MarkSparks::Date.new # "going on a date"
dinner.date = Date.new # "built-in calendar date"
```



<a name="mixins"></a>
## *Mixins*

* Ruby only allows subclasses to inherit from one superclass (parent)
* Modules allow us to package up shared functionality
* Modules can then be mixed in to a class (like a Class Fragment)


```ruby
module Nameable
  attr_accessor :first_name, :last_name

  def full_name
    "#{first_name} #{last_name}"
  end
end

module ContactInfo
  attr_accessor :city, :state, :zip

  def city_state_zip
    "#{city}, #{state} #{zip}"
  end
end

#=====================

class Person
  include Nameable
  include ContactInfo
end

class Customer
  include Nameable
  include ContactInfo
end
```


<a name="exceptions"></a>
# **Exceptions in Ruby**

https://ruby-doc.org/core-2.5.1/Exception.html

The behavior of `begin...rescue` is this: The code in the `begin` block will execute until an exception is reached. Once an exception is reached, the execution will immediately jump to `rescue`

## *Common Error Types:*
* ArgumentError
* NameError
* NoMethodError
* IndexError
* TypeError
* ZeroDivisionError

## *Raising Exceptions*
* Exception#class
* Exception#message
* Exception#backtrace
* Exception#full_message

```ruby
def even_numbers(array)
  unless array.is_a?(Array)
    raise ArgumentError
  end

  if array.length == 0
    raise StandardError.new("Too few elements")
  end
end

#============================

begin
  divide(x, y)

rescue ZeroDivisionError
  puts "Cannot divide by zero"

rescue TypeError, ArgumentError
  puts "Requires two integer arguments"

rescue
  puts "Some other StandardError handled"

end

#============================

begin
  1 / 0

rescue ZeroDivisionError => e
  puts "#{e.class} handled"

rescue RuntimeError => e
  puts e.message

rescue => e # Any StandardError and its Subclasses
  puts "#{e.class} handled"
```

<a name="custom-exceptions"></a>
## *Custom Exceptions*

```ruby
class TooLoudError < StandardError

  attr_reader :volume

  def initialize(value, msg=nil)
    # Let parent class set message
    super(msg || "Too loud!")
    @volume = value
  end

end

#============================

class Radio

  def volume=(value)
    if value < 1 || value > 10
      raise TooLoudError.new(value)
    end
    @volume = value
  end

end

#============================

begin
  r = Radio.new
  r.volume = 20
rescue TooLoudError => e
  puts "Volume #{e.volume}: #{e.message}"
  # This is how we can add data to a log file.
end
```
