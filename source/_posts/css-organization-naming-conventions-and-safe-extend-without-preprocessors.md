title: "CSS organization, naming conventions and safe extend without preprocessors"
date: 2015-03-14 14:37:31
tags:
overview: Opinion about how to organize clean and maintainable CSS structure, note about naming conventions, and how one can extend selectors without preprocessors
image: image.jpg
imageSmall: imageSmall.jpg
---
Maintainability of CSS project highly depends on developer's choices, on how a project was originally planned. Due to CSS cascading nature, it is easy to end up in a situation when you try to fix or add one thing, which breaks something else. In worst case scenario the issue will remain unnoticed and end up going to production. It is especially hard to work on poorly organized css in a large team (a case where large team has access to CSS files is [not too common](https://css-tricks.com/poll-wrapup-the-number-of-people-touching-css/), but is still valid).

##BEM (or better GRM)
Good news is that there are battle tested tools and approaches which help to keep things under control. One of them is the famous [BEM](https://en.bem.info/). Lets take a look at the following example:
```html
<div class="shopping-cart-item">
  <div class="content special-offer">
    <h2 class="title">Title</h2>
  </div>
</div>
```

If at some point you'll need to remove whole `.content` block from CSS which has nested `.title`, you'll need to check if `.special-offer` or even `.shopping-cart-item` (and other ancestors) also have a nested `.title`.

Now lets take a look at one of the ways to write the same with BEM:
```html
<div class="container container--shopping-cart">
  <div class="container__content container__content--special-offer">
    <h2 class="container__title">Title</h2>
  </div>
</div>
```

By looking at this, we immediately know the relationship of each of the elements and can safely do clean up, if we need to remove some styles. BEM is an abbreviation for Block, Element, Modifier and in the example above we can tell that `container` is a Block, `content` and `title` are Elements, `shopping-cart` and `special-offer` are Modifiers. While approach is great, it sounds a bit weird to call `container` a Block and `content` an Element. When someone mentions BEM as an approach for selectors naming, I like to translate it to **GRM** - Group, Role, Modifier. Lets read it again: `container` is a Group, `content` and `title` define Roles within a Group, `shopping-cart` and `special-offer` are Modifiers.

##To extend or not to extend?
Though there is something that is not nice in the example above. Having duplicated classes feels redundant. Lets see what we can do about it. For html example above styles typically look similar to following:
```css
.container {
  border: 1px solid grey;
  padding: 10px;
  font-family: Arial, sans-serif;
}
  .container--shopping-cart {
    border: 4px solid orange;
    background-color: #eee;
  }
```
If one use preprocessors we could illuminate a need for duplicated classes using extends. Here is how you can use it with SCSS:
```scss
.container {
  border: 1px solid grey;
  padding: 10px;
  font-family: Arial, sans-serif;
}
  .container--shopping-cart {
    @extend .container;
    border: 4px solid orange;
    background-color: #eee;
  }
```
Here is a generated result:
```css
.container, .container--shopping-cart {
  border: 1px solid grey;
  padding: 10px;
  font-family: Arial, sans-serif;
}
  .container--shopping-cart {
    border: 4px solid orange;
    background-color: #eee;
  }
```
Looks nice, now we can use both `.container` and `.container--shopping-cart` independently and CSS result still looks good. However `@extend` should be used carefully, as it might significantly increase the size of your CSS file or [jumble specificity](http://csswizardry.com/2014/11/when-to-use-extend-when-to-use-a-mixin/).
 
So what can we do here to take advantage of behaviour which `@extend` gives us, but without any risk? Here is a pure CSS solution:
```scss
.container, [class^="container--"], [class*=" container--"] {
  border: 1px solid grey;
  padding: 10px;
  font-family: Arial, sans-serif;
}
  .container--shopping-cart {
    border: 4px solid orange;
    background-color: #eee;
  }
```
 It is going to work if your BEM modifiers start with `%base%--`. Pretty much the only time when you want to extend something is when you need to take base styles and modify them in a way. `[class^="container--"]` is taking care of a case when classname starts with selector, while `[class*=" container--"]` takes care of cases when selector is in the middle or at the end of classname. I noticed that [iconmoon](https://icomoon.io/) icon font generator is using that approach too. So now html could be simplified to following:
 ```html
 <div class="container--shopping-cart">
   <div class="container__content--special-offer">
     <h2 class="container__title">Title</h2>
   </div>
 </div>
 ```
 ##Project organization tips
 [Inuit css](https://github.com/inuitcss/getting-started) is a great example of how css project could be organized. You don't have to use styles from inuit if you don't want to. As long as you follow the same _simple_ rules as outlined in getting started guide, your components will be reusable, while project will be scalable and maintainable. Note how files in inuit are namespaced, you'll get similar benefits as described in an article [More Transparent UI Code with Namespaces](http://csswizardry.com/2015/03/more-transparent-ui-code-with-namespaces/), and you don't necessary have to prefix all your classnames with namespaces. 