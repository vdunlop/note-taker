# note-taker

## Description
This application can be used to write and save notes.

### User-Story
AS A small business owner

I WANT to be able to write and save notes

SO THAT I can organize my thoughts and keep track of tasks I need to complete

### Acceptance-Criteria
GIVEN a note-taking application

WHEN I open the Note Taker

THEN I am presented with a landing page with a link to a notes page

WHEN I click on the link to the notes page

THEN I am presented with a page with existing notes listed in the left-hand column, plus empty fields to enter a new note title and the note’s text in the right-hand column

WHEN I enter a new note title and the note’s text

THEN a "Save Note" button and a "Clear Form" button appear in the navigation at the top of the page

WHEN I click on the Save button

THEN the new note I have entered is saved and appears in the left-hand column with the other existing notes and the buttons in the navigation disappear

WHEN I click on an existing note in the list in the left-hand column

THEN that note appears in the right-hand column and a "New Note" button appears in the navigation

WHEN I click on the "New Note" button in the navigation at the top of the page

THEN I am presented with empty fields to enter a new note title and the note’s text in the right-hand column and the button disappears

### Mock-Up

![Alt text](./examples/logo-project10.jpg)

## Installation-Execution

Open a command terminal, go to the SVG-logo-maker folder and execute index.js using the command "node index.js".

You will be prompted to enter the following information:

1. Logo text of up to 3 digits

2. Color of the logo text using color keyword or a '#' started hexadecimal number representing a color

3. Shape - choose from Circle, Triangle and Square

4. Color of the shape that the text will be on

## Usage

The SVG Logo Maker can be used to create simple logos (300 x 200) of format SVG. The logo will be stored in an examples folder named logo.svg. You may change the name or move it to prevent it from being overwritten when the next logo is created.

## Testing
The SVG Logo Maker was tested using "jest". To run the tests, go to the SVG-logo-maker folder and execute "npm run test". You will need to install npm and/or jest if not already installed.

## Credits
N/A

## License
N/A