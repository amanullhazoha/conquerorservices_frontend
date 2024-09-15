export const countries = [
  { "id": "1", "name": "Nepal" },
  { "id": "2", "name": "Pakistan" },
  { "id": "3", "name": "India" },
  { "id": "4", "name": "Philippine" },
  { "id": "5", "name": "Sri Lanka" },
  { "id": "6", "name": "Bangladesh" }
]

export const state = [
  { "id": "101", "name": "Bagmati", "country_id": "1" },
  { "id": "102", "name": "Gandaki", "country_id": "1" },
  { "id": "103", "name": "Province No. 1", "country_id": "1" },
  { "id": "104", "name": "Province No. 2", "country_id": "1" },
  
  { "id": "201", "name": "Khyber Pakhtunkhwa", "country_id": "2" },
  { "id": "202", "name": "Punjab", "country_id": "2" },
  { "id": "203", "name": "Sindh", "country_id": "2" },
  { "id": "204", "name": "Balochistan", "country_id": "2" },
  
  { "id": "301", "name": "Maharashtra", "country_id": "3" },
  { "id": "302", "name": "West Bengal", "country_id": "3" },
  { "id": "303", "name": "Uttar Pradesh", "country_id": "3" },
  { "id": "304", "name": "Tamil Nadu", "country_id": "3" },

  { "id": "401", "name": "Central Luzon", "country_id": "4" },
  { "id": "402", "name": "National Capital Region", "country_id": "4" },
  { "id": "403", "name": "Western Visayas", "country_id": "4" },
  { "id": "404", "name": "Mindanao", "country_id": "4" },
  
  { "id": "501", "name": "Western Province", "country_id": "5" },
  { "id": "502", "name": "Southern Province", "country_id": "5" },
  { "id": "503", "name": "Central Province", "country_id": "5" },
  { "id": "504", "name": "Eastern Province", "country_id": "5" },
  
  { "id": "601", "name": "Dhaka Division", "country_id": "6" },
  { "id": "602", "name": "Chittagong Division", "country_id": "6" },
  { "id": "603", "name": "Khulna Division", "country_id": "6" },
  { "id": "604", "name": "Rajshahi Division", "country_id": "6" }
];

export const cities = [
  { "id": "1001", "name": "Kathmandu", "state_id": "101" },
  { "id": "1002", "name": "Pokhara", "state_id": "102" },
  { "id": "1003", "name": "Biratnagar", "state_id": "103" },
  { "id": "1004", "name": "Janakpur", "state_id": "104" },

  { "id": "2001", "name": "Peshawar", "state_id": "201" },
  { "id": "2002", "name": "Lahore", "state_id": "202" },
  { "id": "2003", "name": "Karachi", "state_id": "203" },
  { "id": "2004", "name": "Quetta", "state_id": "204" },

  { "id": "3001", "name": "Mumbai", "state_id": "301" },
  { "id": "3002", "name": "Kolkata", "state_id": "302" },
  { "id": "3003", "name": "Lucknow", "state_id": "303" },
  { "id": "3004", "name": "Chennai", "state_id": "304" },

  { "id": "4001", "name": "Angeles", "state_id": "401" },
  { "id": "4002", "name": "Quezon City", "state_id": "402" },
  { "id": "4003", "name": "Iloilo City", "state_id": "403" },
  { "id": "4004", "name": "Davao City", "state_id": "404" },

  { "id": "5001", "name": "Colombo", "state_id": "501" },
  { "id": "5002", "name": "Galle", "state_id": "502" },
  { "id": "5003", "name": "Kandy", "state_id": "503" },
  { "id": "5004", "name": "Batticaloa", "state_id": "504" },

  { "id": "6001", "name": "Dhaka", "state_id": "601" },
  { "id": "6002", "name": "Chittagong", "state_id": "602" },
  { "id": "6003", "name": "Khulna", "state_id": "603" },
  { "id": "6004", "name": "Rajshahi", "state_id": "604" }
];

