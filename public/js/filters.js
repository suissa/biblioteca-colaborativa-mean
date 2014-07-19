window.app.filter('regex', function() {
  return function(input) {    
    return (input.match(/\(([^)]*)\)/) != null) ? input.match(/\(([^)]*)\)/)[1] : input;
  };
});

window.app.filter('recommended', function() {
  return function(input, q) {   
    if (q == null) {
      return;
    }

    var out = [];

    var q = q.match(/\(([^)]*)\)/) == null ? q : q.match(/\(([^)]*)\)/)[1];
    
    for (i in input) {
      if(q == input[i].school) {
         
        out.push(input[i]);
      } 
    }

    return out;
  };
});

window.app.filter('split', function() {
  return function(input) {   
    return (input != null) ? input.split(' ')[0] : '';
  };
});

window.app.filter('msgNotRead', function() {
  return function(input, userId) { 
    var out = [];  
    for (i in input) {
      if (input[i].to._id == userId && !input[i].read) {
        out.push(input[i]);
      }
    }
    return out;
  };
});

window.app.filter('msgRead', function() {
  return function(input, userId) { 
    var out = [];  
    for (i in input) {
      if (input[i].to._id == userId && input[i].read) {
        out.push(input[i]);
      }
    }
    return out;
  };
});

window.app.filter('selected', function() {
  return function(input, school) {   
    for (i in input) {
      if (input[i].name == school) {
        delete input[i];
      }
      else {
        return input;
      }
    }
  };
});