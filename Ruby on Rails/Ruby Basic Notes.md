# **Ruby Basic Notes**
https://docs.ruby-lang.org/en/2.0.0/syntax_rdoc.html

# **Table of Contents**
1. [Best Practices](#best-practices)



## Best Practices <a name="best-practices"></a>
Put a `shebang` line at the top. UNIX doesn't use file convention to run the program. So this line is telling ruby how to run the program. This makes it portable because for anything besides UNIX it is viewed as a comment `#`.
```
#!/usr/bin/env ruby
```

## Variable Scope Indicators
| Type | Syntax |
| --- | --- |
| Global | $variable |
| Class | @@variable |
| Instance | @variable |
| Local | variable |
| Block | variable |


## Object Types
| Type | Syntax |
| --- | --- |
| Variables | temp = 48 |
| Symbols | `:temp` = 48 |
| Contants | `TEMP` = 48 |
| Inclusive range | 1..10 |
| Exclusive range | 1...10 |
| nil |  |


=================================


# **Splat Operator**
+ Splat allows us to take in additional arguments.
+ Splat allows us to decompose an array
+ Splat allows us to decompose a hash

```ruby
# Additional Arguments
# ==================
def method(arg_1, arg_2, *other_args)
  p arg_1         # "a"
  p arg_2         # "b"
  p other_args    # ["c", "d", "e"]
end

method("a", "b", "c", "d", "e")


# Decompose an array
# ==================
def greet(first_name, last_name)
  p "Hello " + first_name + " " + last_name
end

names = ["Grace", "Hopper"]
greet(*names)   # => "Hello Grace Hopper"


# Decompose a Hash
# ==================
old_hash = { a: 1, b: 2 }
new_hash = { **old_hash, c: 3 }
p new_hash    # => {:a=>1, :b=>2, :c=>3}
```


=================================


# **Inject Methods**
`.inject` requires two variables: "Accumulator" and "Element"

| Command |
| --- |
| .inject / .reduce |

```ruby
# Get the Sum
p [11, 7, 2, 4].inject {|acc, el|} acc + el}  # => 24


# Find minimum value in array
p [11, 7, 2, 4].inject do |acc, el|
  el < acc ? el : acc
end # => 2
```


=================================


# **Sort Methods**
| Command |
| --- |
| .sort |
| .sort_by | not used often bc its slower than .sort |

| Comparison Operator |
| --- |
| value1 `<=>` value2 |
| -1 => Less than | in sort: move item left |
| 0 => Equal | in sort: item stays |
| 1 => More than | in sort: move item right |
```
array = [5,8,2,6,1,3]

x = array.sort {|v1, v2| v1 <=> v2}
```

=================================

# **Merge Methods**
Merge only works with `hashes`
```
h1 = {:a => 2, :b => 4, :c => 6}
h2 = {:a => 3, :b => 4, :d => 8}

h1.merge(h2) {|key, old, new| new}
# code block is only called if there is a conflict with the keys
```


=================================


# **Procs**

## *Creating & Calling a Proc*
Creating: turn a Block into a Proc

```ruby
doubler = Proc.new { |num| num * 2 }
p doubler.call(5)   # => 10
p doubler.call(7)   # => 14

# multi-line block
# ================
is_even = Proc.new do |num|
  num % 2 == 0 ? true : false
end

p is_even.call(12)  # => true
```

## *Passing a Proc to a Method*

```ruby
def add_and_proc(num_1, num_2, prc)
  sum = num_1 + num_2
  p prc.call(sum)
end

square = Proc.new {|num| num * num}
add_and_proc(3, 6, square)    # => 81
```


## *Automatic conversion from Block to Proc*
Because of the `&prc` parameter we must always pass a block into `add_and_proc`, we can no longer pass in a proc because a conversion from block to proc must take place.
```ruby
def add_and_proc(num_1, num_2, &prc)
  sum = num_1 + num_2
  p prc.call(sum)
end

add_and_proc(1, 4) {|num| num * 2}    # => 10
```


=================================


# **Using &**
We can use `&` to convert a block into a proc, and vise versa.

```ruby
def add_and_proc(num_1, num_2, &prc)
  sum = num_1 + num_2
  p prc.call(sum)
end

doubler = Proc.new {|num| num * 2}
add_and_proc(1, 4, &doubler)    # => 10
```


=================================


# **Using Methods as Blocks**

```ruby
["a", "b", "c"].map(&:upcase)     # => ["A", "B", "C"]
[1, 2, 5].select(&:odd?)          # => [1, 5]

```


=================================


# **Handling Exceptions**
To handle exceptions use: `begin` ... `rescue`

view advanced notes for more details


=================================

# **Arrays**
```ruby
# Default values in Array
Array.new(<size>, <default>)


# Arrays within an Array
# ======================
Array.new(<size>) { Array.new(<size>) }
```

=================================

# **Hashes**
```ruby
# Default Values
# ==============
Hash.new(<value>)


# Default Arrays
# ==============
Hash.new {|h, k| h[k] = []}
```


=================================


## Control Structures
| Type | Example |
| --- | --- |
| Conditionals | if elsif else |
|              | unless else |
|              | case when else |


## Conditionals: Shorthand operators
```ruby
# Ternary Operator
boolean ? result1 : result2

# Or Operator
x = y || z

# Or-Equals Operator
x ||= y

# State Modifiers
puts "Hello" if greeting_enabled
```


=================================


## Iterators:
| Class | Examples |
| --- | --- |
| Numbers | .times |
|         | .upto |
|         | .downto |
|         | .step |
| Range | .each |
|       | .step |
| String | .each_line |
|        | .each_char |
|        | .each_byte |
| Array | .each |
|       | .each_index |
|       | .each_with_index |
| Hash | .each |
|      | .each_key |
|      | .each_value |
|      | .each_pair |


=================================


## Exit a Running script
| Type |
| --- |
| exit, exit! |
| abort( msg ) |
| Type: control + c |


=================================


## Input
| Command | Description |
| --- | --- |
| gets | waits for user input |
| chop | Removes the last character of a string |
| chomp | Removes the last character of a string if it is a new line character |


=================================


## Output
| Command | Description |
| --- | --- |
| print | print will do minimal formatting and not add a new line |
| puts | puts adds some formatting and adds a new line |
| p | prints to the screen with a new line and gives information on the type of data printed |


=================================


## *Find Methods*
| Command |
| --- |
| .find | .detect |
| .find_all | .select |
| .any? | .none? |
| .all? | .detect |
| .delete_if |


=================================


# **Load, Require, and Include**
| Command | Description |
| --- | --- |
| `load` | loads a source file every time it is called **(not used very often)** |
|      | returns true if a file is loaded successfully |
| `require` | loads a source file only once **(used more often than load)** |
|           | returns true if a file is loaded successfully and has not been loaded before |
| `include` | includes modules in classes |
|           | **nothing to do with loading files** |

* `require` expects name of a file in $LOAD_PATH or the full path to a file
* `require_relative` expects a path to a file relative to the current file
