import axios from "axios";

const apiRequest = {
    getTripData: (urls,data) => {
        return axios.request({
            method: "get",
            url: urls,
            crossDomain: true
        })
      },
      updateTripData: (urls,data) => {
        return axios.request({
            method: "put",
            url: `${urls}/${data.activeId}`,
            data: data.values,
            crossDomain: true
        })
      },
      deleteTripData: (urls,data) => {
        return axios.request({
            method: "delete",
            url: `${urls}/${data.activeId}`,
            crossDomain: true
        })
      }
}

export default apiRequest