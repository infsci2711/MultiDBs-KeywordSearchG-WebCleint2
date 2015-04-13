var restBaseUrl = "http://localhost:7654/";
//http://localhost:7648/Demo1/helloWorld/52.0.74.69

function DisplayData(name,data){
	var self = this;
	self.name = ko.observable(name);
	self.data = ko.observable(data);
}
function Line(){
	var self = this;
	self.name = ko.observable("    ");
	self.data = ko.observable("    ");
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
<<<<<<< HEAD

				self.tuples.removeAll();
			
=======
			self.tuples.removeAll();
>>>>>>> origin/master
					for (var k = 0; k<data.length; k++){
						for (var j in data[k]){
							var onetuple = new DisplayData(j,data[k][j]);
							self.tuples.push(onetuple);
							}
					var oneline = new Line();
					self.tuples.push(oneline);
					self.tuples.push(oneline);
					}				
				
			},
			error: function(data) {
				alert("Something went wrong while getting message. Please try again.");
			}
		});
	};
}

ko.applyBindings(new Display(), $("#NeoContainer")[0]);
