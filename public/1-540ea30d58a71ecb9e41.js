(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{150:function(e,t,a){"use strict";a.r(t),a.d(t,"graphql",function(){return S}),a.d(t,"StaticQueryContext",function(){return j}),a.d(t,"StaticQuery",function(){return m});var n=a(0),r=a.n(n),i=a(4),s=a.n(i),o=a(151),c=a.n(o);a.d(t,"Link",function(){return c.a}),a.d(t,"withPrefix",function(){return o.withPrefix}),a.d(t,"navigate",function(){return o.navigate}),a.d(t,"push",function(){return o.push}),a.d(t,"replace",function(){return o.replace}),a.d(t,"navigateTo",function(){return o.navigateTo});var p=a(154),l=a.n(p);a.d(t,"PageRenderer",function(){return l.a});var _=a(51);a.d(t,"parsePath",function(){return _.a});var j=r.a.createContext({}),m=function(e){return r.a.createElement(j.Consumer,null,function(t){return e.data||t[e.query]&&t[e.query].data?(e.render||e.children)(e.data?e.data.data:t[e.query].data):r.a.createElement("div",null,"Loading (StaticQuery)")})};function S(){throw new Error("It appears like Gatsby is misconfigured. Gatsby related `graphql` calls are supposed to only be evaluated at compile time, and then compiled away,. Unfortunately, something went wrong and the query was left in the compiled code.\n\n.Unless your site has a complex or custom babel/Gatsby configuration this is likely a bug in Gatsby.")}m.propTypes={data:s.a.object,query:s.a.string.isRequired,render:s.a.func,children:s.a.func}},154:function(e,t,a){var n;e.exports=(n=a(578))&&n.default||n},156:function(e,t,a){"use strict";var n=a(0),r=a.n(n),i=a(597),s=a.n(i);t.a=function(e){var t=e.date,a=e.dateFormatted;return r.a.createElement("time",{className:s.a.datetime,dateTime:t,itemProp:"datePublished"},a)}},157:function(e,t,a){"use strict";a(80);var n=a(7),r=a.n(n),i=a(0),s=a.n(i),o=a(33),c=(a(54),a(84),a(152)),p=a.n(c),l=a(606),_=a(605),j=a(160),m=a.n(j),S=function(e){var t=e.children,a=e.className,n=(p()(e,["children","className"]),(a?a.split("-"):"")[1]);return n?"jsx"===n?s.a.createElement(l.d,{code:t},s.a.createElement(l.a,null),s.a.createElement(l.b,null),s.a.createElement(l.c,null)):s.a.createElement(_.a,Object.assign({},_.b,{code:t,language:n,theme:m.a}),function(e){var t=e.className,a=e.style,n=e.tokens,r=e.getLineProps,i=e.getTokenProps;return s.a.createElement("pre",{className:t,style:a},n.map(function(e,t){return s.a.createElement("div",r({line:e,key:t}),e.map(function(e,t){return s.a.createElement("span",i({token:e,key:t}))}))}))}):s.a.createElement("code",null,t)},u=a(150),d=a(579),g=function(e){var t=e.children;return s.a.createElement(u.StaticQuery,{query:"1128469919",render:function(e){var a=e.site.siteMetadata.basePath;return t(a)},data:d})},h=function(e){var t=e.to,a=void 0===t?"":t,n=p()(e,["to"]);return s.a.createElement(g,null,function(e){return s.a.createElement(u.Link,Object.assign({},n,{to:""+e+a}))})},y=a(580),E=a.n(y),x=function(){return s.a.createElement("header",{className:E.a.header,role:"banner"},s.a.createElement(h,null,s.a.createElement("h1",{className:E.a.logo,itemProp:"name"},"Web",s.a.createElement("span",{className:E.a.logoUniverse},"Universe"))))},f=a(581),P=a(582),C=a.n(P),v=function(){return s.a.createElement(u.StaticQuery,{query:"2356257589",render:function(e){var t=e.site.siteMetadata.author;return s.a.createElement("footer",{className:C.a.footer,role:"contentinfo"},"All content, unless otherwise indicated,"," ",s.a.createElement("span",{className:"nowrap"},"is licensed under ",s.a.createElement("a",{href:"http://creativecommons.org/licenses/by/4.0/",rel:"license"},"CC BY 4.0"),"."),s.a.createElement("br",null),s.a.createElement("span",{itemScope:!0,itemType:"http://schema.org/Person",itemProp:"author"},s.a.createElement(h,{to:"about",itemProp:"url"},s.a.createElement("span",{itemProp:"name"},t))," "),"© ",s.a.createElement("span",{itemProp:"copyrightYear"},(new Date).getFullYear()),".")},data:f})},w=a(583),b=a(584),B=a.n(b),k=function(){return s.a.createElement(u.StaticQuery,{query:"1550102214",render:function(e){var t=e.allMdx.edges;return s.a.createElement("div",{className:B.a.topBar},s.a.createElement("nav",{className:B.a.navigation,itemScope:!0,itemType:"http://schema.org/SiteNavigationElement",role:"navigation"},s.a.createElement("h2",{className:"a11y__element"},"Main navigation"),s.a.createElement("a",{href:"#page-content__main",className:"a11y__skip "+B.a.navigation__skip},"skip navigation"),s.a.createElement(h,{itemProp:"url"},s.a.createElement("span",{itemProp:"name"},"Home"))," ",s.a.createElement("span",{className:B.a.navigation__separator})," ",t.map(function(e,a){var n=e.node,r=n.frontmatter.title,o=n.fields.slug;return s.a.createElement(i.Fragment,{key:r},s.a.createElement(u.Link,{to:o,itemProp:"url"},s.a.createElement("span",{itemProp:"name"},r))," ",a!==t.length-1?s.a.createElement(i.Fragment,null,s.a.createElement("span",{className:B.a.navigation__separator})," "):null)})),s.a.createElement("div",{className:B.a.search},s.a.createElement("section",null,s.a.createElement("h3",{className:"a11y__element"},"Search panel"),s.a.createElement("div",{className:"gcse-search",id:"gcse-search",style:{height:"33px"}}))))},data:w})},M=(a(34),a(585)),G=a(586),T=(a(594),a(595),function(e){var t=e.url,a=void 0===t?"":t,n=e.title,r=e.isPost,i=e.publishDate,o=e.description,c=e.image;return s.a.createElement(u.StaticQuery,{query:"2387503134",render:function(e){var t=e.site.siteMetadata,p=t.title,l=t.siteUrl,_=t.basePath,j=t.description;return n=n?n+" | "+p:p,o=o?o.replace(/<\/?[^>]+(>|$)/g,""):j,c=c||_+"favicon-192x192.png",s.a.createElement(G.Helmet,null,s.a.createElement("meta",{httpEquiv:"x-dns-prefetch-control",content:"on"}),s.a.createElement("link",{rel:"dns-prefetch",href:"//webuniverse.disqus.com"}),s.a.createElement("link",{rel:"dns-prefetch",href:"//a.disquscdn.com"}),s.a.createElement("link",{rel:"dns-prefetch",href:"//disqus.com"}),s.a.createElement("link",{rel:"dns-prefetch",href:"//glitter-services.disqus.com"}),s.a.createElement("link",{rel:"dns-prefetch",href:"//referrer.disqus.com"}),s.a.createElement("link",{rel:"dns-prefetch",href:"https://cse.google.com"}),s.a.createElement("link",{rel:"dns-prefetch",href:"https://www.google-analytics.com"}),s.a.createElement("link",{rel:"dns-prefetch",href:"http://www.google.com"}),s.a.createElement("link",{rel:"dns-prefetch",href:"http://ajax.googleapis.com"}),s.a.createElement("link",{rel:"dns-prefetch",href:"http://fonts.googleapis.com"}),s.a.createElement("meta",{name:"twitter:card",content:"summary"}),s.a.createElement("meta",{name:"twitter:site",content:"@webuniverseio"}),s.a.createElement("meta",{property:"og:url",content:""+l+a}),s.a.createElement("meta",{name:"twitter:url",content:""+l+a}),s.a.createElement("meta",{property:"og:title",content:n}),s.a.createElement("meta",{name:"twitter:title",content:n}),s.a.createElement("meta",{property:"og:site_name",content:p}),s.a.createElement("meta",{property:"og:type",content:r?"article":"website"}),r&&[s.a.createElement("meta",{key:"article:publisher",property:"article:publisher",content:"https://www.facebook.com/webuniverseio"}),s.a.createElement("meta",{key:"article:published_time",property:"article:published_time",content:i})],s.a.createElement("meta",{name:"description",content:o}),s.a.createElement("meta",{property:"og:description",content:o}),s.a.createElement("meta",{name:"twitter:description",content:o}),s.a.createElement("meta",{property:"og:image",content:c}),s.a.createElement("meta",{name:"twitter:image",content:c}),s.a.createElement("meta",{name:"format-detection",content:"telephone=no"}),s.a.createElement("title",null,n),a&&s.a.createElement("link",{rel:"canonical",href:a}),s.a.createElement("link",{rel:"apple-touch-icon",sizes:"57x57",href:_+"apple-touch-icon-57x57.png"}),s.a.createElement("link",{rel:"apple-touch-icon",sizes:"114x114",href:_+"apple-touch-icon-114x114.png"}),s.a.createElement("link",{rel:"apple-touch-icon",sizes:"72x72",href:_+"apple-touch-icon-72x72.png"}),s.a.createElement("link",{rel:"apple-touch-icon",sizes:"144x144",href:_+"apple-touch-icon-144x144.png"}),s.a.createElement("link",{rel:"apple-touch-icon",sizes:"60x60",href:_+"apple-touch-icon-60x60.png"}),s.a.createElement("link",{rel:"apple-touch-icon",sizes:"120x120",href:_+"apple-touch-icon-120x120.png"}),s.a.createElement("link",{rel:"apple-touch-icon",sizes:"76x76",href:_+"apple-touch-icon-76x76.png"}),s.a.createElement("link",{rel:"apple-touch-icon",sizes:"152x152",href:_+"apple-touch-icon-152x152.png"}),s.a.createElement("link",{rel:"apple-touch-icon",sizes:"180x180",href:_+"apple-touch-icon-180x180.png"}),s.a.createElement("link",{rel:"icon",type:"image/png",href:_+"favicon-192x192.png",sizes:"192x192"}),s.a.createElement("link",{rel:"icon",type:"image/png",href:_+"favicon-160x160.png",sizes:"160x160"}),s.a.createElement("link",{rel:"icon",type:"image/png",href:_+"favicon-96x96.png",sizes:"96x96"}),s.a.createElement("link",{rel:"icon",type:"image/png",href:_+"favicon-16x16.png",sizes:"16x16"}),s.a.createElement("link",{rel:"icon",type:"image/png",href:_+"favicon-32x32.png",sizes:"32x32"}),s.a.createElement("meta",{name:"msapplication-TileColor",content:"#2b5797"}),s.a.createElement("meta",{name:"msapplication-TileImage",content:_+"mstile-144x144.png"}))},data:M})}),N=a(596),L=a.n(N);a.d(t,"a",function(){return O});var O=function(e){function t(){return e.apply(this,arguments)||this}r()(t,e);var a=t.prototype;return a.componentDidMount=function(){var e,t,a,n,r,i;window.layoutScriptsInitialized?(window.ga("send","pageview"),window.google&&window.google.search.cse.element.render({div:"gcse-search",tag:"search"})):(window.layoutScriptsInitialized=!0,window.WebFontConfig={google:{families:["Slabo+27px"]}},function(){var e=document.createElement("script");e.src=("https:"==document.location.protocol?"https":"http")+"://ajax.googleapis.com/ajax/libs/webfont/1.5.10/webfont.js",e.type="text/javascript",e.async="true";var t=document.getElementsByTagName("script")[0];t.parentNode.insertBefore(e,t)}(),function(){var e=document.createElement("script");e.type="text/javascript",e.async=!0,e.src=("https:"==document.location.protocol?"https:":"http:")+"//www.google.com/cse/cse.js?cx=014578715170147478038:jt5g2str_f0";var t=document.getElementsByTagName("script")[0];t.parentNode.insertBefore(e,t)}(),e=window,t=document,a="script",n="ga",e.GoogleAnalyticsObject=n,e.ga=e.ga||function(){(e.ga.q=e.ga.q||[]).push(arguments)},e.ga.l=1*new Date,r=t.createElement(a),i=t.getElementsByTagName(a)[0],r.async=1,r.src="//www.google-analytics.com/analytics.js",i.parentNode.insertBefore(r,i),window.ga("create","UA-57969778-1","auto"),window.ga("send","pageview"))},a.render=function(){var e=this.props,t=e.children,a=e.url,n=e.isPost,r=e.publishDate,i=e.image,c=e.title,p=e.description;return s.a.createElement(o.MDXProvider,{components:{code:S}},s.a.createElement(T,{url:a,isPost:n,publishDate:r,image:i,title:c,description:p}),s.a.createElement("div",{itemScope:!0,itemType:"http://schema.org/WebPage"},s.a.createElement("meta",{itemProp:"typicalAgeRange",content:"17-"}),s.a.createElement("div",{className:L.a.wrapper},s.a.createElement("div",{className:L.a.layoutBase},s.a.createElement(x,null),s.a.createElement("div",{className:L.a.contentWrapper},s.a.createElement("div",{className:L.a.pageContent},s.a.createElement(k,null),s.a.createElement("main",{id:"page-content__main",tabIndex:"0",className:L.a.pageContentMain+" "+L.a.pageContentPadding},t),s.a.createElement(v,null))))),s.a.createElement("noscript",null,s.a.createElement("div",{className:"noscript"},"Javascript is disabled for this site in your browser. Please enable it if you want to see site in more interactive mode. To learn how click"," ",s.a.createElement("a",{className:"noscript-text--alternative",href:"http://www.youtube.com/watch?v=0w8wr8a0r2M"},"here")," ","or"," ",s.a.createElement("a",{className:"noscript-text--alternative",href:"http://www.google.ca/search?q=how+to+enable+javascript&tbs=vid:1"},"here"),"."))))},t}(s.a.PureComponent)},180:function(e,t,a){var n={"./Binary_Property/ASCII.js":181,"./Binary_Property/ASCII_Hex_Digit.js":182,"./Binary_Property/Alphabetic.js":183,"./Binary_Property/Any.js":184,"./Binary_Property/Assigned.js":185,"./Binary_Property/Bidi_Control.js":186,"./Binary_Property/Bidi_Mirrored.js":187,"./Binary_Property/Case_Ignorable.js":188,"./Binary_Property/Cased.js":189,"./Binary_Property/Changes_When_Casefolded.js":190,"./Binary_Property/Changes_When_Casemapped.js":191,"./Binary_Property/Changes_When_Lowercased.js":192,"./Binary_Property/Changes_When_NFKC_Casefolded.js":193,"./Binary_Property/Changes_When_Titlecased.js":194,"./Binary_Property/Changes_When_Uppercased.js":195,"./Binary_Property/Dash.js":196,"./Binary_Property/Default_Ignorable_Code_Point.js":197,"./Binary_Property/Deprecated.js":198,"./Binary_Property/Diacritic.js":199,"./Binary_Property/Emoji.js":200,"./Binary_Property/Emoji_Component.js":201,"./Binary_Property/Emoji_Modifier.js":202,"./Binary_Property/Emoji_Modifier_Base.js":203,"./Binary_Property/Emoji_Presentation.js":204,"./Binary_Property/Extended_Pictographic.js":205,"./Binary_Property/Extender.js":206,"./Binary_Property/Grapheme_Base.js":207,"./Binary_Property/Grapheme_Extend.js":208,"./Binary_Property/Hex_Digit.js":209,"./Binary_Property/IDS_Binary_Operator.js":210,"./Binary_Property/IDS_Trinary_Operator.js":211,"./Binary_Property/ID_Continue.js":212,"./Binary_Property/ID_Start.js":213,"./Binary_Property/Ideographic.js":214,"./Binary_Property/Join_Control.js":215,"./Binary_Property/Logical_Order_Exception.js":216,"./Binary_Property/Lowercase.js":217,"./Binary_Property/Math.js":218,"./Binary_Property/Noncharacter_Code_Point.js":219,"./Binary_Property/Pattern_Syntax.js":220,"./Binary_Property/Pattern_White_Space.js":221,"./Binary_Property/Quotation_Mark.js":222,"./Binary_Property/Radical.js":223,"./Binary_Property/Regional_Indicator.js":224,"./Binary_Property/Sentence_Terminal.js":225,"./Binary_Property/Soft_Dotted.js":226,"./Binary_Property/Terminal_Punctuation.js":227,"./Binary_Property/Unified_Ideograph.js":228,"./Binary_Property/Uppercase.js":229,"./Binary_Property/Variation_Selector.js":230,"./Binary_Property/White_Space.js":231,"./Binary_Property/XID_Continue.js":232,"./Binary_Property/XID_Start.js":233,"./General_Category/Cased_Letter.js":234,"./General_Category/Close_Punctuation.js":235,"./General_Category/Connector_Punctuation.js":236,"./General_Category/Control.js":237,"./General_Category/Currency_Symbol.js":238,"./General_Category/Dash_Punctuation.js":239,"./General_Category/Decimal_Number.js":240,"./General_Category/Enclosing_Mark.js":241,"./General_Category/Final_Punctuation.js":242,"./General_Category/Format.js":243,"./General_Category/Initial_Punctuation.js":244,"./General_Category/Letter.js":245,"./General_Category/Letter_Number.js":246,"./General_Category/Line_Separator.js":247,"./General_Category/Lowercase_Letter.js":248,"./General_Category/Mark.js":249,"./General_Category/Math_Symbol.js":250,"./General_Category/Modifier_Letter.js":251,"./General_Category/Modifier_Symbol.js":252,"./General_Category/Nonspacing_Mark.js":253,"./General_Category/Number.js":254,"./General_Category/Open_Punctuation.js":255,"./General_Category/Other.js":256,"./General_Category/Other_Letter.js":257,"./General_Category/Other_Number.js":258,"./General_Category/Other_Punctuation.js":259,"./General_Category/Other_Symbol.js":260,"./General_Category/Paragraph_Separator.js":261,"./General_Category/Private_Use.js":262,"./General_Category/Punctuation.js":263,"./General_Category/Separator.js":264,"./General_Category/Space_Separator.js":265,"./General_Category/Spacing_Mark.js":266,"./General_Category/Surrogate.js":267,"./General_Category/Symbol.js":268,"./General_Category/Titlecase_Letter.js":269,"./General_Category/Unassigned.js":270,"./General_Category/Uppercase_Letter.js":271,"./Script/Adlam.js":272,"./Script/Ahom.js":273,"./Script/Anatolian_Hieroglyphs.js":274,"./Script/Arabic.js":275,"./Script/Armenian.js":276,"./Script/Avestan.js":277,"./Script/Balinese.js":278,"./Script/Bamum.js":279,"./Script/Bassa_Vah.js":280,"./Script/Batak.js":281,"./Script/Bengali.js":282,"./Script/Bhaiksuki.js":283,"./Script/Bopomofo.js":284,"./Script/Brahmi.js":285,"./Script/Braille.js":286,"./Script/Buginese.js":287,"./Script/Buhid.js":288,"./Script/Canadian_Aboriginal.js":289,"./Script/Carian.js":290,"./Script/Caucasian_Albanian.js":291,"./Script/Chakma.js":292,"./Script/Cham.js":293,"./Script/Cherokee.js":294,"./Script/Common.js":295,"./Script/Coptic.js":296,"./Script/Cuneiform.js":297,"./Script/Cypriot.js":298,"./Script/Cyrillic.js":299,"./Script/Deseret.js":300,"./Script/Devanagari.js":301,"./Script/Dogra.js":302,"./Script/Duployan.js":303,"./Script/Egyptian_Hieroglyphs.js":304,"./Script/Elbasan.js":305,"./Script/Ethiopic.js":306,"./Script/Georgian.js":307,"./Script/Glagolitic.js":308,"./Script/Gothic.js":309,"./Script/Grantha.js":310,"./Script/Greek.js":311,"./Script/Gujarati.js":312,"./Script/Gunjala_Gondi.js":313,"./Script/Gurmukhi.js":314,"./Script/Han.js":315,"./Script/Hangul.js":316,"./Script/Hanifi_Rohingya.js":317,"./Script/Hanunoo.js":318,"./Script/Hatran.js":319,"./Script/Hebrew.js":320,"./Script/Hiragana.js":321,"./Script/Imperial_Aramaic.js":322,"./Script/Inherited.js":323,"./Script/Inscriptional_Pahlavi.js":324,"./Script/Inscriptional_Parthian.js":325,"./Script/Javanese.js":326,"./Script/Kaithi.js":327,"./Script/Kannada.js":328,"./Script/Katakana.js":329,"./Script/Kayah_Li.js":330,"./Script/Kharoshthi.js":331,"./Script/Khmer.js":332,"./Script/Khojki.js":333,"./Script/Khudawadi.js":334,"./Script/Lao.js":335,"./Script/Latin.js":336,"./Script/Lepcha.js":337,"./Script/Limbu.js":338,"./Script/Linear_A.js":339,"./Script/Linear_B.js":340,"./Script/Lisu.js":341,"./Script/Lycian.js":342,"./Script/Lydian.js":343,"./Script/Mahajani.js":344,"./Script/Makasar.js":345,"./Script/Malayalam.js":346,"./Script/Mandaic.js":347,"./Script/Manichaean.js":348,"./Script/Marchen.js":349,"./Script/Masaram_Gondi.js":350,"./Script/Medefaidrin.js":351,"./Script/Meetei_Mayek.js":352,"./Script/Mende_Kikakui.js":353,"./Script/Meroitic_Cursive.js":354,"./Script/Meroitic_Hieroglyphs.js":355,"./Script/Miao.js":356,"./Script/Modi.js":357,"./Script/Mongolian.js":358,"./Script/Mro.js":359,"./Script/Multani.js":360,"./Script/Myanmar.js":361,"./Script/Nabataean.js":362,"./Script/New_Tai_Lue.js":363,"./Script/Newa.js":364,"./Script/Nko.js":365,"./Script/Nushu.js":366,"./Script/Ogham.js":367,"./Script/Ol_Chiki.js":368,"./Script/Old_Hungarian.js":369,"./Script/Old_Italic.js":370,"./Script/Old_North_Arabian.js":371,"./Script/Old_Permic.js":372,"./Script/Old_Persian.js":373,"./Script/Old_Sogdian.js":374,"./Script/Old_South_Arabian.js":375,"./Script/Old_Turkic.js":376,"./Script/Oriya.js":377,"./Script/Osage.js":378,"./Script/Osmanya.js":379,"./Script/Pahawh_Hmong.js":380,"./Script/Palmyrene.js":381,"./Script/Pau_Cin_Hau.js":382,"./Script/Phags_Pa.js":383,"./Script/Phoenician.js":384,"./Script/Psalter_Pahlavi.js":385,"./Script/Rejang.js":386,"./Script/Runic.js":387,"./Script/Samaritan.js":388,"./Script/Saurashtra.js":389,"./Script/Sharada.js":390,"./Script/Shavian.js":391,"./Script/Siddham.js":392,"./Script/SignWriting.js":393,"./Script/Sinhala.js":394,"./Script/Sogdian.js":395,"./Script/Sora_Sompeng.js":396,"./Script/Soyombo.js":397,"./Script/Sundanese.js":398,"./Script/Syloti_Nagri.js":399,"./Script/Syriac.js":400,"./Script/Tagalog.js":401,"./Script/Tagbanwa.js":402,"./Script/Tai_Le.js":403,"./Script/Tai_Tham.js":404,"./Script/Tai_Viet.js":405,"./Script/Takri.js":406,"./Script/Tamil.js":407,"./Script/Tangut.js":408,"./Script/Telugu.js":409,"./Script/Thaana.js":410,"./Script/Thai.js":411,"./Script/Tibetan.js":412,"./Script/Tifinagh.js":413,"./Script/Tirhuta.js":414,"./Script/Ugaritic.js":415,"./Script/Vai.js":416,"./Script/Warang_Citi.js":417,"./Script/Yi.js":418,"./Script/Zanabazar_Square.js":419,"./Script_Extensions/Adlam.js":420,"./Script_Extensions/Ahom.js":421,"./Script_Extensions/Anatolian_Hieroglyphs.js":422,"./Script_Extensions/Arabic.js":423,"./Script_Extensions/Armenian.js":424,"./Script_Extensions/Avestan.js":425,"./Script_Extensions/Balinese.js":426,"./Script_Extensions/Bamum.js":427,"./Script_Extensions/Bassa_Vah.js":428,"./Script_Extensions/Batak.js":429,"./Script_Extensions/Bengali.js":430,"./Script_Extensions/Bhaiksuki.js":431,"./Script_Extensions/Bopomofo.js":432,"./Script_Extensions/Brahmi.js":433,"./Script_Extensions/Braille.js":434,"./Script_Extensions/Buginese.js":435,"./Script_Extensions/Buhid.js":436,"./Script_Extensions/Canadian_Aboriginal.js":437,"./Script_Extensions/Carian.js":438,"./Script_Extensions/Caucasian_Albanian.js":439,"./Script_Extensions/Chakma.js":440,"./Script_Extensions/Cham.js":441,"./Script_Extensions/Cherokee.js":442,"./Script_Extensions/Common.js":443,"./Script_Extensions/Coptic.js":444,"./Script_Extensions/Cuneiform.js":445,"./Script_Extensions/Cypriot.js":446,"./Script_Extensions/Cyrillic.js":447,"./Script_Extensions/Deseret.js":448,"./Script_Extensions/Devanagari.js":449,"./Script_Extensions/Dogra.js":450,"./Script_Extensions/Duployan.js":451,"./Script_Extensions/Egyptian_Hieroglyphs.js":452,"./Script_Extensions/Elbasan.js":453,"./Script_Extensions/Ethiopic.js":454,"./Script_Extensions/Georgian.js":455,"./Script_Extensions/Glagolitic.js":456,"./Script_Extensions/Gothic.js":457,"./Script_Extensions/Grantha.js":458,"./Script_Extensions/Greek.js":459,"./Script_Extensions/Gujarati.js":460,"./Script_Extensions/Gunjala_Gondi.js":461,"./Script_Extensions/Gurmukhi.js":462,"./Script_Extensions/Han.js":463,"./Script_Extensions/Hangul.js":464,"./Script_Extensions/Hanifi_Rohingya.js":465,"./Script_Extensions/Hanunoo.js":466,"./Script_Extensions/Hatran.js":467,"./Script_Extensions/Hebrew.js":468,"./Script_Extensions/Hiragana.js":469,"./Script_Extensions/Imperial_Aramaic.js":470,"./Script_Extensions/Inherited.js":471,"./Script_Extensions/Inscriptional_Pahlavi.js":472,"./Script_Extensions/Inscriptional_Parthian.js":473,"./Script_Extensions/Javanese.js":474,"./Script_Extensions/Kaithi.js":475,"./Script_Extensions/Kannada.js":476,"./Script_Extensions/Katakana.js":477,"./Script_Extensions/Kayah_Li.js":478,"./Script_Extensions/Kharoshthi.js":479,"./Script_Extensions/Khmer.js":480,"./Script_Extensions/Khojki.js":481,"./Script_Extensions/Khudawadi.js":482,"./Script_Extensions/Lao.js":483,"./Script_Extensions/Latin.js":484,"./Script_Extensions/Lepcha.js":485,"./Script_Extensions/Limbu.js":486,"./Script_Extensions/Linear_A.js":487,"./Script_Extensions/Linear_B.js":488,"./Script_Extensions/Lisu.js":489,"./Script_Extensions/Lycian.js":490,"./Script_Extensions/Lydian.js":491,"./Script_Extensions/Mahajani.js":492,"./Script_Extensions/Makasar.js":493,"./Script_Extensions/Malayalam.js":494,"./Script_Extensions/Mandaic.js":495,"./Script_Extensions/Manichaean.js":496,"./Script_Extensions/Marchen.js":497,"./Script_Extensions/Masaram_Gondi.js":498,"./Script_Extensions/Medefaidrin.js":499,"./Script_Extensions/Meetei_Mayek.js":500,"./Script_Extensions/Mende_Kikakui.js":501,"./Script_Extensions/Meroitic_Cursive.js":502,"./Script_Extensions/Meroitic_Hieroglyphs.js":503,"./Script_Extensions/Miao.js":504,"./Script_Extensions/Modi.js":505,"./Script_Extensions/Mongolian.js":506,"./Script_Extensions/Mro.js":507,"./Script_Extensions/Multani.js":508,"./Script_Extensions/Myanmar.js":509,"./Script_Extensions/Nabataean.js":510,"./Script_Extensions/New_Tai_Lue.js":511,"./Script_Extensions/Newa.js":512,"./Script_Extensions/Nko.js":513,"./Script_Extensions/Nushu.js":514,"./Script_Extensions/Ogham.js":515,"./Script_Extensions/Ol_Chiki.js":516,"./Script_Extensions/Old_Hungarian.js":517,"./Script_Extensions/Old_Italic.js":518,"./Script_Extensions/Old_North_Arabian.js":519,"./Script_Extensions/Old_Permic.js":520,"./Script_Extensions/Old_Persian.js":521,"./Script_Extensions/Old_Sogdian.js":522,"./Script_Extensions/Old_South_Arabian.js":523,"./Script_Extensions/Old_Turkic.js":524,"./Script_Extensions/Oriya.js":525,"./Script_Extensions/Osage.js":526,"./Script_Extensions/Osmanya.js":527,"./Script_Extensions/Pahawh_Hmong.js":528,"./Script_Extensions/Palmyrene.js":529,"./Script_Extensions/Pau_Cin_Hau.js":530,"./Script_Extensions/Phags_Pa.js":531,"./Script_Extensions/Phoenician.js":532,"./Script_Extensions/Psalter_Pahlavi.js":533,"./Script_Extensions/Rejang.js":534,"./Script_Extensions/Runic.js":535,"./Script_Extensions/Samaritan.js":536,"./Script_Extensions/Saurashtra.js":537,"./Script_Extensions/Sharada.js":538,"./Script_Extensions/Shavian.js":539,"./Script_Extensions/Siddham.js":540,"./Script_Extensions/SignWriting.js":541,"./Script_Extensions/Sinhala.js":542,"./Script_Extensions/Sogdian.js":543,"./Script_Extensions/Sora_Sompeng.js":544,"./Script_Extensions/Soyombo.js":545,"./Script_Extensions/Sundanese.js":546,"./Script_Extensions/Syloti_Nagri.js":547,"./Script_Extensions/Syriac.js":548,"./Script_Extensions/Tagalog.js":549,"./Script_Extensions/Tagbanwa.js":550,"./Script_Extensions/Tai_Le.js":551,"./Script_Extensions/Tai_Tham.js":552,"./Script_Extensions/Tai_Viet.js":553,"./Script_Extensions/Takri.js":554,"./Script_Extensions/Tamil.js":555,"./Script_Extensions/Tangut.js":556,"./Script_Extensions/Telugu.js":557,"./Script_Extensions/Thaana.js":558,"./Script_Extensions/Thai.js":559,"./Script_Extensions/Tibetan.js":560,"./Script_Extensions/Tifinagh.js":561,"./Script_Extensions/Tirhuta.js":562,"./Script_Extensions/Ugaritic.js":563,"./Script_Extensions/Vai.js":564,"./Script_Extensions/Warang_Citi.js":565,"./Script_Extensions/Yi.js":566,"./Script_Extensions/Zanabazar_Square.js":567,"./index.js":568,"./unicode-version.js":569};function r(e){var t=i(e);return a(t)}function i(e){var t=n[e];if(!(t+1)){var a=new Error("Cannot find module '"+e+"'");throw a.code="MODULE_NOT_FOUND",a}return t}r.keys=function(){return Object.keys(n)},r.resolve=i,e.exports=r,r.id=180},578:function(e,t,a){"use strict";a.r(t);var n=a(14),r=a.n(n),i=a(0),s=a.n(i),o=a(4),c=a.n(o),p=a(73),l=a(2),_=function(e){var t=e.location,a=l.default.getResourcesForPathnameSync(t.pathname);return s.a.createElement(p.a,r()({location:t,pageResources:a},a.json))};_.propTypes={location:c.a.shape({pathname:c.a.string.isRequired}).isRequired},t.default=_},579:function(e){e.exports={data:{site:{siteMetadata:{basePath:"/"}}}}},580:function(e,t,a){e.exports={header:"Header-module--header--1Op28",logoCircleColor:"Header-module--logoCircleColor--1tkFQ",logo:"Header-module--logo--3yAKW",logoUniverse:"Header-module--logoUniverse--228x7"}},581:function(e){e.exports={data:{site:{siteMetadata:{author:"Sergey Zarouski"}}}}},582:function(e,t,a){e.exports={footer:"Footer-module--footer--1AXXX"}},583:function(e){e.exports={data:{allMdx:{edges:[{node:{frontmatter:{title:"About"},fields:{slug:"/about/"}}},{node:{frontmatter:{title:"Projects"},fields:{slug:"/projects/"}}},{node:{frontmatter:{title:"Recommended"},fields:{slug:"/recommended/"}}},{node:{frontmatter:{title:"Contact"},fields:{slug:"/contact/"}}}]}}}},584:function(e,t,a){e.exports={topBar:"TopBar-module--topBar--2CchJ",navigation:"TopBar-module--navigation--24o6I",navigation__separator:"TopBar-module--navigation__separator--1VawK",navigation__skip:"TopBar-module--navigation__skip--3GTFo",search:"TopBar-module--search--Em2TM"}},585:function(e){e.exports={data:{site:{siteMetadata:{title:"Web Universe",siteUrl:"http://webuniverse.io",basePath:"/",description:"Technical blog about web development, javascript, css, html, accessibility and many other cool things."}}}}},594:function(e,t,a){},595:function(e,t,a){},596:function(e,t,a){e.exports={wrapper:"Layout-module--wrapper--3bVQH",layoutBase:"Layout-module--layoutBase--2SXw6",contentWrapper:"Layout-module--contentWrapper--16aOg",pageContent:"Layout-module--pageContent--zJ0oo",pageContentPadding:"Layout-module--pageContentPadding--2ki1K",pageContentMain:"Layout-module--pageContentMain--xF1jo"}},597:function(e,t,a){e.exports={datetime:"Date-module--datetime--4zmFm"}}}]);
//# sourceMappingURL=1-540ea30d58a71ecb9e41.js.map