const initialState = {
  url: "http://detangled.in/develop/654da618-6cc8-4dc3-bac4-4688324b5f5f/events",
  allTripDatas: {},
  activeId: 0,
  currentEditId:{
    id: '',
    index: ''
  },
  activeRow: {
    id: '',
    comment: '',
    destination: '',
    duration: '',
    start: ''
  },
  status: {},
};

const reducer = (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case "TRIPDATA":
      newState.allTripDatas = action.value;
      break;

    case "ACTIVEID":
      newState.activeId = action.value;
      break;

    case "ACTIVEROW":
      newState.activeRow = action.value;
      break;

    case "APISTATUS":
      newState.status = action.value;
      break;

    case "CURRENTEDITID":
      newState.currentEditId = action.value;
      break;
      
    default:
      break;
  }
  return newState;
};

export default reducer;