export const police_stations = [
  { "id": "20001", "name": "Durbar Marg Police Station", "city_id": "1001" },
  { "id": "20002", "name": "Pokhara Police Station", "city_id": "1002" },
  { "id": "20003", "name": "Biratnagar Police Station", "city_id": "1003" },
  { "id": "20004", "name": "Janakpur Police Station", "city_id": "1004" },

  { "id": "20005", "name": "University Town Police Station", "city_id": "2001" },
  { "id": "20006", "name": "Anarkali Police Station", "city_id": "2002" },
  { "id": "20007", "name": "Clifton Police Station", "city_id": "2003" },
  { "id": "20008", "name": "Civil Lines Police Station", "city_id": "2004" },

  { "id": "20009", "name": "Worli Police Station", "city_id": "3001" },
  { "id": "20010", "name": "Park Street Police Station", "city_id": "3002" },
  { "id": "20011", "name": "Hazratganj Police Station", "city_id": "3003" },
  { "id": "20012", "name": "T. Nagar Police Station", "city_id": "3004" },

  { "id": "20013", "name": "Angeles City Police Station", "city_id": "4001" },
  { "id": "20014", "name": "Quezon City Police Station", "city_id": "4002" },
  { "id": "20015", "name": "Iloilo City Police Station", "city_id": "4003" },
  { "id": "20016", "name": "Davao City Police Station", "city_id": "4004" },

  { "id": "20017", "name": "Bambalapitiya Police Station", "city_id": "5001" },
  { "id": "20018", "name": "Galle Police Station", "city_id": "5002" },
  { "id": "20019", "name": "Kandy Police Station", "city_id": "5003" },
  { "id": "20020", "name": "Batticaloa Police Station", "city_id": "5004" },

  { "id": "20021", "name": "Ramna Police Station", "city_id": "6001" },
  { "id": "20022", "name": "Kotwali Police Station", "city_id": "6002" },
  { "id": "20023", "name": "Khalishpur Police Station", "city_id": "6003" },
  { "id": "20024", "name": "Boalia Police Station", "city_id": "6004" }
];

export const post_offices = [
  { "id": "30001", "name": "Kathmandu GPO", "police_station_id": "20001" },
  { "id": "30002", "name": "Pokhara GPO", "police_station_id": "20002" },
  { "id": "30003", "name": "Biratnagar GPO", "police_station_id": "20003" },
  { "id": "30004", "name": "Janakpur GPO", "police_station_id": "20004" },

  { "id": "30005", "name": "Peshawar GPO", "police_station_id": "20005" },
  { "id": "30006", "name": "Lahore GPO", "police_station_id": "20006" },
  { "id": "30007", "name": "Karachi GPO", "police_station_id": "20007" },
  { "id": "30008", "name": "Quetta GPO", "police_station_id": "20008" },

  { "id": "30009", "name": "Mumbai GPO", "police_station_id": "20009" },
  { "id": "30010", "name": "Kolkata GPO", "police_station_id": "20010" },
  { "id": "30011", "name": "Lucknow GPO", "police_station_id": "20011" },
  { "id": "30012", "name": "Chennai GPO", "police_station_id": "20012" },

  { "id": "30013", "name": "Angeles City Post Office", "police_station_id": "20013" },
  { "id": "30014", "name": "Quezon City Post Office", "police_station_id": "20014" },
  { "id": "30015", "name": "Iloilo City Post Office", "police_station_id": "20015" },
  { "id": "30016", "name": "Davao City Post Office", "police_station_id": "20016" },

  { "id": "30017", "name": "Colombo GPO", "police_station_id": "20017" },
  { "id": "30018", "name": "Galle Post Office", "police_station_id": "20018" },
  { "id": "30019", "name": "Kandy Post Office", "police_station_id": "20019" },
  { "id": "30020", "name": "Batticaloa Post Office", "police_station_id": "20020" },

  { "id": "30021", "name": "Dhaka GPO", "police_station_id": "20021" },
  { "id": "30022", "name": "Chittagong GPO", "police_station_id": "20022" },
  { "id": "30023", "name": "Khulna GPO", "police_station_id": "20023" },
  { "id": "30024", "name": "Rajshahi GPO", "police_station_id": "20024" }
];

export const countryCode = [
  { "id": "1", "name": "Nepal", "code": "+977", "shortName": "NP" },
  { "id": "2", "name": "Pakistan", "code": "+92", "shortName": "PK" },
  { "id": "3", "name": "India", "code": "+91", "shortName": "IN" },
  { "id": "4", "name": "Philippine", "code": "+63", "shortName": "PH" },
  { "id": "5", "name": "Sri Lanka", "code": "+94", "shortName": "LK" },
  { "id": "6", "name": "Bangladesh", "code": "+880", "shortName": "BD" }
]

export const religion = [
  {
    "id": "1",
    "name": "Islam",
  },
  {
    "id": "2",
    "name": "Hinduism",
  },
  {
    "id": "3",
    "name": "Christianity",
  },
  {
    "id": "4",
    "name": "Buddhism",
  },
]


