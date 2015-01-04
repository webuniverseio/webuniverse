/*global define:true, console:true*/
define(['appSandbox!', 'jquery'], function (sandbox, $) {
	'use strict';
	/*Custom slider template*/
	//<script type="template"
	//	class="custom-fader-template"
	//	data-item-template="custom-fader-item-template"
	//	data-selectors="div.sortable-list img | .planners img"
	//	data-result-ids="custom-slider-of-sortable-images | custom-fader-of-planners-images"
	//	data-group-number="3"
	//	data-group-class="item three-items-in-a-row adjust-items-in-a-row">
	//	<!-- markup -->
	//</script>
	//<script type="template" id="custom-fader-item-template">
	//	<figure class="item">
	//		%s
	//	</figure>
	//</script>
	var doc = document,
		$win = $(window);

	function createGetElementOuterHtml(element) {
		return function () {
			var outerHTML = element.outerHTML,
				div,
				clone;

			if (outerHTML) {
				return outerHTML;
			} else {
				div = doc.createElement('div');
				div.appendChild(element.cloneNode(true));
				return div.innerHTML;
			}
		};
	}

	//for template find item selectors and template
	var initTemplate = function (template) {
		var i,
			compiledTemplate,
			itemTemplate,
			groupNumber,
			groupClass,

			itemSelectors,
			itemSelectorsCount,
			itemSelector,
			//number of ids should match number of selectors
			itemIds,
			itemId,

			items,
			itemsCount,
			itemsLastIndex,
			item,
			itemsCompiledTemplate,

			outputNodes = {};

		//>>excludeStart("production", pragmas.production);
		console.assert(
			template && template.innerHTML,
			'can\'t find template',
			template
		);
		//>>excludeEnd("production");

		itemTemplate = doc.getElementById(template.getAttribute('data-item-template'));
		itemTemplate && (itemTemplate = itemTemplate.innerHTML);
		if (!itemTemplate) {
			//>>excludeStart("production", pragmas.production);
			console.error('can\'t find item template with specified id', template.getAttribute('data-item-template'));
			//>>excludeEnd("production");
			return;
		}

		itemSelectors = template.getAttribute('data-selectors');
		itemSelectors && (itemSelectors = itemSelectors.split('|'));
		if (!itemSelectors) {
			//>>excludeStart("production", pragmas.production);
			console.error('data-selectors is empty or not specified in:', template);
			//>>excludeEnd("production");
			return;
		}

		itemIds = template.getAttribute('data-result-ids');
		itemIds && (itemIds = itemIds.split('|'));
		if (!itemIds) {
			//>>excludeStart("production", pragmas.production);
			console.error('data-result-ids is empty or not specified in:', template);
			//>>excludeEnd("production");
			return;
		}


		groupNumber = Number(template.getAttribute('data-group-number'));
		groupClass = template.getAttribute('data-group-class');
		itemSelectorsCount = itemSelectors.length;

		//>>excludeStart("production", pragmas.production);
		console.assert(
			itemSelectorsCount === itemIds.length,
			'selectors (' + itemSelectorsCount + ') and result-ids (' + itemIds.length + ') length should match'
		);
		//>>excludeEnd("production");

		//replace node with actual template
		template = template.innerHTML;

		//for selector find items, save compiled html to array, replace template with resulting compiled html
		while (itemSelectorsCount--) {
			itemId = itemIds[itemSelectorsCount];
			if (!~itemId.search(/^[a-z\-\d]+$/i)) {
				//>>excludeStart("production", pragmas.production);
				console.error('id format is invalid: ', itemId);
				//>>excludeEnd("production");
				continue;
			}

			itemSelector = itemSelectors[itemSelectorsCount];
			items = $(itemSelector);
			itemsCount = items.length;
			if (!itemsCount) {
				//>>excludeStart("production", pragmas.production);
				console.assert(
					itemSelector,
					'selector is empty or doesn\'t match any elements on the page',
					itemSelector
				);
				//>>excludeEnd("production");
				continue;
			}

			i = 0;
			itemsCompiledTemplate = [];

			if (groupClass && groupNumber) {
				itemsLastIndex = itemsCount - 1;
				//items grouped
				while (i < itemsCount) {
					item = items[i];
					//start of the group for the first item
					if (i === 0) {
						itemsCompiledTemplate[i] = '<div class="' + groupClass + '">';
						itemsCompiledTemplate[i] += itemTemplate.replace(/%s/, createGetElementOuterHtml(item));

						//first item could be the last too
						if (i === itemsLastIndex) {
							itemsCompiledTemplate[i] += '</div>\n';
						}
					//end of the group for the last item
					} else if (i === itemsLastIndex) {
						//last item could be an item in matching group interval
						if (i % groupNumber === 0) {
							itemsCompiledTemplate[i] = '</div>\n<div class="' + groupClass + '">';
							itemsCompiledTemplate[i] += itemTemplate.replace(/%s/, createGetElementOuterHtml(item));
						} else {
							itemsCompiledTemplate[i] = itemTemplate.replace(/%s/, createGetElementOuterHtml(item));
						}

						itemsCompiledTemplate[i] += '</div>\n';
					//separator group for item in matching interval
					} else if (i % groupNumber === 0) {
						itemsCompiledTemplate[i] = '</div>\n<div class="' + groupClass + '">';
						itemsCompiledTemplate[i] += itemTemplate.replace(/%s/, createGetElementOuterHtml(item));
					//all other items
					} else {
						itemsCompiledTemplate[i] = itemTemplate.replace(/%s/, createGetElementOuterHtml(item));
					}

					++i;
				}
			} else {
				//items not grouped
				while (i < itemsCount) {
					item = items[i];
					if (i === 0) {
						itemsCompiledTemplate[i] = itemTemplate.replace(/%s/, createGetElementOuterHtml(item));
					}
					++i;
				}
			}
			compiledTemplate = template.replace(/%s/, itemsCompiledTemplate.join('\n'));
			//finally add nodes to output object
			outputNodes[itemId] = $(compiledTemplate).attr('id', itemId).get(0);
		}

		return outputNodes;
	};

	if (!sandbox.isDevMode) {
		initTemplate = sandbox.makeSafeFunction(initTemplate, 'initTemplate');
	}

	$win.on('init.dynamicTemplate', function handleInitRequest(e, data) {
		//>>excludeStart("production", pragmas.production);
		console.assert(
			data,
			'data not passed, sample format {selectors: [s1,s2,s3], (optional) onInitDone: function () {}}, instead saw: ',
			data
		);
		//>>excludeEnd("production");
		if (!(data && data.selectors && data.selectors.length)) {
			return;
		}
		var templateSelectors = data.selectors,
			i = 0,
			il = templateSelectors.length,
			results,
			wasInitDonePassed = typeof data.onInitDone === 'function';
		for (; i < il; i++) {
			results = initTemplate(templateSelectors[i]);
			if (wasInitDonePassed) {
				data.onInitDone(results);
			}

		}
	});

	return {
		init: initTemplate
	};
});