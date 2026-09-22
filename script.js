/**
 * TrevNexa - Modern Travel Planning Website
 * Crafted for Hackathon Team: Quantum Coders
 * Pure Vanilla JavaScript (Frontend-Only, Zero Backend, LocalStorage CRUD)
 */

document.addEventListener('DOMContentLoaded', () => {
  // ==========================================================================
  // 1. DATA REPOSITORY & INITIAL STATE
  // ==========================================================================

  const STORAGE_KEY = 'trevnexa_quantum_trips_v1';

  const SAMPLE_DESTINATIONS = [
    {
      id: 'kyoto',
      name: 'Kyoto & Tokyo',
      location: 'Japan',
      category: 'culture',
      categoryLabel: 'Culture & Food',
      estCostPerPerson: 2200,
      image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80',
      description: 'Ancient shrines, tranquil bamboo forests, culinary street markets, and high-speed bullet trains across Honshu.',
      attractions: ['Fushimi Inari Shrine', 'Arashiyama Bamboo Grove', 'Gion District', 'Tsukiji Outer Market'],
      bestTime: 'March to May (Cherry Blossoms) & October to November (Autumn Leaves)',
      localTip: 'Purchase an IC card (Suica/Pasmo) for effortless metro travel and convenience store purchases.'
    },
    {
      id: 'santorini',
      name: 'Santorini & Cyclades',
      location: 'Greece',
      category: 'beaches',
      categoryLabel: 'Beaches & Romance',
      estCostPerPerson: 2600,
      image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800&q=80',
      description: 'Iconic whitewashed cliffside villas, azure volcanic waters, world-famous sunsets, and fresh Mediterranean seafood.',
      attractions: ['Oia Sunset Castle', 'Red Beach', 'Ancient Thera', 'Akrotiri Archaeological Site'],
      bestTime: 'Late April to early November for sunny Aegean beach weather.',
      localTip: 'Book a catamaran sunset caldera tour early; it is the definitive Santorini experience.'
    },
    {
      id: 'banff',
      name: 'Banff National Park',
      location: 'Alberta, Canada',
      category: 'nature',
      categoryLabel: 'Nature & Adventure',
      estCostPerPerson: 1850,
      image: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=800&q=80',
      description: 'Glacial turquoise lakes, towering Canadian Rocky peaks, pristine wildlife corridors, and scenic wilderness drives.',
      attractions: ['Lake Louise', 'Moraine Lake', 'Icefields Parkway', 'Banff Upper Hot Springs'],
      bestTime: 'June to August for hiking and paddling; December to March for world-class skiing.',
      localTip: 'Moraine Lake shuttle tickets require advance booking via Parks Canada reservations.'
    },
    {
      id: 'bali',
      name: 'Bali & Ubud',
      location: 'Indonesia',
      category: 'wellness',
      categoryLabel: 'Wellness & Nature',
      estCostPerPerson: 1200,
      image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80',
      description: 'Terraced emerald rice paddies, spiritual Hindu water temples, holistic wellness retreats, and coastal surf breaks.',
      attractions: ['Tegalalang Rice Terraces', 'Uluwatu Cliff Temple', 'Sacred Monkey Forest', 'Seminyak Beach'],
      bestTime: 'April to October during the dry season with lower humidity.',
      localTip: 'Rent a scooter if experienced, or hire an affordable private driver for day excursions.'
    },
    {
      id: 'amalfi',
      name: 'Amalfi Coast & Capri',
      location: 'Italy',
      category: 'beaches',
      categoryLabel: 'Coastal & Culinary',
      estCostPerPerson: 2950,
      image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80',
      description: 'Dramatically perched pastel villages, fragrant lemon groves, cliffside dining, and sparkling Tyrrhenian waters.',
      attractions: ['Positano Marina Grande', 'Ravello Villa Rufolo', 'Capri Blue Grotto', 'Path of the Gods'],
      bestTime: 'May and September offer warm sunny days without midsummer peak crowds.',
      localTip: 'Use passenger ferries between towns rather than buses to skip the winding coastal traffic jams.'
    },
    {
      id: 'capetown',
      name: 'Cape Town & Peninsula',
      location: 'South Africa',
      category: 'adventure',
      categoryLabel: 'Adventure & Nature',
      estCostPerPerson: 1650,
      image: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=800&q=80',
      description: 'Dramatic Table Mountain summits, African penguin colonies at Boulders Beach, scenic ocean drives, and winelands.',
      attractions: ['Table Mountain Aerial Cableway', 'Boulders Beach Penguins', 'Cape Point Nature Reserve', 'Kirstenbosch Botanical Gardens'],
      bestTime: 'November to February for summer warmth and vibrant seaside cafe culture.',
      localTip: 'Check the Table Mountain cable car wind status before making the drive up.'
    },
    {
      id: 'reykjavik',
      name: 'Reykjavik & Golden Circle',
      location: 'Iceland',
      category: 'nature',
      categoryLabel: 'Nature & Adventure',
      estCostPerPerson: 2400,
      image: 'https://images.unsplash.com/photo-1504893524553-b855bce32c67?auto=format&fit=crop&w=800&q=80',
      description: 'Surreal geothermal geysers, thundering glacial waterfalls, basalt sea cliffs, and the luminous Aurora Borealis.',
      attractions: ['Blue Lagoon Geothermal Spa', 'Gullfoss Waterfall', 'Thingvellir National Park', 'Reynisfjara Black Sand Beach'],
      bestTime: 'September to March for Northern Lights; June to August for 24-hour midnight sun and hiking.',
      localTip: 'Always rent a 4x4 vehicle if traveling outside the paved Ring Road.'
    },
    {
      id: 'cusco',
      name: 'Cusco & Machu Picchu',
      location: 'Peru',
      category: 'culture',
      categoryLabel: 'History & Trekking',
      estCostPerPerson: 1450,
      image: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=800&q=80',
      description: 'Ancient Incan stone empires, Andean artisan markets, vibrant colonial plazas, and legendary sacred mountain trails.',
      attractions: ['Machu Picchu Sanctuary', 'Sacred Valley of the Incas', 'Cusco Historic Plaza de Armas', 'Rainbow Mountain'],
      bestTime: 'May to October for dry sunny hiking conditions.',
      localTip: 'Spend 2 full days acclimatizing in Cusco (3,400m altitude) before embarking on major treks.'
    },
    {
      id: 'swissalps',
      name: 'Swiss Alps & Zermatt',
      location: 'Switzerland',
      category: 'adventure',
      categoryLabel: 'Alpine & Scenic',
      estCostPerPerson: 3200,
      image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=800&q=80',
      description: 'Towering Matterhorn peaks, crystal-clear alpine tarns, world-class cogwheel railways, and idyllic mountain chalets.',
      attractions: ['Matterhorn Glacier Paradise', 'Gornergrat Cogwheel Train', 'Lake Oeschinen', 'Interlaken Lakes'],
      bestTime: 'July to September for alpine hikes; December to April for winter snow sports.',
      localTip: 'The Swiss Travel Pass offers unlimited train, boat, and bus travel across the country.'
    }
  ];

  const STARTER_TRIPS = [
    {
      id: 'trip_starter_1',
      destination: 'Kyoto & Tokyo, Japan',
      startDate: '2026-10-10',
      endDate: '2026-10-18',
      days: 8,
      travelers: 2,
      budget: 4500,
      interests: ['culture', 'food', 'nature'],
      status: 'Upcoming',
      notes: 'Flight booked with ANA. Must try authentic Kaiseki dinner in Gion.',
      createdAt: '2026-09-15T10:00:00.000Z',
      itinerary: [
        {
          day: 1,
          title: 'Arrival in Tokyo & Shinjuku Nightscape',
          costEst: 140,
          morning: { time: '09:00 AM', title: 'Airport Transit & Hotel Check-in', desc: 'Board the Narita Express train into central Tokyo. Drop luggage and pick up pocket Wi-Fi.' },
          afternoon: { time: '02:00 PM', title: 'Meiji Jingu & Harajuku Stroll', desc: 'Walk through the towering cedar forest of Meiji Shrine and explore Takeshita Street.' },
          evening: { time: '07:00 PM', title: 'Omoide Yokocho Yakitori Dinner', desc: 'Enjoy skewered yakitori and local craft drinks in Shinjuku memory lane.' }
        },
        {
          day: 2,
          title: 'Cultural Heritage in Asakusa & Akihabara',
          costEst: 120,
          morning: { time: '09:00 AM', title: 'Senso-ji Temple Exploration', desc: 'Visit Tokyo’s oldest temple and browse traditional crafts along Nakamise-dori.' },
          afternoon: { time: '01:30 PM', title: 'Tokyo Skytree Panoramic Observation', desc: 'Ascend to the 450m observation deck for an endless vista of the Kanto plain.' },
          evening: { time: '06:30 PM', title: 'Sumida River Night Cruise', desc: 'Relax on a water bus cruise admiring illuminated rainbow bridge and skyline.' }
        }
      ]
    },
    {
      id: 'trip_starter_2',
      destination: 'Banff National Park, Canada',
      startDate: '2026-07-04',
      endDate: '2026-07-10',
      days: 6,
      travelers: 4,
      budget: 6800,
      interests: ['nature', 'adventure', 'photography'],
      status: 'Planning',
      notes: 'Renting an SUV from Calgary Airport. Booked Moraine Lake sunrise shuttle.',
      createdAt: '2026-09-18T14:30:00.000Z',
      itinerary: [
        {
          day: 1,
          title: 'Calgary to Banff & Sulphur Mountain',
          costEst: 190,
          morning: { time: '10:00 AM', title: 'Scenic Drive along Trans-Canada Hwy', desc: 'Pick up rental vehicle and enter the Banff National Park gates.' },
          afternoon: { time: '02:00 PM', title: 'Banff Gondola Summit Experience', desc: 'Ride the gondola to the top of Sulphur Mountain for 360-degree Rocky views.' },
          evening: { time: '06:30 PM', title: 'Dinner in Historic Banff Town', desc: 'Hearty Alberta steak dinner and exploration of artisan mountain shops.' }
        }
      ]
    }
  ];

  // ==========================================================================
  // 2. LOCALSTORAGE MANAGEMENT (CRUD)
  // ==========================================================================

  function getSavedTrips() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        // Initialize with realistic starter sample data
        localStorage.setItem(STORAGE_KEY, JSON.stringify(STARTER_TRIPS));
        return [...STARTER_TRIPS];
      }
      return JSON.parse(stored);
    } catch (e) {
      console.error('Error reading localStorage:', e);
      return [];
    }
  }

  function saveTripsToStorage(trips) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(trips));
      updateNavTripBadge();
      return true;
    } catch (e) {
      console.error('Error writing to localStorage:', e);
      showToast('Error saving data to local storage', 'danger');
      return false;
    }
  }

  function createTrip(tripData) {
    const trips = getSavedTrips();
    const newTrip = {
      id: 'trip_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6),
      createdAt: new Date().toISOString(),
      status: tripData.status || 'Planning',
      ...tripData
    };
    trips.unshift(newTrip);
    saveTripsToStorage(trips);
    renderTripsList();
    showToast(`Trip to ${newTrip.destination} saved successfully!`, 'success');
    return newTrip;
  }

  function updateTrip(tripId, updatedFields) {
    const trips = getSavedTrips();
    const index = trips.findIndex(t => t.id === tripId);
    if (index === -1) return false;

    trips[index] = {
      ...trips[index],
      ...updatedFields,
      updatedAt: new Date().toISOString()
    };
    saveTripsToStorage(trips);
    renderTripsList();
    showToast(`Trip to ${trips[index].destination} updated!`, 'success');
    return true;
  }

  function deleteTrip(tripId) {
    let trips = getSavedTrips();
    const target = trips.find(t => t.id === tripId);
    trips = trips.filter(t => t.id !== tripId);
    saveTripsToStorage(trips);
    renderTripsList();
    showToast(target ? `Deleted trip to ${target.destination}` : 'Trip deleted', 'info');
  }

  // ==========================================================================
  // 3. STATE & APPLICATION REFS
  // ==========================================================================

  let currentGeneratedPlan = null;
  let activeTripFilter = 'all';

  // DOM Elements
  const plannerForm = document.getElementById('planner-form');
  const destInput = document.getElementById('planner-destination');
  const startDateInput = document.getElementById('planner-start-date');
  const endDateInput = document.getElementById('planner-end-date');
  const travelersCountDisplay = document.getElementById('travelers-count-display');
  const travelersCountInput = document.getElementById('planner-travelers');
  const btnTravelerMinus = document.getElementById('btn-traveler-minus');
  const btnTravelerPlus = document.getElementById('btn-traveler-plus');
  const budgetInput = document.getElementById('planner-budget');
  const notesInput = document.getElementById('planner-notes');
  const durationBadge = document.getElementById('duration-badge');

  // Sidebar Summary Fields
  const summaryDest = document.getElementById('summary-dest');
  const summaryDates = document.getElementById('summary-dates');
  const summaryTravelers = document.getElementById('summary-travelers');
  const summaryBudget = document.getElementById('summary-budget');
  const summaryPerPerson = document.getElementById('summary-per-person');

  // Itinerary Section Elements
  const itinerarySection = document.getElementById('itinerary');
  const itineraryContent = document.getElementById('itinerary-content');
  const btnSaveItinerary = document.getElementById('btn-save-itinerary');
  const btnExportItinerary = document.getElementById('btn-export-itinerary');
  const btnRegenerateItinerary = document.getElementById('btn-regenerate-itinerary');

  // Explorer Elements
  const destinationsGrid = document.getElementById('destinations-grid');
  const explorerSearch = document.getElementById('explorer-search');
  const filterPills = document.querySelectorAll('.filter-pill');

  // Budget Calculator Elements
  const sliderAccom = document.getElementById('slider-accom');
  const sliderFood = document.getElementById('slider-food');
  const sliderTransit = document.getElementById('slider-transit');
  const sliderAct = document.getElementById('slider-act');
  const sliderOther = document.getElementById('slider-other');

  const valAccom = document.getElementById('val-accom');
  const valFood = document.getElementById('val-food');
  const valTransit = document.getElementById('val-transit');
  const valAct = document.getElementById('val-act');
  const valOther = document.getElementById('val-other');

  const barAccom = document.getElementById('bar-accom');
  const barFood = document.getElementById('bar-food');
  const barTransit = document.getElementById('bar-transit');
  const barAct = document.getElementById('bar-act');
  const barOther = document.getElementById('bar-other');

  const compBudgetEntered = document.getElementById('comp-budget-entered');
  const compBudgetEstimated = document.getElementById('comp-budget-estimated');
  const compDifference = document.getElementById('comp-difference');
  const compStatusBanner = document.getElementById('comp-status-banner');
  const compStatusText = document.getElementById('comp-status-text');

  // Trips CRUD Elements
  const tripsGrid = document.getElementById('trips-grid');
  const tripCountBadge = document.getElementById('trip-count-badge');
  const tripsFilterBtns = document.querySelectorAll('.trips-filter-btn');

  // Modals
  const editTripModal = document.getElementById('edit-trip-modal');
  const editTripForm = document.getElementById('edit-trip-form');
  const viewTripModal = document.getElementById('view-trip-modal');
  const confirmDeleteModal = document.getElementById('confirm-delete-modal');
  const guideModal = document.getElementById('guide-modal');

  // Set minimum dates to today
  const todayStr = new Date().toISOString().split('T')[0];
  if (startDateInput) startDateInput.min = todayStr;
  if (endDateInput) endDateInput.min = todayStr;

  // Set default dates (e.g., 2 weeks from now for 7 days)
  const defaultStart = new Date();
  defaultStart.setDate(defaultStart.getDate() + 14);
  const defaultEnd = new Date(defaultStart);
  defaultEnd.setDate(defaultEnd.getDate() + 6);

  if (startDateInput && !startDateInput.value) {
    startDateInput.value = defaultStart.toISOString().split('T')[0];
  }
  if (endDateInput && !endDateInput.value) {
    endDateInput.value = defaultEnd.toISOString().split('T')[0];
  }

  // ==========================================================================
  // 4. ITINERARY TEMPLATES & INTELLIGENT GENERATOR ENGINE
  // ==========================================================================

  const ACTIVITY_POOLS = {
    general: [
      { morning: 'Historic Center Orientation Walking Tour', afternoon: 'Local Artisan Quarter & Landmark Plaza', evening: 'Panoramic Sunset Viewpoint & Traditional Taverna' },
      { morning: 'National Museum & Royal Gardens Exploration', afternoon: 'Architectural Heritage Walk & Cafe Break', evening: 'Canal / Riverfront Promenade & Fine Dining' },
      { morning: 'Scenic Tram Ride & Old City Citadel', afternoon: 'Cultural Center & Modern Gallery Tour', evening: 'Bustling Night Plaza with Live Street Music' },
      { morning: 'Old Town Clock Tower & Cathedral Quarter', afternoon: 'Harbor Waterfront Boardwalk & Maritime Discovery', evening: 'Rooftop Lounge Overlooking the Illuminated City' }
    ],
    nature: [
      { morning: 'National Park Alpine Trail Trek', afternoon: 'Glacial Lake Kayaking & Nature Photography', evening: 'Campfire Gathering & Stargazing Session' },
      { morning: 'Botanical Sanctuary & Canopy Walk', afternoon: 'Scenic Ridge Overlook & Waterfall Dip', evening: 'Rustic Mountain Lodge Dinner with Local Ingredients' },
      { morning: 'Sunrise Valley Lookout Walk', afternoon: 'Protected Wildlife Reserve Guided Tour', evening: 'Tranquil Lakeside Sunset Picnic' }
    ],
    adventure: [
      { morning: 'Whitewater River Rafting Expedition', afternoon: 'Canyon Zip-Lining & Suspension Bridge Walk', evening: 'Base Camp Craft Beer Tasting & Hearty Fare' },
      { morning: 'Mountain Bike Trail Challenge', afternoon: 'Coastal Sea Cave Sea-Kayaking', evening: 'Sunset Sandboarding or Cliffside Climb' },
      { morning: 'Guided Via Ferrata Rock Ascent', afternoon: 'ATV Wilderness Backroad Tour', evening: 'Celebratory Grill & Adventure Stories' }
    ],
    culture: [
      { morning: 'Ancient Temple & Archaeological Sanctuary', afternoon: 'Traditional Craft & Pottery Workshop', evening: 'Authentic Folk Music & Theater Performance' },
      { morning: 'Royal Palace & Imperial Archives Tour', afternoon: 'Historic Library & Hidden Courtyards Walk', evening: 'Heritage Quarter Dining in a 200-Year-Old Inn' },
      { morning: 'Sacred Shrine Meditation & Garden Tour', afternoon: 'Museum of Fine Arts Guided Gallery Crawl', evening: 'Lantern-Lit Historic Alleyway Walk' }
    ],
    food: [
      { morning: 'Bustling Farmers & Fish Market Tasting Tour', afternoon: 'Private Hands-On Regional Cooking Masterclass', evening: 'Michelin-Recommended Tasting Menu & Wine Pairing' },
      { morning: 'Artisan Bakery & Specialty Coffee Crawl', afternoon: 'Historic Vineyard & Olive Grove Cellar Tour', evening: 'Street Food Night Market Discovery Walk' },
      { morning: 'Gourmet Cheese & Delicatessen Workshop', afternoon: 'Microbrewery / Distillery Tasting Flight', evening: 'Seafood Harbor Feast Fresh from the Boats' }
    ],
    beaches: [
      { morning: 'Secluded White Sand Cove Swimming & Sunbathing', afternoon: 'Catamaran Sailing Cruise & Snorkeling Reefs', evening: 'Beachside Seafood BBQ with Toes in the Sand' },
      { morning: 'Morning Paddleboarding on Glassy Waters', afternoon: 'Tropical Island Lagoon Hop & Beach Club Relaxation', evening: 'Sunset Cocktail Bar Facing the Horizon' }
    ],
    wellness: [
      { morning: 'Sunrise Yoga & Guided Ocean Meditation', afternoon: 'Natural Hot Springs & Thermal Mineral Baths', evening: 'Herbal Aromatherapy & Organic Plant-Based Dinner' },
      { morning: 'Mindful Forest Bathing & Bamboo Sanctuary', afternoon: 'Holistic Spa Body Treatment & Sound Healing', evening: 'Quiet Tea Ceremony & Sunset Journaling' }
    ],
    shopping: [
      { morning: 'Historic Flea Market & Antique Hunting', afternoon: 'Flagship Fashion Boulevard & Designer Boutiques', evening: 'Night Bazaar Artisan Crafts & Souvenir Shopping' }
    ]
  };

  function calculateTripDuration(start, end) {
    if (!start || !end) return 5;
    const s = new Date(start);
    const e = new Date(end);
    const diffTime = e.getTime() - s.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays > 0 ? Math.min(diffDays, 14) : 1; // Cap at 14 for reasonable demo generation
  }

  function generateItineraryData(destination, days, interests, budget, travelers) {
    const itinerary = [];
    const dailyAvgEst = Math.round((budget / days / travelers) * 0.4) || 120;

    // Pick pools based on user interests
    const selectedPools = [];
    interests.forEach(interest => {
      if (ACTIVITY_POOLS[interest]) {
        selectedPools.push(...ACTIVITY_POOLS[interest]);
      }
    });

    if (selectedPools.length === 0) {
      selectedPools.push(...ACTIVITY_POOLS.general);
    }

    for (let i = 1; i <= days; i++) {
      const poolItem = selectedPools[(i - 1) % selectedPools.length];
      const dayVariationCost = Math.round(dailyAvgEst * (0.85 + (i % 3) * 0.15));

      let dayTitle = `Day ${i}: `;
      if (i === 1) {
        dayTitle += `Arrival & First Impressions of ${destination.split(',')[0]}`;
      } else if (i === days) {
        dayTitle += `Final Highlights, Keepsakes & Farewell`;
      } else {
        const themes = ['Signature Landmarks & Discovery', 'Scenic Exploration & Local Flavors', 'Immersive Cultural Encounter', 'Active Adventure & Vistas', 'Relaxed Wonder & Hidden Corners'];
        dayTitle += themes[(i - 2) % themes.length];
      }

      itinerary.push({
        day: i,
        title: dayTitle,
        costEst: dayVariationCost,
        morning: {
          time: '09:00 AM - 12:30 PM',
          title: poolItem.morning,
          desc: `Kick off the day discovering iconic sights around ${destination.split(',')[0]}. Enjoy morning refreshment and photo stops.`
        },
        afternoon: {
          time: '01:30 PM - 05:00 PM',
          title: poolItem.afternoon,
          desc: `Immerse in curated activities matching your team travel preferences. Includes recommended lunch spot and leisure.`
        },
        evening: {
          time: '06:30 PM - 09:30 PM',
          title: poolItem.evening,
          desc: `Wind down with picturesque sunset ambiance, authentic regional culinary specialties, and memorable night atmosphere.`
        }
      });
    }

    return itinerary;
  }

  // ==========================================================================
  // 5. RENDER FUNCTIONS
  // ==========================================================================

  function renderItinerary(planData) {
    if (!planData || !planData.itinerary) return;

    itineraryContent.innerHTML = `
      <div class="itinerary-meta-header">
        <div class="itinerary-meta-title">
          <h3>${planData.destination}</h3>
          <div class="itinerary-meta-details">
            <span class="meta-pill">📅 ${planData.days} Days (${planData.startDate} to ${planData.endDate})</span>
            <span class="meta-pill">👥 ${planData.travelers} Traveler${planData.travelers > 1 ? 's' : ''}</span>
            <span class="meta-pill">💰 Budget: $${planData.budget.toLocaleString()}</span>
          </div>
        </div>
        <div class="itinerary-actions-bar">
          <button class="btn btn-outline btn-sm" id="btn-print-itinerary">
            🖨️ Print
          </button>
          <button class="btn btn-primary btn-sm" id="btn-save-itinerary-header">
            💾 Save to My Trips
          </button>
        </div>
      </div>

      <div class="day-tabs" id="day-tabs-container">
        <button class="day-tab active" data-day="all">View All Days</button>
        ${planData.itinerary.map(item => `
          <button class="day-tab" data-day="${item.day}">Day ${item.day}</button>
        `).join('')}
      </div>

      <div class="days-container" id="days-container">
        ${planData.itinerary.map(dayItem => `
          <div class="day-card" data-day-num="${dayItem.day}">
            <div class="day-card-header">
              <h4>${dayItem.title}</h4>
              <span class="day-cost-est">Est. Daily Budget: ~$${dayItem.costEst}/traveler</span>
            </div>
            
            <div class="timeline">
              <div class="timeline-slot">
                <div class="slot-dot">🌅</div>
                <div class="slot-time">${dayItem.morning.time}</div>
                <div class="slot-content">
                  <div class="slot-title">${dayItem.morning.title}</div>
                  <div class="slot-desc">${dayItem.morning.desc}</div>
                  <span class="slot-tag">Morning Activity</span>
                </div>
              </div>

              <div class="timeline-slot">
                <div class="slot-dot">☀️</div>
                <div class="slot-time">${dayItem.afternoon.time}</div>
                <div class="slot-content">
                  <div class="slot-title">${dayItem.afternoon.title}</div>
                  <div class="slot-desc">${dayItem.afternoon.desc}</div>
                  <span class="slot-tag">Afternoon Immersion</span>
                </div>
              </div>

              <div class="timeline-slot">
                <div class="slot-dot">🌙</div>
                <div class="slot-time">${dayItem.evening.time}</div>
                <div class="slot-content">
                  <div class="slot-title">${dayItem.evening.title}</div>
                  <div class="slot-desc">${dayItem.evening.desc}</div>
                  <span class="slot-tag">Evening Leisure</span>
                </div>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    `;

    // Attach Day Tab click handlers
    const tabs = itineraryContent.querySelectorAll('.day-tab');
    const dayCards = itineraryContent.querySelectorAll('.day-card');

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const selectedDay = tab.dataset.day;

        dayCards.forEach(card => {
          if (selectedDay === 'all' || card.dataset.dayNum === selectedDay) {
            card.style.display = 'block';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });

    // Attach Save from header
    const saveHeaderBtn = document.getElementById('btn-save-itinerary-header');
    if (saveHeaderBtn) {
      saveHeaderBtn.addEventListener('click', () => {
        saveCurrentPlanToMyTrips();
      });
    }

    // Attach Print
    const printBtn = document.getElementById('btn-print-itinerary');
    if (printBtn) {
      printBtn.addEventListener('click', () => {
        window.print();
      });
    }
  }

  function renderDestinations(category = 'all', searchQuery = '') {
    if (!destinationsGrid) return;

    let filtered = SAMPLE_DESTINATIONS;

    if (category !== 'all') {
      filtered = filtered.filter(d => d.category === category);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(d => 
        d.name.toLowerCase().includes(q) || 
        d.location.toLowerCase().includes(q) ||
        d.description.toLowerCase().includes(q) ||
        d.attractions.some(a => a.toLowerCase().includes(q))
      );
    }

    if (filtered.length === 0) {
      destinationsGrid.innerHTML = `
        <div class="empty-state">
          <div class="empty-icon">🔍</div>
          <h4 class="empty-title">No matching destinations found</h4>
          <p class="empty-desc">Try clearing your search term or exploring a different category filter.</p>
          <button class="btn btn-outline btn-sm" id="btn-clear-search">Reset Filter</button>
        </div>
      `;
      const clearBtn = document.getElementById('btn-clear-search');
      if (clearBtn) {
        clearBtn.addEventListener('click', () => {
          explorerSearch.value = '';
          filterPills.forEach(p => p.classList.toggle('active', p.dataset.category === 'all'));
          renderDestinations('all', '');
        });
      }
      return;
    }

    destinationsGrid.innerHTML = filtered.map(dest => `
      <div class="dest-card" id="dest-card-${dest.id}">
        <div class="dest-image-wrapper">
          <img src="${dest.image}" alt="${dest.name}" class="dest-img" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80'" />
          <span class="dest-category-badge">${dest.categoryLabel}</span>
          <span class="dest-cost-badge">~$${dest.estCostPerPerson.toLocaleString()} / person</span>
        </div>
        <div class="dest-card-body">
          <div class="dest-title-row">
            <h3 class="dest-title">${dest.name}</h3>
            <span class="dest-country">${dest.location}</span>
          </div>
          <p class="dest-desc">${dest.description}</p>
          
          <div class="dest-attractions">
            ${dest.attractions.slice(0, 3).map(att => `<span class="attraction-tag">${att}</span>`).join('')}
          </div>

          <div class="dest-card-footer">
            <button class="btn btn-outline btn-sm btn-guide" data-dest-id="${dest.id}" style="flex: 1;">
              📖 Guide
            </button>
            <button class="btn btn-primary btn-sm btn-plan-dest" data-dest-id="${dest.id}" style="flex: 1.2;">
              ✈️ Plan Trip
            </button>
          </div>
        </div>
      </div>
    `).join('');

    // Attach Guide & Plan buttons
    destinationsGrid.querySelectorAll('.btn-plan-dest').forEach(btn => {
      btn.addEventListener('click', () => {
        const destId = btn.dataset.destId;
        const target = SAMPLE_DESTINATIONS.find(d => d.id === destId);
        if (target) {
          populatePlannerWithDestination(target);
        }
      });
    });

    destinationsGrid.querySelectorAll('.btn-guide').forEach(btn => {
      btn.addEventListener('click', () => {
        const destId = btn.dataset.destId;
        const target = SAMPLE_DESTINATIONS.find(d => d.id === destId);
        if (target) {
          showDestinationGuideModal(target);
        }
      });
    });
  }

  function renderTripsList() {
    if (!tripsGrid) return;
    const trips = getSavedTrips();

    let filtered = trips;
    if (activeTripFilter !== 'all') {
      filtered = trips.filter(t => t.status.toLowerCase() === activeTripFilter.toLowerCase());
    }

    updateNavTripBadge();

    if (filtered.length === 0) {
      tripsGrid.innerHTML = `
        <div class="empty-state">
          <div class="empty-icon">🧳</div>
          <h4 class="empty-title">No trips found in this category</h4>
          <p class="empty-desc">Create and save your travel ideas to view, edit, and track them here in localStorage.</p>
          <a href="#planner" class="btn btn-primary btn-sm">Plan a New Trip</a>
        </div>
      `;
      return;
    }

    tripsGrid.innerHTML = filtered.map(trip => {
      const statusClass = `status-${trip.status.toLowerCase()}`;
      return `
        <div class="trip-card" id="trip-${trip.id}">
          <div class="trip-card-top">
            <div>
              <h3 class="trip-destination-title">${trip.destination}</h3>
              <div style="font-size: 0.8rem; color: var(--neutral-500); margin-top: 2px;">
                ${trip.days} Days • Created ${new Date(trip.createdAt).toLocaleDateString()}
              </div>
            </div>
            <span class="trip-status-pill ${statusClass}">${trip.status}</span>
          </div>

          <div class="trip-details-list">
            <div class="trip-detail-item">
              <span class="detail-lbl">Travel Dates</span>
              <span class="detail-val">${trip.startDate} to ${trip.endDate}</span>
            </div>
            <div class="trip-detail-item">
              <span class="detail-lbl">Travelers</span>
              <span class="detail-val">${trip.travelers} Person${trip.travelers > 1 ? 's' : ''}</span>
            </div>
            <div class="trip-detail-item">
              <span class="detail-lbl">Total Budget</span>
              <span class="detail-val">$${Number(trip.budget).toLocaleString()}</span>
            </div>
            <div class="trip-detail-item">
              <span class="detail-lbl">Per Person</span>
              <span class="detail-val">$${Math.round(trip.budget / (trip.travelers || 1)).toLocaleString()}</span>
            </div>
          </div>

          ${trip.interests && trip.interests.length > 0 ? `
            <div class="trip-interests-tags">
              ${trip.interests.map(i => `<span class="trip-tag">#${i}</span>`).join('')}
            </div>
          ` : ''}

          ${trip.notes ? `
            <div style="font-size: 0.85rem; color: var(--neutral-600); margin-bottom: 1rem; font-style: italic; background: var(--neutral-100); padding: 8px 10px; border-radius: var(--radius-sm);">
              "${trip.notes}"
            </div>
          ` : ''}

          <div class="trip-actions">
            <button class="btn btn-outline btn-sm btn-view-trip" data-id="${trip.id}" title="View Itinerary">
              👁️ View
            </button>
            <button class="btn btn-outline btn-sm btn-edit-trip" data-id="${trip.id}" title="Edit Trip">
              ✏️ Edit
            </button>
            <button class="btn btn-outline btn-sm btn-cycle-status" data-id="${trip.id}" title="Cycle Status">
              🔄 Status
            </button>
            <button class="btn btn-danger btn-sm btn-delete-trip" data-id="${trip.id}" title="Delete Trip">
              🗑️
            </button>
          </div>
        </div>
      `;
    }).join('');

    // Attach CRUD Actions
    tripsGrid.querySelectorAll('.btn-view-trip').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.id;
        const trip = getSavedTrips().find(t => t.id === id);
        if (trip) showViewTripModal(trip);
      });
    });

    tripsGrid.querySelectorAll('.btn-edit-trip').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.id;
        const trip = getSavedTrips().find(t => t.id === id);
        if (trip) showEditTripModal(trip);
      });
    });

    tripsGrid.querySelectorAll('.btn-cycle-status').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.id;
        cycleTripStatus(id);
      });
    });

    tripsGrid.querySelectorAll('.btn-delete-trip').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.id;
        const trip = getSavedTrips().find(t => t.id === id);
        if (trip) promptDeleteTrip(trip);
      });
    });
  }

  function updateNavTripBadge() {
    if (!tripCountBadge) return;
    const trips = getSavedTrips();
    tripCountBadge.textContent = trips.length;
  }

  // ==========================================================================
  // 6. BUDGET CALCULATOR ENGINE
  // ==========================================================================

  function updateBudgetCalculator() {
    const enteredBudget = parseFloat(budgetInput?.value) || 2500;
    const travelers = parseInt(travelersCountInput?.value, 10) || 1;

    const pAccom = parseInt(sliderAccom?.value, 10) || 35;
    const pFood = parseInt(sliderFood?.value, 10) || 25;
    const pTransit = parseInt(sliderTransit?.value, 10) || 20;
    const pAct = parseInt(sliderAct?.value, 10) || 15;
    const pOther = parseInt(sliderOther?.value, 10) || 5;

    // Calculate dollar amounts
    const amtAccom = Math.round(enteredBudget * (pAccom / 100));
    const amtFood = Math.round(enteredBudget * (pFood / 100));
    const amtTransit = Math.round(enteredBudget * (pTransit / 100));
    const amtAct = Math.round(enteredBudget * (pAct / 100));
    const amtOther = Math.round(enteredBudget * (pOther / 100));

    const totalCalculated = amtAccom + amtFood + amtTransit + amtAct + amtOther;

    // Update labels
    if (valAccom) valAccom.textContent = `$${amtAccom.toLocaleString()} (${pAccom}%)`;
    if (valFood) valFood.textContent = `$${amtFood.toLocaleString()} (${pFood}%)`;
    if (valTransit) valTransit.textContent = `$${amtTransit.toLocaleString()} (${pTransit}%)`;
    if (valAct) valAct.textContent = `$${amtAct.toLocaleString()} (${pAct}%)`;
    if (valOther) valOther.textContent = `$${amtOther.toLocaleString()} (${pOther}%)`;

    // Update stacked bar widths
    if (barAccom) barAccom.style.width = `${pAccom}%`;
    if (barFood) barFood.style.width = `${pFood}%`;
    if (barTransit) barTransit.style.width = `${pTransit}%`;
    if (barAct) barAct.style.width = `${pAct}%`;
    if (barOther) barOther.style.width = `${pOther}%`;

    // Comparison against entered budget
    if (compBudgetEntered) compBudgetEntered.textContent = `$${enteredBudget.toLocaleString()}`;
    if (compBudgetEstimated) compBudgetEstimated.textContent = `$${totalCalculated.toLocaleString()}`;

    const diff = enteredBudget - totalCalculated;
    if (compDifference) {
      if (diff >= 0) {
        compDifference.textContent = `+$${diff.toLocaleString()} (Surplus Cushion)`;
        compDifference.style.color = 'var(--accent-emerald)';
      } else {
        compDifference.textContent = `-$${Math.abs(diff).toLocaleString()} (Budget Deficit)`;
        compDifference.style.color = 'var(--accent-rose)';
      }
    }

    if (compStatusBanner && compStatusText) {
      if (diff >= 0) {
        compStatusBanner.className = 'comparison-status-banner within';
        compStatusText.innerHTML = `
          <h4>Within Planned Budget</h4>
          <p>Your allocated expenses match your $${enteredBudget.toLocaleString()} limit nicely with $${Math.round(enteredBudget / travelers).toLocaleString()} per traveler.</p>
        `;
      } else {
        compStatusBanner.className = 'comparison-status-banner over';
        compStatusText.innerHTML = `
          <h4>Exceeds Planned Budget</h4>
          <p>Estimated categories exceed your budget by $${Math.abs(diff).toLocaleString()}. Adjust sliders to rebalance.</p>
        `;
      }
    }
  }

  // ==========================================================================
  // 7. INTERACTION LOGIC & EVENT HANDLERS
  // ==========================================================================

  function updateFormSummary() {
    const dest = destInput?.value.trim() || 'Not specified';
    const sDate = startDateInput?.value;
    const eDate = endDateInput?.value;
    const travelers = travelersCountInput?.value || 1;
    const budget = parseFloat(budgetInput?.value) || 0;

    let days = 1;
    if (sDate && eDate) {
      days = calculateTripDuration(sDate, eDate);
      if (durationBadge) {
        durationBadge.textContent = `${days} Days / ${days > 1 ? days - 1 : 1} Nights`;
      }
    }

    if (summaryDest) summaryDest.textContent = dest;
    if (summaryDates) summaryDates.textContent = sDate && eDate ? `${sDate} to ${eDate} (${days}d)` : 'Select dates';
    if (summaryTravelers) summaryTravelers.textContent = `${travelers} Person${travelers > 1 ? 's' : ''}`;
    if (summaryBudget) summaryBudget.textContent = `$${budget.toLocaleString()}`;

    if (summaryPerPerson) {
      const perPerson = Math.round(budget / (travelers || 1));
      const perDay = days > 0 ? Math.round(perPerson / days) : 0;
      summaryPerPerson.textContent = `$${perPerson.toLocaleString()} total (~$${perDay}/day)`;
    }

    updateBudgetCalculator();
  }

  function getSelectedInterests() {
    const checked = document.querySelectorAll('.interest-checkbox input:checked');
    return Array.from(checked).map(cb => cb.value);
  }

  function populatePlannerWithDestination(dest) {
    if (destInput) destInput.value = `${dest.name}, ${dest.location}`;

    // Auto calculate budget based on travelers
    const travelers = parseInt(travelersCountInput?.value, 10) || 2;
    if (budgetInput) {
      budgetInput.value = dest.estCostPerPerson * travelers;
    }

    // Auto-select relevant category interest
    document.querySelectorAll('.interest-checkbox').forEach(box => {
      const input = box.querySelector('input');
      if (input && (input.value === dest.category || (dest.category === 'culture' && input.value === 'history'))) {
        input.checked = true;
        box.classList.add('selected');
      }
    });

    updateFormSummary();
    showToast(`Loaded ${dest.name} into Trip Planner!`, 'info');

    // Scroll to planner smoothly
    const plannerEl = document.getElementById('planner');
    if (plannerEl) {
      plannerEl.scrollIntoView({ behavior: 'smooth' });
    }
  }

  function handleGenerateItinerary(e) {
    if (e) e.preventDefault();

    const destination = destInput?.value.trim();
    if (!destination) {
      showToast('Please enter a destination to generate an itinerary.', 'danger');
      if (destInput) destInput.focus();
      return;
    }

    const startDate = startDateInput?.value;
    const endDate = endDateInput?.value;
    if (!startDate || !endDate) {
      showToast('Please select both travel start and end dates.', 'danger');
      return;
    }

    if (new Date(endDate) < new Date(startDate)) {
      showToast('End date cannot be earlier than start date.', 'danger');
      return;
    }

    const days = calculateTripDuration(startDate, endDate);
    const travelers = parseInt(travelersCountInput?.value, 10) || 1;
    const budget = parseFloat(budgetInput?.value) || 2500;
    const interests = getSelectedInterests();
    const notes = notesInput?.value.trim() || '';

    const itinerary = generateItineraryData(destination, days, interests, budget, travelers);

    currentGeneratedPlan = {
      destination,
      startDate,
      endDate,
      days,
      travelers,
      budget,
      interests,
      notes,
      itinerary
    };

    renderItinerary(currentGeneratedPlan);
    showToast(`Generated ${days}-day sample itinerary for ${destination}!`, 'success');

    // Scroll to itinerary section
    if (itinerarySection) {
      itinerarySection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  function saveCurrentPlanToMyTrips() {
    if (!currentGeneratedPlan) {
      handleGenerateItinerary();
    }
    if (currentGeneratedPlan) {
      createTrip(currentGeneratedPlan);
      const myTripsEl = document.getElementById('my-trips');
      if (myTripsEl) {
        myTripsEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }

  function cycleTripStatus(tripId) {
    const trips = getSavedTrips();
    const trip = trips.find(t => t.id === tripId);
    if (!trip) return;

    const sequence = ['Planning', 'Upcoming', 'Completed'];
    const currentIdx = sequence.indexOf(trip.status);
    const nextStatus = sequence[(currentIdx + 1) % sequence.length];

    updateTrip(tripId, { status: nextStatus });
  }

  // ==========================================================================
  // 8. MODAL WINDOWS & POPUPS
  // ==========================================================================

  function showDestinationGuideModal(dest) {
    if (!guideModal) return;
    const title = document.getElementById('guide-modal-title');
    const body = document.getElementById('guide-modal-body');

    if (title) title.textContent = `${dest.name} — Destination Guide`;
    if (body) {
      body.innerHTML = `
        <div style="display: flex; gap: 1.5rem; flex-wrap: wrap; margin-bottom: 1.5rem;">
          <img src="${dest.image}" alt="${dest.name}" style="width: 100%; max-height: 240px; object-fit: cover; border-radius: var(--radius-md);" />
        </div>
        <p style="font-size: 1rem; color: var(--neutral-700); line-height: 1.6; margin-bottom: 1.25rem;">${dest.description}</p>

        <div style="background: var(--neutral-50); border: 1px solid var(--neutral-200); border-radius: var(--radius-md); padding: 1.25rem; margin-bottom: 1.25rem;">
          <h4 style="font-size: 0.95rem; font-weight: 700; color: var(--neutral-900); margin-bottom: 0.5rem;">🌟 Must-Visit Attractions</h4>
          <ul style="padding-left: 1.25rem; color: var(--neutral-600); font-size: 0.9rem;">
            ${dest.attractions.map(a => `<li style="margin-bottom: 4px;"><strong>${a}</strong></li>`).join('')}
          </ul>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.5rem;">
          <div style="background: var(--primary-50); padding: 1rem; border-radius: var(--radius-md); border: 1px solid var(--primary-100);">
            <div style="font-size: 0.75rem; font-weight: 700; color: var(--primary-700); text-transform: uppercase;">Best Time to Visit</div>
            <div style="font-size: 0.88rem; color: var(--neutral-800); margin-top: 4px; font-weight: 600;">${dest.bestTime}</div>
          </div>
          <div style="background: #fef3c7; padding: 1rem; border-radius: var(--radius-md); border: 1px solid #fde68a;">
            <div style="font-size: 0.75rem; font-weight: 700; color: #b45309; text-transform: uppercase;">Local Insider Tip</div>
            <div style="font-size: 0.88rem; color: #78350f; margin-top: 4px; font-weight: 600;">${dest.localTip}</div>
          </div>
        </div>

        <div style="text-align: right;">
          <button class="btn btn-primary" id="btn-guide-plan-now">✈️ Plan Trip Here</button>
        </div>
      `;

      const planNowBtn = document.getElementById('btn-guide-plan-now');
      if (planNowBtn) {
        planNowBtn.addEventListener('click', () => {
          closeModal(guideModal);
          populatePlannerWithDestination(dest);
        });
      }
    }
    openModal(guideModal);
  }

  function showViewTripModal(trip) {
    if (!viewTripModal) return;
    const title = document.getElementById('view-trip-title');
    const body = document.getElementById('view-trip-body');

    if (title) title.textContent = `Trip Details: ${trip.destination}`;
    if (body) {
      body.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem; flex-wrap: wrap; gap: 8px;">
          <div>
            <span class="trip-status-pill status-${trip.status.toLowerCase()}">${trip.status}</span>
            <span style="font-size: 0.85rem; color: var(--neutral-500); margin-left: 8px;">
              ${trip.startDate} to ${trip.endDate} (${trip.days} Days)
            </span>
          </div>
          <div style="font-weight: 700; color: var(--primary-600); font-size: 1.1rem;">
            $${Number(trip.budget).toLocaleString()} Budget (${trip.travelers} Travelers)
          </div>
        </div>

        ${trip.notes ? `
          <div style="background: var(--neutral-50); border: 1px solid var(--neutral-200); padding: 12px; border-radius: var(--radius-md); margin-bottom: 1.5rem; font-size: 0.9rem;">
            <strong>Travel Notes:</strong> ${trip.notes}
          </div>
        ` : ''}

        <h4 style="font-size: 1.1rem; font-weight: 700; margin-bottom: 1rem; color: var(--neutral-900);">Day-by-Day Saved Itinerary</h4>

        <div style="display: flex; flex-direction: column; gap: 1rem; max-height: 400px; overflow-y: auto; padding-right: 4px;">
          ${trip.itinerary && trip.itinerary.length > 0 ? trip.itinerary.map(dayItem => `
            <div style="border: 1px solid var(--neutral-200); border-radius: var(--radius-md); padding: 1rem; background: #fff;">
              <div style="display: flex; justify-content: space-between; font-weight: 700; font-size: 0.95rem; margin-bottom: 0.5rem; color: var(--neutral-800);">
                <span>${dayItem.title}</span>
                <span style="color: var(--accent-emerald); font-size: 0.85rem;">~$${dayItem.costEst}/day</span>
              </div>
              <div style="font-size: 0.85rem; color: var(--neutral-600); display: flex; flex-direction: column; gap: 6px;">
                <div>🌅 <strong>Morning:</strong> ${dayItem.morning.title} — ${dayItem.morning.desc}</div>
                <div>☀️ <strong>Afternoon:</strong> ${dayItem.afternoon.title} — ${dayItem.afternoon.desc}</div>
                <div>🌙 <strong>Evening:</strong> ${dayItem.evening.title} — ${dayItem.evening.desc}</div>
              </div>
            </div>
          `).join('') : '<p style="color: var(--neutral-500); font-size: 0.9rem;">No daily itinerary attached to this trip record.</p>'}
        </div>

        <div style="margin-top: 1.5rem; display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--neutral-200); padding-top: 1rem;">
          <button class="btn btn-outline btn-sm" id="btn-export-trip-txt">📄 Download Text File</button>
          <button class="btn btn-primary btn-sm" id="btn-edit-from-view">✏️ Edit This Trip</button>
        </div>
      `;

      const editFromViewBtn = document.getElementById('btn-edit-from-view');
      if (editFromViewBtn) {
        editFromViewBtn.addEventListener('click', () => {
          closeModal(viewTripModal);
          showEditTripModal(trip);
        });
      }

      const exportTxtBtn = document.getElementById('btn-export-trip-txt');
      if (exportTxtBtn) {
        exportTxtBtn.addEventListener('click', () => {
          exportTripToText(trip);
        });
      }
    }
    openModal(viewTripModal);
  }

  function showEditTripModal(trip) {
    if (!editTripModal) return;
    const idInput = document.getElementById('edit-trip-id');
    const dest = document.getElementById('edit-destination');
    const start = document.getElementById('edit-start-date');
    const end = document.getElementById('edit-end-date');
    const travelers = document.getElementById('edit-travelers');
    const budget = document.getElementById('edit-budget');
    const status = document.getElementById('edit-status');
    const notes = document.getElementById('edit-notes');

    if (idInput) idInput.value = trip.id;
    if (dest) dest.value = trip.destination;
    if (start) start.value = trip.startDate;
    if (end) end.value = trip.endDate;
    if (travelers) travelers.value = trip.travelers;
    if (budget) budget.value = trip.budget;
    if (status) status.value = trip.status;
    if (notes) notes.value = trip.notes || '';

    openModal(editTripModal);
  }

  function promptDeleteTrip(trip) {
    if (!confirmDeleteModal) {
      if (confirm(`Are you sure you want to delete your trip to "${trip.destination}"?`)) {
        deleteTrip(trip.id);
      }
      return;
    }

    const desc = document.getElementById('confirm-delete-desc');
    const confirmBtn = document.getElementById('btn-confirm-delete');

    if (desc) {
      desc.textContent = `Are you sure you want to permanently delete your saved trip to "${trip.destination}" (${trip.startDate} - ${trip.endDate})?`;
    }

    confirmBtn.onclick = () => {
      deleteTrip(trip.id);
      closeModal(confirmDeleteModal);
    };

    openModal(confirmDeleteModal);
  }

  function exportTripToText(trip) {
    let txt = `========================================\n`;
    txt += `TRIPMATE TRAVEL ITINERARY (DEMO)\n`;
    txt += `Crafted by Quantum Coders Hackathon Team\n`;
    txt += `========================================\n\n`;
    txt += `Destination: ${trip.destination}\n`;
    txt += `Dates: ${trip.startDate} to ${trip.endDate} (${trip.days} Days)\n`;
    txt += `Travelers: ${trip.travelers}\n`;
    txt += `Total Budget: $${Number(trip.budget).toLocaleString()}\n`;
    txt += `Status: ${trip.status}\n`;
    if (trip.notes) txt += `Notes: ${trip.notes}\n`;
    txt += `\nDAY-BY-DAY ITINERARY:\n----------------------------------------\n`;

    if (trip.itinerary && trip.itinerary.length > 0) {
      trip.itinerary.forEach(d => {
        txt += `\n${d.title} (Est. daily budget ~$${d.costEst}/p)\n`;
        txt += `  Morning:   ${d.morning.title} - ${d.morning.desc}\n`;
        txt += `  Afternoon: ${d.afternoon.title} - ${d.afternoon.desc}\n`;
        txt += `  Evening:   ${d.evening.title} - ${d.evening.desc}\n`;
      });
    }

    txt += `\n\n* Disclaimer: All activities and cost estimates are demo data for inspiration.\n`;

    const blob = new Blob([txt], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `TrevNexa-${trip.destination.replace(/[^a-zA-Z0-9]/g, '_')}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Itinerary exported to text file!', 'success');
  }

  function openModal(modal) {
    if (!modal) return;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal(modal) {
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  function showToast(message, type = 'info') {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    let icon = 'ℹ️';
    if (type === 'success') icon = '✅';
    if (type === 'danger') icon = '⚠️';

    toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(12px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3800);
  }

  // ==========================================================================
  // 9. EVENT LISTENERS SETUP
  // ==========================================================================

  // Travelers +/- buttons
  if (btnTravelerMinus) {
    btnTravelerMinus.addEventListener('click', () => {
      let count = parseInt(travelersCountInput.value, 10) || 1;
      if (count > 1) {
        count--;
        travelersCountInput.value = count;
        travelersCountDisplay.textContent = count;
        updateFormSummary();
      }
    });
  }

  if (btnTravelerPlus) {
    btnTravelerPlus.addEventListener('click', () => {
      let count = parseInt(travelersCountInput.value, 10) || 1;
      if (count < 20) {
        count++;
        travelersCountInput.value = count;
        travelersCountDisplay.textContent = count;
        updateFormSummary();
      }
    });
  }

  // Destination quick chips
  document.querySelectorAll('.quick-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const destName = chip.dataset.dest;
      if (destInput) {
        destInput.value = destName;
        updateFormSummary();
      }
    });
  });

  // Interest toggle chips
  document.querySelectorAll('.interest-checkbox').forEach(box => {
    const input = box.querySelector('input');
    box.addEventListener('click', (e) => {
      if (e.target !== input) {
        input.checked = !input.checked;
      }
      box.classList.toggle('selected', input.checked);
    });
  });

  // Form input changes
  [destInput, startDateInput, endDateInput, budgetInput].forEach(el => {
    if (el) {
      el.addEventListener('input', updateFormSummary);
      el.addEventListener('change', updateFormSummary);
    }
  });

  // Planner Form Submit
  if (plannerForm) {
    plannerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      handleGenerateItinerary(e);
    });
  }

  // Direct Save from Planner
  const btnSaveFromPlanner = document.getElementById('btn-save-from-planner');
  if (btnSaveFromPlanner) {
    btnSaveFromPlanner.addEventListener('click', () => {
      const destination = destInput?.value.trim();
      if (!destination) {
        showToast('Please enter a destination first.', 'danger');
        if (destInput) destInput.focus();
        return;
      }
      handleGenerateItinerary();
      saveCurrentPlanToMyTrips();
    });
  }

  // Save from itinerary section button
  if (btnSaveItinerary) {
    btnSaveItinerary.addEventListener('click', saveCurrentPlanToMyTrips);
  }

  // Export from itinerary section
  if (btnExportItinerary) {
    btnExportItinerary.addEventListener('click', () => {
      if (currentGeneratedPlan) {
        exportTripToText(currentGeneratedPlan);
      } else {
        showToast('Please generate an itinerary first.', 'danger');
      }
    });
  }

  // Regenerate button
  if (btnRegenerateItinerary) {
    btnRegenerateItinerary.addEventListener('click', () => {
      handleGenerateItinerary();
    });
  }

  // Explorer Search & Filter
  if (explorerSearch) {
    explorerSearch.addEventListener('input', () => {
      const activeCategoryPill = document.querySelector('.filter-pill.active');
      const category = activeCategoryPill ? activeCategoryPill.dataset.category : 'all';
      renderDestinations(category, explorerSearch.value);
    });
  }

  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const category = pill.dataset.category;
      renderDestinations(category, explorerSearch ? explorerSearch.value : '');
    });
  });

  // Budget Sliders input
  [sliderAccom, sliderFood, sliderTransit, sliderAct, sliderOther].forEach(slider => {
    if (slider) {
      slider.addEventListener('input', updateBudgetCalculator);
    }
  });

  const btnSyncBudget = document.getElementById('btn-sync-budget');
  if (btnSyncBudget) {
    btnSyncBudget.addEventListener('click', () => {
      updateBudgetCalculator();
      showToast('Budget allocations balanced with current trip plan!', 'success');
    });
  }

  // My Trips Filter Tabs
  tripsFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tripsFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeTripFilter = btn.dataset.status;
      renderTripsList();
    });
  });

  // Edit Trip Form Submission
  if (editTripForm) {
    editTripForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const id = document.getElementById('edit-trip-id')?.value;
      const destination = document.getElementById('edit-destination')?.value.trim();
      const startDate = document.getElementById('edit-start-date')?.value;
      const endDate = document.getElementById('edit-end-date')?.value;
      const travelers = parseInt(document.getElementById('edit-travelers')?.value, 10) || 1;
      const budget = parseFloat(document.getElementById('edit-budget')?.value) || 0;
      const status = document.getElementById('edit-status')?.value;
      const notes = document.getElementById('edit-notes')?.value.trim();

      if (!destination || !startDate || !endDate) {
        showToast('Please fill out all required fields.', 'danger');
        return;
      }

      const days = calculateTripDuration(startDate, endDate);

      updateTrip(id, {
        destination,
        startDate,
        endDate,
        days,
        travelers,
        budget,
        status,
        notes
      });

      closeModal(editTripModal);
    });
  }

  // Modal close buttons
  document.querySelectorAll('.modal-close-btn, .modal-cancel-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('.modal-overlay');
      if (modal) closeModal(modal);
    });
  });

  // Close modals clicking outside
  document.querySelectorAll('.modal-overlay').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal(modal);
    });
  });

  // Escape key closes modals
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-overlay.active').forEach(closeModal);
    }
  });

  // Mobile menu toggle
  const mobileToggle = document.getElementById('mobile-toggle');
  const navLinks = document.getElementById('nav-links');
  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
      });
    });
  }

  // Initialize initial state
  updateFormSummary();
  renderDestinations('all', '');
  renderTripsList();

  // Generate initial sample itinerary so the itinerary section is populated on start
  handleGenerateItinerary();
});
