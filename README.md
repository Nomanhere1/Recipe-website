# 🍳 TastyBite — Deliciously Simple Recipe Website

**TastyBite** is a modern, responsive culinary web application crafted with clean HTML5, modern CSS3, and vanilla JavaScript (ES6+). Designed with a warm, appetizing food-themed palette, smooth micro-interactions, and beginner-friendly navigation.

---

## 🌟 Key Features

### 1. 🏠 Hero Section & Real-Time Search
- **Inspiring Hero Banner**: Warm organic gradients, bold culinary typography (`Outfit`, `Plus Jakarta Sans`, and `Playfair Display`), and community stats.
- **Dual Real-Time Search**: Search by recipe name, ingredient (e.g. *salmon*, *garlic*, *tofu*), or cuisine with instant filter response.
- **Trending Fast-Tags**: Clickable quick chips (`#Garlic Chicken`, `#Italian Pasta`, `#Fluffy Soufflé`, `#Honey Salmon`, `#Vegetarian`).
- **Chef's Pick Preview Card**: Interactive hero card showcasing the recipe of the day with direct one-click modal launch.

### 2. 🏷️ Category Filters
- Quick-filter pills with emojis and dynamic recipe counts:
  - 🍽️ **All Recipes**
  - 🍳 **Breakfast**
  - 🥪 **Lunch**
  - 🍲 **Dinner**
  - 🍰 **Dessert**
  - ⚡ **Quick & Easy** (Meals under 25 mins)
  - 🥗 **Vegetarian & Vegan**

### 3. 🔍 Advanced Filtering & Sorting Toolbar
- **Difficulty Filter**: Easy 🟢, Medium 🟠, Hard 🔴
- **Max Cooking Time**: Under 20 min, 30 min, or 45 min
- **Sorting Modes**: Top Rated ⭐, Fastest Cook Time ⚡, Name A-Z 🔤
- **Favorites Only Toggle**: Instantly filters down to your saved collection.
- **Active Filter Chips**: Visually displays active filters with one-click "✕" chips and a "Reset All" button.

### 4. 📖 Interactive Recipe Details Modal
- **Hero Image & Meta**: High-resolution photography with cuisine, prep time, cook time, and calories.
- **Interactive Servings Scaler**: Click `[ - ]` and `[ + ]` to dynamically scale ingredient quantities up or down in real-time!
- **Interactive Prep Checklist**: Click ingredient checkboxes to cross them out as you cook—acting as a personal kitchen assistant.
- **Numbered Instructions**: Step-by-step instructions with clear titles and timing cues.
- **Chef's Pro Tips**: Special culinary secrets and substitution advice.
- **Nutritional Snapshot**: Quick breakdown of calories, protein, carbs, and fats per serving.
- **Print Friendly**: Built-in print mode (`window.print()`) that formats cleanly for home cooks with physical recipes.
- **Share Link**: One-click URL copy with deep-link hash (`#recipe=tuscan-garlic-chicken`).

### 5. ❤️ Favorites System (localStorage)
- Heart buttons located on recipe cards, spotlight banner, and modal.
- Saves automatically to browser `localStorage` with no backend or sign-up needed.
- Live badge counters in Header, Desktop Nav, Mobile Nav, and Footer.
- Dedicated "Favorites" view with an empty state and CTA if no recipes are saved.

### 6. 📱 Responsive & Accessible Design
- **Mobile First**: Fluid layout across phones (< 640px), tablets (768px - 1024px), and large desktops (> 1024px).
- **Mobile Navigation Drawer**: Accessible slide-in menu with backdrop blur.
- **Accessibility**: Semantic HTML5 elements (`<header>`, `<nav>`, `<main>`, `<article>`, `<dialog>`), keyboard navigation (ESC key modal close, focus states, skip-link).
- **Toast Notifications**: Non-intrusive floating feedback when saving/removing recipes or copying links.

---

## 📂 Project Structure

```text
NESHE REASERCH/
├── index.html            # Semantic HTML5 markup with accessible landmarks
├── css/
│   └── style.css         # Modern responsive CSS, CSS variables, animations, print mode
├── js/
│   ├── recipes.js        # 12 rich sample recipes with ingredients & instructions
│   └── app.js            # State management, filtering, modal, servings scaler, toasts
└── README.md             # Project documentation
```

---

## 🚀 How to Run

Because **TastyBite** is built with 100% vanilla web technologies, no build tools, npm packages, or database servers are required:

### Option A: Direct Browser Launch
Simply double-click [`index.html`](file:///c:/NESHE%20REASERCH/index.html) or right-click and choose **Open with > Chrome / Edge / Firefox**.

### Option B: Local Python Web Server (Recommended)
Open a terminal in the project folder and run:
```bash
python -m http.server 8000
```
Then visit [`http://localhost:8000`](http://localhost:8000) in your web browser.

---

## 🍲 Realistic Sample Recipes Included
1. **Creamy Tuscan Garlic Chicken** (Dinner, Italian, 30 min)
2. **Classic Neapolitan Margherita Pizza** (Dinner, Italian, 32 min)
3. **Japanese Berry Soufflé Pancakes** (Breakfast, Japanese, 30 min)
4. **Fragrant Thai Green Curry with Tofu** (Dinner, Thai, 30 min)
5. **California Avocado Toast with Poached Egg** (Breakfast, American, 15 min)
6. **Decadent Molten Chocolate Lava Cakes** (Dessert, French, 24 min)
7. **Creamy Wild Mushroom & Truffle Risotto** (Dinner, Italian, 45 min)
8. **Mediterranean Rainbow Quinoa Power Bowl** (Lunch, Mediterranean, 30 min)
9. **Glazed Honey Garlic Atlantic Salmon** (Dinner, Seafood, 20 min)
10. **Amazonian Berry Acai Smoothie Bowl** (Breakfast, Brazilian, 10 min)
11. **Sichuan Spicy Sesame Dan Dan Noodles** (Lunch, Asian, 24 min)
12. **Rustic Provençal French Ratatouille** (Dinner, French, 55 min)
