var url= 'http://localhost:8080/employees';
var nexId = 10006;
var next;
var last;
var prev;
var first;
var response=null;
var id;

$(document).ready(function () {

  // url iniziale
  chiamataServer(url);
//elimina
  $("body").on("click", "#btn-delete", function () {
    $(this).parents("tr").fadeOut("fast");
    var td = $(this).parent("td");
    var id = td.data("id");
    $.ajax({
      url: url+'/'+id,// url + id dell'utente selezionato
      type: "delete", //si dice di vooler cancellare dal db
      success: function(data){
        displayTable(url+"?page="+dati['page']['number']+"&size=20");}//e se ha successo(significa che è stata cancellata) si da la url all display table
  })
  });
  

//aggiungi
  $("body").on("click", "#btn-add", function () {
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
    $.ajax({
      type: "POST",
      url: url,

      data: JSON.stringify({
          birthDate: "",
          firstName: firstName,
          gender: "M",
          hireDate: "",
          lastName: lastname,
      }),

      contentType: "application/json",
      dataType: 'json',

      success: function () {
          var last = response["_links"]["last"]["href"];
          console.log(last);
          chiamataServer(last);
      }
  });
    

    //chiusura dopo aggiungi
    var modal= $('#exampleModal');
    modal.modal("hide");


  });

  //modifica
  $(".modifica").click(function () {
    id = $(this).parent().data("id");

    for (var i = 0; i < data.length; i++) {
        if (id == data[i].id) {
            $("#nome-m").val(data[i].firstName);
            $("#cognome-m").val(data[i].lastName);
        }
    }
});
  $("body").on("click", "#btn-modifica", function () {
      var nome = $("#nome").val();
      var cognome = $("#cognome").val();
      
      console.log(id);

      $.get( url+"/"+id, function(data) {
          console.log(data);
          data.firstName=nome;
          data.lastName=cognome;
          $.ajax({
              type: "PUT", //si dice di vooler aggiornare dal db
              url: url+'/'+id,// url + id dell'utente selezionato
              data : JSON.stringify(data),
                contentType: "application/json; charset=utf-8",
                dataType: "JSON",
                success: function(data){displayTable(url+"?page="+dati['page']['number']+"&size=20");}//e se ha successo(significa che è stata cancellata) si da la url all display table
          })
          })
      
  });
});

function chiamataServer(link) {
  $.ajax({
    url: link,
    success: function( responseData ) {
      response=responseData;
      displayTable(response["_embedded"]["employees"]);
      console.log(response)
      //displayPagination(response["page"], response["_links"]);
      if(response["page"]["number"]!=response["page"]["totalPages"]-1){
        next = response['_links']['next']['href']
      }
      last=response['_links']['last']['href']
      prev=response['_links']['prev']['href']
      first=response['_links']['first']['href']
      
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
  console.log("prev:"+prev);
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
    r += '<td data-id=' + value.id + '> <button type="button" class="btn btn-danger" id="btn-delete">Elimina</button>' + '</td>';
    r += '<td data-id=' + value.id + '> <button type="button" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#modalmodifica" id="btn-modifica">Modifica</button>' + '</td>';
    r += '<tr>' + '</tr>';
  });
  $("tbody").html(r);
}





