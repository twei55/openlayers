---
layout: master
title: Git Basics
---

# OpenLayers Development with Git #

This document is not meant to provide a comprehensive guide to git.  There are a number of good git tutorials online.  The [GitHub Help](http://help.github.com/) site is a good starting place.  This document is a collection of common git tasks for developers wishing to contribute to [OpenLayers](http://openlayers.org).  The examples all refer to the central [OpenLayers git repository](http://github.com/openlayers/openlayers).  In most cases, developers will be working with their own forks of this repository.

## Git Guides ##
{% for post in site.categories.git %}
* [{{ post.title }}]({{ site.url }}{{ post.url }})
{% endfor %}
