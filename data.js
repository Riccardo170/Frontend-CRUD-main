
var nexId = 10006;
var next;
var last;
var prev;
var first;

$(document).ready(function () {

  // url iniziale
  chiamataServer("http://localhost:8080/employees");
//elimina
  $("body").on("click", ".btn-delete", function () {
    var td = $(this).parent("td");
    var id = td.data("id");
    for (var i = 0; i < dati.length; i++) {
      if (dati[i].id == id) {
        dati.splice(i, 1);
        break;
      }
    }
    displayTachiamataServerble();
  })
  

//aggiungi
  $("body").on("click", ".btn-add", function () {
    var firstName = $('#firstName').val();
    console.log(firstName);
    var lastname = $('#lastname').val();
    console.log(lastname);
    var nuovo = {
      "id": nexId,
      "firstName": firstName,
      "lastName": lastname,
      "gender": "M",
    }
    dati.push(nuovo);
    displayTable();
    nexId++;
    

    //chiusura dopo aggiungi
    var modal= $('#exampleModal');
    modal.modal("hide");


  });

  //modifica
  $("body").on("click", ".btn-modifica", function () {

    var modal= $('#modalmodifica');
    modal.modal("show");
    var td = $(this).parent("td");
    var id = td.data("id");
    for (var i = 0; i < dati.length; i++) {
      if (dati[i].id == id) {
        $('#nome').val(dati[i].firstName);
        $('#cognome').val(dati[i].lastName);
        break;
      }
    }
  });




});

function chiamataServer(url) {
  $.ajax({
    url: url,
    success: function( response ) {
      displayTable(response["_embedded"]["employees"]);
      //displayPagination(response["page"], response["_links"]);
      next = response['_links']['next']['href']
      last=response['_links']['last']['href']
      prev=response['_links']['prev']['href']
      first=response['_links']['first']['href']
      console.log(next);
      
    },
    dataType: 'json'
  });

}


$('#next').click(function(){
  console.log(next);
  chiamataServer(next);
});

$('#last').click(function(){
  console.log(last);
  chiamataServer(last);
});

$('#prev').click(function(){
  console.log(prev);
  chiamataServer(prev);
});

$('#first').click(function(){
  console.log(first);
  chiamataServer(first);
});

function displayTable(dati) {
  var r = '';
  $.each(dati, function (id, value) {
    r += '<tr>';
    r += '<td>' + value.id + '</td>';
    r += '<td>' + value.firstName + '</td>';
    r += '<td>' + value.lastName + '</td>';
    r += '<td data-id=' + value.id + '> <button type="button" class="btn btn-danger btn-delete">Elimina</button>' + '</td>';
    r += '<td data-id=' + value.id + '> <button type="button" class="btn btn-warning btn-modifica">Modifica</button>' + '</td>';
    r += '<tr>' + '</tr>';
  });
  $("tbody").html(r);
}





