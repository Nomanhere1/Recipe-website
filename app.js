/**
 * TastyBite — Modern Recipe Website JavaScript
 * Handles State, Dynamic Rendering, Live Search & Filtering,
 * LocalStorage Favorites, Interactive Recipe Modal with Servings Scaler,
 * Checklist Cook Mode, Toasts, and Accessibility.
 */

(function () {
  'use strict';

  // ==================== STATE MANAGEMENT ====================
  const STORAGE_KEY = 'tastybite_favorites_v1';

  // Initial favorites: prepopulate with 2 favorites so users immediately see how it works
  function getInitialFavorites() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored !== null) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('LocalStorage unavailable:', e);
    }
    // Default starter favorites
    return ['tuscan-garlic-chicken', 'fluffy-souffle-pancakes'];
  }

  const state = {
    recipes: typeof RECIPES_DATA !== 'undefined' ? RECIPES_DATA : [],
    categories: typeof RECIPE_CATEGORIES !== 'undefined' ? RECIPE_CATEGORIES : [],
    favorites: getInitialFavorites(),
    filters: {
      search: '',
      category: 'all',
      difficulty: 'all',
      maxTime: 'all',
      sortBy: 'popular',
      onlyFavorites: false
    },
    modal: {
      recipe: null,
      servings: 1,
      checkedIngredients: new Set()
    }
  };

  // ==================== DOM ELEMENTS ====================
  const elements = {
    // Header & Nav
    header: document.getElementById('header'),
    navFavBadge: document.getElementById('nav-fav-badge'),
    headerFavBadge: document.getElementById('header-fav-badge'),
    headerFavBtn: document.getElementById('header-fav-btn'),
    navFavoritesBtn: document.getElementById('nav-favorites-btn'),
    mobileFavBadge: document.getElementById('mobile-fav-badge'),
    mobileFavLink: document.getElementById('mobile-fav-link'),
    footerFavCount: document.getElementById('footer-fav-count'),
    footerFavLink: document.getElementById('footer-fav-link'),
    mobileToggle: document.getElementById('mobile-toggle'),
    mobileMenu: document.getElementById('mobile-menu'),
    mobileOverlay: document.getElementById('mobile-overlay'),
    mobileCloseBtn: document.getElementById('mobile-close-btn'),

    // Hero Section
    heroSearchInput: document.getElementById('hero-search-input'),
    heroSearchClear: document.getElementById('hero-search-clear'),
    heroSearchSubmit: document.getElementById('hero-search-submit-btn'),

    // Categories
    categoriesTrack: document.getElementById('categories-track'),

    // Recipes Explorer
    recipesGrid: document.getElementById('recipes-grid'),
    recipesViewTitle: document.getElementById('recipes-view-title'),
    recipesCountText: document.getElementById('recipes-count-text'),
    filterFavToggle: document.getElementById('filter-fav-toggle'),
    favFilterCount: document.getElementById('fav-filter-count'),
    recipeSearchInput: document.getElementById('recipe-search-input'),
    recipeSearchClear: document.getElementById('recipe-search-clear'),
    difficultyFilter: document.getElementById('difficulty-filter'),
    timeFilter: document.getElementById('time-filter'),
    sortSelect: document.getElementById('sort-select'),
    resetFiltersBtn: document.getElementById('reset-filters-btn'),
    activeFiltersChips: document.getElementById('active-filters-chips'),
    chipsList: document.getElementById('chips-list'),
    emptyState: document.getElementById('empty-state'),
    emptyStateResetBtn: document.getElementById('empty-state-reset-btn'),

    // Modal
    modalBackdrop: document.getElementById('recipe-modal-backdrop'),
    modal: document.getElementById('recipe-modal'),
    modalCloseBtn: document.getElementById('modal-close-btn'),
    modalBody: document.getElementById('modal-body'),

    // Toasts
    toastContainer: document.getElementById('toast-container'),

    // Newsletter
    newsletterForm: document.getElementById('newsletter-form'),
    newsletterEmail: document.getElementById('newsletter-email')
  };

  // ==================== FAVORITES SYSTEM ====================
  function saveFavorites() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.favorites));
    } catch (e) {
      console.warn('Unable to write to localStorage:', e);
    }
    updateFavoriteBadges();
  }

  function isFavorite(id) {
    return state.favorites.includes(id);
  }

  function toggleFavorite(id, triggerElement = null) {
    const recipe = state.recipes.find(r => r.id === id);
    const recipeTitle = recipe ? recipe.title : 'Recipe';
    const index = state.favorites.indexOf(id);

    if (index > -1) {
      state.favorites.splice(index, 1);
      showToast(`Removed "${recipeTitle}" from favorites`, '💔');
    } else {
      state.favorites.push(id);
      showToast(`Saved "${recipeTitle}" to favorites!`, '❤️');
    }

    saveFavorites();

    // Trigger visual pulse on trigger element if passed
    if (triggerElement) {
      triggerElement.classList.add('animate-heart');
      setTimeout(() => triggerElement.classList.remove('animate-heart'), 400);
    }

    // Refresh UI
    renderRecipes();
    updateSpotlightFavButton();

    // If modal is currently open for this recipe, update modal favorite button too
    if (state.modal.recipe && state.modal.recipe.id === id) {
      updateModalFavButton();
    }
  }

  function updateFavoriteBadges() {
    const count = state.favorites.length;
    const badges = [
      elements.navFavBadge,
      elements.headerFavBadge,
      elements.mobileFavBadge
    ];

    badges.forEach(badge => {
      if (badge) {
        badge.textContent = count;
        badge.classList.add('pulse');
        setTimeout(() => badge.classList.remove('pulse'), 350);
      }
    });

    if (elements.footerFavCount) {
      elements.footerFavCount.textContent = count;
    }
    if (elements.favFilterCount) {
      elements.favFilterCount.textContent = `(${count})`;
    }
  }

  // ==================== TOAST SYSTEM ====================
  function showToast(message, icon = '✨') {
    if (!elements.toastContainer) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span aria-hidden="true">${icon}</span> <span>${escapeHtml(message)}</span>`;

    elements.toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('toast-remove');
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 300);
    }, 3200);
  }

  // ==================== CATEGORIES RENDERING ====================
  function renderCategories() {
    if (!elements.categoriesTrack) return;

    elements.categoriesTrack.innerHTML = '';

    state.categories.forEach(cat => {
      // Calculate count of recipes matching this category
      let count = 0;
      if (cat.id === 'all') {
        count = state.recipes.length;
      } else if (cat.id === 'quick') {
        count = state.recipes.filter(r => r.totalTime <= 25 || r.tags.includes('Quick & Easy')).length;
      } else if (cat.id === 'vegetarian') {
        count = state.recipes.filter(r => r.tags.includes('Vegetarian') || r.tags.includes('Vegan')).length;
      } else {
        count = state.recipes.filter(r => r.category.toLowerCase() === cat.id.toLowerCase()).length;
      }

      const button = document.createElement('button');
      button.className = `category-pill ${state.filters.category === cat.id ? 'active' : ''}`;
      button.setAttribute('role', 'tab');
      button.setAttribute('aria-selected', state.filters.category === cat.id ? 'true' : 'false');
      button.dataset.categoryId = cat.id;

      button.innerHTML = `
        <span class="category-pill-icon" aria-hidden="true">${cat.icon}</span>
        <span class="category-pill-name">${cat.label}</span>
        <span class="category-pill-count">${count}</span>
      `;

      button.addEventListener('click', () => {
        setCategoryFilter(cat.id);
        smoothScrollToRecipes();
      });

      elements.categoriesTrack.appendChild(button);
    });
  }

  function setCategoryFilter(categoryId) {
    state.filters.category = categoryId;

    // Update active class on categories
    const pills = elements.categoriesTrack.querySelectorAll('.category-pill');
    pills.forEach(pill => {
      const isActive = pill.dataset.categoryId === categoryId;
      pill.classList.toggle('active', isActive);
      pill.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });

    renderRecipes();
  }

  // ==================== RECIPES FILTERING & SORTING ====================
  function getFilteredRecipes() {
    let result = [...state.recipes];

    // 1. Search Query
    if (state.filters.search.trim()) {
      const q = state.filters.search.trim().toLowerCase();
      result = result.filter(r => {
        const titleMatch = r.title.toLowerCase().includes(q);
        const descMatch = r.description.toLowerCase().includes(q);
        const cuisineMatch = r.cuisine.toLowerCase().includes(q);
        const tagsMatch = r.tags.some(tag => tag.toLowerCase().includes(q));
        const ingredientsMatch = r.baseIngredients.some(ing => ing.name.toLowerCase().includes(q));
        return titleMatch || descMatch || cuisineMatch || tagsMatch || ingredientsMatch;
      });
    }

    // 2. Category Filter
    if (state.filters.category !== 'all') {
      const cat = state.filters.category;
      if (cat === 'quick') {
        result = result.filter(r => r.totalTime <= 25 || r.tags.includes('Quick & Easy'));
      } else if (cat === 'vegetarian') {
        result = result.filter(r => r.tags.includes('Vegetarian') || r.tags.includes('Vegan'));
      } else {
        result = result.filter(r => r.category.toLowerCase() === cat.toLowerCase());
      }
    }

    // 3. Difficulty Filter
    if (state.filters.difficulty !== 'all') {
      result = result.filter(r => r.difficulty.toLowerCase() === state.filters.difficulty.toLowerCase());
    }

    // 4. Max Time Filter
    if (state.filters.maxTime !== 'all') {
      const maxMinutes = parseInt(state.filters.maxTime, 10);
      result = result.filter(r => r.totalTime <= maxMinutes);
    }

    // 5. Only Favorites Filter
    if (state.filters.onlyFavorites) {
      result = result.filter(r => isFavorite(r.id));
    }

    // 6. Sorting
    if (state.filters.sortBy === 'popular') {
      result.sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount);
    } else if (state.filters.sortBy === 'fastest') {
      result.sort((a, b) => a.totalTime - b.totalTime);
    } else if (state.filters.sortBy === 'name') {
      result.sort((a, b) => a.title.localeCompare(b.title));
    }

    return result;
  }

  // ==================== RECIPES RENDERING ====================
  function renderRecipes() {
    const filtered = getFilteredRecipes();

    // Update results title and count text
    updateToolbarHeader(filtered.length);

    // Update active filter chips
    updateActiveFilterChips();

    // Check empty state
    if (filtered.length === 0) {
      elements.recipesGrid.style.display = 'none';
      elements.emptyState.style.display = 'block';

      if (state.filters.onlyFavorites) {
        document.getElementById('empty-state-title').textContent = 'No Saved Recipes Yet';
        document.getElementById('empty-state-desc').textContent =
          'You haven’t added any recipes to your favorites yet. Click the ❤️ icon on any recipe to save it here for later!';
      } else {
        document.getElementById('empty-state-title').textContent = 'No Recipes Found';
        document.getElementById('empty-state-desc').textContent =
          'We couldn’t find any recipes matching your current filters. Try searching with different keywords or reset filters.';
      }
      return;
    }

    elements.emptyState.style.display = 'none';
    elements.recipesGrid.style.display = 'grid';
    elements.recipesGrid.innerHTML = '';

    // Render cards
    filtered.forEach(recipe => {
      const card = createRecipeCard(recipe);
      elements.recipesGrid.appendChild(card);
    });
  }

  function createRecipeCard(recipe) {
    const isFav = isFavorite(recipe.id);
    const diffClass = recipe.difficulty.toLowerCase();

    const card = document.createElement('article');
    card.className = 'recipe-card';
    card.dataset.recipeId = recipe.id;

    card.innerHTML = `
      <div class="card-media">
        <img 
          src="${escapeHtml(recipe.image)}" 
          alt="${escapeHtml(recipe.title)}" 
          class="card-img" 
          loading="lazy"
          onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1495521821757-a1efb6729352?auto=format&fit=crop&w=700&q=80';"
        >
        <span class="card-category-badge">${escapeHtml(recipe.category)}</span>
        <span class="card-time-badge">⏱️ ${recipe.totalTime}m</span>
        <button 
          class="card-fav-btn ${isFav ? 'is-favorite' : ''}" 
          data-recipe-id="${recipe.id}" 
          aria-label="${isFav ? 'Remove from favorites' : 'Save to favorites'}"
          title="${isFav ? 'Remove from favorites' : 'Save to favorites'}"
        >
          ${isFav ? '❤️' : '🤍'}
        </button>
      </div>

      <div class="card-content">
        <div class="card-tags-row">
          <span class="cuisine-tag">${escapeHtml(recipe.cuisine)}</span>
          <span class="difficulty-badge ${diffClass}">
            ${recipe.difficulty === 'Easy' ? '🟢' : recipe.difficulty === 'Medium' ? '🟠' : '🔴'} ${recipe.difficulty}
          </span>
        </div>

        <h3 class="card-title">${escapeHtml(recipe.title)}</h3>
        <p class="card-description">${escapeHtml(recipe.description)}</p>

        <div class="card-meta-row">
          <div class="meta-rating">
            <span class="star">★</span>
            <strong>${recipe.rating.toFixed(1)}</strong>
            <span>(${recipe.reviewCount})</span>
          </div>
          <div class="card-servings">
            <span>👥 ${recipe.servings} serv &bull; 🔥 ${recipe.calories} kcal</span>
          </div>
        </div>

        <div class="card-action-wrap">
          <button class="card-view-btn" data-action="view" data-recipe-id="${recipe.id}">
            View Recipe <span class="arrow">&rarr;</span>
          </button>
        </div>
      </div>
    `;

    // Click event for whole card or view button
    card.addEventListener('click', (e) => {
      // If favorite button clicked, toggle favorite and stop propagation
      const favBtn = e.target.closest('.card-fav-btn');
      if (favBtn) {
        e.stopPropagation();
        toggleFavorite(recipe.id, favBtn);
        return;
      }

      // Otherwise open recipe modal
      openRecipeModal(recipe);
    });

    return card;
  }

  function updateToolbarHeader(count) {
    if (state.filters.onlyFavorites) {
      elements.recipesViewTitle.textContent = '❤️ Your Saved Recipes';
      elements.recipesCountText.textContent = `Showing ${count} saved favorite${count === 1 ? '' : 's'}`;
    } else if (state.filters.category !== 'all') {
      const catObj = state.categories.find(c => c.id === state.filters.category);
      const catName = catObj ? catObj.label : state.filters.category;
      elements.recipesViewTitle.textContent = `${catName} Recipes`;
      elements.recipesCountText.textContent = `Showing ${count} recipe${count === 1 ? '' : 's'}`;
    } else if (state.filters.search.trim()) {
      elements.recipesViewTitle.textContent = `Search Results for "${state.filters.search.trim()}"`;
      elements.recipesCountText.textContent = `Found ${count} matching recipe${count === 1 ? '' : 's'}`;
    } else {
      elements.recipesViewTitle.textContent = 'All Recipes';
      elements.recipesCountText.textContent = `Showing ${count} curated recipes`;
    }

    // Toggle reset filters button visibility
    const isFiltered = 
      state.filters.search.trim() !== '' ||
      state.filters.category !== 'all' ||
      state.filters.difficulty !== 'all' ||
      state.filters.maxTime !== 'all' ||
      state.filters.onlyFavorites;

    elements.resetFiltersBtn.style.display = isFiltered ? 'inline-flex' : 'none';
  }

  function updateActiveFilterChips() {
    const chips = [];

    if (state.filters.search.trim()) {
      chips.push({
        label: `Search: "${state.filters.search.trim()}"`,
        onRemove: () => {
          state.filters.search = '';
          elements.recipeSearchInput.value = '';
          elements.heroSearchInput.value = '';
          elements.recipeSearchClear.style.display = 'none';
          elements.heroSearchClear.style.display = 'none';
          renderRecipes();
        }
      });
    }

    if (state.filters.category !== 'all') {
      const catObj = state.categories.find(c => c.id === state.filters.category);
      chips.push({
        label: `Category: ${catObj ? catObj.label : state.filters.category}`,
        onRemove: () => setCategoryFilter('all')
      });
    }

    if (state.filters.difficulty !== 'all') {
      chips.push({
        label: `Difficulty: ${state.filters.difficulty}`,
        onRemove: () => {
          state.filters.difficulty = 'all';
          elements.difficultyFilter.value = 'all';
          renderRecipes();
        }
      });
    }

    if (state.filters.maxTime !== 'all') {
      chips.push({
        label: `Under ${state.filters.maxTime} mins`,
        onRemove: () => {
          state.filters.maxTime = 'all';
          elements.timeFilter.value = 'all';
          renderRecipes();
        }
      });
    }

    if (state.filters.onlyFavorites) {
      chips.push({
        label: 'Favorites Only ❤️',
        onRemove: () => {
          state.filters.onlyFavorites = false;
          elements.filterFavToggle.classList.remove('active');
          elements.filterFavToggle.setAttribute('aria-pressed', 'false');
          renderRecipes();
        }
      });
    }

    if (chips.length > 0) {
      elements.activeFiltersChips.style.display = 'flex';
      elements.chipsList.innerHTML = '';
      chips.forEach(chip => {
        const chipEl = document.createElement('span');
        chipEl.className = 'filter-active-chip';
        chipEl.innerHTML = `<span>${escapeHtml(chip.label)}</span> <button aria-label="Remove filter">✕</button>`;
        chipEl.querySelector('button').addEventListener('click', chip.onRemove);
        elements.chipsList.appendChild(chipEl);
      });
    } else {
      elements.activeFiltersChips.style.display = 'none';
      elements.chipsList.innerHTML = '';
    }
  }

  function resetAllFilters() {
    state.filters.search = '';
    state.filters.category = 'all';
    state.filters.difficulty = 'all';
    state.filters.maxTime = 'all';
    state.filters.sortBy = 'popular';
    state.filters.onlyFavorites = false;

    // Reset controls
    elements.heroSearchInput.value = '';
    elements.recipeSearchInput.value = '';
    elements.heroSearchClear.style.display = 'none';
    elements.recipeSearchClear.style.display = 'none';
    elements.difficultyFilter.value = 'all';
    elements.timeFilter.value = 'all';
    elements.sortSelect.value = 'popular';
    elements.filterFavToggle.classList.remove('active');
    elements.filterFavToggle.setAttribute('aria-pressed', 'false');

    setCategoryFilter('all');
    renderRecipes();
    showToast('Filters cleared', '↺');
  }

  // ==================== RECIPE DETAILS MODAL ====================
  function openRecipeModal(recipe) {
    if (!recipe) return;

    state.modal.recipe = recipe;
    state.modal.servings = recipe.servings;
    state.modal.checkedIngredients.clear();

    renderModalContent();

    elements.modalBackdrop.classList.add('active');
    elements.modalBackdrop.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Focus close button for keyboard accessibility
    elements.modalCloseBtn.focus();

    // Update URL hash for sharing
    window.location.hash = `recipe=${recipe.id}`;
  }

  function closeRecipeModal() {
    elements.modalBackdrop.classList.remove('active');
    elements.modalBackdrop.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    state.modal.recipe = null;

    // Clear hash without reload
    if (window.location.hash.startsWith('#recipe=')) {
      history.replaceState(null, '', window.location.pathname + window.location.search);
    }
  }

  function renderModalContent() {
    const recipe = state.modal.recipe;
    if (!recipe) return;

    const isFav = isFavorite(recipe.id);

    // Calculate scaled ingredients
    const ratio = state.modal.servings / recipe.servings;

    const ingredientsHtml = recipe.baseIngredients.map((ing, idx) => {
      const isChecked = state.modal.checkedIngredients.has(idx);
      const scaledAmount = ing.amount ? formatIngredientAmount(ing.amount * ratio) : '';
      const unit = ing.unit ? ` ${ing.unit}` : '';

      return `
        <label class="ingredient-item ${isChecked ? 'checked' : ''}" data-index="${idx}">
          <input 
            type="checkbox" 
            class="ingredient-checkbox" 
            ${isChecked ? 'checked' : ''} 
            data-index="${idx}"
            aria-label="${scaledAmount}${unit} ${escapeHtml(ing.name)}"
          >
          <span class="ingredient-text">
            <strong>${scaledAmount}${unit}</strong> ${escapeHtml(ing.name)}
          </span>
        </label>
      `;
    }).join('');

    const instructionsHtml = recipe.instructions.map(step => `
      <div class="instruction-step">
        <div class="step-number">${step.step}</div>
        <div class="step-content">
          <h4 class="step-title">${escapeHtml(step.title)}</h4>
          <p class="step-text">${escapeHtml(step.text)}</p>
        </div>
      </div>
    `).join('');

    const tagsHtml = recipe.tags.map(tag => `
      <span class="modal-tag">${escapeHtml(tag)}</span>
    `).join('');

    elements.modalBody.innerHTML = `
      <!-- Modal Hero Image -->
      <div class="modal-hero">
        <img 
          src="${escapeHtml(recipe.image)}" 
          alt="${escapeHtml(recipe.title)}" 
          class="modal-hero-img"
          onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1495521821757-a1efb6729352?auto=format&fit=crop&w=1000&q=80';"
        >
        <div class="modal-hero-overlay">
          <div class="modal-tags">
            <span class="modal-tag cat">${escapeHtml(recipe.category)}</span>
            <span class="modal-tag">${escapeHtml(recipe.cuisine)} Cuisine</span>
            ${tagsHtml}
          </div>
          <h2 class="modal-title" id="modal-recipe-title">${escapeHtml(recipe.title)}</h2>
          <p class="modal-desc">${escapeHtml(recipe.description)}</p>
        </div>
      </div>

      <!-- Action Bar (Servings Scaler + Actions) -->
      <div class="modal-action-bar">
        <div class="servings-control" title="Adjust recipe servings">
          <span class="servings-label">Servings:</span>
          <button class="servings-btn" id="servings-decrease-btn" aria-label="Decrease servings">-</button>
          <span class="servings-count" id="servings-display">${state.modal.servings}</span>
          <button class="servings-btn" id="servings-increase-btn" aria-label="Increase servings">+</button>
        </div>

        <div class="modal-btn-group">
          <button class="modal-fav-btn ${isFav ? 'active' : ''}" id="modal-fav-toggle-btn">
            <span class="heart-icon">${isFav ? '❤️' : '🤍'}</span>
            <span class="fav-label">${isFav ? 'Saved' : 'Save'}</span>
          </button>
          <button class="btn btn-secondary btn-sm" id="modal-print-btn" title="Print Recipe">
            🖨️ Print
          </button>
          <button class="btn btn-secondary btn-sm" id="modal-share-btn" title="Share Recipe Link">
            🔗 Share
          </button>
        </div>
      </div>

      <!-- Quick Stats Grid -->
      <div class="modal-stats-grid">
        <div class="modal-stat-box">
          <span class="modal-stat-label">Prep Time</span>
          <span class="modal-stat-val">${recipe.prepTime} min</span>
        </div>
        <div class="modal-stat-box">
          <span class="modal-stat-label">Cook Time</span>
          <span class="modal-stat-val">${recipe.cookTime} min</span>
        </div>
        <div class="modal-stat-box">
          <span class="modal-stat-label">Total Time</span>
          <span class="modal-stat-val">${recipe.totalTime} min</span>
        </div>
        <div class="modal-stat-box">
          <span class="modal-stat-label">Calories</span>
          <span class="modal-stat-val">${recipe.calories} kcal</span>
        </div>
      </div>

      <!-- Columns: Ingredients Checklist & Step Instructions -->
      <div class="modal-columns">
        <!-- Ingredients Column -->
        <div class="modal-col-left">
          <div class="modal-section-title">
            <span>Ingredients</span>
            <span class="ingredients-helper" id="toggle-all-ingredients" role="button" tabindex="0">Check all</span>
          </div>
          <div class="ingredients-list" id="modal-ingredients-list">
            ${ingredientsHtml}
          </div>

          <!-- Nutrition Card -->
          <div class="nutrition-card">
            <h4 style="font-size: 0.95rem; font-weight: 700; margin-bottom: 10px; color: var(--color-text-main);">
              Nutritional Snapshot (per serving)
            </h4>
            <div class="nutrition-grid">
              <div class="nutri-item">
                <strong>${recipe.nutrition.calories}</strong>
                <small>Energy</small>
              </div>
              <div class="nutri-item">
                <strong>${recipe.nutrition.protein}</strong>
                <small>Protein</small>
              </div>
              <div class="nutri-item">
                <strong>${recipe.nutrition.carbs}</strong>
                <small>Carbs</small>
              </div>
              <div class="nutri-item">
                <strong>${recipe.nutrition.fat}</strong>
                <small>Fats</small>
              </div>
            </div>
          </div>
        </div>

        <!-- Instructions Column -->
        <div class="modal-col-right">
          <div class="modal-section-title">
            <span>Step-by-Step Instructions</span>
          </div>
          <div class="instructions-list">
            ${instructionsHtml}
          </div>

          <!-- Chef Tips -->
          ${recipe.chefTips ? `
            <div class="chef-tips-card">
              <div class="chef-tips-icon">💡</div>
              <div>
                <div class="chef-tips-title">Chef's Secret Tip</div>
                <div class="chef-tips-text">${escapeHtml(recipe.chefTips)}</div>
              </div>
            </div>
          ` : ''}
        </div>
      </div>
    `;

    attachModalEventListeners();
  }

  function attachModalEventListeners() {
    // Servings adjuster
    const decBtn = document.getElementById('servings-decrease-btn');
    const incBtn = document.getElementById('servings-increase-btn');

    if (decBtn) {
      decBtn.addEventListener('click', () => {
        if (state.modal.servings > 1) {
          state.modal.servings--;
          renderModalContent();
        }
      });
    }

    if (incBtn) {
      incBtn.addEventListener('click', () => {
        if (state.modal.servings < 24) {
          state.modal.servings++;
          renderModalContent();
        }
      });
    }

    // Modal Favorite toggle
    const favBtn = document.getElementById('modal-fav-toggle-btn');
    if (favBtn) {
      favBtn.addEventListener('click', () => {
        toggleFavorite(state.modal.recipe.id);
      });
    }

    // Modal Print
    const printBtn = document.getElementById('modal-print-btn');
    if (printBtn) {
      printBtn.addEventListener('click', () => {
        window.print();
      });
    }

    // Modal Share Link
    const shareBtn = document.getElementById('modal-share-btn');
    if (shareBtn) {
      shareBtn.addEventListener('click', () => {
        const shareUrl = `${window.location.origin}${window.location.pathname}#recipe=${state.modal.recipe.id}`;
        if (navigator.clipboard) {
          navigator.clipboard.writeText(shareUrl).then(() => {
            showToast('Recipe link copied to clipboard! 📋', '✅');
          }).catch(() => {
            prompt('Copy recipe link:', shareUrl);
          });
        } else {
          prompt('Copy recipe link:', shareUrl);
        }
      });
    }

    // Ingredients Checklist Click
    const ingList = document.getElementById('modal-ingredients-list');
    if (ingList) {
      ingList.addEventListener('change', (e) => {
        if (e.target.classList.contains('ingredient-checkbox')) {
          const idx = parseInt(e.target.dataset.index, 10);
          const item = e.target.closest('.ingredient-item');
          if (e.target.checked) {
            state.modal.checkedIngredients.add(idx);
            item.classList.add('checked');
          } else {
            state.modal.checkedIngredients.delete(idx);
            item.classList.remove('checked');
          }
        }
      });
    }

    // Toggle All Ingredients Helper
    const toggleAllHelper = document.getElementById('toggle-all-ingredients');
    if (toggleAllHelper) {
      toggleAllHelper.addEventListener('click', () => {
        const total = state.modal.recipe.baseIngredients.length;
        const allChecked = state.modal.checkedIngredients.size === total;

        if (allChecked) {
          state.modal.checkedIngredients.clear();
          toggleAllHelper.textContent = 'Check all';
        } else {
          for (let i = 0; i < total; i++) {
            state.modal.checkedIngredients.add(i);
          }
          toggleAllHelper.textContent = 'Uncheck all';
        }

        renderModalContent();
      });
    }
  }

  function updateModalFavButton() {
    const btn = document.getElementById('modal-fav-toggle-btn');
    if (!btn || !state.modal.recipe) return;

    const isFav = isFavorite(state.modal.recipe.id);
    btn.className = `modal-fav-btn ${isFav ? 'active' : ''}`;
    btn.innerHTML = `
      <span class="heart-icon">${isFav ? '❤️' : '🤍'}</span>
      <span class="fav-label">${isFav ? 'Saved' : 'Save'}</span>
    `;
  }

  function updateSpotlightFavButton() {
    const spotlightBtn = document.querySelector('.spotlight-card .quick-like-btn');
    if (!spotlightBtn) return;

    const recipeId = spotlightBtn.dataset.recipeId;
    if (isFavorite(recipeId)) {
      spotlightBtn.textContent = 'Saved in Favorites ❤️';
      spotlightBtn.style.background = 'var(--color-heart)';
      spotlightBtn.style.borderColor = 'var(--color-heart)';
    } else {
      spotlightBtn.textContent = 'Save to Favorites ❤️';
      spotlightBtn.style.background = 'rgba(255, 255, 255, 0.15)';
      spotlightBtn.style.borderColor = 'rgba(255, 255, 255, 0.4)';
    }
  }

  // Helper to format fraction/decimal quantities
  function formatIngredientAmount(amount) {
    if (!amount) return '';
    const rounded = Math.round(amount * 100) / 100;

    // Common fractions
    const decimal = rounded % 1;
    const whole = Math.floor(rounded);

    if (Math.abs(decimal - 0.25) < 0.03) return whole > 0 ? `${whole} ¼` : '¼';
    if (Math.abs(decimal - 0.33) < 0.03) return whole > 0 ? `${whole} ⅓` : '⅓';
    if (Math.abs(decimal - 0.5) < 0.03) return whole > 0 ? `${whole} ½` : '½';
    if (Math.abs(decimal - 0.66) < 0.03) return whole > 0 ? `${whole} ⅔` : '⅔';
    if (Math.abs(decimal - 0.75) < 0.03) return whole > 0 ? `${whole} ¾` : '¾';

    return rounded % 1 === 0 ? rounded.toString() : rounded.toFixed(1).replace(/\.0$/, '');
  }

  // ==================== SEARCH & FILTER EVENTS ====================
  function setupSearchAndFilters() {
    // Hero Search
    if (elements.heroSearchInput) {
      elements.heroSearchInput.addEventListener('input', (e) => {
        const val = e.target.value;
        elements.heroSearchClear.style.display = val ? 'block' : 'none';
        elements.recipeSearchInput.value = val;
        elements.recipeSearchClear.style.display = val ? 'block' : 'none';
        state.filters.search = val;
        renderRecipes();
      });
    }

    if (elements.heroSearchClear) {
      elements.heroSearchClear.addEventListener('click', () => {
        elements.heroSearchInput.value = '';
        elements.recipeSearchInput.value = '';
        elements.heroSearchClear.style.display = 'none';
        elements.recipeSearchClear.style.display = 'none';
        state.filters.search = '';
        renderRecipes();
      });
    }

    if (elements.heroSearchSubmit) {
      elements.heroSearchSubmit.addEventListener('click', () => {
        smoothScrollToRecipes();
      });
    }

    // Hero Quick Trending Tag Chips
    const tagChips = document.querySelectorAll('.hero-quick-tags .tag-chip');
    tagChips.forEach(chip => {
      chip.addEventListener('click', () => {
        const q = chip.dataset.query;
        elements.heroSearchInput.value = q;
        elements.recipeSearchInput.value = q;
        elements.heroSearchClear.style.display = 'block';
        elements.recipeSearchClear.style.display = 'block';
        state.filters.search = q;
        renderRecipes();
        smoothScrollToRecipes();
      });
    });

    // Explorer Search
    if (elements.recipeSearchInput) {
      elements.recipeSearchInput.addEventListener('input', (e) => {
        const val = e.target.value;
        elements.recipeSearchClear.style.display = val ? 'block' : 'none';
        elements.heroSearchInput.value = val;
        elements.heroSearchClear.style.display = val ? 'block' : 'none';
        state.filters.search = val;
        renderRecipes();
      });
    }

    if (elements.recipeSearchClear) {
      elements.recipeSearchClear.addEventListener('click', () => {
        elements.recipeSearchInput.value = '';
        elements.heroSearchInput.value = '';
        elements.recipeSearchClear.style.display = 'none';
        elements.heroSearchClear.style.display = 'none';
        state.filters.search = '';
        renderRecipes();
      });
    }

    // Difficulty Filter
    if (elements.difficultyFilter) {
      elements.difficultyFilter.addEventListener('change', (e) => {
        state.filters.difficulty = e.target.value;
        renderRecipes();
      });
    }

    // Max Time Filter
    if (elements.timeFilter) {
      elements.timeFilter.addEventListener('change', (e) => {
        state.filters.maxTime = e.target.value;
        renderRecipes();
      });
    }

    // Sort Order
    if (elements.sortSelect) {
      elements.sortSelect.addEventListener('change', (e) => {
        state.filters.sortBy = e.target.value;
        renderRecipes();
      });
    }

    // Reset Filters Buttons
    if (elements.resetFiltersBtn) {
      elements.resetFiltersBtn.addEventListener('click', resetAllFilters);
    }
    if (elements.emptyStateResetBtn) {
      elements.emptyStateResetBtn.addEventListener('click', resetAllFilters);
    }

    // Favorites Only Toggle in Explorer
    if (elements.filterFavToggle) {
      elements.filterFavToggle.addEventListener('click', () => {
        state.filters.onlyFavorites = !state.filters.onlyFavorites;
        elements.filterFavToggle.classList.toggle('active', state.filters.onlyFavorites);
        elements.filterFavToggle.setAttribute('aria-pressed', state.filters.onlyFavorites ? 'true' : 'false');
        renderRecipes();
      });
    }

    // Header & Nav Favorites Buttons
    const favNavTriggers = [
      elements.navFavoritesBtn,
      elements.headerFavBtn,
      elements.mobileFavLink,
      elements.footerFavLink
    ];

    favNavTriggers.forEach(btn => {
      if (btn) {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          state.filters.onlyFavorites = true;
          elements.filterFavToggle.classList.add('active');
          elements.filterFavToggle.setAttribute('aria-pressed', 'true');
          renderRecipes();
          smoothScrollToRecipes();
          closeMobileMenu();
        });
      }
    });

    // Footer Category Filter Links
    const footerCatLinks = document.querySelectorAll('.footer-cat-filter');
    footerCatLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const catId = link.dataset.category;
        setCategoryFilter(catId);
        smoothScrollToRecipes();
      });
    });

    // Hero & Spotlight Direct Recipe View Buttons
    const directViewBtns = document.querySelectorAll('.hero-view-btn');
    directViewBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const recipeId = btn.dataset.recipeId;
        const recipe = state.recipes.find(r => r.id === recipeId);
        if (recipe) {
          openRecipeModal(recipe);
        }
      });
    });

    // Spotlight Quick Like Button
    const spotlightLikeBtn = document.querySelector('.spotlight-card .quick-like-btn');
    if (spotlightLikeBtn) {
      spotlightLikeBtn.addEventListener('click', () => {
        const recipeId = spotlightLikeBtn.dataset.recipeId;
        toggleFavorite(recipeId, spotlightLikeBtn);
      });
    }
  }

  // ==================== MODAL EVENTS ====================
  function setupModalEvents() {
    if (elements.modalCloseBtn) {
      elements.modalCloseBtn.addEventListener('click', closeRecipeModal);
    }

    if (elements.modalBackdrop) {
      elements.modalBackdrop.addEventListener('click', (e) => {
        if (e.target === elements.modalBackdrop) {
          closeRecipeModal();
        }
      });
    }

    // Keyboard ESC key listener
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && elements.modalBackdrop.classList.contains('active')) {
        closeRecipeModal();
      }
    });
  }

  // ==================== NAVIGATION & MOBILE MENU ====================
  function setupNavigation() {
    // Sticky Header Scroll Shadow
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        elements.header.classList.add('scrolled');
      } else {
        elements.header.classList.remove('scrolled');
      }
    });

    // Mobile Menu Toggle
    if (elements.mobileToggle) {
      elements.mobileToggle.addEventListener('click', () => {
        const isOpen = elements.mobileMenu.classList.contains('active');
        if (isOpen) {
          closeMobileMenu();
        } else {
          openMobileMenu();
        }
      });
    }

    if (elements.mobileCloseBtn) {
      elements.mobileCloseBtn.addEventListener('click', closeMobileMenu);
    }

    if (elements.mobileOverlay) {
      elements.mobileOverlay.addEventListener('click', closeMobileMenu);
    }

    // Close mobile drawer when clicking any link
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');
    mobileLinks.forEach(link => {
      link.addEventListener('click', closeMobileMenu);
    });

    // Newsletter Form
    if (elements.newsletterForm) {
      elements.newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = elements.newsletterEmail.value.trim();
        if (email) {
          showToast(`Welcome to the TastyBite family, ${email}! 💌`, '🎉');
          elements.newsletterEmail.value = '';
        }
      });
    }
  }

  function openMobileMenu() {
    elements.mobileMenu.classList.add('active');
    elements.mobileOverlay.classList.add('active');
    elements.mobileToggle.setAttribute('aria-expanded', 'true');
    elements.mobileMenu.setAttribute('aria-hidden', 'false');
    elements.mobileOverlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    elements.mobileMenu.classList.remove('active');
    elements.mobileOverlay.classList.remove('active');
    elements.mobileToggle.setAttribute('aria-expanded', 'false');
    elements.mobileMenu.setAttribute('aria-hidden', 'true');
    elements.mobileOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function smoothScrollToRecipes() {
    const target = document.getElementById('recipes-section');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  // ==================== URL HASH DEEP LINKING ====================
  function checkUrlHash() {
    const hash = window.location.hash;
    if (!hash) return;

    if (hash.startsWith('#recipe=')) {
      const recipeId = hash.replace('#recipe=', '');
      const recipe = state.recipes.find(r => r.id === recipeId);
      if (recipe) {
        setTimeout(() => openRecipeModal(recipe), 150);
      }
    } else if (hash === '#favorites') {
      state.filters.onlyFavorites = true;
      elements.filterFavToggle.classList.add('active');
      elements.filterFavToggle.setAttribute('aria-pressed', 'true');
      renderRecipes();
      smoothScrollToRecipes();
    }
  }

  // Safe HTML Escaping
  function escapeHtml(str) {
    if (typeof str !== 'string') return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // ==================== INITIALIZATION ====================
  function init() {
    updateFavoriteBadges();
    renderCategories();
    renderRecipes();
    updateSpotlightFavButton();
    setupSearchAndFilters();
    setupModalEvents();
    setupNavigation();
    checkUrlHash();

    console.log('TastyBite initialized successfully with', state.recipes.length, 'recipes.');
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
