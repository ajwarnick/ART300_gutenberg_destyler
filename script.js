function printFile(file) {
    var reader = new FileReader();
    reader.onload = function(evt) {
        let old_html = evt.target.result;
        let reg_str = /(style="([^"]*)")/gi;
        let head_styles = /(<style)([\s\S]*?)(<\/style>)/gi;

        let new_html = old_html.replace(reg_str, "");



        if( new_html.match( head_styles ) ){
            new_html = new_html.replace(head_styles, "");
        }

        // to match
        // cellpadding="4" border="3" 
        // ALIGN="center" WIDTH="80%" VALIGN="top"


        new_html = new_html.replace( head_styles, "");
        download("index.html", new_html);
    };
    reader.readAsText(file);
  }


function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
    dropZone.classList.remove("dragover");
  }
  
  // Start file download.
  
  




function handleFileSelect(evt) {
    evt.stopPropagation();
    evt.preventDefault();

    var files = evt.dataTransfer.files; // FileList object.
    
    // files is a FileList of File objects. List some properties.
    var output = [];
    for (var i = 0, f; f = files[i]; i++) {
        printFile(f);
        output.push('<li><strong>', escape(f.name), '</strong> (', f.type || 'n/a', ') - ',
                  f.size, ' bytes, last modified: ',
                  f.lastModifiedDate ? f.lastModifiedDate.toLocaleDateString() : 'n/a',
                  '</li>');

    }
    // document.getElementById('list').innerHTML = '<ul>' + output.join('') + '</ul>';
  }

  function handleDragOver(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
  }

  // Setup the dnd listeners.
  var dropZone = document.getElementById('drop_zone');
  dropZone.addEventListener('dragover', handleDragOver, false);
  dropZone.addEventListener('drop', handleFileSelect, false);


// dragenter
dropZone.addEventListener('dragenter', function(){
    dropZone.classList.add("dragover");
}, false);
// dragleave
dropZone.addEventListener('dragleave', function(){
    dropZone.classList.remove("dragover");
}, false);

