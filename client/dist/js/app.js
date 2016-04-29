( function (angular) {
	angular
		.module('myApp', ['ngRoute', 'ngSanitize', 'highcharts-ng'])
		.config(function($routeProvider) {
			$routeProvider
			.when('/', {
				templateUrl: 'partials/main.html',
				controller: 'homeCtrl',
				controllerAs: 'vm'
			})
			.when('/counts', {
				templateUrl: 'partials/counts.html',
				controller: 'countsCtrl',
				controllerAs: 'vm'
			})
			.when('/posts', {
				templateUrl: 'partials/map_alt.html',
				controller: 'postsCtrl',
				controllerAs: 'vm'
			})
			.when('/maps', {
				templateUrl: 'partials/maps.html',
				controller: 'mapsCtrl',
				controllerAs: 'vm'
			})
			.otherwise({
				redirectTo: '/'
			});
		});

} )(angular);
( function(angular) {
	angular
		.module('myApp')
		.controller('accountsCtrl', accountsCtrl);

	function accountsCtrl() {
		var vm = this;
	}

} )(angular);
( function(angular) {
	angular
		.module('myApp')
		.factory('Category', Category);

	function Category($http) {
		var categories = [
	        {
	            "code": "APET",
	            "group_code": "AAAA",
	            "group_name": "Animals",
	            "name": "Pets"
	        },
	        {
	            "code": "ASUP",
	            "group_code": "AAAA",
	            "group_name": "Animals",
	            "name": "Supplies"
	        },
	        {
	            "code": "AOTH",
	            "group_code": "AAAA",
	            "group_name": "Animals",
	            "name": "Other"
	        },
	        {
	            "code": "CCNW",
	            "group_code": "CCCC",
	            "group_name": "Community",
	            "name": "Classes & Workshops"
	        },
	        {
	            "code": "COMM",
	            "group_code": "CCCC",
	            "group_name": "Community",
	            "name": "Events"
	        },
	        {
	            "code": "CGRP",
	            "group_code": "CCCC",
	            "group_name": "Community",
	            "name": "Groups"
	        },
	        {
	            "code": "CLNF",
	            "group_code": "CCCC",
	            "group_name": "Community",
	            "name": "Lost & Found"
	        },
	        {
	            "code": "CRID",
	            "group_code": "CCCC",
	            "group_name": "Community",
	            "name": "Rideshares"
	        },
	        {
	            "code": "CVOL",
	            "group_code": "CCCC",
	            "group_name": "Community",
	            "name": "Volunteers"
	        },
	        {
	            "code": "COTH",
	            "group_code": "CCCC",
	            "group_name": "Community",
	            "name": "Other"
	        },
	        {
	            "code": "DDEL",
	            "group_code": "DISP",
	            "group_name": "Dispatch",
	            "name": "Delivery"
	        },
	        {
	            "code": "DISP",
	            "group_code": "DISP",
	            "group_name": "Dispatch",
	            "name": "Dispatch"
	        },
	        {
	            "code": "DTAX",
	            "group_code": "DISP",
	            "group_name": "Dispatch",
	            "name": "Taxi"
	        },
	        {
	            "code": "DTOW",
	            "group_code": "DISP",
	            "group_name": "Dispatch",
	            "name": "Tow"
	        },
	        {
	            "code": "SANT",
	            "group_code": "SSSS",
	            "group_name": "For Sale",
	            "name": "Antiques"
	        },
	        {
	            "code": "SAPP",
	            "group_code": "SSSS",
	            "group_name": "For Sale",
	            "name": "Apparel"
	        },
	        {
	            "code": "SAPL",
	            "group_code": "SSSS",
	            "group_name": "For Sale",
	            "name": "Appliances"
	        },
	        {
	            "code": "SANC",
	            "group_code": "SSSS",
	            "group_name": "For Sale",
	            "name": "Art & Crafts"
	        },
	        {
	            "code": "SKID",
	            "group_code": "SSSS",
	            "group_name": "For Sale",
	            "name": "Babies & Kids"
	        },
	        {
	            "code": "SBAR",
	            "group_code": "SSSS",
	            "group_name": "For Sale",
	            "name": "Barters"
	        },
	        {
	            "code": "SBIK",
	            "group_code": "SSSS",
	            "group_name": "For Sale",
	            "name": "Bicycles"
	        },
	        {
	            "code": "SBIZ",
	            "group_code": "SSSS",
	            "group_name": "For Sale",
	            "name": "Businesses"
	        },
	        {
	            "code": "SCOL",
	            "group_code": "SSSS",
	            "group_name": "For Sale",
	            "name": "Collections"
	        },
	        {
	            "code": "SEDU",
	            "group_code": "SSSS",
	            "group_name": "For Sale",
	            "name": "Educational"
	        },
	        {
	            "code": "SELE",
	            "group_code": "SSSS",
	            "group_name": "For Sale",
	            "name": "Electronics & Photo"
	        },
	        {
	            "code": "SFNB",
	            "group_code": "SSSS",
	            "group_name": "For Sale",
	            "name": "Food & Beverage"
	        },
	        {
	            "code": "SFUR",
	            "group_code": "SSSS",
	            "group_name": "For Sale",
	            "name": "Furniture"
	        },
	        {
	            "code": "SGAR",
	            "group_code": "SSSS",
	            "group_name": "For Sale",
	            "name": "Garage Sales"
	        },
	        {
	            "code": "SGFT",
	            "group_code": "SSSS",
	            "group_name": "For Sale",
	            "name": "Gift Cards"
	        },
	        {
	            "code": "SHNB",
	            "group_code": "SSSS",
	            "group_name": "For Sale",
	            "name": "Health & Beauty"
	        },
	        {
	            "code": "SHNG",
	            "group_code": "SSSS",
	            "group_name": "For Sale",
	            "name": "Home & Garden"
	        },
	        {
	            "code": "SIND",
	            "group_code": "SSSS",
	            "group_name": "For Sale",
	            "name": "Industrial"
	        },
	        {
	            "code": "SJWL",
	            "group_code": "SSSS",
	            "group_name": "For Sale",
	            "name": "Jewelry"
	        },
	        {
	            "code": "SLIT",
	            "group_code": "SSSS",
	            "group_name": "For Sale",
	            "name": "Literature"
	        },
	        {
	            "code": "SMNM",
	            "group_code": "SSSS",
	            "group_name": "For Sale",
	            "name": "Movies & Music"
	        },
	        {
	            "code": "SMUS",
	            "group_code": "SSSS",
	            "group_name": "For Sale",
	            "name": "Musical Instruments"
	        },
	        {
	            "code": "SRES",
	            "group_code": "SSSS",
	            "group_name": "For Sale",
	            "name": "Restaurants"
	        },
	        {
	            "code": "SSNF",
	            "group_code": "SSSS",
	            "group_name": "For Sale",
	            "name": "Sports & Fitness"
	        },
	        {
	            "code": "STIX",
	            "group_code": "SSSS",
	            "group_name": "For Sale",
	            "name": "Tickets"
	        },
	        {
	            "code": "STOO",
	            "group_code": "SSSS",
	            "group_name": "For Sale",
	            "name": "Tools"
	        },
	        {
	            "code": "STOY",
	            "group_code": "SSSS",
	            "group_name": "For Sale",
	            "name": "Toys & Hobbies"
	        },
	        {
	            "code": "STVL",
	            "group_code": "SSSS",
	            "group_name": "For Sale",
	            "name": "Travel"
	        },
	        {
	            "code": "SWNT",
	            "group_code": "SSSS",
	            "group_name": "For Sale",
	            "name": "Wanted"
	        },
	        {
	            "code": "SOTH",
	            "group_code": "SSSS",
	            "group_name": "For Sale",
	            "name": "Other"
	        },
	        {
	            "code": "JACC",
	            "group_code": "JJJJ",
	            "group_name": "Jobs",
	            "name": "Accounting"
	        },
	        {
	            "code": "JADM",
	            "group_code": "JJJJ",
	            "group_name": "Jobs",
	            "name": "Administrative"
	        },
	        {
	            "code": "JAER",
	            "group_code": "JJJJ",
	            "group_name": "Jobs",
	            "name": "Aerospace & Defense"
	        },
	        {
	            "code": "JANL",
	            "group_code": "JJJJ",
	            "group_name": "Jobs",
	            "name": "Analyst"
	        },
	        {
	            "code": "JANA",
	            "group_code": "JJJJ",
	            "group_name": "Jobs",
	            "name": "Animals & Agriculture"
	        },
	        {
	            "code": "JARC",
	            "group_code": "JJJJ",
	            "group_name": "Jobs",
	            "name": "Architecture"
	        },
	        {
	            "code": "JART",
	            "group_code": "JJJJ",
	            "group_name": "Jobs",
	            "name": "Art"
	        },
	        {
	            "code": "JAUT",
	            "group_code": "JJJJ",
	            "group_name": "Jobs",
	            "name": "Automobile"
	        },
	        {
	            "code": "JBEA",
	            "group_code": "JJJJ",
	            "group_name": "Jobs",
	            "name": "Beauty"
	        },
	        {
	            "code": "JBIZ",
	            "group_code": "JJJJ",
	            "group_name": "Jobs",
	            "name": "Business Development"
	        },
	        {
	            "code": "JWEB",
	            "group_code": "JJJJ",
	            "group_name": "Jobs",
	            "name": "Computer & Web"
	        },
	        {
	            "code": "JCST",
	            "group_code": "JJJJ",
	            "group_name": "Jobs",
	            "name": "Construction & Facilities"
	        },
	        {
	            "code": "JCON",
	            "group_code": "JJJJ",
	            "group_name": "Jobs",
	            "name": "Consulting"
	        },
	        {
	            "code": "JCUS",
	            "group_code": "JJJJ",
	            "group_name": "Jobs",
	            "name": "Customer Service"
	        },
	        {
	            "code": "JDES",
	            "group_code": "JJJJ",
	            "group_name": "Jobs",
	            "name": "Design"
	        },
	        {
	            "code": "JEDU",
	            "group_code": "JJJJ",
	            "group_name": "Jobs",
	            "name": "Education"
	        },
	        {
	            "code": "JENE",
	            "group_code": "JJJJ",
	            "group_name": "Jobs",
	            "name": "Energy"
	        },
	        {
	            "code": "JENG",
	            "group_code": "JJJJ",
	            "group_name": "Jobs",
	            "name": "Engineering"
	        },
	        {
	            "code": "JENT",
	            "group_code": "JJJJ",
	            "group_name": "Jobs",
	            "name": "Entertainment & Media"
	        },
	        {
	            "code": "JEVE",
	            "group_code": "JJJJ",
	            "group_name": "Jobs",
	            "name": "Events"
	        },
	        {
	            "code": "JFIN",
	            "group_code": "JJJJ",
	            "group_name": "Jobs",
	            "name": "Finance"
	        },
	        {
	            "code": "JFNB",
	            "group_code": "JJJJ",
	            "group_name": "Jobs",
	            "name": "Food & Beverage"
	        },
	        {
	            "code": "JGIG",
	            "group_code": "JJJJ",
	            "group_name": "Jobs",
	            "name": "Gigs"
	        },
	        {
	            "code": "JGOV",
	            "group_code": "JJJJ",
	            "group_name": "Jobs",
	            "name": "Government"
	        },
	        {
	            "code": "JHEA",
	            "group_code": "JJJJ",
	            "group_name": "Jobs",
	            "name": "Healthcare"
	        },
	        {
	            "code": "JHOS",
	            "group_code": "JJJJ",
	            "group_name": "Jobs",
	            "name": "Hospitality & Travel"
	        },
	        {
	            "code": "JHUM",
	            "group_code": "JJJJ",
	            "group_name": "Jobs",
	            "name": "Human Resources"
	        },
	        {
	            "code": "JMNT",
	            "group_code": "JJJJ",
	            "group_name": "Jobs",
	            "name": "Installation, Maintenance & Repair"
	        },
	        {
	            "code": "JINS",
	            "group_code": "JJJJ",
	            "group_name": "Jobs",
	            "name": "Insurance"
	        },
	        {
	            "code": "JINT",
	            "group_code": "JJJJ",
	            "group_name": "Jobs",
	            "name": "International"
	        },
	        {
	            "code": "JLAW",
	            "group_code": "JJJJ",
	            "group_name": "Jobs",
	            "name": "Law Enforcement"
	        },
	        {
	            "code": "JLEG",
	            "group_code": "JJJJ",
	            "group_name": "Jobs",
	            "name": "Legal"
	        },
	        {
	            "code": "JMAN",
	            "group_code": "JJJJ",
	            "group_name": "Jobs",
	            "name": "Management & Directorship"
	        },
	        {
	            "code": "JMFT",
	            "group_code": "JJJJ",
	            "group_name": "Jobs",
	            "name": "Manufacturing & Mechanical"
	        },
	        {
	            "code": "JMAR",
	            "group_code": "JJJJ",
	            "group_name": "Jobs",
	            "name": "Marketing, Advertising & Public Relations"
	        },
	        {
	            "code": "JNON",
	            "group_code": "JJJJ",
	            "group_name": "Jobs",
	            "name": "Non-Profit"
	        },
	        {
	            "code": "JOPS",
	            "group_code": "JJJJ",
	            "group_name": "Jobs",
	            "name": "Operations & Logistics"
	        },
	        {
	            "code": "JPHA",
	            "group_code": "JJJJ",
	            "group_name": "Jobs",
	            "name": "Pharmaceutical"
	        },
	        {
	            "code": "JPRO",
	            "group_code": "JJJJ",
	            "group_name": "Jobs",
	            "name": "Product, Project & Program Management"
	        },
	        {
	            "code": "JPUR",
	            "group_code": "JJJJ",
	            "group_name": "Jobs",
	            "name": "Purchasing"
	        },
	        {
	            "code": "JQUA",
	            "group_code": "JJJJ",
	            "group_name": "Jobs",
	            "name": "Quality Assurance"
	        },
	        {
	            "code": "JREA",
	            "group_code": "JJJJ",
	            "group_name": "Jobs",
	            "name": "Real Estate"
	        },
	        {
	            "code": "JREC",
	            "group_code": "JJJJ",
	            "group_name": "Jobs",
	            "name": "Recreation"
	        },
	        {
	            "code": "JRES",
	            "group_code": "JJJJ",
	            "group_name": "Jobs",
	            "name": "Resumes"
	        },
	        {
	            "code": "JRNW",
	            "group_code": "JJJJ",
	            "group_name": "Jobs",
	            "name": "Retail & Wholesale"
	        },
	        {
	            "code": "JSAL",
	            "group_code": "JJJJ",
	            "group_name": "Jobs",
	            "name": "Sales"
	        },
	        {
	            "code": "JSCI",
	            "group_code": "JJJJ",
	            "group_name": "Jobs",
	            "name": "Science"
	        },
	        {
	            "code": "JSEC",
	            "group_code": "JJJJ",
	            "group_name": "Jobs",
	            "name": "Security"
	        },
	        {
	            "code": "JSKL",
	            "group_code": "JJJJ",
	            "group_name": "Jobs",
	            "name": "Skilled Trade & General Labor"
	        },
	        {
	            "code": "JTEL",
	            "group_code": "JJJJ",
	            "group_name": "Jobs",
	            "name": "Telecommunications"
	        },
	        {
	            "code": "JTRA",
	            "group_code": "JJJJ",
	            "group_name": "Jobs",
	            "name": "Transportation"
	        },
	        {
	            "code": "JVOL",
	            "group_code": "JJJJ",
	            "group_name": "Jobs",
	            "name": "Volunteer"
	        },
	        {
	            "code": "JWNP",
	            "group_code": "JJJJ",
	            "group_name": "Jobs",
	            "name": "Writing & Publishing"
	        },
	        {
	            "code": "JOTH",
	            "group_code": "JJJJ",
	            "group_name": "Jobs",
	            "name": "Other"
	        },
	        {
	            "code": "MESC",
	            "group_code": "MMMM",
	            "group_name": "Mature",
	            "name": "Escorts"
	        },
	        {
	            "code": "MFET",
	            "group_code": "MMMM",
	            "group_name": "Mature",
	            "name": "Fetish"
	        },
	        {
	            "code": "MJOB",
	            "group_code": "MMMM",
	            "group_name": "Mature",
	            "name": "Jobs"
	        },
	        {
	            "code": "MMSG",
	            "group_code": "MMMM",
	            "group_name": "Mature",
	            "name": "Massage"
	        },
	        {
	            "code": "MPNW",
	            "group_code": "MMMM",
	            "group_name": "Mature",
	            "name": "Phone & Websites"
	        },
	        {
	            "code": "MSTR",
	            "group_code": "MMMM",
	            "group_name": "Mature",
	            "name": "Strippers"
	        },
	        {
	            "code": "MOTH",
	            "group_code": "MMMM",
	            "group_name": "Mature",
	            "name": "Other"
	        },
	        {
	            "code": "PMSM",
	            "group_code": "PPPP",
	            "group_name": "Personals",
	            "name": "Men Seeking Men"
	        },
	        {
	            "code": "PMSW",
	            "group_code": "PPPP",
	            "group_name": "Personals",
	            "name": "Men Seeking Women"
	        },
	        {
	            "code": "PWSM",
	            "group_code": "PPPP",
	            "group_name": "Personals",
	            "name": "Women Seeking Men"
	        },
	        {
	            "code": "PWSW",
	            "group_code": "PPPP",
	            "group_name": "Personals",
	            "name": "Women Seeking Women"
	        },
	        {
	            "code": "POTH",
	            "group_code": "PPPP",
	            "group_name": "Personals",
	            "name": "Other"
	        },
	        {
	            "code": "RCRE",
	            "group_code": "RRRR",
	            "group_name": "Real Estate",
	            "name": "Commercial Real Estate"
	        },
	        {
	            "code": "RHFR",
	            "group_code": "RRRR",
	            "group_name": "Real Estate",
	            "name": "Housing For Rent"
	        },
	        {
	            "code": "RHFS",
	            "group_code": "RRRR",
	            "group_name": "Real Estate",
	            "name": "Housing For Sale"
	        },
	        {
	            "code": "RSUB",
	            "group_code": "RRRR",
	            "group_name": "Real Estate",
	            "name": "Housing Sublets"
	        },
	        {
	            "code": "RSWP",
	            "group_code": "RRRR",
	            "group_name": "Real Estate",
	            "name": "Housing Swaps"
	        },
	        {
	            "code": "RLOT",
	            "group_code": "RRRR",
	            "group_name": "Real Estate",
	            "name": "Lots & Land"
	        },
	        {
	            "code": "RPNS",
	            "group_code": "RRRR",
	            "group_name": "Real Estate",
	            "name": "Parking & Storage"
	        },
	        {
	            "code": "RSHR",
	            "group_code": "RRRR",
	            "group_name": "Real Estate",
	            "name": "Room Shares"
	        },
	        {
	            "code": "RVAC",
	            "group_code": "RRRR",
	            "group_name": "Real Estate",
	            "name": "Vacation Properties"
	        },
	        {
	            "code": "RWNT",
	            "group_code": "RRRR",
	            "group_name": "Real Estate",
	            "name": "Want Housing"
	        },
	        {
	            "code": "ROTH",
	            "group_code": "RRRR",
	            "group_name": "Real Estate",
	            "name": "Other"
	        },
	        {
	            "code": "SVCC",
	            "group_code": "SVCS",
	            "group_name": "Services",
	            "name": "Creative"
	        },
	        {
	            "code": "SVCE",
	            "group_code": "SVCS",
	            "group_name": "Services",
	            "name": "Education"
	        },
	        {
	            "code": "SVCF",
	            "group_code": "SVCS",
	            "group_name": "Services",
	            "name": "Financial"
	        },
	        {
	            "code": "SVCM",
	            "group_code": "SVCS",
	            "group_name": "Services",
	            "name": "Health"
	        },
	        {
	            "code": "SVCH",
	            "group_code": "SVCS",
	            "group_name": "Services",
	            "name": "Household"
	        },
	        {
	            "code": "SVCP",
	            "group_code": "SVCS",
	            "group_name": "Services",
	            "name": "Professional"
	        },
	        {
	            "code": "SVCO",
	            "group_code": "SVCS",
	            "group_name": "Services",
	            "name": "Other"
	        },
	        {
	            "code": "ZOTH",
	            "group_code": "ZZZZ",
	            "group_name": "Uncategorized",
	            "name": "Other"
	        },
	        {
	            "code": "VAUT",
	            "group_code": "VVVV",
	            "group_name": "Vehicles",
	            "name": "Autos"
	        },
	        {
	            "code": "VMOT",
	            "group_code": "VVVV",
	            "group_name": "Vehicles",
	            "name": "Motorcycles"
	        },
	        {
	            "code": "VMPT",
	            "group_code": "VVVV",
	            "group_name": "Vehicles",
	            "name": "Motorcycle Parts"
	        },
	        {
	            "code": "VPAR",
	            "group_code": "VVVV",
	            "group_name": "Vehicles",
	            "name": "Parts"
	        },
	        {
	            "code": "VOTH",
	            "group_code": "VVVV",
	            "group_name": "Vehicles",
	            "name": "Other"
	        }
	    ];

	    var postings = [];

		var factory = {
			categories: categories,
			retrieve: retrieve,
			postings: postings,
		};

		return factory;

		// Function Implementations
		function retrieve(newSearch) {
			return $http.post('/tapdata', { category: newSearch.category, radius: newSearch.radius, lat: newSearch.lat, long: newSearch.lng })
				.then(function(result) {
					postings = JSON.parse(result.data);
					return JSON.parse(result.data);
				},
				function(err) {
					console.log(err);
				});
		}
	}

} )(angular);
( function(angular) {
	angular
		.module('myApp')
		.controller('countsCtrl', countsCtrl);

	function countsCtrl($scope, Search, Count) {
		var vm = this;

		// Bound variables
		vm.map;
		vm.myData;
		vm.chartConfig = {};
		vm.markers = [];
		vm.newSearch = Search.newSearch;
		vm.newAddress = Search.newAddress;
		vm.countsData = [];
		vm.countWhites = 0;
		vm.countAsians = 0;
		vm.countLatinos = 0;
		vm.countBlacks = 0;
		vm.countUnknown = 0;
		vm.locale;
		vm.getCount = getCount;
		vm.makeValid = makeValid;
		vm.findLatLng = findLatLng;
		vm.initMap = initMap;
		vm.getData = getData;
		vm.convertData = convertData;

		// Function Calls
		angular.element(document).ready(function() {
			vm.getData();
			// vm.getCount();
		});

		// Function implementations

		// Function to get the data from counted API
		function getCount() {
			vm.loading = true;
			var countsPromise = Count.find(vm.newAddress);

			countsPromise
				.then(function(result) {
					vm.countsData = result;
					vm.makeValid();
					vm.findLatLng();
					var promise = new Promise(function(resolve, reject) {
						vm.myData = Count.grab();

						if (vm.myData) 
						{
							resolve(vm.myData);
						}
						else
						{
							reject(Error("It Broke"));
						}
					});
					promise
						.then(function(result) {
							console.log(result);
							// Map initialization is broken for now
							vm.initMap(result);
							vm.loading = false;
						});
				});
		}

		function getData() {
			vm.loading = true;
			var dataPromise = Count.find(vm.newAddress);

			dataPromise.then(function(result) {
				vm.countsData = result;
				vm.convertData();
				vm.loading = false;

				//This is not a highcharts object. It just looks a little like one!
				vm.chartConfig = {

				options: {
					//This is the Main Highcharts chart config. Any Highchart options are valid here.
					//will be overriden by values specified below.
					chart: {
						type: 'pie'
					},
					tooltip: {
						style: {
							padding: 10,
							fontWeight: 'bold'
						}
					}
				},
				//The below properties are watched separately for changes.

				//Series object (optional) - a list of series using normal Highcharts series options.
				series: [{ 
					name: 'Ethnicity',
					colorByPoint: true,
					data: [{
						name: 'Hispanic/Latino',
						y: vm.countLatinos
					}, {
						name: 'Black',
						y: vm.countBlacks
					}, {
						name: 'Asian/Pacific Islander',
						y: vm.countAsians
					}, {
						name: 'White',
						y: vm.countWhites
					}, {
						name: 'Unknown',
						y: vm.countUnknown
					}] 
				}],
				//Title configuration (optional)
				title: {
					text: 'Graphs'
				},
				//Boolean to control showing loading status on chart (optional)
				//Could be a string if you want to show specific loading text.
				loading: false,
				//Configuration for the xAxis (optional). Currently only one x axis can be dynamically controlled.
				//properties currentMin and currentMax provided 2-way binding to the chart's maximum and minimum
				xAxis: {
					currentMin: 0,
					currentMax: 20,
					title: {text: 'values'}
				},
				//Whether to use Highstocks instead of Highcharts (optional). Defaults to false.
				useHighStocks: false,
				//size (optional) if left out the chart will default to size of the div or something sensible.
				//function (optional)
			};
			});
		}

		// Function to convert the JSON data into numbers for use with pie chart
		function convertData() {
			for (var data in vm.countsData) {
				if (vm.countsData[data].race === "White")
				{
					vm.countWhites += 1;
				}
				else if (vm.countsData[data].race === "Hispanic/Latino")
				{
					vm.countLatinos += 1;
				}
				else if (vm.countsData[data].race === "Black")
				{
					vm.countBlacks += 1;
				}
				else if (vm.countsData[data].race === "Asian/Pacific Islander")
				{
					vm.countAsians += 1;
				}
				else
				{
					vm.countUnknown += 1;
				}
			}

			return true;
		}

		// Makes the addresses returned from the counted API valid addresses
		function makeValid() {
			for (var item in vm.countsData) {
				var splitAddress = vm.countsData[item].address.split(" ");
				var validAddress = [];
				for (var i = 0; i < splitAddress.length; i++) {
					if (splitAddress[i] !== 'and')
					{
						validAddress.push(splitAddress[i]);
					}
					else
					{
						vm.countsData[item].address = validAddress.join(" ");
						break;
					}
				}
			}

			return true;
		}

		// Function to find and add lat and lng to each object in counted array
		function findLatLng() {
			for (var i = 0; i < vm.countsData.length; i++) {
				Count.retrieveLoc(vm.countsData, i);
			}

			return true;
		}

		// Initializes google maps
		function initMap(locData) {
			console.log(vm.newSearch);
			var mapCenter = new google.maps.LatLng(vm.newSearch.lat, vm.newSearch.lng);
			var mapOptions = {
				center: mapCenter,
				zoom: 13,
				draggable: true,
				mapTypeId: google.maps.MapTypeId.ROADMAP
			};

			vm.map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);

			for (var data in vm.myData) {
				console.log(vm.myData[data].latitude);
				console.log(vm.myData[data]);
				console.log(vm.myData[data].age);
				var location = new google.maps.LatLng(vm.myData[data].latitude, vm.myData[data].long);

				addMarker(location);
			}
		}

		// Function to add a Google Maps marker, only gets called from within initMap
		function addMarker(location) {
			var marker = new google.maps.Marker({
				position: location,
				map: vm.map,
				title: "Crime Location",
				clickable: true
			});

			marker.info = new google.maps.InfoWindow({
				content: "<div>" + "Nothing Yet" + "</div>"
			});

			google.maps.event.addListener(marker, 'click', function() {
				marker.info.open(vm.map, marker);
			});

			vm.markers.push(marker);
		}
	

	}

} )(angular);
( function(angular) {
	angular
		.module('myApp')
		.factory('Count', Count);

	function Count($http) {
		var countData = [];
		var factory = {
			countData: countData,
			find: find,
			retrieveLoc: retrieveLoc,
			grab: grab,
		};

		return factory;

		// function implementations
		function find(newAddress) {
			return $http.post('/counts', { state: newAddress.administrative_area_level_1 })
				.then(function(result) {
						countData = JSON.parse(result.data);
						return JSON.parse(result.data);
					},
					function(err) {
						console.log(err);
					});
		}

		function retrieveLoc(countsData, index) {
			$http.post('/geodata', { address: countsData[index].address })
				.then(function(result) {
					var item = JSON.parse(result.data);
					countData[index].latitude = item.results[0].geometry.location.lat.toString();
					countData[index].long = item.results[0].geometry.location.lng.toString();
				},
				function(err) {
					console.log(err);
				});
		}

		function grab() {
			return countData;
		}

	}

} )(angular);
( function(angular) {
	angular
		.module('myApp')
		.controller('homeCtrl', homeCtrl);

	function homeCtrl($scope, $interval, $location, Search, Category) {
		var vm = this;

		// Bound variables
		vm.header = [{ message: 'Postings Map' }, { message: 'With Google Maps' }];
		vm.words = ["Hello!    ", "Fill out the form below to get information about the chosen category!    "];
		vm.wordCount = 0;
		vm.charCount = 0;
		vm.instructions = "";
		vm.cIndex = 0;
		vm.crimeData = [];
		vm.place;
		vm.placeSearch;
		vm.autocomplete;
		vm.newSearch = {
			radius: 3,
		};
		vm.componentForm = {
			street_number: 'short_name',
			route: 'long_name',
			locality: 'long_name',
  			administrative_area_level_1: 'short_name'
		};
		vm.newAddress = {};
		vm.categories = Category.categories;
		vm.switchHeaders = switchHeaders;
		vm.startSearch = startSearch;
		vm.typeText = typeText;
		vm.initAutocomplete = initAutocomplete;
		vm.initAutoComp = initAutoComp;
		vm.getAddress = getAddress;

		// Watches
		$scope.$watch('vm.newSearch', function() {
			Search.newSearch = vm.newSearch;
		});

		$scope.$watch('vm.newAddress', function() {
			Search.newAddress = vm.newAddress;
		});

		// Function implementations

		// Function to switch headers on main page
		function switchHeaders() {
			if (vm.cIndex === 0)
			{
				vm.cIndex = 1;
			}
			else
			{
				vm.cIndex = 0;
			}
		}

		// Function that changes the view over to the posts partial
		function startSearch() {
			// $location.path('/maps');
			// $location.path('/posts');
			$location.path('/counts');
		}

		// Function that types out the text in the directions div
		function typeText() {
			vm.instructions = vm.instructions + vm.words[vm.wordCount][vm.charCount++];

			if (vm.charCount > vm.words[vm.wordCount].length)
			{
				vm.wordCount++;
				vm.charCount = 0;
				vm.instructions = "";

				if (vm.wordCount == vm.words.length)
				{
					vm.wordCount = 0;
				}
			}
		}

		// This function initializes the autocomp and adds a listener for place_changed
		function initAutocomplete() {
			// Create the autocomplete object, restricting the search to geographical location types.
			vm.autocomplete = new google.maps.places.Autocomplete((document.getElementById('autocomplete')), {types: ['geocode']});

			// When place is selected, call vm.getAddress.
			vm.autocomplete.addListener('place_changed', vm.getAddress);

		}

		// Function that gets the lat and lng from the address input
		function getAddress() {
			// Use getPlace method to grab data about that location
			vm.place = vm.autocomplete.getPlace();

			// If vm.place has geometry data then set lat and lng in the newSearch object.
			if (vm.place.geometry)
			{
				vm.newSearch.lat = vm.place.geometry.location.lat();
				vm.newSearch.lng = vm.place.geometry.location.lng();
			}
			else
			{
				// Otherwise we console log that no geo data was found.
				console.log('No geometry data found');
			}
		}

		// This function initializes the autocomp and adds a listener for place_changed
		function initAutoComp() {
			vm.autocomplete = new google.maps.places.Autocomplete(
				(document.getElementById('autocomplete')),
      			{types: ['geocode']});

			vm.autocomplete.addListener('place_changed', splitAddress);
		}

		// This function executes whenever the place_changed event fires
		function splitAddress() {
			vm.place = vm.autocomplete.getPlace();

			// If vm.place has geometry data then set lat and lng in the newSearch object.
			if (vm.place.geometry)
			{
				vm.newSearch.lat = vm.place.geometry.location.lat();
				vm.newSearch.lng = vm.place.geometry.location.lng();
			}
			
			for (var i = 0; i < vm.place.address_components.length; i++) {
				var addressType = vm.place.address_components[i].types[0];

				if (vm.componentForm[addressType]) {
					var val = vm.place.address_components[i][vm.componentForm[addressType]];
					vm.newAddress[addressType] = val;
				}
			}

		}

		// Function calls
		$interval(vm.typeText, 130);
	}
} )(angular);
( function(angular) {
	angular
		.module('myApp')
		.directive('loading', loading);

	function loading($http) {
		return {
			restrict: 'A',
			link: function(scope, elem, attrs) {
				scope.isLoading = function() {
					return $http.pendingRequests.length > 0;
				};

				scope.$watch(scope.isLoading, function(v) {
					if (v)
					{
						elem.show();
					}
					else
					{
						elem.hide();
					}
				});
			}
		};
	}

} )(angular);
( function(angular) {
	angular
		.module('myApp')
		.controller('mapsCtrl', mapsCtrl);

	function mapsCtrl($scope, Search, Category) {
		var vm = this;

		// Bound variables
		vm.crimeData = [];
		vm.taps = [];
		vm.map;
		vm.markers = [];
		vm.newSearch = Search.newSearch;
		vm.findCrimes = findCrimes;
		vm.getTaps = getTaps;
		vm.initMap = initMap;
		vm.initAltMap = initAltMap;

		// Function calls
		angular.element(document).ready(function() {
			vm.getTaps();
			// vm.findCrimes();
		});

		// Function implementations

		// This function gets data from the crime data API
		function findCrimes() {
			vm.loading = true;
			var crimesPromise = Search.find(vm.newSearch);
			crimesPromise.then(function(result) {
				vm.crimeData = result;
				vm.loading = false;
				vm.initMap(vm.newSearch);
			});
		}

		// Function to get data from 3taps API
		function getTaps() {
			vm.newSearch.radius = vm.newSearch.radius + 'mi';
			vm.loading = true;
			var tapsPromise = Category.retrieve(vm.newSearch);
			tapsPromise.then(function(result) {
				console.log(result.postings);
				vm.taps = result.postings;
				vm.loading = false;
				vm.initAltMap(vm.newSearch);
			});
		}

		// initMap function that works with the crime data api
		function initMap(newSearch) {
			var convRadius = newSearch.radius * 1600;

			var mapOptions = {
				center: new google.maps.LatLng(newSearch.lat, newSearch.lng),
				zoom: 14,
				draggable: true,
				mapTypeId: google.maps.MapTypeId.ROADMAP
			};

			vm.map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);

			var circle = new google.maps.Circle({
				map: vm.map,
				radius: convRadius,
				fillColor: '#0099ff',
				center: new google.maps.LatLng(newSearch.lat, newSearch.lng)
			});

			for (var crime in vm.crimeData) {
				var crimeLoc = new google.maps.LatLng(vm.crimeData[crime].lat, vm.crimeData[crime].long);
				var crimeDesc = vm.crimeData[crime].description;

				addMarker(crimeLoc, crimeDesc);
			}
		}

		// Alternative to initMap that was made for use with 3taps API
		function initAltMap(newSearch) {
			var mapCenter = new google.maps.LatLng(newSearch.lat, newSearch.lng);
			var mapOptions = {
				center: mapCenter,
				zoom: 13,
				draggable: true,
				mapTypeId: google.maps.MapTypeId.ROADMAP
			};

			vm.map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);

			for (var tap in vm.taps) {
				var tapLoc = new google.maps.LatLng(vm.taps[tap].location.lat, vm.taps[tap].location.long);
				var postHeading = vm.taps[tap].heading;

				addMarker(tapLoc, postHeading);
			}
		}

		// Function to add a Google Maps marker, only gets called from within initMap or initAltMap
		function addMarker(crimeLoc, crimeDesc) {
			var marker = new google.maps.Marker({
				position: crimeLoc,
				map: vm.map,
				title: "Crime Location",
				clickable: true
			});

			marker.info = new google.maps.InfoWindow({
				content: "<div>" + crimeDesc + "</div>"
			});

			google.maps.event.addListener(marker, 'click', function() {
				marker.info.open(vm.map, marker);
			});

			vm.markers.push(marker);
		}

	}

} )(angular);
( function(angular) {
	angular
		.module('myApp')
		.directive('myMaps', myMaps);

	function myMaps() {
		var directive = {
			link: link,
			replace: true,
			templateUrl: '/js/templates/angu_maps.html',
			restrict: 'EA'
		};
		return directive;

		function link(scope, element, attrs) {
			var options = {
				enableHighAccuracy: true
			};

			var mapOptions = {
				center: new google.maps.LatLng(34.22, 100),
				zoom: 14,
				draggable: true,
				mapTypeId: google.maps.MapTypeId.ROADMAP
			};

			var map = new google.maps.Map(element[0], mapOptions);

			if (navigator.geolocation) 
			{
				navigator.geolocation.getCurrentPosition(function(pos)
				{
					var position = {
						lat: pos.coords.latitude,
						lng: pos.coords.longitude
					};

					map.setCenter(position);

					var marker = new google.maps.Marker({
						position: position,
						map: map,
						title: 'Hello World!'
					});
				}, 
				function(err) {
					alert('Unable to get location: ' + err.message);
				}, options);
			}
		}
	}
} )(angular);
( function(angular) {
	angular
		.module('myApp')
		.controller('postsCtrl', postsCtrl);

	function postsCtrl($scope, Search, Category) {
		var vm = this;

		// Bound variables
		vm.taps = [];
		vm.newSearch = Search.newSearch;
		vm.getTaps = getTaps;

		// Function calls
		angular.element(document).ready(function() {
			vm.getTaps();
			// vm.findCrimes();
		});

		// Function implementations

		// Function to get data from 3taps API
		function getTaps() {
			vm.newSearch.radius = vm.newSearch.radius + 'mi';
			var tapsPromise = Category.retrieve(vm.newSearch);
			
			tapsPromise.then(function(result) {
				console.log(result.postings);
				vm.taps = result.postings;
			});
		}

	}

} )(angular);
( function(angular) {
	angular
		.module('myApp')
		.controller('routesCtrl', routesCtrl);

	function routesCtrl($location) {
		var vm = this;

		// Bound variables
		vm.isActive = isActive;

		// Function implementations
		function isActive(currentUrl) {
			return currentUrl === $location.url();
		};
	}

} )(angular);
( function(angular) {
	angular
		.module('myApp')
		.factory('Search', Search);

	function Search($http) {
		var crimeData = [];
		var newSearch = {};
		var newAddress = {};
		var factory = {
			newSearch: newSearch,
			newAddress: newAddress,
			crimeData: crimeData,
			find: find,
			retrieve: retrieve,
		};
		return factory;

		function find(newSearch) {
			return $http.post('/crimes', { end: newSearch.end, lat: newSearch.lat, lng: newSearch.lng, start: newSearch.start })
				.then(function(res) {
					crimeData = res.data;
					return res.data;
				}, 
				function(res) {
					console.log(res);
				});
		}

		function retrieve() {
			return $http.get('/tapdata')
				.then(function(res) {
					return res;
				},
				function(res) {
					console.log(res);
				});
		}
	}

} )(angular);