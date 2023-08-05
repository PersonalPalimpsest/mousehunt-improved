const moveRecipe = (type, recipesContainer) => {
  const recipeEl = document.querySelector(`.inventoryPage-item.recipe[data-produced-item="${type}"]`);
  if (recipeEl) {
    // move it to the bottom of the list
    recipeEl.classList.add('reordered');
    recipesContainer.appendChild(recipeEl);
  }
};

const updateRecipesOnPage = async (type) => {
  const recipes = {
    base: {
      living_grove_base_recipe: 'living_grove_base',
      polluted_base_rebuild: 'polluted_base',
      soiled_base_rebuild_recipe: 'soiled_base',
      tribal_base: 'tribal_base',
      tiki_base: 'tiki_base',
    },
    collectible: {
      admirals_ship_journal_theme_recipe: 'admirals_ship_journal_theme_collectible',
      bristle_woods_rift_journal_theme_recipe: 'bristle_woods_rift_journal_theme_collectible',
      burroughs_rift_journal_theme_recipe: 'burroughs_rift_journal_theme_collectible',
      chrome_journal_theme_recipe: 'chrome_journal_theme_collectible',
      gnawnian_games_journal_theme_recipe: 'gnawnian_games_theme_collectible',
      labyrinth_journal_theme_recipe: 'labyrinth_journal_theme_collectible',
      lightning_slayer_journal_theme_recipe: 'lightning_slayer_journal_theme_collectible',
      living_garden_theme_recipe: 'living_garden_theme_collectible',
      moussu_picchu_journal_theme_recipe: 'moussu_picchu_journal_theme_collectible',
      polluted_theme_recipe: 'completed_polluted_journal_theme_collectible',
      queso_journal_theme_recipe: 'queso_canyon_theme_collectible',
      regal_theme_recipe: 'completed_regal_theme_collectible',
      relic_hunter_journal_theme_recipe: 'relic_hunter_journal_theme_collectible',
    },
    crafting_item: {
      geyser_draconic_chassis_recipe: 'draconic_geyser_chassis_crafting_item',
      geyser_draconic_chassis_i_recipe: 'draconic_geyser_chassis_i_crafting_item',
      masters_seal: 'masters_seal_craft_item',
      christened_ship: 'huntington_map_piece',
      s_s__huntington_ii: 'huntington_map_piece',
    },
    map_piece: {
      unchristened_ship: 'unchristened_ship_craft_item',
      balacks_lantern: 'balack_lantern_map_piece',
      ocean_navigation_kit: 'ocean_navigation_map_piece',
      zzt_key_1: 'zzt_key',
      repaired_oculus_recipe: 'high_altitude_license_stat_item',
    },
    weapon: {
      chrome_floating_arcane_upgraded_recipe: 'chrome_floating_arcane_upgraded_weapon',
      chrome_monstrobot_recipe: 'chrome_monstrobot_weapon',
      chrome_oasis_water_node_recipe: 'chrome_oasis_water_node_weapon',
      chrome_phantasmic_oasis_recipe: 'chrome_phantasmic_oasis_weapon',
      chrome_school_of_sharks_recipe: 'chrome_school_of_sharks_weapon',
      chrome_sphynx_recipe: 'chrome_sphynx_weapon',
      chrome_storm_wrought_ballista_recipe: 'chrome_storm_wrought_ballista_weapon',
      chrome_temporal_turbine_recipe: 'chrome_temporal_turbine_weapon',
      chrome_thought_obliterator_recipe: 'chrome_floating_forgotten_upgraded_weapon',
      clockapult_of_winter_past: 'clockapult_of_winter_past_weapon',
      geyser_draconic_weapon_recipe: 'geyser_draconic_weapon',
      fluffy_deathbot_weapon: 'fluffy_deathbot_weapon',
      grungy_deathbot_weapon: 'grungy_deathbot_weapon',
      icy_rhinobot: 'icy_rhinobot_weapon',
      ninja_ambush_weapon: 'ninja_ambush_weapon',
      regrown_thorned_venus_mouse_trap: 'throned_venus_mouse_trap_weapon',
      acronym_recipe: 'acronym_weapon',
      ambush_trap_rebuild: 'ambush_weapon',
      rebuild_celestial_dissonance_recipe: 'celestial_dissonance_weapon',
      rebuild_chrome_storm_wrought_ballista_recipe: 'chrome_storm_wrought_ballista_weapon',
      clockapult_of_time_rebuild: 'clockapult_of_time_weapon',
      rebuild_crystal_tower_recipe: 'crystal_tower_weapon',
      digby_drillbot: 'digby_drillbot_weapon',
      dragon_ballista_rebuild: 'dragonvine_ballista_weapon',
      endless_labyrinth_trap_rebuild_recipe: 'endless_labyrinth_weapon',
      event_horizon_recipe: 'event_horizon_weapon',
      harpoon_gun: 'harpoon_gun_weapon',
      rebuild_high_tension_recipe: 'high_tension_spring_weapon',
      ice_blaster_trap_rebuild: 'ice_blaster_weapon',
      wolfsbane_rebuild_recipe: 'wolfsbane_weapon',
      mouse_deathbot: 'mouse_deathbot_weapon',
      net_cannon: 'net_cannon_weapon',
      oasis_water_node_recipe: 'oasis_water_node_weapon',
      obelisk_of_slumber: 'obelisk_of_slumber_weapon',
      rebuild_phantasmic_oasis_recipe: 'phantasmic_oasis_weapon',
      rhinobot_rebuild: 'rhinobot_weapon',
      sandstorm_monstrobot_recipe: 'sandstormbot_weapon',
      rebuild_upgraded_rune_shark_weapon_recipe: 'upgraded_rune_shark_weapon',
      scum_scrubber_trap_rebuild_recipe: 'scum_scrubber_weapon',
      soul_catcher_rebuild: 'hween_2011_weapon',
      sphynx_weapon_recipe: 'sphynx_weapon',
      steam_laser_mk_i_rebuild: 'steam_laser_mk_i_weapon',
      storm_wrought_ballista_recipe: 'storm_wrought_ballista_weapon',
      temporal_turbine_recipe: 'temporal_turbine',
      zugzwangs_last_move: 'zugzwangs_last_move_weapon',
      rebuild_floating_arcane_upgraded_recipe: 'floating_arcane_upgraded_weapon',
      rebuild_thought_obliterator_recipe: 'floating_forgotten_upgraded_weapon',
      venus_mouse_trap: 'venus_mouse_trap_weapon',
    }
  };

  if (! recipes[type]) {
    return;
  }

  const recipesContainer = document.querySelector(`.inventoryPage-tagContent-tagGroup[data-tag="${type}"]`);
  if (! recipesContainer) {
    return;
  }

  const recipesModifying = [];

  const knownRecipes = document.querySelectorAll('.inventoryPage-tagContent-tagGroup.active .inventoryPage-item.recipe.known');
  knownRecipes.forEach((recipe) => {
    const recipeId = recipe.getAttribute('data-item-type');
    recipesModifying.push(recipeId);
  });

  // if there are no recipes to modify, then we can stop here.
  if (recipesModifying.length < 1) {
    return;
  }

  const itemTypes = recipesModifying.map((recipe) => {
    return recipes[type][recipe];
  }).filter((itemType) => {
    return itemType;
  });

  // if we're on the crafting items tab, then also check for dragon slayer cannon and then we can remove all the dragon slayer cannon recipes.
  if (type === 'crafting_item') {
    itemTypes.push('geyser_draconic_weapon');
  }

  const ownedItems = await getUserItems(itemTypes);
  ownedItems.forEach((item) => {
    if (! item.quantity || item.quantity < 1) {
      return;
    }

    if ('geyser_draconic_weapon' === item.type) {
      // if we have the dragon slayer cannon, then we can remove all the dragon slayer cannon recipes.
      moveRecipe('draconic_geyser_chassis_crafting_item', recipesContainer);
      moveRecipe('draconic_geyser_chassis_i_crafting_item', recipesContainer);
    } else {
      moveRecipe(item.type, recipesContainer);
    }
  });
};

