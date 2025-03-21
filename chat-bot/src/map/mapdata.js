var simplemaps_countrymap_mapdata={
  main_settings: {
   //General settings
    width: "responsive", //'700' or 'responsive'
    background_color: "#FFFFFF",
    background_transparent: "no",
    border_color: "#5B8FD8",
    
    //State defaults
    state_description: "State description",
    state_color: "#A9D3F5",
    state_hover_color: "#3A82E1",
    state_url: "",
    border_size: 1,
    all_states_inactive: "no",
    all_states_zoomable: "no",

    //Location defaults
    location_description: "Location description",
    location_url: "",
    location_color: "#FF0067",
    location_opacity: 0.8,
    location_hover_opacity: 1,
    location_size: 25,
    location_type: "square",
    location_image_source: "frog.png",
    location_border_color: "#FFFFFF",
    location_border: 2,
    location_hover_border: 2.5,
    all_locations_inactive: "no",

    //Label defaults
    label_color: "#ffffff",
    label_hover_color: "#ffffff",
    label_size: "20",
    label_font: "Arial",
    label_display: "all",
    label_scale: "no",
    hide_labels: "no",
    hide_eastern_labels: "no",

    //Zoom settings
    zoom: "yes",
    manual_zoom: "yes",
    back_image: "no",
    initial_back: "no",
    initial_zoom: "0",
    initial_zoom_solo: "no",
    region_opacity: 1,
    region_hover_opacity: 0.6,
    zoom_out_incrementally: "no",
    zoom_percentage: 1,
    zoom_time: 0.5,
    
    //Popup settings
    popup_color: "white",
    popup_opacity: 0.9,
    popup_shadow: 1,
    popup_corners: 10,
    // popup_font: "12px/1 Verdana, Arial, Helvetica, sans-serif",
    popup_nocss: "no",
    
    //Advanced settings
    div: "map",
    auto_load: "yes",
    url_new_tab: "no",
    images_directory: "default",
    fade_time: 0.1,
    link_text: "View Website",
    popups: "on_hover",
    state_image_url: "",
    state_image_position: "",
    location_image_url: ""
  },
  state_specific: {
    KR11: {
      name: "서울",
      description: " "
    },
    KR26: {
      name: "부산",
      description: " "
    },
    KR27: {
      name: "대구",
      description: " "
    },
    KR28: {
      name: "인천",
      description: " "
    },
    KR29: {
      name: "광주",
      description: " "
    },
    KR30: {
      name: "대전",
      description: " "
    },
    KR31: {
      name: "울산",
      description: " "
    },
    KR41: {
      name: "경기",
      description: " "
    },
    KR42: {
      name: "강원",
      description: " "
    },
    KR43: {
      name: "충정북도",
      description: " "
    },
    KR44: {
      name: "충청남도",
      description: " "
    },
    KR45: {
      name: "전라북도",
      description: " "
    },
    KR46: {
      name: "전라남도",
      description: " "
    },
    KR47: {
      name: "경상북도",
      description: " "
    },
    KR48: {
      name: "경상남도",
      description: " "
    },
    KR49: {
      name: "제주",
      description: " "
    },
    KR50: {
      name: "세종",
      description: " "
    }
  },
  locations: {

  },
  labels: {
    KR11: {
      name: "서울",
      parent_id: "KR11",
      x: 396.6,
      y: 233.6
    },
    KR26: {
      name: "부산",
      parent_id: "KR26",
      x: 676.8,
      y: 627.6
    },
    KR27: {
      name: "대구",
      parent_id: "KR27",
      x: 617.3,
      y: 511.4
    },
    KR28: {
      name: "인천",
      parent_id: "KR28",
      x: 355.1,
      y: 247.6
    },
    KR29: {
      name: "광주",
      parent_id: "KR29",
      x: 386.7,
      y: 625.4
    },
    KR30: {
      name: "대전",
      parent_id: "KR30",
      x: 447.5,
      y: 433.9
    },
    KR31: {
      name: "울산",
      parent_id: "KR31",
      x: 697.5,
      y: 576.1
    },
    KR41: {
      name: "경기",
      parent_id: "KR41",
      x: 433.6,
      y: 266
    },
    KR42: {
      name: "강원",
      parent_id: "KR42",
      x: 583.3,
      y: 216.2
    },
    KR43: {
      name: "충정북도",
      parent_id: "KR43",
      x: 499.7,
      y: 343.8
    },
    KR44: {
      name: "충청남도",
      parent_id: "KR44",
      x: 376.2,
      y: 440.2
    },
    KR45: {
      name: "전라북도",
      parent_id: "KR45",
      x: 421.6,
      y: 537.1
    },
    KR46: {
      name: "전라남도",
      parent_id: "KR46",
      x: 392.7,
      y: 660.1
    },
    KR47: {
      name: "경상북도",
      parent_id: "KR47",
      x: 626.8,
      y: 447.5
    },
    KR48: {
      name: "경상남도",
      parent_id: "KR48",
      x: 536.9,
      y: 598.4
    },
    KR49: {
      name: "제주",
      parent_id: "KR49",
      x: 333.8,
      y: 925.3
    },
    KR50: {
      name: "세종",
      parent_id: "KR50",
      x: 416.9,
      y: 389.3
    }
  },
  legend: {
    entries: []
  },
  regions: {},
  data: {
    data: {
      KR11: "서울",
      KR26: "부산",
      KR27: "대구",
      KR28: "인천",
      KR29: "광주",
      KR30: "대전",
      KR31: "울산",
      KR41: "경기",
      KR42: "강원",
      KR43: "충청북도",
      KR44: "충청남도",
      KR45: "전라북도",
      KR46: "전라남도",
      KR47: "경상북도",
      KR48: "경상남도",
      KR49: "제주",
      KR50: "세종"
    }
  }
};