# Functional loops in JavaScript

One of the road-blocking stones I found when I start learning functional programming, was the lack of loop constructs. Back then, I was curious about how functional programmers get even the most straightforward programs to work without using loops. I mean, you need some form of loops to print numbers for 1 to 10, right?

Wrong!

Soon, I realized that the lack of loop constructs didn't mean that you can't iterate over sequences; it means that you have to use alternative techniques like recursive algorithms.

In this post, I'll show you how to create a function that sums all items on a list without using loops in JavaScript.

We are going to start from an iterative approach and move to a recursive variant while exploring a functional implementation in between.

To keep the solution as portable as possible, we are not going to use Array's built-in functions like map, reduce, and so on. Because a) that'll be cheating, and b) the idea is that you can take the code and port it to whatever language you like with little to no effort.

Let's start with the iterative approach.

## Iterative approach in JavaScript
The most commonly used technique, and probably the one that comes to mind when you read the sentence "sum all items on a list", is the iterative approach. That is, loop over the list of numbers and add them to an accumulator, once the list gets exuashted, return the acummulator.

```
function sum(numbers) {
  let acc = 0;
  for (let n of numbers) {
    acc += n;
  }
  return acc;
}
```

Maybe it's not the most elegant solution out there, but it gets the job done. Also, it's less expensive than a recursive algorithm. (Assuming that there are no tail call optimizations in place, which in most modern platforms, that might not be the case.)

## Functional approach in Erlang
To see a true "functional loop" we are going to port our little program to Erlang. A pure functional programming language.

If you have never seen an Erlang program before, the syntax might look a bit cryptic, but what the program does is really simple.

* Splits the list into a head/tail structure.
* Adds the value of head to the accumulator.
* Calls the "sum" function using the tail and the new value of the accumulator.

This operation keeps going until the list gets exhausted and the accumulator is returned to the caller.

```
% Entry point.
sum(L) -> 
  sum(L, 0).

% Recursive call.
sum([H|T], Acc) -> 
  sum(T, H + Acc); 

sum([], Acc) ->
  Acc.
```

What's cool about this program, is that it shows us how to sum all elements in a list without using loops. (Incidentally, this is the only way to do it in Erlang.)

Now that we know that it is possible to implement the sum function without using loops, let's try to replicate the Erlang way in JS.

## Recursive approach in JavaScript

Since in JS we don't have a built-in mechanism to split an array into a [head|tail] structure, we are going to start from there and create two helper functions that will helps us to do that.

The first function returns what would be the "head" node on a linked list.

```
function head(list) {
  return len(list) > 0 
    ? list[0]
    : null;
}
```

_Note: "len" is a custom function that performs a null check and returns the number of elements into the array. You can see the code in the gist linked to this post._

The second function is another helper that returns the "tail" of the list. That's, all the elements in the list but the first one. If the list has less than two elements, its tail is considered to be null.

```
function tail(list) {
  return len(list) > 1
    ? list.splice(1)
    : null;
}
```

Believe it or not, with only these functions, we have everything we need to iterate over a sequence of elements without loops. Now let's implement the recursive version of the "sum" function to see these helpers in action.

```
// Entry point.
function sum(list) {
  return recSum(list, 0);
}

// Recursive call.
function recSum(list, acc) {
  let h = head(list);
  if (!h) return acc;
  return recSum(tail(list), h + acc);
}
```

Depending on your background, you might find the recursive version cleaner and more elegant than the iterative one; or, a bit overwhelming for a function that adds a couple of numbers. Which one is better, as most things in CS, it depends!

Aside from your personal preferences, there is a key take away in this exercise:

"Every iterative algorithm can be converted into a recursive one."

It doesn't mean that you should, but knowing about it, might help you on coding interviews or school assignments when someone asks you:

_"Write a program to find the mean value of a sequence that blah, blah, blah... **without using loops!**"._

That's it for this short post. I hope that you find it useful.

I'm planning to do a short series on recursion to cover practical use-cases, pitfalls, time complexity, recursive data structures, performance, quadratic behavior, and so on. If you are into recursion, stay tuned!

Thanks for reading! Also, don't forget to clap if you like this post!