// loop trhou

const cleanUpRecipeBook = () => {
  // Re-add the 'All' tab.
  const allTab = document.querySelector('.inventoryPage-tagDirectory-tag.all.hidden');
  if (allTab) {
    allTab.classList.remove('hidden');
  }

  // get all the inventoryPage-tagDirectory-tag links and attach new onclick events to them
  const tagLinks = document.querySelectorAll('.mousehuntHud-page-subTabContent.recipe a.inventoryPage-tagDirectory-tag');
  tagLinks.forEach((tagLink) => {
    // get the data-tag attribute
    const tag = tagLink.getAttribute('data-tag');

    // remove the old onclick event
    tagLink.removeAttribute('onclick');

    // Add the new onclick event
    tagLink.addEventListener('click', (e) => {
      // showTagGroup(e.target);
      app.pages.InventoryPage.showTagGroup(e.target);

      // Update the recipes on the page.
      const hasBeenUpdated = tagLink.classList.contains('updated');
      if (! hasBeenUpdated) {
        updateRecipesOnPage(tag);
        tagLink.classList.add('updated');
      }
    });
  });
};

export default () => {
  onNavigation(cleanUpRecipeBook,
    {
      page: 'inventory',
      tab: 'crafting',
      subtab: 'recipe',
    }
  );
};