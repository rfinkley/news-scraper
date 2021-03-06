$(document).ready(() => {
  let articleContainer = $(".articleContainer");

  let clearPage = () => {
    articleContainer.empty();
    $.get("/api/articles?saved=true").then(data => {
      if (data && data.length) {
        renderArticles(data);
      } else {
        renderEmpty();
      }
    });
  }

  let renderEmpty = () => {
    const noArticles =
      $(["<div class='no-articles'>",
        "<h1>Oops! It looks like there are no saved articles!</h1>",
        "<h3>Would you like to browse available articles?</h3>",
        "<h4><a href='/'>Browse Articles</a></h4>",
        "</div>"
      ].join(""));
    articleContainer.append(noArticles);
  }

  let renderArticles = articles => {
    let articleSections = [];
    articles.forEach(article => {
      articleSections.push(createSection(article))
    });
    articleContainer.append(articleSections);
  }

  let createSection = article => {
    let section =
      $(["<section class='row'>",
        "<article class='three-quarter'>",
        "<h3 class='article-author'>",
        article.author,
        "</h3>",
        "<h2 class='article-title'>",
        article.title,
        "</h2>",
        "<p class='article-text'>",
        article.summary,
        "</p>",
        "</article>",
        "<aside class='quarter'>",
        "<ul class='aside-list'>",
        "<li><a data class='addNote'><i class='far fa-sticky-note'></i></a></li>",
        "<li><a class='deleteArticle'><i class='far fa-trash-alt'></i></a></li></ul></aside>",
        "</section>",
      ].join(""));
    section.data("_id", article._id);
    section.data("title", article.title);
    console.log(section.data("title"));
    
    return section;
  }

  let deleteArticle = function () {
    console.log($(this));
    
    const articleToDelete = $(this).parents(".row").data("_id");
    $.ajax({
      method: "DELETE",
      url: "/api/articles/" + articleToDelete
    }).then(data => {
      if (data.ok) {
        clearPage();
      }
    });
  }

  let addNote = function () {
    $(".modalInput").empty();
    const currentArticle = $(this).parents(".row").data("_id");
    console.log(currentArticle);
    $.get("/api/notes/" + currentArticle).then(data => {
      console.log(data);
      const modalText = [
        "<h4>Notes for Article: ",
        $(this).parents(".row").data("title"),
        "</h4>",
        "<hr />",
        "<ul class='list-group note-container'></ul>",
        "<textarea placeholder='New Note' rows='4' cols='60'></textarea>",
        "<button class='btn saveNote'>Save Note</button>"
      ].join("");
      $(".modalInput").append(modalText);
      let noteData = {
        _id: currentArticle,
        notes: data || []
      }
      $("btn.save").data("article", noteData);
      renderNotesList(noteData);
    })
    // Get the modal
    const modal = document.getElementById("noteModal");
    // Get the <span> element that closes the modal
    const span = document.getElementsByClassName("close")[0];

    modal.style.display = "block";

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
      modal.style.display = "none";
    }
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }
  }

  let renderNotesList = data => {
    console.log(data);
    let notesToRender = [];
    let currentNote;
    if (!data.notes.length) {
      currentNote = ["<li class='list-group-item'>No notes for this article yet.</li>"].join("");
      notesToRender.push(currentNote);
    } else {
      data.notes.forEach(note => {
        currentNote = $([
          "<li class='list-group-item note'>",
          note.noteText,
          "<button class='btn deleteNote'><i class='far fa-trash-alt'></i></button>",
          "</li>"
        ].join(""));
        currentNote.children("button").data("_id", note._id);
        notesToRender.push(currentNote);
      })
    }
    $(".note-container").append(notesToRender);
  }

  let saveNote = function () {
    let noteData;
    const newNote = $(".modalInput textarea").val().trim();
    if (newNote) {
      noteData = {
        _id: $(this).parents(".row").data("_id"),
        noteText: newNote
      };
      $.post("/api/notes", noteData).then(() => {
        // Get the modal
        const modal = document.getElementById("noteModal");
        modal.style.display = "none";
      })
    }
  }

  let deleteNote = function () {
      const noteToDelete = $(this).data("_id");
      console.log($(this));
      $.ajax({
        url: "/api/notes/" + noteToDelete,
        method: "DELETE"
      }).then(() => {
        const modal = document.getElementById("noteModal");
        modal.style.display = "none";
      });
  }

  $(document).on('click', '.deleteArticle', deleteArticle);
  $(document).on('click', '.addNote', addNote);
  $(document).on('click', '.saveNote', saveNote);
  $(document).on('click', '.deleteNote', deleteNote);

  clearPage();

})