var site = {
    
    showCommits: function(templateId) {
        var template = new jugl.Template(templateId);
        return function(data) {
            var commit, msg, words, commits = data.commits;
            for (var i=0, len=commits.length; i<len; ++i) {
                commit = commits[i];
                msg = commit.message;
                words = msg.split(/\s+/);
                if (words.length > 10) {
                    words = words.splice(0, 10);
                    words.push("...");
                }
                commit.message = words.join(" ");
            }
            template.process({
                context: {commits: commits}
            });
        };
    },
    
    prepCommits: function(templateId) {
        var head = document.getElementsByTagName("head")[0];
        var script = document.createElement("script");
        script.src = "http://github.com/api/v2/json/commits/list/openlayers/openlayers/master/?callback=site.showCommits('" + templateId + "')";
        head.appendChild(script);
    }
    
};
