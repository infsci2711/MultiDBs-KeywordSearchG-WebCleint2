var restBaseUrl = "http://52.0.74.69:7654/";

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
function DisplayJson(){
	
	var p = document.getElementById("keywords").value;
	window.location.href= restBaseUrl + "NeoSearch/"+ p ;
}
//[{"name":"James","age":"13","id":""1001","gpa":"3.75""}]
//[{"course":"MapReduce","Grade":"3"},{"course":"MapReduce","Grade":"3"}]
function Display(){
	var self = this;
	
	self.tuples = ko.observableArray();

	self.keywords = ko.observable();

	

	self.search = function(){
		var pr = document.getElementById("keywords").value;
		self.tuples.removeAll();
		$.ajax({
			url: restBaseUrl + "NeoSearch/" + pr,
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
				
			}//,
			/*error: function(data) {
				alert("No result match your searching, please try again!");
			}*/
		});
	}; 
}
//nohup java -jar multidbskeywordsearchgserverapi-0.1-SNAPSHOT.jar > log.out 2> error.log < /dev/null &
ko.applyBindings(new Display(), $("#NeoContainer")[0]);
