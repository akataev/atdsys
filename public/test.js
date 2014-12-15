$(document).ready(function() {

	var Vehicle = Backbone.Model.extend({});
	var Vehicles = Backbone.Collection.extend({
		model: Vehicle
	});
	var vehicles = new Vehicles([
		{color: 'blue'},
		{color: 'red'}
	]);
	console.log("another: " + vehicles.length);


	var TestModel = Backbone.Model.extend({});
	var TestCollection = Backbone.Collection.extend({
		model: TestModel
	});
	var testCollection = new TestCollection([
		{color: 'blue'},
		{color: 'red'}
	]);
	console.log("my: " + testCollection.length);

	





});