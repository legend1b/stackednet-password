document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
    StatusBar.backgroundColorByHexString("#0F1720");
	}
var db = openDatabase('mytasks', '1.0', 'My Tasks', 5*1024*1024);
	
	function init() {
		db.transaction(function (tx){
			tx.executeSql('create table if not exists plot(id integer primary key autoincrement, name text, description text)');
		});
	}
	function displayAll() {
		db.transaction(function (tx){
			tx.executeSql('select * from plot', [],function(tx, results){
				var n = results.rows.length;
				var s = '<div class="row">';
				for(var i = 0; i <  n; i++){
					var work = results.rows.item(i);
					s +='<center>';
						s +='<div class="col-xs-6"><b><p style="word-wrap: break-word;border-left:3px solid #16212E;color:#16212E; font-size:13px;z-index:1;text-align:center;">' + work.name + '</p></b></div>';
						s +='<div class="col-xs-6"><b><p style="word-wrap: break-word;color:#16212E; font-size:13px;z-index:1;text-align:center;">' + work.description + '</p></b></div><br />';
                    
						s +='<a style="color:#F9A828; text-decoration:none; font-size:11px;" href="#" onclick="del(' + work.id + ')">Delete</a> || <a style="color:#F9A828; text-decoration:none; font-size:11px;" href="#" onclick="edit(' + work.id + ')">Edit</a> || <input style ="width:1px; height:1px;opacity:0;" id="ok'+ work.id +'" value="' + work.description + '" type="text"/> <a style="color:#F9A828; text-decoration:none; font-size:11px;" href="#" onclick="copy('+work.id+')">Copy password</a><br />';
					s +='</center>';
				}
				s += '</div>';
				document.getElementById('result').innerHTML = s;
			});
		});
	}
	displayAll();
function add() {
	db.transaction(function (tx){
	var name = document.getElementById('workName').value;
	var description = document.getElementById('description').value;
	//alert(name + description);
        if(name=="" || description == ""){
        	$(".alerts").text('Fields are empty');
        		$(".pchange").show();
				    setTimeout(function(){
				$(".pchange").hide();
				}, 4000); 
        }
        else{
		tx.executeSql('insert into plot(name, description) values(?, ?)', [name, description], displayAll());
        $("#workName").val('');
    $("#description").val('');
    $(".alerts").text('Added');
        		$(".pchange").show();
				    setTimeout(function(){
				$(".pchange").hide();
				}, 4000); 
			$("#cent").fadeOut("slow");   
        }
	});
}
function addedit() {
	db.transaction(function (tx){
	var name = document.getElementsByClassName('fix1')[0].value;
	var description = document.getElementsByClassName('fix2')[0].value;
	//alert(name + description);
        if(name=="" || description == ""){
        	$(".alerts").text('Fields are empty');
        		$(".pchange").show();
				    setTimeout(function(){
				$(".pchange").hide();
				}, 4000); 
        }
        else{
		tx.executeSql('insert into plot(name, description) values(?, ?)', [name, description], displayAll());
        $("#workName").val('');
    $("#description").val('');
    $(".alerts").text('Added');
        		$(".pchange").show();
				    setTimeout(function(){
				$(".pchange").hide();
				}, 4000); 
			$("#cent").fadeOut("slow");   
        }
	});
}
// function add3() {
// 	edit(id);
// 	db.transaction(function (tx){
		
// 	var name = document.getElementById('workName').value;
// 	var description = document.getElementById('description').value;
	
//         if(name=="" || description == ""){
//         	$(".alerts").text('Field(s) are empty');
//         		$(".pchange").show();
// 				    setTimeout(function(){
// 				$(".pchange").hide();
// 				}, 4000); 
//         }
//          else{
// 			tx.executeSql('select * from plot where id = ? ', [id], function (tx, results){
// 				var work = results.rows.item(0);
// 				var idn = work.id;
// 				alert(idn);
// 				tx.executeSql('update plot set name=? AND description = ? where id=?', [passd, 1], displayAll());
// 				alert("done");
// 	// 	tx.executeSql('insert into plot(name, description) values(?, ?)', [name, description], displayAll());
//     //     $("#workName").val('');
//     // $("#description").val('');
//     // $(".alerts").text('Added');
//     //     		$(".pchange").show();
// 	// 			    setTimeout(function(){
// 	// 			$(".pchange").hide();
// 	// 			}, 4000); 
// 	// 		$("#cent").fadeOut("slow");   
// 		 });
// 		}
// 	});
// }
 
function del(id) {
	db.transaction(function (tx){
		//var result = confirm("Are you sure");
		//if (result == true){
		tx.executeSql('delete from plot where id = ?', [id], displayAll());
		//}
	});
}
function edit(id) {
	db.transaction(function (tx){   
		tx.executeSql('select * from plot where id = ?', [id], function (tx, results){
			var work = results.rows.item(0);
			$(".adddd2").click();
			//alert(work.name + work.description);
			document.getElementsByClassName('fix1')[0].value = work.name;
			document.getElementsByClassName('fix2')[0].value = work.description;
			db.transaction(function (tx){
				//var result = confirm("Are you sure");
				//if (result == true){
				tx.executeSql('delete from plot where id = ?', [id], displayAll());
				//}
			});
		
                
            
		});
	});
}
function copy(id) {
	//db.transaction(function (tx){   
	//	tx.executeSql('select * from plot where id = ?', [id], function (tx, results){
	//		var work = results.rows.item(0);
			//alert(work.description);
			//var dee = document.getElementById('ok'+id).value;
			//alert(dee);
			//document.getElementById('workName').value = work.name;
			//document.getElementById('description').value = work.description;
			//$(document).ready(function(){
             //   $("#cent").fadeIn("slow");
			//});
			
	//	});
//	});
var copyText = document.querySelector("#ok"+id);
  copyText.select();
  document.execCommand("copy");
  $(".alerts").text('Copied');
        		$(".pchange").show();
				    setTimeout(function(){
				$(".pchange").hide();
				}, 4000); 
}
function add2() {
	db.transaction(function (tx){
	var passd = document.getElementById('passd').value;
	var cpass = document.getElementById('cpass').value;
        if(passd=="" && cpass == ""){
        	$(".alerts").text('Fields are empty');
        		$(".pchange").show();
				    setTimeout(function(){
				$(".pchange").hide();
				}, 4000); 
				    //$("#cent2").fadeOut();
        }
        else{
        	if(passd==cpass){
				tx.executeSql('update papado set name=? where id=?', [passd, 1], displayAll());
				        $("#passd").val('');
				    $("#cpass").val('');
				    $(".alerts").text('Password Changed');
				    $(".pchange").show();
				    setTimeout(function(){
				$(".pchange").hide();
				}, 4000); 
				    $("#cent2").fadeOut();
        	}
        	else{
        		$(".alerts").text('Passwords do not match');
        		$(".pchange").show();
				    setTimeout(function(){
				$(".pchange").hide();
				}, 4000); 
				   // $("#cent2").fadeOut();
        	}
        }
	});
}