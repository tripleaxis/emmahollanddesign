<?
$DEBUG = false;
$VALID_EXTENSIONS = array('jpg', 'jpeg', 'png');
$MIN_WIDTH = 700;
$MIN_HEIGHT = 500;

$targetDir = "./";
$response = array();

$tmpName = $_FILES['image']['tmp_name'];
$fileName = preg_replace('/[^\w\.]/', '-', $_FILES['image']['name']);
$targetFile = $targetDir . basename($fileName);
$extension = pathinfo($targetFile, PATHINFO_EXTENSION);

// Check file to ensure valid image of specific types
$imageSize = getimagesize($tmpName);
$isValidImage = $imageSize !== false;
$isValidExtension = in_array(strtolower($extension), $VALID_EXTENSIONS);
$isValidDimensions = $imageSize[0] >= $MIN_WIDTH && $imageSize[1] >= $MIN_HEIGHT;

$canUpload = $isValidImage && $isValidExtension && $isValidDimensions;

// Perform upload:
if($canUpload && move_uploaded_file($tmpName, $targetFile)) {
	$response['status'] = 1;
	$response['path'] = "/images/artwork/$fileName";
} else {
	$response['status'] = 0;
	$error = 'Unknown error';

	if(!$isValidImage) {
		$error = 'File was not an image';
	}
	else if(!$isValidExtension) {
		$error = "Invalid fileType: $extension";
	}
	else if(!$isValidDimensions) {
		$error = "Image dimensions must be greater than $MIN_WIDTH x $MIN_HEIGHT";
	}

	$response['errorText'] = $error;
}

// ----- DEBUG ------
if($DEBUG) {
	$response['debug'] = array(
		'formData' => $_FILES,
		'post' => $_REQUEST,
		'tmpName' => $tmpName,
		'fileName' => $fileName,
		'extension' => $extension,
		'imageSize' => $imageSize,
		'validImage' => $isValidImage,
		'validExtension' => $isValidExtension,
		'canUpload' => $canUpload
	);
}

// response
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Content-Type: application/json");
die(json_encode($response));
?>
