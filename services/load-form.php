<?php 

if(!isset($_SESSION)) 
{ 
    session_start(); 
} 

include "connect-database.php";

if ($_SESSION["currentNoteId"]) {
    $query = "SELECT * FROM note WHERE id=" . $_SESSION["currentNoteId"];
    $currentNote = mysqli_fetch_array(mysqli_query($link, $query));
} else {
    $currentNote = null;
}
?>

<form method="post">
  <div class="form-group note-form">
    <input type="text" name="title" id="title" class="form-control note-form border-0" placeholder="Title"
      value="<?php echo $currentNote["title"] ?>">
    <hr>
    <input type="date" name="date" id="date" class="form-control note-form border-0"
      value="<?php echo $currentNote['date'];?>">
    <hr>
    <textarea name="content" id="content" rows="16" placeholder="Content"
      class="form-control bg-light"><?php echo $currentNote["content"] ?></textarea>
  </div>
</form>

<script src="ckeditor/ckeditor.js?<?php echo time(); ?>"></script>

<script type="text/javascript">
  CKEDITOR.replace('content', {
    width: "100%",
    height: "300px"
  });  

</script>