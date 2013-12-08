jquery.uploadMe
===============


Description
===============

jQuery plugin for a custom upload input.

Tested browser IE8+ Firefox Chrome

Usage
===============

HTML

	<iframe id="iframe" frameborder="0"></iframe>

Javascript

	$('#iframe').uploadMe({
		width: 200,
		height: 200,
		inputName: 'image',
		action: '/postme.php'
	});

Options
===============
<table>
  <tr>
    <th>Option</th><th>Description</th>
  </tr>
  <tr>
    <td>width</td><td>width of custom upload input</td>
  </tr>
  <tr>
    <td>height</td><td>height of custom upload input</td>
  </tr>
  <tr>
    <td>inputName</td><td>name of the input tag</td>
  </tr>
</table>
