title: Javascript legacy code upgrade strategy
date: 2015-01-22 21:37:43
tags:
overview: Learn how to make your existing web applications stable and fast by adapting scalable, modular javascript architecture.    
---
I'm sure all of us seen very unoptimized websites, those, which are taking long time to render and sometimes slow down or even freeze when user preforms an action. Not that long ago I've had an opportunity to work on one of sites like that and in that article I'm going to save and share experience which I gained dealing with various edge cases. 

## Prologue
Web application consisted from main site and a few smaller web apps. Each of them had its own giant, minified javascript file located near the head section and bunch of script tags with function calls all over the page. Code base included a few hundreds of files with total size of ~6 megabytes. There were a couple of factors which made it extremely hard to maintain such a giant code base: 
* there were no strict rules - developers could easily access global scope from anywhere
* code was dependant on the order in which files were concatenated
* that was leading to situations where fix or new feature for one case lead to a bug in another case
* to fix or implement things properly we had to rewrite sections of code, but when there are no clear dependencies it was taking huge effort to do that (not to mention dependencies of dependencies and so on...)
* to make things work some developers were copying all of the dependencies from one place to another instead of decoupling only required functional
* there were no code validation tools
* we had to keep track of what inline scripts were doing and which conditions in the back-end logic caused them to show

## The Story

## Epilogue