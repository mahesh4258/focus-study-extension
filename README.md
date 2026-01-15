# 🎓 Focus Study - Distraction Free YouTube & Productivity Tool

![Focus Study Banner](promo_tile.png) 
A powerful **Chrome Extension (Manifest V3)** designed to help students and professionals reclaim their focus. It transforms YouTube into a pure learning platform by removing algorithmic distractions and provides a built-in Pomodoro-style timer with website blocking capabilities.

> **"Master your time, master your learning."**

## 🚀 Features

### 1. 🛡️ Distraction-Free YouTube
* **Smart DOM Manipulation:** Automatically hides the **Home Feed**, **Comments**, **Shorts**, and **Recommended Videos** sidebar.
* **Playlist-Aware:** Intelligently detects if you are watching a course playlist. If yes, it **keeps the playlist sidebar visible** so you can navigate lessons, while still hiding the "Up Next" junk.
* **Pinned Comment Support:** Hides the comment section by default but **reveals it automatically** if the creator has a "Pinned Comment" (often used for important updates or corrections).

### 2. ⏱️ Focus Timer & Goal Tracker
* **Custom Timer:** Set your study session length (e.g., 25, 45, 60 mins).
* **Daily Analytics:** Tracks your total focus minutes for the day and saves your progress locally.
* **Goal Visualization:** A dynamic progress bar shows how close you are to your daily study goal.

### 3. 🚫 Website Blocker
* **Active Blocking:** While the timer is running, distracting sites (Instagram, Twitter, TikTok, Reddit, Facebook) are blocked.
* **Redirect System:** Attempts to access blocked sites are instantly redirected to a local "Focus Page" to remind you to get back to work.

## 🛠️ Tech Stack

* **Manifest V3** (Latest Chrome Extension Standard)
* **JavaScript (ES6+)** - Core logic for background workers and DOM manipulation.
* **Chrome Storage API** - For persisting user settings, daily stats, and goals.
* **Chrome Alarms API** - For accurate background timing and notifications.
* **CSS3** - For selective UI hiding and responsive popup styling.
* **Git & GitHub** - Version control and deployment.

## 📦 Installation (Developer Mode)

Since this project is open-source, you can install it directly from the code:

1.  **Clone this repository** (or download the ZIP):
    ```bash
    git clone [https://github.com/YOUR_USERNAME/focus-study-extension.git](https://github.com/YOUR_USERNAME/focus-study-extension.git)
    ```
2.  Open Google Chrome and go to `chrome://extensions`.
3.  Toggle **Developer Mode** (top right corner) to **ON**.
4.  Click the **Load Unpacked** button (top left).
5.  Select the folder where you cloned/extracted this project.
6.  The **Focus Shield** icon should appear in your toolbar!

## 🎮 How to Use

1.  **Open YouTube:** Notice how clean it is! No homepage recommendations, no Shorts.
2.  **Click the Extension Icon:** Open the popup menu.
3.  **Set a Goal:** Enter your daily study goal (e.g., 60 mins).
4.  **Start a Session:** Set the timer for 25 minutes and click **"Start Focus"**.
5.  **Study:** If you try to open Instagram while the timer is running, you will be blocked!
6.  **Track Progress:** Watch your daily progress bar fill up as you complete sessions.

## 🔮 Future Roadmap

* [ ] **Category Filtering:** Allow "Educational" YouTube videos but block "Gaming" videos automatically using API tags.
* [ ] **Custom Blocklist:** Allow users to add their own websites to the blocklist via the settings UI.
* [ ] **Weekly Charts:** A graph showing study performance over the last 7 days.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
*Created with ❤️ by Mahesh Thamarapalli*
