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