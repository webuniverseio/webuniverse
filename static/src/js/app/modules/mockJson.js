/*global define, console, _*/
define(['jquery', 'underscore', 'jqMockjson'], function ($) {
	'use strict';
	function init(sandbox) {
		var types = [
				'Commercial Retail',
				'Industrial',
				'Medical',
				'Office',
				'Retail',
				'Retail Service'
			],
			cities = [
				'Barrie',
				'Bolton',
				'Brampton',
				'Brantford',
				'Burlington',
				'Cambridge',
				'Chatham',
				'Cornwall',
				'Etobicoke',
				'Listowell',
				'London',
				'North Bay',
				'Orangeville',
				'Orillia',
				'Oshawa',
				'Richmond Hill',
				'St. Catharines',
				'Stoney Creek',
				'Sudbury',
				'Tecumseh',
				'Toronto',
				'Wassaga Beach',
				'Windsor'
			],
			footageRanges = [
				'1', //1-  500 Sq Ft
				'2', //5,00-  1,000 Sq Ft
				'3', //1,000-  2,000 Sq Ft
				'4', //2,000-  3,000 Sq Ft
				'5', //3,000-  4,000 Sq Ft
				'6', //4,000-  5,000 Sq Ft
				'7', //Over 5,000 Sq Ft
				'8', //Over 10,000 Sq Ft
				'9', //Over 15,000 Sq Ft
				'10' //Over 20,000 Sq Ft
			];

		_.extend($.mockJSON.data, {
			TYPE: types,
			TYPEID: _.map(types, function (v, i) {
				return i;
			}),
			CITY: cities,
			FOOTAGERANGE: footageRanges
		});

		function makePropertiesTemplate(forCount) {
			var contents = [{
					'id|+1' : 0,
					'title|4-10' : '@LOREM ',
					'address|10-20': '@LOREM ',
					'city': '@CITY',
					'province': '',
					'footage|1-5' : '@NUMBER',
					'squareFootageRange': '@FOOTAGERANGE',
					'imageUrl': sandbox.appSettings.rootPath + 'images/samples/230-148-search-result.jpg',
					'leasing' : (function () {
						return _.random(0, 1).toString();
					}()),
					'typeId': '@TYPEID',
					'type' : '@TYPE',
					'postal': '@LETTER_UPPER@NUMBER@LETTER_UPPER @NUMBER@LETTER_UPPER@NUMBER',
					'description' : '@LOREM_IPSUM'
				}],
				template = {};

			template['properties|%n-%n'.replace(/%n/g, forCount)] = contents;

			return template;
		}

		$.mockJSON(new RegExp(sandbox.appSettings.propertiesUrl), makePropertiesTemplate(5));
		$.mockJSON(new RegExp(sandbox.appSettings.propertyUrl), makePropertiesTemplate(1));
		$.mockJSON(new RegExp(sandbox.appSettings.citiesJson), {
			'cities|20-30' :  [{
				'City': '@CITY'
			}]
		});
	}

	return {
		init: init
	};
});