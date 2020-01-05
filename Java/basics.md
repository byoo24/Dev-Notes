# Primitive Data Types

| name | bits |
| --- | --- |
| boolean | 1 bit |
| byte | 8 bits |
| short | 16 bits |
| int | 32 bits |
| long | 64 bits |
| float | 32-bit IEEE 754 floating point |
| double | 64-bit IEEE 754 floating point |
| char | 16-bit Unicode character |


# Arrays
* no push
* no pop
* no resizing

```java
// initialize the array:
int[] myIntArray = new int[10];
int myIntArray[] = new int[10];
int[] myIntArray = { 1, 2, 3, 4, 5 };
```


# ArrayList

Resizable-array immplementation.
https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/util/ArrayList.html

```java
private ArrayList<String> stringList = new ArrayList<String>();
private ArrayList<Integer> intList = new ArrayList<Integer>();
```


# Autoboxing and Unboxing

```java
Integer myIntValue = 56;
// 56 is autoboxed to: Integer.valueOf(56);

int myInt = myIntValue;
// "myIntValue" is unboxed to: myIntValue.intValue();
```





# LinkedList & Iterator

```java
public static void main(String[] args) {
    LinkedList<String> nodes = new LinkedList<String>();
    nodes.add("A");
    nodes.add("Z");
    nodes.add("D");
    nodes.add("G");

    printNodes(nodes);
}

private static void printNodes(LinkedList<String> nodes) {
    Iterator<String> i = nodes.iterator();

    while(i.hasNext()) {
        System.out.println("node: " + i.next());
    }
}

private static void addInOrder(LinkedList<String> nodes, String newString) {
    Iterator<String> strIterator = nodes.iterator();

    while(strIterator.hasNext()) {
        int comparison = strIterator.next().compareTo(newString);

        if(comparison > 0) {
            // new String should appear before this one
            strIterator.previous();
            strIterator.add(newString);
        }
    }
}
```



# Interfaces
Like a class, an interface can have methods and variables, but the methods declared in an interface are by default abstract (only method signature, no body).  

* Interfaces specify what a class must do and not how. It is the blueprint of the class.
* An Interface is about capabilities like a Player may be an interface and any class implementing Player must be able to (or must implement) move(). So it specifies a set of methods that the class has to implement.
* If a class implements an interface and does not provide method bodies for all functions specified in the interface, then the class must be declared abstract.

```java
public interface ITelephone {
    void powerOn();
    void dial(int phoneNumber);
    void answer();
    boolean callPhone(int phoneNumber);
    boolean isRinging();
}
```