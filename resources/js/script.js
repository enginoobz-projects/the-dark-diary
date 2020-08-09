$(".toggleForms").click(function () {
    $("#signInForm").toggle();
    $("#signUpForm").toggle();
});


$("#menu-toggle").click(function (e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
});

// $(".list-group-item").hover(function () {
    
//     $(this).attr('style', function (i, s) {
//         return (s || '') +
//             'background-color: lightgrey !important;'
//     });
//     // alert($(this).attr("id"));
// });

$(document).on('mouseover', '.list-group-item', function() {
    

    $(this).attr('style', function (i, s) {
        return (s || '') +
            'background-color: lightgrey !important;'
    });
});

// //TODO: refactor
// $(".list-group-item").mouseleave(function () {
//     $(this).attr('style', function (i, s) {
//         return (s || '') +
//             'background-color: #F8F9FA !important;'
//     });
// })

$(document).on('mouseleave', '.list-group-item', function() {
    if(!$(this).hasClass("selected")){
    $(this).attr('style', function (i, s) {
        return (s || '') +
            'background-color: #F8F9FA !important;'
    });}
});


$(document).on('click', '.list-group-item', function(e) {
    //target only on this element, not on the childrens
    // if(e.target !== e.currentTarget) return;

    // if(e.target == $("#delete")) return;

    $('.list-group-item').not(this).removeClass("selected");
    $('.list-group-item').not(this).attr('style', function (i, s) {
        return (s || '') +
            'background-color: #F8F9FA !important;'
    });
    $(this).addClass("selected");


    var noteTitle = $(this).find('#fullTitle').html();
    var noteDate = $(this).find('#fullDate').html();
    var noteContent = $(this).find('#fullContent').html();
    // alert(noteTitle);
    $("#title").val(noteTitle);
    $("#date").val(noteDate);
    $("#content").val(noteContent);
    $.ajax({
        method: "POST",
        url: "services/update-note.php",
        data: {
            selectedNoteId: $(this).attr("id"),
            title: noteTitle,
            date: noteDate,
            content: noteContent
        }
    }).done(function (msg){

    })
});


$(document).ready(function () {
    $('[data-toggle="popover"]').popover();
});

$(document).ajaxComplete(function() {
    $('[data-toggle="popover"]').popover();
  });

$('#content, #title, #date').bind('input propertychange', function () {
    $("[data-toggle='popover']").popover('hide');
    var theDate = getCurrentDate();
    if($("#date").val()){
        var theDate = $("#date").val();
    }

    $.ajax({
        method: "POST",
        url: "services/update-note.php",
        data: {
            title: $("#title").val(),
            date: theDate,//$("#date").val(),
            content: $("#content").val()
        }
    }).done(function (msg) {
        ajaxLoadSidebarNote();
        // alert(msg);
    }).fail(function () {
        console.error("Could not save note automatically");
    });  
    
});

function getCurrentDate(){
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

return today = yyyy + '/' + mm + '/' + dd;
};

$('#search').bind('input propertychange', function () {
    ajaxLoadSidebarNote();
});

function ajaxLoadSidebarNote(){
    $.ajax({
        method: "POST",
        url: "services/load-sidebar-note.php",
        data: {
            searchKeyword: $("#search").val()
        }    
    }).done(function(msg){
        // alert(msg);
        $(".list-group").html(msg);
    })
};



$(document).on('click', 'button.delete', function(e) {
    e.stopPropagation();

    $(this).parent().parent().parent().parent().css("display", "none");
    // alert($(this).parent().attr("id"));
    $.ajax({
        method: "POST",
        url: "services/delete-note.php",
        data: {
            noteId:  $(this).parent().parent().parent().parent().attr("id")
        }
    }).done(function (msg){
        //if the deleted note is the current note => reset form
        if(msg){
        $("#title").val("");
        $("#date").val("");
        $("#content").val("");
        }
    })
});

$('#addNote').click(function(){
    $.ajax({
        method: "POST",
        url: "services/add-new-note.php"
    }).done(function (){
        $("#title").val("");
        $("#date").val("");
        $("#content").val("");

        //ajaxLoadForm();
    })
});

