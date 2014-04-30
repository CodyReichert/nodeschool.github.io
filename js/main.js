var back = document.createElement('button');
back.appendChild(document.createTextNode('Back'));
back.id = 'back';
back.addEventListener('click', function (ev) {
  window.location.hash = '#';
});

var boxContainer = document.querySelector('.boxes');
boxContainer.parentNode.insertBefore(back, boxContainer);

var boxes = [].slice.call(document.querySelectorAll('.box'));
boxes.forEach(function (box) {
  box.addEventListener('click', function (ev) {
    window.location.hash = '#' + this.getAttribute('data-url');
  });
  box.classList.add('small');
});

var sectionHeaders = [].slice.call(document.querySelectorAll('.section'));

function hideAll() {
  boxes.forEach(function (box) {
    box.style.display = 'none';
  });
  sectionHeaders.forEach(function (header) {
    header.style.display = 'none';
  });
}

function showAll() {
  boxes.forEach(function (box) {
    box.style.display = 'inline-block';
    box.classList.add('small');
  });
  sectionHeaders.forEach(function (header) {
    header.style.display = 'block';
  });
}

window.addEventListener('hashchange', handleHashChange);

function handleHashChange() {
  var hash = window.location.hash.slice(1);

  if (!hash)
    return showIndex();
  showItemByUrl(hash);
}

function showIndex() {
  showAll();
  back.classList.remove('show');
}

function showItemByUrl(frag) {
  var el = document.querySelector('*[data-url="'+frag+'"]');
  if (el && el.classList.contains('small')) {
    hideAll();
    el.style.display = 'block';
    el.classList.remove('small');
    back.classList.add('show');
  }
}

handleHashChange();

function sortDates(data) {
  var today = new Date()

  // add formatted dates
  data.forEach(function(event) {
    event.startUTC = new Date(event.startdate)
    if (event.enddate) event.endUTC = new Date(event.enddate)
  })

  // sort the dates
  var sorted = data
  sorted.sort(function(a,b) {
    return a.startUTC - b.startUTC
  })

  // only upcoming events
  var freshies = []
  var todayBuffer = new Date()
  todayBuffer.setHours(today.getHours() - 24)

  sorted.forEach(function(event) {
    if (event.startUTC >= todayBuffer)
      freshies.push(event)
  })

  if (freshies.length !== 0) {
    return freshies
  } else return {
    "name": "No upcoming events. Check out past events!",
    "tickets": "events.html"
  }
  return freshies
}

function attendButton() {
    $("#courses").hide();
    $("#events").fadeTo("fast", 1.0).show(1000);
    $("#attend-button").attr("class", "button-main note-active");
    $("#lesson-button").attr("class", "note button-main");
}

function coursesButton() {
    $("#events").hide();
    $("#courses").fadeTo("fast", 1.0).show(1000);
    $("#lesson-button").attr("class", "button-main note-active");
    $("#attend-button").attr("class", "note button-main");
}

function coreConceptsButton() {
    $("#electives").fadeTo("fast", 0).hide(250);
    $("#core-concepts").fadeTo("fast", 1.0).show(750);
    $("#core-concepts-button").attr("class", "lesson-note-active button-lesson concepts-margin");
    $("#electives-button").attr("class", "lesson-note button-lesson float-right");
}

function electivesButton() {
    $("#core-concepts").hide();
    $("#electives").fadeTo("fast", 1.0).show(750);
    $("#electives-button").attr("class", "lesson-note-active button-lesson float-right");
    $("#core-concepts-button").attr("class", "lesson-note button-lesson concepts-margin");
}  
