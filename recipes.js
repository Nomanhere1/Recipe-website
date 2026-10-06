/**
 * TastyBite - Recipe Database
 * Comprehensive, realistic culinary recipes with detailed measurements,
 * step-by-step instructions, nutrition info, and culinary tips.
 */

const RECIPES_DATA = [
  {
    id: "tuscan-garlic-chicken",
    title: "Creamy Tuscan Garlic Chicken",
    category: "Dinner",
    cuisine: "Italian",
    prepTime: 10,
    cookTime: 20,
    totalTime: 30,
    servings: 4,
    difficulty: "Medium",
    rating: 4.9,
    reviewCount: 342,
    calories: 520,
    isFeatured: true,
    tags: ["High Protein", "Keto Friendly", "Gluten-Free"],
    image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=1000&q=80",
    description: "Tender pan-seared chicken breasts smothered in a rich garlic cream sauce packed with sun-dried tomatoes, fresh baby spinach, and parmesan cheese.",
    baseIngredients: [
      { amount: 1.5, unit: "lbs", name: "boneless skinless chicken breasts (cut into cutlets)" },
      { amount: 2, unit: "tbsp", name: "olive oil, divided" },
      { amount: 1, unit: "tbsp", name: "Italian seasoning" },
      { amount: 1, unit: "tsp", name: "smoked paprika" },
      { amount: 0.5, unit: "tsp", name: "kosher salt & freshly ground black pepper" },
      { amount: 4, unit: "cloves", name: "garlic, minced" },
      { amount: 0.5, unit: "cup", name: "sun-dried tomatoes in oil, drained and sliced" },
      { amount: 1, unit: "cup", name: "heavy whipping cream" },
      { amount: 0.5, unit: "cup", name: "low-sodium chicken broth" },
      { amount: 0.75, unit: "cup", name: "grated parmesan cheese (freshly grated)" },
      { amount: 3, unit: "cups", name: "fresh baby spinach leaves" },
      { amount: 2, unit: "tbsp", name: "fresh basil, finely chopped for garnish" }
    ],
    instructions: [
      {
        step: 1,
        title: "Season Chicken",
        text: "Pat chicken breasts dry with paper towels. Season both sides evenly with Italian seasoning, smoked paprika, salt, and black pepper."
      },
      {
        step: 2,
        title: "Sear to Golden Perfection",
        text: "Heat 1.5 tablespoons of olive oil in a large skillet over medium-high heat. Add chicken cutlets and sear for 5-6 minutes per side until golden brown and cooked through (internal temp 165°F / 74°C). Transfer to a warm plate and tent with foil."
      },
      {
        step: 3,
        title: "Build the Aromatic Base",
        text: "In the same skillet, add remaining olive oil over medium heat. Sauté minced garlic and sliced sun-dried tomatoes for about 1 minute until fragrant and lightly sizzling."
      },
      {
        step: 4,
        title: "Simmer Cream Sauce",
        text: "Pour in the chicken broth and heavy cream, scraping up the flavorful browned bits from the pan bottom. Bring to a gentle simmer for 3 minutes, then stir in grated parmesan until smoothly melted and velvety."
      },
      {
        step: 5,
        title: "Wilt Spinach & Combine",
        text: "Add fresh baby spinach and stir until it just wilts into the sauce (approx. 2 minutes). Return the cooked chicken and any accumulated juices back to the skillet. Spoon creamy sauce over the chicken."
      },
      {
        step: 6,
        title: "Garnish and Serve",
        text: "Garnish with fresh chopped basil and additional shaved parmesan. Serve hot over pasta, zucchini noodles, or warm crusty rustic bread."
      }
    ],
    nutrition: {
      calories: "520 kcal",
      protein: "44g",
      carbs: "9g",
      fat: "35g"
    },
    chefTips: "For a lighter variation, substitute half of the heavy cream with half-and-half mixed with 1 tsp cornstarch. Don't discard the oil from your sun-dried tomato jar—it's packed with savory flavor and makes an incredible cooking fat!"
  },
  {
    id: "margherita-pizza",
    title: "Classic Neapolitan Margherita Pizza",
    category: "Dinner",
    cuisine: "Italian",
    prepTime: 20,
    cookTime: 12,
    totalTime: 32,
    servings: 2,
    difficulty: "Medium",
    rating: 4.8,
    reviewCount: 215,
    calories: 680,
    isFeatured: false,
    tags: ["Vegetarian", "Crowd Favorite", "Artisanal"],
    image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=1000&q=80",
    description: "Traditional Italian artisanal pizza featuring crisp blistering crust, sweet San Marzano tomato sauce, fresh creamy mozzarella di bufala, and fragrant basil.",
    baseIngredients: [
      { amount: 1, unit: "ball", name: "artisan pizza dough (approx. 280g)" },
      { amount: 0.5, unit: "cup", name: "crushed San Marzano tomatoes" },
      { amount: 1, unit: "tbsp", name: "extra virgin olive oil" },
      { amount: 1, unit: "pinch", name: "fine sea salt and oregano" },
      { amount: 6, unit: "oz", name: "fresh mozzarella or fior di latte, torn into chunks" },
      { amount: 8, unit: "leaves", name: "fresh sweet basil" },
      { amount: 1, unit: "tbsp", name: "semolina flour (for dusting pizza peel)" }
    ],
    instructions: [
      {
        step: 1,
        title: "Preheat Oven & Stone",
        text: "Place a pizza stone or baking steel on the middle rack and crank your oven to its highest setting (usually 500°F - 550°F / 260°C - 290°C) for at least 45 minutes."
      },
      {
        step: 2,
        title: "Prepare Sauce",
        text: "Crush San Marzano tomatoes by hand in a bowl. Stir in half a tablespoon of extra virgin olive oil, a pinch of sea salt, and a pinch of dried oregano. Keep raw—do not cook the sauce."
      },
      {
        step: 3,
        title: "Shape the Dough",
        text: "Dust a wooden board or peel with semolina. Gently stretch dough with fingertips from the center outward, leaving a 1-inch raised cornicione (crust edge). Never use a rolling pin."
      },
      {
        step: 4,
        title: "Assemble Toppings",
        text: "Spread a thin layer of tomato sauce using circular ladle motions. Distribute torn fresh mozzarella evenly, avoiding moisture pooling."
      },
      {
        step: 5,
        title: "Bake to Blistered Perfection",
        text: "Slide onto the screaming hot stone. Bake for 8-10 minutes until the crust is golden with charred spots (leopard spots) and cheese is bubbly."
      },
      {
        step: 6,
        title: "Finish & Garnish",
        text: "Remove from oven, immediately scatter fresh whole basil leaves on top, and finish with a delicate drizzle of extra virgin olive oil before slicing."
      }
    ],
    nutrition: {
      calories: "680 kcal",
      protein: "28g",
      carbs: "84g",
      fat: "26g"
    },
    chefTips: "Pat the fresh mozzarella with paper towels 30 minutes before baking to draw out excess moisture. This prevents a soggy center and ensures a crisp, airy bottom crust."
  },
  {
    id: "fluffy-souffle-pancakes",
    title: "Japanese Berry Soufflé Pancakes",
    category: "Breakfast",
    cuisine: "Japanese",
    prepTime: 15,
    cookTime: 15,
    totalTime: 30,
    servings: 2,
    difficulty: "Medium",
    rating: 4.9,
    reviewCount: 489,
    calories: 390,
    isFeatured: true,
    tags: ["Sweet", "Weekend Brunch", "Vegetarian"],
    image: "https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&w=1000&q=80",
    description: "Pillow-soft, cloud-like Japanese pancakes that jiggle when you plate them. Served with whipped cream, pure maple syrup, and wild berries.",
    baseIngredients: [
      { amount: 2, unit: "large", name: "eggs, separated (whites and yolks)" },
      { amount: 1.5, unit: "tbsp", name: "whole milk" },
      { amount: 1, unit: "tsp", name: "pure vanilla bean paste" },
      { amount: 33, unit: "g", name: "cake flour (sifted)" },
      { amount: 0.5, unit: "tsp", name: "baking powder" },
      { amount: 23, unit: "g", name: "granulated sugar" },
      { amount: 0.25, unit: "tsp", name: "cream of tartar or lemon juice" },
      { amount: 1, unit: "tbsp", name: "unsalted butter (for skillet)" },
      { amount: 1, unit: "cup", name: "fresh mixed berries (strawberries, blueberries)" },
      { amount: 2, unit: "tbsp", name: "powdered sugar for dusting" }
    ],
    instructions: [
      {
        step: 1,
        title: "Yolk Batter Base",
        text: "In a medium bowl, whisk egg yolks with milk and vanilla until pale and frothy. Sift in cake flour and baking powder, then whisk gently until smooth without overworking."
      },
      {
        step: 2,
        title: "Whip Meringue",
        text: "In a super clean, dry glass bowl, beat egg whites with cream of tartar until foamy. Gradually add sugar in three additions, beating on medium-high speed until firm, glossy stiff peaks form."
      },
      {
        step: 3,
        title: "Fold Gently",
        text: "Gently fold 1/3 of the whipped meringue into the yolk mixture to lighten it. Then add the rest of the meringue and fold with a silicone spatula using slow J-motions until no streaks remain."
      },
      {
        step: 4,
        title: "Steam & Cook",
        text: "Preheat a non-stick pan on lowest heat and brush lightly with butter. Pipe or spoon tall mounds of batter onto the pan. Add 1 teaspoon of water into the empty pan corner, cover with a tight lid, and steam for 5 minutes."
      },
      {
        step: 5,
        title: "Second Scoop & Flip",
        text: "Remove lid, add another scoop of batter onto each pancake for height. Gently flip, add 1 more teaspoon of water, cover, and cook for 4-5 more minutes."
      },
      {
        step: 6,
        title: "Plate & Enjoy",
        text: "Plate immediately while warm and pillowy. Top with fresh berries, whipped cream, a dusting of powdered sugar, and warm maple syrup."
      }
    ],
    nutrition: {
      calories: "390 kcal",
      protein: "14g",
      carbs: "52g",
      fat: "15g"
    },
    chefTips: "The secret to tall, jiggly pancakes is an ultra-stiff, glossy meringue and cooking over low heat with a tight lid to create steam. Don't rush the heat!"
  },
  {
    id: "thai-green-curry",
    title: "Fragrant Thai Green Curry with Tofu",
    category: "Dinner",
    cuisine: "Thai",
    prepTime: 12,
    cookTime: 18,
    totalTime: 30,
    servings: 4,
    difficulty: "Easy",
    rating: 4.8,
    reviewCount: 178,
    calories: 430,
    isFeatured: false,
    tags: ["Vegan", "Gluten-Free", "Aromatic"],
    image: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?auto=format&fit=crop&w=1000&q=80",
    description: "An authentic aromatic coconut curry infused with lemongrass, kaffir lime, crispy pressed tofu, tender bamboo shoots, and Thai sweet basil.",
    baseIngredients: [
      { amount: 14, unit: "oz", name: "extra-firm organic tofu, pressed and cubed" },
      { amount: 2, unit: "tbsp", name: "avocado or coconut oil" },
      { amount: 3, unit: "tbsp", name: "authentic Thai green curry paste" },
      { amount: 1, unit: "can (14 oz)", name: "full-fat coconut milk" },
      { amount: 0.75, unit: "cup", name: "vegetable stock" },
      { amount: 1, unit: "cup", name: "bamboo shoots, sliced" },
      { amount: 1, unit: "cup", name: "snow peas or sliced zucchini" },
      { amount: 1, unit: "tbsp", name: "coconut sugar or brown sugar" },
      { amount: 1.5, unit: "tbsp", name: "tamari or vegetarian fish sauce" },
      { amount: 3, unit: "leaves", name: "makrut (kaffir) lime leaves, bruised" },
      { amount: 1, unit: "cup", name: "fresh Thai sweet basil leaves" },
      { amount: 1, unit: "whole", name: "lime, cut into wedges" }
    ],
    instructions: [
      {
        step: 1,
        title: "Crisp the Tofu",
        text: "Toss pressed tofu cubes with a touch of cornstarch. Pan-fry in 1 tablespoon of oil over medium-high heat until golden and crispy on all sides (approx. 7 minutes). Set aside."
      },
      {
        step: 2,
        title: "Fry the Curry Paste",
        text: "In a deep wok or pot, heat remaining oil over medium heat. Add green curry paste and stir-fry for 1-2 minutes until deeply aromatic and fragrant."
      },
      {
        step: 3,
        title: "Crack the Coconut Milk",
        text: "Add 1/4 cup of the thick coconut cream from the top of the can and stir with the paste until oil separates slightly. Then pour in the remaining coconut milk and vegetable broth."
      },
      {
        step: 4,
        title: "Simmer Vegetables",
        text: "Toss in bruised makrut lime leaves, bamboo shoots, and snow peas. Simmer gently for 5 minutes until veggies are tender-crisp."
      },
      {
        step: 5,
        title: "Season & Add Tofu",
        text: "Stir in tamari and coconut sugar. Taste and balance sweet, salty, and spicy. Fold in the golden crispy tofu and remove from heat."
      },
      {
        step: 6,
        title: "Finish with Thai Basil",
        text: "Stir in a generous handful of fresh Thai basil so it wilts in the residual heat. Serve over fragrant jasmine rice with fresh lime wedges."
      }
    ],
    nutrition: {
      calories: "430 kcal",
      protein: "16g",
      carbs: "18g",
      fat: "34g"
    },
    chefTips: "Always use full-fat coconut milk for that signature velvety mouthfeel. Bruising the makrut lime leaves between your fingers releases essential oils that infuse the broth with authentic restaurant quality aroma."
  },
  {
    id: "avocado-poached-egg-toast",
    title: "California Avocado Toast with Poached Egg",
    category: "Breakfast",
    cuisine: "American",
    prepTime: 5,
    cookTime: 10,
    totalTime: 15,
    servings: 2,
    difficulty: "Easy",
    rating: 4.9,
    reviewCount: 312,
    calories: 340,
    isFeatured: false,
    tags: ["Quick & Easy", "Vegetarian", "Healthy Fats"],
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=1000&q=80",
    description: "Thick artisanal sourdough bread toasted golden, topped with creamy smashed hass avocado, a velvety runny poached egg, microgreens, and everything bagel seasoning.",
    baseIngredients: [
      { amount: 2, unit: "thick slices", name: "artisanal sourdough or country bread" },
      { amount: 2, unit: "ripe", name: "Hass avocados" },
      { amount: 2, unit: "fresh", name: "pasture-raised eggs" },
      { amount: 1, unit: "tbsp", name: "fresh lemon juice" },
      { amount: 1, unit: "tbsp", name: "white vinegar (for poaching water)" },
      { amount: 1, unit: "tsp", name: "everything bagel seasoning" },
      { amount: 0.25, unit: "tsp", name: "chili flakes (Aleppo or crushed red pepper)" },
      { amount: 1, unit: "handful", name: "radish microgreens or baby arugula" },
      { amount: 1, unit: "drizzle", name: "extra virgin olive oil" }
    ],
    instructions: [
      {
        step: 1,
        title: "Toast Sourdough",
        text: "Brush sourdough slices with olive oil and toast in a skillet or toaster until deeply golden and crunchy on the outside but tender inside."
      },
      {
        step: 2,
        title: "Smash Avocado",
        text: "Cut avocados, remove pit, and scoop into a shallow bowl. Add fresh lemon juice, sea salt, black pepper, and mash with a fork leaving enticing rustic chunks."
      },
      {
        step: 3,
        title: "Simmer Poaching Water",
        text: "Bring 3 inches of water in a deep skillet to a bare simmer (tiny bubbles, no rapid boil). Stir in vinegar. Crack each egg into a small ramekin."
      },
      {
        step: 4,
        title: "Poach the Eggs",
        text: "Swirl water gently with a spoon to create a soft whirlpool. Gently tip egg into the center. Cook undisturbed for 3 to 3.5 minutes for a warm, runny yolk."
      },
      {
        step: 5,
        title: "Drain Eggs",
        text: "Remove eggs using a slotted spoon and briefly rest on paper towel to eliminate excess moisture."
      },
      {
        step: 6,
        title: "Layer & Garnish",
        text: "Generously pile mashed avocado over crunchy sourdough. Top with the warm poached egg. Scatter everything bagel seasoning, chili flakes, microgreens, and a drizzle of olive oil."
      }
    ],
    nutrition: {
      calories: "340 kcal",
      protein: "13g",
      carbs: "28g",
      fat: "21g"
    },
    chefTips: "Fresh eggs are crucial for poaching because their whites stay tight around the yolk instead of feathering. Strain your cracked egg through a fine mesh sieve before sliding into the pot to remove any watery white!"
  },
  {
    id: "chocolate-lava-cake",
    title: "Decadent Molten Chocolate Lava Cakes",
    category: "Dessert",
    cuisine: "French",
    prepTime: 12,
    cookTime: 12,
    totalTime: 24,
    servings: 2,
    difficulty: "Medium",
    rating: 5.0,
    reviewCount: 520,
    calories: 490,
    isFeatured: true,
    tags: ["Chocolate Lovers", "Baking", "Romantic Dinner"],
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=1000&q=80",
    description: "Individual warm chocolate cakes with tender cake exteriors that break open into an irresistible, silky flowing river of warm dark molten chocolate.",
    baseIngredients: [
      { amount: 4, unit: "oz", name: "high-quality 70% dark bittersweet chocolate, chopped" },
      { amount: 0.5, unit: "cup", name: "unsalted butter (1 stick)" },
      { amount: 0.5, unit: "cup", name: "powdered confectioners sugar" },
      { amount: 2, unit: "large", name: "whole eggs" },
      { amount: 2, unit: "large", name: "egg yolks (extra)" },
      { amount: 6, unit: "tbsp", name: "all-purpose flour" },
      { amount: 1, unit: "pinch", name: "fine sea salt and espresso powder" },
      { amount: 1, unit: "tsp", name: "pure vanilla extract" },
      { amount: 1, unit: "scoop", name: "vanilla bean ice cream (for serving)" }
    ],
    instructions: [
      {
        step: 1,
        title: "Prep Ramekins",
        text: "Preheat oven to 425°F (220°C). Butter two 6-ounce ceramic ramekins thoroughly, then dust with unsweetened cocoa powder, tapping out excess."
      },
      {
        step: 2,
        title: "Melt Chocolate & Butter",
        text: "In a heatproof bowl set over a pot of barely simmering water (or microwave in 20-second bursts), melt chopped chocolate and butter together until completely glossy and smooth."
      },
      {
        step: 3,
        title: "Whisk Eggs & Sugar",
        text: "In a medium bowl, whisk whole eggs, egg yolks, powdered sugar, and a pinch of salt until slightly thick and pale (about 2 minutes)."
      },
      {
        step: 4,
        title: "Combine Batter",
        text: "Fold melted chocolate and vanilla into the egg mixture. Gently sift in flour and espresso powder, folding with a spatula until just incorporated."
      },
      {
        step: 5,
        title: "Bake with Precision",
        text: "Divide batter between ramekins. Bake at 425°F for 12 minutes on the dot. The edges should look firm and matte while the center remains slightly jiggly."
      },
      {
        step: 6,
        title: "Unmold & Serve",
        text: "Cool for 1 minute. Run a thin offset spatula around the edges. Invert onto serving plates, dust with powdered sugar, and serve immediately with vanilla bean ice cream."
      }
    ],
    nutrition: {
      calories: "490 kcal",
      protein: "7g",
      carbs: "44g",
      fat: "33g"
    },
    chefTips: "Espresso powder doesn't make the cake taste like coffee—it dramatically deepens and amplifies the richness of the dark chocolate! Do not overbake or you will lose the molten liquid center."
  },
  {
    id: "mushroom-truffle-risotto",
    title: "Creamy Wild Mushroom & Truffle Risotto",
    category: "Dinner",
    cuisine: "Italian",
    prepTime: 15,
    cookTime: 30,
    totalTime: 45,
    servings: 4,
    difficulty: "Hard",
    rating: 4.8,
    reviewCount: 164,
    calories: 460,
    isFeatured: false,
    tags: ["Gourmet", "Vegetarian", "Date Night"],
    image: "https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?auto=format&fit=crop&w=1000&q=80",
    description: "Slow-stirred Carnaroli rice infused with rich mushroom stock, caramelized cremini and shiitake mushrooms, finished with parmigiano reggiano and white truffle oil.",
    baseIngredients: [
      { amount: 1.5, unit: "cups", name: "Carnaroli or Arborio rice" },
      { amount: 5, unit: "cups", name: "rich vegetable or mushroom broth, kept steaming" },
      { amount: 10, unit: "oz", name: "mixed wild mushrooms (cremini, shiitake, chanterelles), sliced" },
      { amount: 3, unit: "tbsp", name: "butter, divided" },
      { amount: 2, unit: "tbsp", name: "olive oil" },
      { amount: 1, unit: "medium", name: "shallot, finely minced" },
      { amount: 2, unit: "cloves", name: "garlic, minced" },
      { amount: 0.5, unit: "cup", name: "dry white wine (Pinot Grigio or Sauvignon Blanc)" },
      { amount: 0.75, unit: "cup", name: "Parmigiano-Reggiano, freshly grated" },
      { amount: 1, unit: "tsp", name: "white truffle oil (for finishing)" },
      { amount: 1, unit: "tbsp", name: "fresh thyme leaves" }
    ],
    instructions: [
      {
        step: 1,
        title: "Brown the Mushrooms",
        text: "Heat 1 tbsp butter and 1 tbsp olive oil in a wide heavy skillet over high heat. Sauté mushrooms with thyme until deeply browned and caramelized (8 mins). Season with salt and set aside."
      },
      {
        step: 2,
        title: "Sauté Aromatics & Toast Rice",
        text: "In the same pan, add remaining oil and sauté shallots and garlic for 2 minutes. Add dry rice and stir for 2 minutes to toast until the edges become translucent."
      },
      {
        step: 3,
        title: "Deglaze with Wine",
        text: "Pour in dry white wine. Stir continuously until the wine has been completely absorbed by the rice, releasing its aroma."
      },
      {
        step: 4,
        title: "Ladle Broth Gradually",
        text: "Add warm broth one ladleful at a time over medium-low heat, stirring steadily. Wait until each ladle is almost fully absorbed before adding the next (takes about 18-20 minutes)."
      },
      {
        step: 5,
        title: "Mantecatura (The Finish)",
        text: "Remove from heat when rice is tender yet al dente. Vigorously beat in remaining cold butter, grated Parmigiano-Reggiano, and half of the sautéed mushrooms until luxuriously creamy."
      },
      {
        step: 6,
        title: "Garnish & Truffle Drizzle",
        text: "Ladle onto warm shallow bowls. Top with reserved sautéed mushrooms, freshly cracked black pepper, and a delicate drizzle of white truffle oil."
      }
    ],
    nutrition: {
      calories: "460 kcal",
      protein: "12g",
      carbs: "62g",
      fat: "18g"
    },
    chefTips: "Carnaroli rice is preferred over Arborio because it holds its shape better and produces a creamier starch wave (all'onda) without turning mushy."
  },
  {
    id: "mediterranean-quinoa-bowl",
    title: "Mediterranean Rainbow Quinoa Power Bowl",
    category: "Lunch",
    cuisine: "Mediterranean",
    prepTime: 15,
    cookTime: 15,
    totalTime: 30,
    servings: 2,
    difficulty: "Easy",
    rating: 4.7,
    reviewCount: 142,
    calories: 410,
    isFeatured: false,
    tags: ["Vegetarian", "Healthy Bowls", "Meal Prep"],
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1000&q=80",
    description: "Nutrient-packed fluffy tri-color quinoa layered with crisp Persian cucumbers, kalamata olives, cherry tomatoes, creamy feta cheese, roasted chickpeas, and lemon-herb vinaigrette.",
    baseIngredients: [
      { amount: 1, unit: "cup", name: "tri-color quinoa, rinsed" },
      { amount: 2, unit: "cups", name: "vegetable broth or water" },
      { amount: 1, unit: "can (15 oz)", name: "chickpeas, drained, rinsed and roasted with cumin" },
      { amount: 1, unit: "cup", name: "cherry tomatoes, halved" },
      { amount: 2, unit: "medium", name: "Persian cucumbers, diced" },
      { amount: 0.5, unit: "cup", name: "Kalamata olives, pitted and halved" },
      { amount: 0.5, unit: "cup", name: "feta cheese, crumbled" },
      { amount: 0.25, unit: "cup", name: "red onion, finely diced" },
      { amount: 0.25, unit: "cup", name: "extra virgin olive oil" },
      { amount: 2, unit: "tbsp", name: "fresh lemon juice" },
      { amount: 1, unit: "clove", name: "garlic, grated" },
      { amount: 2, unit: "tbsp", name: "fresh mint & parsley, chopped" }
    ],
    instructions: [
      {
        step: 1,
        title: "Cook Quinoa",
        text: "Combine rinsed quinoa and vegetable broth in a pot. Bring to a boil, cover, reduce to low heat, and cook for 15 minutes. Remove from heat and let sit covered for 5 minutes, then fluff with a fork."
      },
      {
        step: 2,
        title: "Crisp Chickpeas",
        text: "Toss chickpeas with olive oil, cumin, smoked paprika, and salt. Roast at 400°F (200°C) for 18 minutes until delightfully crunchy."
      },
      {
        step: 3,
        title: "Whisk Vinaigrette",
        text: "In a small glass jar, shake olive oil, fresh lemon juice, grated garlic, oregano, salt, and pepper until emulsified."
      },
      {
        step: 4,
        title: "Assemble Bowls",
        text: "Divide warm or cooled quinoa into wide serving bowls. Artfully arrange diced cucumbers, halved tomatoes, roasted chickpeas, kalamata olives, and diced red onion around the bowl."
      },
      {
        step: 5,
        title: "Drizzle & Garnish",
        text: "Sprinkle crumbled Greek feta, chopped fresh mint and parsley. Drizzle the vibrant lemon vinaigrette over everything right before serving."
      }
    ],
    nutrition: {
      calories: "410 kcal",
      protein: "15g",
      carbs: "54g",
      fat: "17g"
    },
    chefTips: "An ideal meal-prep recipe! Store the dressing separately and keep the assembled salad in airtight containers in the fridge for up to 4 days."
  },
  {
    id: "honey-garlic-salmon",
    title: "Glazed Honey Garlic Atlantic Salmon",
    category: "Dinner",
    cuisine: "Seafood",
    prepTime: 8,
    cookTime: 12,
    totalTime: 20,
    servings: 2,
    difficulty: "Easy",
    rating: 4.9,
    reviewCount: 388,
    calories: 460,
    isFeatured: true,
    tags: ["Quick & Easy", "Omega-3 Rich", "High Protein"],
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=1000&q=80",
    description: "Pan-seared Atlantic salmon fillets with shatteringly crisp skin, basted in a glossy sweet and savory honey, soy sauce, garlic, and fresh ginger glaze.",
    baseIngredients: [
      { amount: 2, unit: "fillets (6 oz each)", name: "skin-on fresh salmon" },
      { amount: 1, unit: "tbsp", name: "avocado oil (high smoke point)" },
      { amount: 3, unit: "tbsp", name: "raw honey" },
      { amount: 2, unit: "tbsp", name: "low-sodium soy sauce or tamari" },
      { amount: 1, unit: "tbsp", name: "fresh lemon juice" },
      { amount: 4, unit: "cloves", name: "garlic, finely minced" },
      { amount: 1, unit: "tsp", name: "fresh ginger, grated" },
      { amount: 1, unit: "tsp", name: "toasted sesame seeds" },
      { amount: 2, unit: "stalks", name: "green scallions, thinly sliced" },
      { amount: 0.5, unit: "lb", name: "fresh asparagus spears" }
    ],
    instructions: [
      {
        step: 1,
        title: "Prep Salmon",
        text: "Pat salmon fillets thoroughly dry with paper towels. Season flesh and skin sides with fine sea salt and freshly ground black pepper."
      },
      {
        step: 2,
        title: "Mix Glaze",
        text: "In a small bowl, whisk together honey, soy sauce, fresh lemon juice, minced garlic, and grated ginger until smooth."
      },
      {
        step: 3,
        title: "Sear Skin-Side Down",
        text: "Heat oil in a heavy stainless steel or cast iron skillet over medium-high heat. Place salmon skin-side down, gently pressing with a spatula for 10 seconds to keep skin flat. Cook for 4-5 minutes until skin is golden and crispy."
      },
      {
        step: 4,
        title: "Flip & Add Asparagus",
        text: "Carefully flip salmon onto flesh side. Toss trimmed asparagus spears into the empty space in the pan. Cook for 2-3 minutes."
      },
      {
        step: 5,
        title: "Glaze & Baste",
        text: "Pour the honey garlic sauce into the skillet. Bring to a rapid bubbling glaze for 1-2 minutes. Continuously spoon the glossy bubbling sauce over the salmon fillets until coated."
      },
      {
        step: 6,
        title: "Plate & Garnish",
        text: "Transfer to plates alongside tender asparagus. Garnish with toasted sesame seeds and sliced green scallions. Serve with steamed jasmine or brown rice."
      }
    ],
    nutrition: {
      calories: "460 kcal",
      protein: "38g",
      carbs: "24g",
      fat: "24g"
    },
    chefTips: "The secret to restaurant-crispy salmon skin is ensuring the skin is completely dry before hitting a shimmering hot pan. Resist the urge to move the fish until it releases naturally!"
  },
  {
    id: "acai-smoothie-bowl",
    title: "Amazonian Berry Acai Smoothie Bowl",
    category: "Breakfast",
    cuisine: "Brazilian",
    prepTime: 10,
    cookTime: 0,
    totalTime: 10,
    servings: 1,
    difficulty: "Easy",
    rating: 4.8,
    reviewCount: 195,
    calories: 320,
    isFeatured: false,
    tags: ["Antioxidant", "Vegan", "Quick & Easy"],
    image: "https://images.unsplash.com/photo-1590301157890-4810ed352733?auto=format&fit=crop&w=1000&q=80",
    description: "Thick, spoonable frosty smoothie bowl made with pure frozen acai, wild blueberries, and banana. Crowned with crunchy coconut granola, chia seeds, and fresh kiwi.",
    baseIngredients: [
      { amount: 1, unit: "pack (100g)", name: "frozen unsweetened pure acai purée" },
      { amount: 1, unit: "frozen", name: "banana, sliced" },
      { amount: 0.5, unit: "cup", name: "frozen wild blueberries" },
      { amount: 0.33, unit: "cup", name: "unsweetened almond or oat milk" },
      { amount: 1, unit: "tbsp", name: "almond butter or peanut butter" },
      { amount: 0.25, unit: "cup", name: "crispy coconut almond granola" },
      { amount: 1, unit: "tsp", name: "chia seeds & hemp hearts" },
      { amount: 0.5, unit: "fresh", name: "banana & kiwi, sliced for topping" },
      { amount: 1, unit: "drizzle", name: "wildflower honey or agave nectar" }
    ],
    instructions: [
      {
        step: 1,
        title: "Prep Ingredients",
        text: "Run the frozen acai packet briefly under warm water for 5 seconds to loosen the packaging, then break into chunks directly into a high-powered blender."
      },
      {
        step: 2,
        title: "Blend Ultra-Thick",
        text: "Add frozen banana, frozen blueberries, almond butter, and just 1/3 cup of plant milk. Start blender on low and use the tamper to push ingredients into the blades until you achieve a thick, soft-serve ice cream consistency."
      },
      {
        step: 3,
        title: "Pour into Chilled Bowl",
        text: "Scoop the rich purple smoothie into a wide chilled ceramic or coconut bowl. Smooth the top with the back of a spoon."
      },
      {
        step: 4,
        title: "Artisanal Toppings",
        text: "Arrange neat rows of crunchy granola, sliced fresh banana, kiwi, blueberries, chia seeds, and unsweetened toasted coconut flakes."
      },
      {
        step: 5,
        title: "Finishing Touch",
        text: "Drizzle with a touch of wildflower honey or pure agave and enjoy immediately with a chilled spoon."
      }
    ],
    nutrition: {
      calories: "320 kcal",
      protein: "8g",
      carbs: "52g",
      fat: "11g"
    },
    chefTips: "To get the iconic thick texture that holds toppings without sinking, use as little liquid as possible and rely on completely frozen fruit. A high-speed blender tamper makes all the difference."
  },
  {
    id: "dan-dan-noodles",
    title: "Sichuan Spicy Sesame Dan Dan Noodles",
    category: "Lunch",
    cuisine: "Asian",
    prepTime: 12,
    cookTime: 12,
    totalTime: 24,
    servings: 2,
    difficulty: "Medium",
    rating: 4.9,
    reviewCount: 264,
    calories: 550,
    isFeatured: false,
    tags: ["Spicy", "Comfort Food", "Savory"],
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=1000&q=80",
    description: "Springy wheat noodles tossed in a fiery, numbing Sichuan pepper and sesame sauce, topped with crispy spiced pork or mushrooms, baby bok choy, and crushed peanuts.",
    baseIngredients: [
      { amount: 8, unit: "oz", name: "fresh Chinese wheat noodles or ramen noodles" },
      { amount: 6, unit: "oz", name: "ground pork (or minced king oyster mushrooms)" },
      { amount: 2, unit: "heads", name: "baby bok choy, quartered" },
      { amount: 2, unit: "tbsp", name: "Chinese roasted sesame paste (or tahini)" },
      { amount: 2, unit: "tbsp", name: "Sichuan chili oil with sediment" },
      { amount: 2, unit: "tbsp", name: "low-sodium soy sauce" },
      { amount: 1, unit: "tbsp", name: "Chinkiang black vinegar" },
      { amount: 1, unit: "tsp", name: "toasted ground Sichuan peppercorn" },
      { amount: 2, unit: "cloves", name: "garlic, grated" },
      { amount: 0.5, unit: "cup", name: "hot chicken or vegetable broth" },
      { amount: 2, unit: "tbsp", name: "roasted peanuts, crushed" },
      { amount: 2, unit: "stalks", name: "scallions, finely chopped" }
    ],
    instructions: [
      {
        step: 1,
        title: "Whisk the Sauce",
        text: "In a mixing bowl, whisk Chinese sesame paste, Sichuan chili oil, soy sauce, black vinegar, minced garlic, sugar, and ground Sichuan pepper until smooth and velvety."
      },
      {
        step: 2,
        title: "Crisp the Meat Topping",
        text: "Heat a wok over high heat. Add ground pork and cook until fat renders. Season with 1 tsp soy sauce and dark soy sauce, stirring until deeply browned and crunchy."
      },
      {
        step: 3,
        title: "Boil Noodles & Greens",
        text: "Bring a large pot of water to a rolling boil. Cook fresh wheat noodles for 2-3 minutes. In the final 45 seconds, drop in baby bok choy. Drain well."
      },
      {
        step: 4,
        title: "Assemble Noodle Bowl",
        text: "Divide the sesame chili sauce between two serving bowls. Stir in 1/4 cup hot broth into each bowl to loosen into a rich, fragrant broth base."
      },
      {
        step: 5,
        title: "Toss & Garnish",
        text: "Add warm drained noodles into the sauce. Top with crisp pork, tender baby bok choy, crushed roasted peanuts, and fresh scallions. Mix thoroughly before devouring!"
      }
    ],
    nutrition: {
      calories: "550 kcal",
      protein: "24g",
      carbs: "62g",
      fat: "25g"
    },
    chefTips: "Authentic Sichuan sesame paste is made from deeply toasted unhulled sesame seeds, giving a darker, nuttier flavor than Middle Eastern tahini. If substituting tahini, stir in 1/2 tsp of toasted sesame oil to boost the aroma."
  },
  {
    id: "classic-french-ratatouille",
    title: "Rustic Provençal French Ratatouille",
    category: "Dinner",
    cuisine: "French",
    prepTime: 20,
    cookTime: 35,
    totalTime: 55,
    servings: 4,
    difficulty: "Easy",
    rating: 4.8,
    reviewCount: 156,
    calories: 220,
    isFeatured: false,
    tags: ["Vegan", "Gluten-Free", "Low Calorie"],
    image: "https://images.unsplash.com/photo-1572449043416-55f4685c9bb7?auto=format&fit=crop&w=1000&q=80",
    description: "Sun-ripened summer vegetables—eggplant, zucchini, yellow squash, and bell peppers—slowly stewed with sweet tomatoes, garlic, and fresh fragrant Herbs de Provence.",
    baseIngredients: [
      { amount: 1, unit: "medium", name: "globe eggplant, cubed into 1-inch pieces" },
      { amount: 2, unit: "medium", name: "zucchini, sliced into rounds" },
      { amount: 2, unit: "medium", name: "yellow summer squash, sliced into rounds" },
      { amount: 2, unit: "whole", name: "bell peppers (red & yellow), diced" },
      { amount: 4, unit: "ripe", name: "Roma tomatoes, chopped" },
      { amount: 1, unit: "large", name: "yellow onion, diced" },
      { amount: 4, unit: "cloves", name: "garlic, thinly sliced" },
      { amount: 0.25, unit: "cup", name: "extra virgin olive oil, divided" },
      { amount: 1, unit: "tbsp", name: "fresh thyme & rosemary, finely minced" },
      { amount: 1, unit: "handful", name: "fresh basil leaves, torn" },
      { amount: 1, unit: "pinch", name: "flaky sea salt and crushed black pepper" }
    ],
    instructions: [
      {
        step: 1,
        title: "Sweat the Eggplant",
        text: "Toss cubed eggplant with 1 tsp salt in a colander and let rest for 15 minutes to release excess bitter moisture. Pat dry with paper towels."
      },
      {
        step: 2,
        title: "Sauté Aromatics",
        text: "Heat 2 tablespoons of olive oil in a Dutch oven or deep skillet over medium heat. Sauté onion and bell peppers until tender and sweet (approx. 6 minutes). Add sliced garlic and cook for 1 minute."
      },
      {
        step: 3,
        title: "Brown Vegetables in Batches",
        text: "In a separate pan, quickly sear eggplant and squash rounds in a splash of olive oil until lightly browned, then transfer into the Dutch oven."
      },
      {
        step: 4,
        title: "Simmer with Tomatoes",
        text: "Add chopped tomatoes, fresh thyme, and rosemary to the pot. Stir to combine, bring to a gentle simmer, cover, and cook on low for 25 minutes until all vegetables are meltingly tender."
      },
      {
        step: 5,
        title: "Reduce & Concentrate",
        text: "Uncover for the final 10 minutes to allow the natural tomato juices to reduce into a rich, luscious sauce."
      },
      {
        step: 6,
        title: "Finish with Fresh Herbs",
        text: "Fold in torn fresh basil and drizzle with your best extra virgin olive oil. Delicious served warm with crusty French baguette or chilled as an appetizer."
      }
    ],
    nutrition: {
      calories: "220 kcal",
      protein: "5g",
      carbs: "22g",
      fat: "14g"
    },
    chefTips: "Ratatouille tastes even more divine the next day after the vegetable flavors have had time to meld together in the refrigerator. A wonderful dish to make ahead!"
  }
];

// Provide categories list for filtering
const RECIPE_CATEGORIES = [
  { id: "all", label: "All Recipes", icon: "🍽️" },
  { id: "breakfast", label: "Breakfast", icon: "🍳" },
  { id: "lunch", label: "Lunch", icon: "🥪" },
  { id: "dinner", label: "Dinner", icon: "🍲" },
  { id: "dessert", label: "Dessert", icon: "🍰" },
  { id: "quick", label: "Quick & Easy", icon: "⚡" },
  { id: "vegetarian", label: "Vegetarian", icon: "🥗" }
];
