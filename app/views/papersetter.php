<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html ng-app='psApp' ng-cloak>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
	<title>Papersetter</title>
	<link data-require="bootstrap-css@*" data-semver="3.0.0" rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap.min.css" />
	<link rel="stylesheet" type="text/css" href="assets/bower-material-master/angular-material.min.css">
	<link rel="stylesheet" type="text/css" href="assets/css/main.css">
	<link rel="stylesheet" type="text/css" href="assets/css/ngProgress.css">
	<link rel="stylesheet" type="text/css" href="assets/bower-material-master/themes/teal-theme.css">
	<link rel="stylesheet" type="text/css" href="assets/css/ng-table.min.css">
</head>
<body ui-view layout="column" layout-fill>


	

	<script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/angular.js/1.3.3/angular.min.js"></script>
	<script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/angular.js/1.3.3/angular-sanitize.min.js"></script>
	<script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/angular.js/1.3.3/angular-cookies.min.js"></script>
	<script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/angular-ui-router/0.2.11/angular-ui-router.min.js"></script>
	<script type="text/javascript" src="assets/js/ngProgress.min.js"></script>
	<script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/hammer.js/1.1.3/hammer.min.js"></script>
	<script type="text/javascript" src="assets/js/app.js"></script>
	<script type="text/javascript" src="assets/bower-material-master/angular-material.min.js"></script>
	<script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/angular.js/1.3.3/angular-animate.min.js"></script>
	<script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/angular.js/1.3.3/angular-aria.min.js"></script>	
	<script type="text/javascript" src="assets/js/ng-table.min.js"></script>
	<script>
    angular.module("psApp").constant("CSRF_TOKEN", '<?php echo csrf_token(); ?>');
	</script>

</body>
</html>
 