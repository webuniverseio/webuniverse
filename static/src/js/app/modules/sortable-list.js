/*global define:true, List:true, doHighlight:true, console:true*/
define(['appSandbox!', 'jquery', 'sortFilterList', 'textHighlight', 'shimInsertAdjacentHTML'], function (sandbox, $) {
	'use strict';

	var doc = document,

		//adds filter bar from template, assigns filters based on list attributes,
		//updates results when matches change
		initFilter = function (listBoxes, listOptions) {
			if (!(listBoxes instanceof Object)) {
				throw new TypeError('initFilter()[0]: expected lists, instead got ' + typeof listBoxes);
			}

			var listBox = null,
				$list = null,
				listBoxesCount = listBoxes.length,
				listFilters = null,
				listTemplate = null,
				listObj = null,
				$filterBarNode = null,
				$searchInputNode = null,
				resultsNumberNode = null,
				listOptionsCallback;

			while (listBoxesCount) {
				listBox = listBoxes[--listBoxesCount];
				//>>excludeStart("production", pragmas.production);
				if (!listBox) {
					console.error('listBox not set', listBox);
					continue;
				}
				//>>excludeEnd("production");

				$list = $(listBox).find('> .list');
				//>>excludeStart("production", pragmas.production);
				if (!$list.length) {
					console.error('> .list not found', listBox);
					continue;
				}
				//>>excludeEnd("production");

				//>>excludeStart("production", pragmas.production);
				if (!listBox.getAttribute('data-class-filters')) {
					console.error('sortable list filters not set' + listBox);
				}
				//>>excludeEnd("production");
				//filters should be comma separated values stored in data-class-filters attribute
				listFilters = listBox.getAttribute('data-class-filters').split(',');

				//append template inside the listBox
				listTemplate = listBox.getAttribute('data-template');
				//>>excludeStart("production", pragmas.production);
				if (!doc.getElementById(listTemplate)) {
					console.error('listTemplate can\'t be found: ', listTemplate);
					continue;
				}
				//>>excludeEnd("production");

				listBox.insertAdjacentHTML('afterbegin', doc.getElementById(listTemplate).innerHTML);
				$filterBarNode = $(listBox.getElementsByTagName('div')[0]);

				//get results node in filter bar
				resultsNumberNode = $filterBarNode.find('.results span')[0];
				//get search input node in filter bar
				$searchInputNode = $filterBarNode.find('input.search');

				listObj = new List(listBox, {
					valueNames: listFilters
				});

				//check if list options were passed, see if current template is in the list,
				//is yes save it's value which we expect to be a function in a local variable callback
				if (listOptions && (listOptionsCallback = listOptions[listTemplate]) && typeof listOptionsCallback === 'function') {
					listOptionsCallback(listObj);
				}

				//set initial results number and update results with new number if needed
				if ('textContent' in resultsNumberNode) {
					resultsNumberNode.textContent = listObj.matchingItems.length;
				} else if ('innerText' in resultsNumberNode) {
					resultsNumberNode.innerText = listObj.matchingItems.length;
				}
				listObj.on('updated', setResultsValue(resultsNumberNode, listObj));
				//highlight matching text
				$searchInputNode.on('keyup', highlightMatches($list));
			}
		};

	//updates results when needed
	function setResultsValue(resultsNode, listObj) {
		return function () {
			var matchesCount = listObj.matchingItems.length,
				resultsValue = Number(resultsNode.textContent || resultsNode.innerText);

			if (resultsValue !== matchesCount) {
				if ('textContent' in resultsNode) {
					resultsNode.textContent = matchesCount;
				} else if ('innerText' in resultsNode) {
					resultsNode.innerText = matchesCount;
				}
			}
		};
	}

	//Hightlight items as you type filter
	function highlightMatches($box) {
		return function () {
			var searchFor = new RegExp(this.value.replace(/\s+/g, '\\s+'), 'gi');
			resetHighlight($box);
			doHighlight($box[0], 'highlight', searchFor);
		};
	}

	function resetHighlight($box) {
		var elems = $box.find('.highlight'),
			elLength = elems.length,
			e;

		while (elLength--) {
			e = elems[elLength];
			e.parentNode.replaceChild(e.childNodes[0], e);
		}
	}

	if (!sandbox.isDevMode) {
		initFilter = sandbox.makeSafeFunction(initFilter, 'initFilter');
	}

	$(window).on('elementsReady.sortableList', function (e, listBoxes) {
		initFilter(listBoxes);
	});

	return {
		init: initFilter
	};
});