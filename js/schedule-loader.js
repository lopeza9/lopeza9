// Schedule Loader - Dynamically loads schedules from JSON
(function() {
    'use strict';

    // Get location ID from body data attribute
    const locationId = document.body.dataset.location;
    
    if (!locationId) {
        console.warn('No location ID found on body element');
        return;
    }

    // Load location data from JSON
    async function loadLocationData() {
        try {
            const response = await fetch('/locations.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            const location = data.locations[locationId];
            
            if (!location) {
                console.error('Location not found:', locationId);
                return;
            }
            
            // Render schedules
            renderAdultSchedule(location.schedules.adult);
            renderKidsSchedule(location.schedules.kids);
            
            console.log('Schedule loaded successfully for:', location.name);
            
        } catch (error) {
            console.error('Error loading location data:', error);
        }
    }

    // Render Adult Schedule
    function renderAdultSchedule(scheduleData) {
        const tbody = document.querySelector('#adultSchedule tbody');
        if (!tbody) {
            console.warn('Adult schedule table not found');
            return;
        }
        
        // Clear existing content
        tbody.innerHTML = '';
        
        // Generate rows
        scheduleData.forEach(row => {
            const tr = document.createElement('tr');
            tr.className = 'schedule-row hover:bg-neutral-900 transition-colors';
            
            // Build data-class attribute from all days
            const allClasses = new Set();
            ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'].forEach(day => {
                if (row[day] && row[day].classes) {
                    row[day].classes.forEach(cls => allClasses.add(cls));
                }
            });
            tr.setAttribute('data-class', Array.from(allClasses).join(' '));
            
            // Time column
            tr.innerHTML = `
                <td class="px-6 py-4 font-semibold text-gold-500 whitespace-nowrap">${row.time}</td>
                <td class="px-6 py-4">${row.monday.display}</td>
                <td class="px-6 py-4">${row.tuesday.display}</td>
                <td class="px-6 py-4">${row.wednesday.display}</td>
                <td class="px-6 py-4">${row.thursday.display}</td>
                <td class="px-6 py-4">${row.friday.display}</td>
                <td class="px-6 py-4">${row.saturday.display}</td>
            `;
            
            tbody.appendChild(tr);
        });
    }

    // Render Kids Schedule
    function renderKidsSchedule(scheduleData) {
        const tbody = document.querySelector('#kidsSchedule tbody');
        if (!tbody) {
            console.warn('Kids schedule table not found');
            return;
        }
        
        // Clear existing content
        tbody.innerHTML = '';
        
        if (!scheduleData || scheduleData.length === 0) {
            tbody.innerHTML = '<tr><td colspan="7" class="px-6 py-8 text-center text-gray-400">No kids classes scheduled at this time</td></tr>';
            return;
        }
        
        // Generate rows
        scheduleData.forEach(row => {
            const tr = document.createElement('tr');
            tr.className = 'schedule-row hover:bg-neutral-900 transition-colors';
            
            // Build data-class attribute from all days
            const allClasses = new Set();
            ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'].forEach(day => {
                if (row[day] && row[day].classes) {
                    row[day].classes.forEach(cls => allClasses.add(cls));
                }
            });
            tr.setAttribute('data-class', Array.from(allClasses).join(' '));
            
            // Time column
            tr.innerHTML = `
                <td class="px-6 py-4 font-semibold text-gold-500 whitespace-nowrap">${row.time}</td>
                <td class="px-6 py-4">${row.monday.display}</td>
                <td class="px-6 py-4">${row.tuesday.display}</td>
                <td class="px-6 py-4">${row.wednesday.display}</td>
                <td class="px-6 py-4">${row.thursday.display}</td>
                <td class="px-6 py-4">${row.friday.display}</td>
                <td class="px-6 py-4">${row.saturday.display}</td>
            `;
            
            tbody.appendChild(tr);
        });
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadLocationData);
    } else {
        loadLocationData();
    }

})();
