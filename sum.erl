-module(sum).
-export([sum/1]).

sum(L) -> 
   sum(L, 0).

sum([H|T], Acc) -> 
   sum(T, H + Acc); 

sum([], Acc) ->
   Acc.
