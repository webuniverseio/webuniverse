hexo.extend.helper.register('fullUrl', function(url){
  return hexo.config.url + hexo.config.root + url;
});