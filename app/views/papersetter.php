<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html ng-app='psApp' ng-csp ng-cloak>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
	<title>Papersetter</title>
	<link rel="stylesheet" href="assets/bower_components/angular-material/angular-material.min.css">
	<link rel="stylesheet" type="text/css" href="assets/css/main.css">
	<!-- <link rel="stylesheet" type="text/css" href="assets/css/ngProgress.css"> -->
	<link rel="stylesheet" type="text/css" href="assets/bower_components/angular-material/themes/teal-theme.css">
	<link rel="stylesheet" type="text/css" href="assets/bower_components/angular-material/themes/brown-theme.css">
	<link rel="stylesheet" type="text/css" href="assets/css/ng-table.min.css">
	<link rel="stylesheet" type="text/css" href="assets/css/angularCsp.css">
</head>
<body ui-view layout="horizontal" layout-fill>


	<script src="assets/bower_components/angular/angular.min.js"></script>
    <script src="assets/bower_components/angular-aria/angular-aria.min.js"></script>
    <script src="assets/bower_components/angular-animate/angular-animate.min.js"></script>
    <script src="assets/bower_components/hammerjs/hammer.min.js"></script>
    <script src="assets/bower_components/angular-material/angular-material.min.js"></script>

	
	<script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/angular.js/1.3.3/angular-sanitize.min.js"></script>
	<script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/angular.js/1.3.3/angular-cookies.min.js"></script>
	<script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/angular-ui-router/0.2.11/angular-ui-router.min.js"></script>
	<!--script type="text/javascript" src="assets/js/ngProgress.min.js"></script-->
	
	<script type="text/javascript" src="assets/js/app.js"></script>
	
	
	<script>
    angular.module("psApp").constant("CSRF_TOKEN", '<?php echo csrf_token(); ?>');
	</script>

</body>
</html>
 