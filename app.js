let posts = [
  {id:1, text:"Pierwsza notatka", color:"#f5d76e"}
];

// funkcja rysująca karteczki
function renderBoard() {
  const board = document.getElementById('board');
  board.innerHTML = '';
  posts.forEach(post => {
    const note = document.createElement('div');
    note.className = 'note';
    note.style.backgroundColor = post.color;
    
    const textarea = document.createElement('textarea');
    textarea.value = post.text;
    textarea.addEventListener('input', (e) => {
      post.text = e.target.value;
      savePosts();
    });

    note.appendChild(textarea);
    board.appendChild(note);
  });
}

function addNote() {
  const id = posts.length ? posts[posts.length-1].id + 1 : 1;
  posts.push({id, text:"Nowa notatka", color:"#f5d76e"});
  renderBoard();
  savePosts();
}

// prosta "weryfikacja" — pytanie: czy jesteś człowiekiem?
function verifyUser() {
  return confirm("Kliknij OK jeśli jesteś człowiekiem");
}

// symulowane "zapisywanie" w LocalStorage (bo na GitHub Pages nie mamy backendu)
function savePosts() {
  localStorage.setItem('tapetPosts', JSON.stringify(posts));
}

// wczytywanie
function loadPosts() {
  const saved = localStorage.getItem('tapetPosts');
  if(saved) posts = JSON.parse(saved);
}

document.getElementById('addNoteBtn').addEventListener('click', () => {
  if(verifyUser()) addNote();
});

loadPosts();
renderBoard();
