jQuery multiple month picker
=========================

Based on lalkmim's brilliant jqm-multiple-month-picker for mobile, I've edited the code to make a multi month picker for any platform!

The style is more plain, but it works on any device! So I'll leave the front-end to you lovely people :D

Usage
-----

HTML
```
<div id="testarea"></div>
```

Javascript
```
$(document).ready(function() {
  $('#testarea').mmp();
});
```

Retrieve selected values:
```
$('#testarea').mmp('value');
```

Set values:
```
$('#testarea').mmp('value', ['2014-01', '2014-02', '2014-07']);
```


Example
-----
http://cdn.rawgit.com/lalkmim/jqm-multiple-month-picker/master/testfile.html
