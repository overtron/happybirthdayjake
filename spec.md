🎉 Project Spec: "Happy Birthday Jake!" Website
Goal: A simple celebratory site that wishes Jake a happy birthday in a playful and personalized way, deployable to Heroku.

🛠 Tech Stack
Backend: Python + Flask (minimal and Heroku-friendly)
Frontend: HTML/CSS + basic JavaScript (no build tools needed)
Deployment: Heroku (via Git)
Extras: Font Awesome or similar for icons
🖼 Pages
1. Home Page (/)

Headline: “🎉 Happy Birthday, Jake! 🎉”
Subheadline: “To a woodworker, coder, fisher, and bringer of Pizza Friday joy.”
Animated Confetti using a lightweight JS lib or canvas effect
Auto-playing background audio: maybe a chipper instrumental or playful lo-fi beat
Call-to-Action: A “Press this for a surprise” button
🎁 Surprise Modal
Triggered when the button is clicked:

Popup modal with:
A custom birthday message
Rotating fun facts about Jake’s interests (woodworking, brewing, etc.)
An animated GIF of a cat wearing a party hat or a retro techy celebration
🧩 Easter Eggs (Optional)
Click a tiny 🍕 pizza icon in the footer → reveals “It’s Pizza Friday, every day for you, Jake!”
A secret route like /fish shows a fun photo or ASCII trout with “Hope you catch a big one this year!”
✍️ Content Example
“Happy Birthday to a person who can debug a stack trace *and* sand down a table leg with finesse. You make tech more human and Fridays more delicious. Cheers to another trip around the sun, full of side projects and slow pours. 🎉🍻”
🚀 Deployment Checklist
 Flask app with route for /
 Static folder for CSS, JS, and images
 requirements.txt and Procfile for Heroku
 GitHub repo connected to Heroku for easy push-to-deploy
