var restBaseUrl = "http://52.0.74.69:7654/";
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
		self.tuples.removeAll();
		$.ajax({
			url: restBaseUrl + "NeoSearch/" + self.keywords(),
			type: 'GET',
			dataType: 'json',
			contentType: "application/json",
			crossDomain: true,
			success: function(data){

			self.tuples.removeAll();

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
//nohup java -jar multidbskeywordsearchgserverapi-0.1-SNAPSHOT.jar > log.out 2> error.log < /dev/null &
ko.applyBindings(new Display(), $("#NeoContainer")[0]);
