var restBaseUrl = "http://localhost:7648/";

function DisplayData(name,data){
	var self = this;
	self.name = ko.observable(name);
	self.data = ko.observable(data);
}
function Line(){
	var self = this;
	self.name = ko.observable("");
	self.data = ko.observable("");
}

function Display(){
	var self = this;
	
	self.tuples = ko.observableArray();

	self.keywords = ko.observable();

	

	self.search = function(){
		
		$.ajax({
			url: restBaseUrl + "NeoSearch/" + self.keywords(),
			type: 'GET',
			dataType: 'json',
			contentType: "application/json",
			crossDomain: true,
			success: function(data){

			self.tuples.removeAll();
				
				for (var i = 0; i < data.length; i++) {
					var e = data[i].row;
					for (var k = 0; k<e.length; k++){
						for (var j in e[k]){
							var onetuple = new DisplayData(j,e[k][j]);
							self.tuples.push(onetuple);
							}
					var oneline = new Line();
					self.tuples.push(oneline);
					}				
				}
			},
			error: function(data) {
				alert("Something went wrong while getting message. Please try again.");
			}
		});
	};
}

ko.applyBindings(new Display(), $("#NeoContainer")[0]);
