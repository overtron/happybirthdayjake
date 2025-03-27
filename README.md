# 🎉 Happy Birthday Jake! Website

A simple celebratory website for Jake's birthday that features:
- A festive home page with animated elements
- A surprise modal with rotating fun facts
- Background music
- Easter eggs
- Mobile-first responsive design

## 📱 Mobile-First Design
This website is built with a mobile-first approach, ensuring it looks great on phones, tablets, and desktops.

## 🗂️ Project Structure

```
happybirthdayjake/
├── index.html              # Main page
├── fish.html               # Secret page Easter egg
├── css/
│   └── style.css           # Main stylesheet
├── js/
│   └── main.js             # JavaScript functionality
├── audio/
│   └── README.md           # Instructions for audio files
└── images/
    └── README.md           # Instructions for image files
```

## 🖼️ Adding Media Files

Before viewing the website, you'll need to add:

1. **Images**: 
   - Add a `cat-party.gif` file to the `images/` directory
   - See `images/README.md` for details

2. **Audio**:
   - Add a `birthday.mp3` file to the `audio/` directory
   - See `audio/README.md` for details

## 🚀 Viewing the Website

Simply open `index.html` in any modern web browser to view the site.

```bash
# If you have Python installed, you can run a simple server:
python -m http.server

# Then open http://localhost:8000 in your browser
```

## 🎁 Easter Eggs

The site includes two Easter eggs:
1. Click the pizza icon (🍕) in the footer
2. Navigate to `/fish.html` for a fishing-themed surprise

## 📋 Features

- **Confetti Animation**: Launches when the page loads and when the surprise button is clicked
- **Surprise Modal**: Shows a birthday message and rotating fun facts about Jake
- **Background Audio**: Plays when the surprise button is clicked
- **Responsive Design**: Works on all device sizes
- **Easter Eggs**: Hidden surprises for Jake to discover

## 🛠️ Technologies Used

- HTML5
- CSS3 (with CSS variables and media queries)
- Vanilla JavaScript
- [canvas-confetti](https://github.com/catdad/canvas-confetti) for the confetti effect
- Font Awesome for icons

## 🔄 Customization

Feel free to customize:
- Colors in the CSS variables (`:root` section in `style.css`)
- Fun facts and birthday message in `main.js`
- Add more Easter eggs or features!
