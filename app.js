const yargs = require('yargs');
const notes = require('./notes.js');

//create add command
yargs.command ({
  command: 'add',
  describe: 'Add a note',
  builder: {
    title: {
      describe: 'note title',
      demandOption: true,
      type: 'string'
    },
    body: {
      describe: 'note body',
      demandOption: true,
      type: 'string'
    }
  },
  handler(argv) {
    notes.addNote(argv.title, argv.body);
  }
})

//create remove command
yargs.command ({
  command: 'remove',
  describe: 'Remove a note',
  builder: {
    title: {
      describe: 'note title',
      demandOption: true,
      type: 'string'
    }
  },
  handler(argv) {
    notes.removeNote(argv.title);
  }
})

//create list command
yargs.command ({
  command: 'list',
  describe: 'List all notes',
  handler() {
    notes.listNotes();
  }
})

//create read command
yargs.command ({
  command: 'read',
  describe: 'Read a note',
  builder: {
    title: {
      describe: 'note title',
      demandOption: true,
      type: 'string'
    }
  },
  handler(argv) {
    notes.readNote(argv.title)
  }
})

yargs.parse();