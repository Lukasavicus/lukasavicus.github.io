// Injects the "2016 version" banner (styles in banner.css). Loaded with defer.
document.addEventListener('DOMContentLoaded', function () {
  var b = document.createElement('div');
  b.className = 'banner-2016';
  b.innerHTML = "You're viewing the 2016 version of this site · <a href=\"/\">Back to the current site</a>";
  document.body.insertBefore(b, document.body.firstChild);
});
