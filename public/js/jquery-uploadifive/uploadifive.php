<?php

session_start();
// Set the uplaod directory
$date = date('m-d-Y');
$quoteId = $_SESSION['quote_id'];
$uploadDir = $_SERVER['DOCUMENT_ROOT']."/uploads/".$date."/".$quoteId."/";

echo $uploadDir;

if(!file_exists($uploadDir)){
	echo "Dir doesn't exist";
	$make = mkdir($uploadDir, 0777, true);
	if($make == false){
		echo "Failed to make directory</n>";	
	}
}else{
	
}

if (!empty($_FILES)) {
	$tempFile   = $_FILES['Filedata']['tmp_name'][0];
	$targetFile = $uploadDir . $_FILES['Filedata']['name'][0];

	// Validate the file type
	$fileTypes = array('jpg', 'jpeg', 'gif', 'png'); // Allowed file extensions
	$fileParts = pathinfo($_FILES['Filedata']['name'][0]);

	// Validate the filetype
	if (in_array($fileParts['extension'], $fileTypes)) {

		// Save the file
		move_uploaded_file($tempFile,$targetFile);
		echo 1;

	} else {

		// The file type wasn't allowed
		echo 'Invalid file type.';

	}
}
?>
