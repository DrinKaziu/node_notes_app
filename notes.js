const chalk = require('chalk');
const fs = require('fs');

const addNote = (title, body) => {
  const notes = loadNotes();

  const duplicateNote = notes.find((note) => note.title === title);

  if (!duplicateNote) {
    notes.push({
      title: title,
      body: body
    });
    
    saveNotes(notes);
    console.log(chalk.green.inverse('Note added successfully'));
  } else {
    console.log(chalk.red.inverse('Note already exists'));
  }
}

const removeNote = (title) => {
  const notes = loadNotes();
  const notesToKeep = notes.filter((note) => note.title !== title);
  if (notes.length > notesToKeep.length) {
    saveNotes(notesToKeep);
    console.log(chalk.green.inverse('Note successfully removed'));
  } else {
    console.log(chalk.red.inverse('Note not found'));
  }
}

const listNotes = () => {
  const notes = loadNotes();
  if (notes.length > 0) {
    console.log(chalk.inverse('Your Notes:'));

    notes.forEach((note) => {
      console.log(note.title);
     });
  } else {
    console.log(chalk.inverse('There are no notes to display'));
  }
}

const readNote = (title) => {
  const notes = loadNotes();
  const noteToRead = notes.find((note) => note.title === title);
  if (noteToRead) {
    console.log(chalk.inverse('Title:') + ' ' + noteToRead.title);
    console.log(chalk.inverse('Body:') + ' ' + noteToRead.body);
  } else {
    console.log(chalk.inverse('Note not found'));
  }
}

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync('notes.json');
    const dataJson = dataBuffer.toString();
    return JSON.parse(dataJson);
  } catch(e) {
    return [];
  }
}

const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync('notes.json', dataJSON);
}

module.exports = {
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNote: readNote
}