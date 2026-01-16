// === Dane karteczek ===
let posts = [
  {id: 1, text: "Pierwsza notatka", color: "#fffbe0"},
  {id: 2, text: "Druga notatka", color: "#ffcccb"}
];

// === Funkcja rysująca stół ===
function renderBoard() {
  const board = document.getElementById('board');
  board.innerHTML = '';

  posts.forEach(post => {
    const note = document.createElement('div');
    note.className = 'note';
    note.style.backgroundColor = post.color;
    // lekka rotacja, żeby wyglądało jak luźno na stole
    note.style.setProperty('--rotate', (Math.random() * 10 - 5) + 'deg');

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

// === Dodawanie nowej karteczki ===
function addNote() {
  const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
  // nowa karteczka z losowym kolorem
  const colors = ["#fffbe0","#ffcccb","#c3f7d6","#add8e6","#f5d76e"];
  const color = colors[Math.floor(Math.random() * colors.length)];
  posts.push({id, text: "Nowa notatka", color});
  renderBoard();
  savePosts();
}

// === Minimalna weryfikacja ===
function verifyUser() {
  return confirm("Kliknij OK jeśli jesteś człowiekiem");
}

// === Zapis do LocalStorage ===
function savePosts() {
  localStorage.setItem('tapetPosts', JSON.stringify(posts));
}

// === Wczytywanie z LocalStorage ===
function loadPosts() {
  const saved = localStorage.getItem('tapetPosts');
  if (saved) posts = JSON.parse(saved);
}

// === Obsługa przycisku ===
document.getElementById('addNoteBtn').addEventListener('click', () => {
  if (verifyUser()) addNote();
});

// === Start ===
loadPosts();
renderBoard();

