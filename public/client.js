document.addEventListener('keydown', (e) => {
  let text = e.type +
    ' key=' + e.key +
    ' code=' + e.code +
    (e.shiftKey ? ' shiftKey' : '') +
    (e.ctrlKey ? ' ctrlKey' : '') +
    (e.altKey ? ' altKey' : '') +
    (e.metaKey ? ' metaKey' : '') +
    (e.repeat ? ' (repeat)' : '') +
    "\n";
  console.log(text);
}, true);
document.addEventListener('focus', (e) => {
  console.log('focused');
});
setTimeout(() => {
  document.body.insertAdjacentHTML('beforeend', `<a href="https://homedepot.ca?secrets=gone" id="totally-unique">I'm just a friendly link</a>`);
  console.log('added iframe');
  document.querySelector('#totally-unique').click();
}, 5000)