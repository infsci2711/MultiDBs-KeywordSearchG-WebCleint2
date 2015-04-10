var restBaseUrl = "http://localhost:7648/";

function DisplayData(id,databasename,tablename,columnname,data,url){
	var self = this;
	self.id = ko.observable(id);
	self.databasename = ko.observable(databasename);
	self.tablename = ko.observable(tablename);
	self.columnname = ko.observable(columnname);
	self.data = ko.observable(data);
	self.url = ko.observable(url);
}

function Display(){
	var self = this;
	
	

	self.tuples = ko.observableArray();

	self.keywords = ko.observable();

	

	self.search = function(){
		var output="";
		$.ajax({
			url: restBaseUrl + "NeoSearch/" + self.keywords(),
			type: 'GET',
			dataType: 'json',
			contentType: "application/json",
			crossDomain: true,
			success: function(data){	

			for (var i = 0; i < data.length; i++) {
				var e = data[i].row;
				for (var k = 0; k<e.length; k++){
					output +="<br/>";
					for (var j in e[k]){
						output += "<div class=\"table\">"+ j+":"+ e[k][j]+"</div>"
						}
				}
			}
				document.getElementById("output_field").innerHTML = output;
			},
			error: function(data) {
				alert("Something went wrong while getting message. Please try again.");
			}
		});
	};
}

ko.applyBindings(new Display(), $("#NeoContainer")[0]);
